import { Feed } from "feed";
import { writeFile, mkdir } from "fs/promises";
import ReactDOMServer from "react-dom/server";

export async function generateRssFeed(feedData) {
  function RssItem({ title, url, description }) {
    return (
      <item>
        <title>{title}</title>
        <link href={url} />
        <description>{description}</description>
        <span>&nbsp;-&nbsp;<a href={url}>Read more</a></span>
      </item>
    );
  }

  // Generate the RSS feed
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const author = {
    name: "Austin Spinazze",
    email: "austin.spinazze@austinspinazze.dev",
  };

  const feed = new Feed({
    title: author.name,
    description: "All of my long-form thoughts on programming, product development, personal growth, and more, collected in chronological order.",
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  });

  feedData.forEach((post) => {
    let url = `${siteUrl}/posts/${post.slug.current}`;
    let html = ReactDOMServer.renderToStaticMarkup(
      <RssItem title={post.title} url={url} description={post.summary} author={author.name} publishedAt={post.publishedAt} />,
    );

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: html,
      author: [{ name: post.author, email: author.email }],
      contributor: [{ name: post.author, email: author.email }],
      date: new Date(post.publishedAt),
    });
  });

  await mkdir("./public/rss", { recursive: true });
  await Promise.all([
    writeFile("./public/rss/feed.xml", feed.rss2(), "utf8"),
    writeFile("./public/rss/feed.json", feed.json1(), "utf8"),
  ]);
}
