import { fetchFeedData } from "@/lib/fetchRssFeedData"
import { generateRssFeed } from "@/lib/generateRssFeed"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const feedData = await fetchFeedData();
  await generateRssFeed(feedData);

  res.status(201).json({ message: 'Feed updated' })
}