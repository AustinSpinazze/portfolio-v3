import { fetchFeedData } from "@/lib/fetchRssFeedData";
import { generateRssFeed } from "@/lib/generateRssFeed";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const secret = process.env.SANITY_WEBHOOK_SECRET;

export default async function handler(req, res) {
	// Verify request method
	if (req.method !== "POST") {
		res.status(405).send({ message: "Only POST requests allowed" });
		return;
	}
	// Read the signature from the headers
	const signature = req.headers[SIGNATURE_HEADER_NAME];
	// Read the body into a string
	const body = await readBody(req);
	// Validate signature
	if (!isValidSignature(body, signature, secret)) {
		res.status(401).json({ success: false, message: "Invalid signature" });
		return;
	}

	try {
		const feedData = await fetchFeedData();
		const { message } = await generateRssFeed(feedData);

		res.status(201).json({
			message: message,
		});
	} catch (e) {
		res.status(500).json({ message: `${e}: Error on te server.` });
	}
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
	api: {
		bodyParser: false,
	},
};

async function readBody(readable) {
	const chunks = [];
	for await (const chunk of readable) {
		chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
	}
	return Buffer.concat(chunks).toString("utf8");
}
