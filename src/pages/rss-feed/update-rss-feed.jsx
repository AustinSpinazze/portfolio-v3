import { SimpleLayout } from "@/components/SimpleLayout";
import { fetchFeedData } from "@/lib/fetchRssFeedData";
import { generateRssFeed } from "@/lib/generateRssFeed";

export default function RssPage({ message }) {
	return (
		<SimpleLayout>
			<div className="w-full text-center">{message}</div>
		</SimpleLayout>
	);
}

export async function getStaticProps() {
	const feedData = await fetchFeedData();
	const { message } = await generateRssFeed(feedData);
	return { props: { message } };
}
