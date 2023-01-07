import { fetchFeedData } from "@/lib/fetchRssFeedData";
import { generateRssFeed } from "@/lib/generateRssFeed";

export default function FeedXML(props) {
	return `<?xml version="1.0" encoding="UTF-8"?>${props.xml}`;
}

export async function getServerSideProps() {
	const feedData = await fetchFeedData();
	const { xml } = await generateRssFeed(feedData);

	return {
		props: {
			xml,
		},
	};
}
