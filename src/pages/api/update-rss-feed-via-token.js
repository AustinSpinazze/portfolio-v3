// import { fetchFeedData } from "@/lib/fetchRssFeedData";
// import { generateRssFeed } from "@/lib/generateRssFeed";
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET;

// export default async function authenticatedRoute(req, res) {
// 	try {
// 		// Verify request method
// 		if (req.method !== "POST") {
// 			res.status(405).send({ message: "Only POST requests allowed" });
// 			return;
// 		}

// 		// Extract the JWT from the request headers
// 		const token = req.headers.authorization.split("Bearer ")[1];

// 		// Verify the JWT using the secret
// 		jwt.verify(token, JWT_SECRET);

// 		const feedData = await fetchFeedData();
// 		const { status, message } = await generateRssFeed(feedData);

// 		// If the JWT is valid and no errors updating RSS feed
// 		if (status === "success") {
// 			res.status(201).json({
// 				message: message,
// 			});
// 		} else {
// 			res.status(500).json({
// 				error: "There was a problem updating the feed.",
// 			});
// 		}
// 	} catch (error) {
// 		// If the JWT is invalid, return a 401 Unauthorized error
// 		res.status(401).json({ error: "Unauthorized" });
// 	}
// }
