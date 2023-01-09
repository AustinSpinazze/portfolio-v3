import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function authenticate(username, password) {
	return (
		username === process.env.API_USERNAME &&
		password === process.env.API_PASSWORD
	);
}

export default async function generateJWT(req, res) {
	try {
		if (req.method !== "POST") {
			res.status(405).send({ message: "Only POST requests allowed" });
			return;
		}

		const { username, password } = req.body;
		if (!authenticate(username, password)) {
			throw new Error("Invalid username or password");
		}

		// Generate a JWT for the authenticated client
		const token = jwt.sign({ username }, JWT_SECRET, {
			expiresIn: "50 years",
		});

		// Send the JWT to the client
		res.status(201).json({ token });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
}
