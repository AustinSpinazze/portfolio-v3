import Head from 'next/head';

import { Card, SimpleLayout } from '@/components';
import { formatDate } from '@/lib/formatDate';
import client from '@/lib/client';

function BlogPost({ post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/posts/${post.slug.current}`}>
          {post.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={post.publishedAt}
          className="md:hidden"
          decorate
        >
          {formatDate(post.publishedAt)}
        </Card.Eyebrow>
        <Card.Description>{post.summary}</Card.Description>
        <Card.Cta>Read post</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.publishedAt}
        className="mt-1 hidden md:block"
      >
        {formatDate(post.publishedAt)}
      </Card.Eyebrow>
    </article>
  );
}

export default function BlogIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - Austin Spinazze</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, product development, personal growth, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on software development, product development, and the tech industry."
        intro="All of my long-form thoughts on programming, product development, personal growth, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts.map((post) => (
              <BlogPost key={post.slug.current} post={post} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(`*[_type == "post"] | order(index asc){
    title,
    publishedAt,
    slug,
    summary,
		author,
		tags,
		ogImage,
		"ogImageUrl": ogImage.asset->url,
		ogDescription,
    ogTitle
  }
`);

  return {
    props: {
      posts,
    },
  };
}
