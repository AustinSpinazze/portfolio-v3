import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import client from '@/lib/sanityClient';

import {
  TwitterIcon,
  InstagramIcon,
  GithubIcon,
  LinkedInIcon,
  MailIcon,
} from '@/components';
import { Container } from '../components/layout/Container';
import portraitImage from '@/images/portrait.jpg';
import { LINKS } from '@/lib/constants';

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon
          className={`h-6 w-6 flex-none ${
            href.includes('mailto:')
              ? 'group-hover:fill-teal-500 dark:fill-zinc-400'
              : 'fill-zinc-500 group-hover:fill-teal-500 dark:fill-zinc-400 '
          } transition`}
        />
        <span className="ml-4">{children}</span>
      </a>
    </li>
  );
}

function TechnologyGrid({ array, filter }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {array.map((item) => {
        if (item.type === filter) {
          return (
            <li
              key={item.name}
              className="relative flex justify-center sm:justify-start"
            >
              <div className="group pointer-events-auto cursor-pointer">
                <div className="absolute bottom-10 mx-auto mb-4 hidden max-w-[228px] rounded bg-white  px-4 py-4 outline outline-1 outline-zinc-200 group-hover:block dark:bg-zinc-800">
                  <p className="text-sm font-semibold leading-none dark:text-white">
                    {item.name}
                  </p>
                  <svg
                    className="absolute bottom-[-10px]  z-10 "
                    width={16}
                    height={10}
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 10L0 0L16 1.41326e-06L8 10Z"
                      className="fill-zinc-200"
                    />
                  </svg>
                </div>
                <div className="mx-auto block overflow-hidden rounded-lg">
                  <Image
                    src={item.logoUrl}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="max-w-16 pointer-events-none h-10 object-contain"
                  />
                </div>
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
}

function Positions({ positions }) {
  const [openedPosition, setOpenedPosition] = useState(0);

  const transitionOpen = { duration: 0.5 };
  const transitionClose = { duration: 0.25 };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {positions.map((position, index) => (
          <li key={position.company} className="relative">
            <div className="relative pb-8">
              {index !== positions.length - 1 ? (
                <span
                  className="absolute top-4 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-center justify-between align-middle">
                <div className="flex items-baseline gap-5">
                  <a
                    href={position.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0">
                      <Image
                        src={position.companyLogoUrl}
                        alt={position.company}
                        width={40}
                        height={40}
                        className="h-7 w-7"
                      />
                    </span>
                  </a>
                  <a
                    href={position.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h2 className="text-base font-bold text-black dark:text-zinc-300">
                      {position.company} - {position.title}
                    </h2>
                  </a>
                  <div className="min-w-0 space-x-4 pt-1.5">
                    <p className="whitespace-nowrap3 text-sm text-gray-500">
                      {position.start} - {position.end}
                    </p>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ maxHeight: '80px' }}
                animate={{
                  maxHeight: openedPosition === index ? '1000px' : '80px',
                }}
                transition={
                  openedPosition === index ? transitionOpen : transitionClose
                }
                className="overflow-hidden"
              >
                <ul className="list-disc px-16">
                  {position.responsibilities.map((responsibility, rIndex) => (
                    <li key={rIndex}>
                      <p className="text-sm text-black dark:text-zinc-300">
                        {responsibility}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 mx-auto flex items-center justify-center">
                <div className="mr-1 h-[1px] w-1/4 bg-gray-500"></div>
                <button
                  className="relative flex h-5 w-5 items-center justify-center rounded-full border border-gray-500 text-gray-500 hover:border-teal-500 hover:text-teal-500"
                  onClick={() =>
                    setOpenedPosition(openedPosition !== index ? index : null)
                  }
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-3 w-3"
                    animate={{ rotate: openedPosition === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>
                <div className="ml-1 h-[0.75px] w-1/4 bg-gray-500"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About({ about, technologies, positions }) {
  return (
    <>
      <Head>
        <title>About - Austin Spinazze</title>
        <meta
          name="description"
          content="I’m Austin Spinazze. I live in Lafayette Louisiana, where I build things for web."
        />
        <meta property="og:title" content="About - Austin Spinazze" />
        <meta
          property="og:description"
          content="I’m Austin Spinazze. I live in Lafayette Louisiana, where I build things for web."
        />
        <meta
          property="og:image"
          content="https://cdn.sanity.io/images/gy6mtene/production/1d748a753a74c99a76ea484cdab9f980611f856b-1920x2083.png"
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt="Image of Austin Spinazze"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
            <div className="mt-12">
              <ul role="list">
                <SocialLink href={LINKS.TWITTER} icon={TwitterIcon}>
                  Follow on Twitter
                </SocialLink>
                <SocialLink
                  href={LINKS.INSTAGRAM}
                  icon={InstagramIcon}
                  className="mt-4"
                >
                  Follow on Instagram
                </SocialLink>
                <SocialLink
                  href={LINKS.GITHUB}
                  icon={GithubIcon}
                  className="mt-4"
                >
                  Follow on GitHub
                </SocialLink>
                <SocialLink
                  href={LINKS.LINKEDIN}
                  icon={LinkedInIcon}
                  className="mt-4"
                >
                  Follow on LinkedIn
                </SocialLink>
                <SocialLink href={LINKS.EMAIL} icon={MailIcon} className="mt-8">
                  austin.spinazze@austinspinazze.dev
                </SocialLink>
              </ul>
            </div>
          </div>
          <div className=" mb-20 lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Hi there, I’m Austin.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>{about[0].text}</p>
              <p>{about[1].text}</p>
              <Positions positions={positions} />
            </div>
          </div>
        </div>
        <div className="space-y-7 text-base text-zinc-600 dark:text-zinc-400">
          <p>{about[2].text}</p>
          <div>
            <h3 className="mb-4 text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              Languages
            </h3>
            <TechnologyGrid array={technologies} filter={'language'} />
            <h3 className="my-4 text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              Frameworks/Libraries
            </h3>
            <TechnologyGrid array={technologies} filter={'framework'} />
            <h3 className="my-4 text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              Runtimes
            </h3>
            <TechnologyGrid array={technologies} filter={'runtime'} />
            <h3 className="my-4 text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              Cloud
            </h3>
            <TechnologyGrid array={technologies} filter={'cloud'} />
            <h3 className="my-4 text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              Database
            </h3>
            <TechnologyGrid array={technologies} filter={'database'} />
          </div>
        </div>
        <p className="mt-10 text-zinc-600 dark:text-zinc-400 md:mt-20">
          {about[3].text}
        </p>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const data =
    await client.fetch(`*[_type in ["about", "technologies", "position"]] | order(index asc) {
    _type == "about" => {
		index,
		text
  },
  _type == "technologies" => {
		index,
		name,
		logo,
		"logoUrl": logo.asset->url,
		type,
		description
  },
	_type == "position" => {
		index,
  	company,
  	title,
		responsibilities,
  	companyLogo,
  	"companyLogoUrl": companyLogo.asset->url,
  	companyWebsite,
  	start,
  	end
  }
}
`);

  const about = data.filter((doc) => doc.hasOwnProperty('text') === true);
  const technologies = data.filter(
    (doc) => doc.hasOwnProperty('type') === true
  );
  const positions = data.filter(
    (doc) => doc.hasOwnProperty('company') === true
  );

  return {
    props: {
      about,
      technologies,
      positions,
    },
  };
}
