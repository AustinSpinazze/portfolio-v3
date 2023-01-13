import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

import {
  TwitterIcon,
  InstagramIcon,
  GithubIcon,
  LinkedInIcon,
  Button,
  Card,
  RSSIcon,
  MailIcon,
  AtomIcon,
  JSONIcon,
  XMLIcon,
  BriefcaseIcon,
  ArrowDownIcon,
  CloseIcon,
  CheckIcon,
} from '@/components';
import { Container } from '../components/layout/Container';
import image1 from '@/images/photos/image-1.png';
import image2 from '@/images/photos/image-2.png';
import image3 from '@/images/photos/image-3.png';
import image4 from '@/images/photos/image-4.png';
import image5 from '@/images/photos/image-5.png';
import { formatDate } from '@/lib/formatDate';
import client from '@/lib/client';
import { LINKS } from '@/lib/constants';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { isValidEmail } from '@/lib/isValidEmail';
import { fetchData } from '@/lib/fecthData';

function BlogPost({ post }) {
  return (
    <Card as="article">
      <Card.Title href={`/posts/${post.slug.current}`}>{post.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={post.publishedAt} decorate>
        {formatDate(post.publishedAt)}
      </Card.Eyebrow>
      <Card.Description>{post.description}</Card.Description>
      <Card.Cta>Read post</Card.Cta>
    </Card>
  );
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <a className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </a>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please provide a valid email address.');
    } else {
      try {
        const { error } = await fetchData('/api/create-contact', {
          method: 'PUT',
          body: JSON.stringify({
            email,
          }),
        });
        if (error) throw error;
        setError('');
        router.push('/thank-you');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <form
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      onSubmit={() => handleSubmit()}
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none fill-zinc-100 dark:fill-zinc-400" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
      {error && <p className="mt-4 w-full text-center text-red-500">{error}</p>}
    </form>
  );
}

function RSSFeeds({ copy }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <RSSIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">RSS Feed</span>
      </h2>
      <ul className="mx-auto mt-6 flex w-full justify-between px-8">
        <li
          className="flex cursor-pointer flex-col items-center"
          onClick={() => copy(`${document.URL}rss/feed.atom`)}
        >
          <AtomIcon className="h-6 w-6 flex-none" />
          <span className="mt-2 text-sm text-zinc-800 dark:text-zinc-400">
            Atom
          </span>
        </li>
        <li
          className="flex cursor-pointer flex-col items-center"
          onClick={() => copy(`${document.URL}rss/feed.json`)}
        >
          <JSONIcon className="h-6 w-6 flex-none" />
          <span className="mt-2 text-sm text-zinc-800 dark:text-zinc-400">
            JSON
          </span>
        </li>
        <li
          className="flex cursor-pointer flex-col items-center"
          onClick={() => copy(`${document.URL}rss/feed.xml`)}
        >
          <XMLIcon className="h-6 w-6 flex-none" />
          <span className="mt-2 text-sm text-zinc-800 dark:text-zinc-400">
            XML
          </span>
        </li>
      </ul>
    </div>
  );
}

function Banner({ setBannerState }) {
  return (
    <div className="fixed inset-x-0 bottom-6 z-50 animate-fade-in-up pb-2 sm:pb-5">
      <div className="mx-auto w-11/12 px-2 sm:px-6 md:w-full md:max-w-2xl lg:px-8">
        <div className="rounded-lg bg-green-600 p-2 shadow-lg sm:p-3">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <CheckIcon className="h-6 w-6 fill-white" aria-hidden="true" />
              <p className="ml-3 truncate font-medium text-white">
                <span className="md:hidden">Copied RSS feed url 👍</span>
                <span className="hidden md:inline">
                  Copied RSS feed url 👍 Now paste the url into your favorite
                  reader.
                </span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                type="button"
                className="-mr-1 flex p-2"
                onClick={() => setBannerState(false)}
              >
                <span className="sr-only">Dismiss</span>
                <CloseIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Resume({ positions }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {positions.map((position) => (
          <li key={position.index} className="flex gap-4">
            <div className="dark:border-zinc-700/50dark:ring-0 relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:bg-white">
              <Image
                src={position.companyLogoUrl}
                alt={position.company}
                height={40}
                width={40}
                className="h-7 w-7"
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {position.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {position.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${position.start} - ${position.end}`}
              >
                <time dateTime={position.startDate}>{position.start}</time>
                <span aria-hidden="true">&nbsp;—&nbsp;</span>
                <time dateTime={position.endDate}>{position.end}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="/assets/AustinSpinazzeResume.pdf"
        download={true}
        variant="secondary"
        className="group mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}

function Photos() {
  let rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home({ positions, posts }) {
  const [value, copy] = useCopyToClipboard();
  const [bannerState, setBannerState] = useState(false);

  useEffect(() => {
    if (value != null) setBannerState(true);
    setTimeout(() => {
      setBannerState(false);
    }, 3000);
  }, [value]);

  return (
    <>
      <Head>
        <title>
          Austin Spinazze - Software Engineer, Consultant, and Freelancer
        </title>
        <meta
          name="description"
          content={`I'm Austin, a Software Engineer and Consultant specializing in building exceptional digital experiences based in Lafayette, Louisiana. Currently, I'm focused on building accessible, human-centered products at ${positions[0].company}.`}
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software Engineer, Consultant, and Freelancer.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {`I'm Austin, a Software Engineer and Consultant specializing in building exceptional digital experiences based in Lafayette, Louisiana. Currently, I'm focused on building accessible, human-centered products at ${positions[0].company}.`}
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              target="_blank"
              href={LINKS.TWITTER}
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              target="_blank"
              href={LINKS.INSTAGRAM}
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              target="_blank"
              href={LINKS.GITHUB}
              aria-label="Follow on GitHub"
              icon={GithubIcon}
            />
            <SocialLink
              target="_blank"
              href={LINKS.LINKEDIN}
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {posts.map((post) => (
              <BlogPost key={post.slug} post={post} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <RSSFeeds copy={copy} />
            <Resume positions={positions} />
          </div>
        </div>
      </Container>
      {bannerState && <Banner setBannerState={setBannerState} />}
    </>
  );
}

export async function getServerSideProps() {
  const data = await client.fetch(`*[_type == "position"] | order(index asc) {
			index,
			company,
			title,
			responsibilities,
			companyLogo,
			"companyLogoUrl": companyLogo.asset->url,
			companyWebsite,
			start,
			end
		} + *[_type == "post"] | order(publishedAt asc) [0...4] {
			title,
			publishedAt,
			slug,
			summary,
			author,
			tags,
		}
`);

  const positions = data.filter((doc) => doc.hasOwnProperty('company'));
  const posts = data.filter((doc) => doc.hasOwnProperty('author'));

  return {
    props: {
      positions,
      posts,
    },
  };
}
