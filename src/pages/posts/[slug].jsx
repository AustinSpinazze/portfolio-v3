import { MDXRemote } from 'next-mdx-remote';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';

import client from '@/lib/sanityClient';
import { BlogLayout } from '@/components';

export default function Post({ data, content }) {
  return (
    <BlogLayout meta={data}>
      <MDXRemote {...content} />
    </BlogLayout>
  );
}

export const getStaticPaths = async () => {
  const posts = await client.fetch(`*[_type == "post"] | order(published asc){
      publishedAt,
      slug
    }
  `);
  const paths = posts.map((post) => {
    return {
      params: { slug: post.slug.current },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post =
    await client.fetch(`*[_type == "post" && slug.current == "${params.slug}"][0]{
      title,
      publishedAt,
      slug,
      summary,
      content,
      author,
      tags,
      ogImage,
      "ogImageUrl": ogImage.asset->url,
      ogDescription,
      ogTitle
    }
  `);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
  });

  return {
    props: {
      data: post,
      content: mdxSource,
    },
  };
};
