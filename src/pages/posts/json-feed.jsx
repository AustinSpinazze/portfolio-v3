import { fetchFeedData } from "@/lib/fetchRssFeedData";
import { generateRssFeed } from "@/lib/generateRssFeed";

export default function FeedJSON(props) {
	return <>{props.json}</>;
}

export async function getServerSideProps() {
	const feedData = await fetchFeedData();
	const { json } = await generateRssFeed(feedData);

	return {
		props: {
			json,
		},
	};
}
