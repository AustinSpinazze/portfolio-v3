import Image from "next/image";
import Head from "next/head";
import clsx from "clsx";

import client from "@/lib/client";

import { Container } from "@/components/Container";
import {
	TwitterIcon,
	InstagramIcon,
	GitHubIcon,
	LinkedInIcon,
} from "@/components/SocialIcons";
import portraitImage from "@/images/portrait.jpg";
import { LINKS } from "@/lib/constants";

function SocialLink({ className, href, children, icon: Icon }) {
	return (
		<li className={clsx(className, "flex")}>
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
			>
				<Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
				<span className="ml-4">{children}</span>
			</a>
		</li>
	);
}

function MailIcon(props) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path
				fillRule="evenodd"
				d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
			/>
		</svg>
	);
}

function TechnologyGrid({ array, filter }) {
	return (
		<ul
			role="list"
			className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 place-items-center"
		>
			{array.map((item) => {
				if (item.type === filter) {
					return (
						<li key={item.name} className="relative">
							<div className="group pointer-events-auto cursor-pointer">
								<div className="group-hover:block mx-auto max-w-[228px] px-4 py-4 bg-white dark:bg-zinc-800 outline-zinc-200  outline outline-1 rounded hidden absolute mb-4 bottom-10">
									<p className="text-sm font-semibold leading-none dark:text-white">
										{item.name}
									</p>
									<svg
										className="absolute z-10  bottom-[-10px] "
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
								<div className="block mx-auto overflow-hidden rounded-lg">
									<img
										src={item.logoUrl}
										alt={item.name}
										className="pointer-events-none object-contain h-10 max-w-16"
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
	return (
		<div className="flow-root">
			<ul role="list" className="-mb-8">
				{positions.map((position, index) => (
					<li key={position.company}>
						<div className="relative pb-8">
							{index !== positions.length - 1 ? (
								<span
									className="absolute top-4 left-5 -ml-px h-full w-0.5 bg-gray-200"
									aria-hidden="true"
								/>
							) : null}
							<div className="relative flex justify-between">
								<div>
									<span className='flex h-10 w-10 flex-none items-center bg-white justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0'>
										<img
											src={position.companyLogoUrl}
											alt={position.company}
											className="h-7 w-7"
										/>
									</span>
								</div>
								<div className="min-w-0 space-x-4 pt-1.5">
									<p className="whitespace-nowrap3 text-sm text-gray-500">
										{position.start} - {position.end}
									</p>
								</div>
							</div>
							<div>
								<ul className="list-disc px-16">
									{position.responsibilities.map((responsibility, index) => (
										<li key={index}>
											<p className="text-sm text-black dark:text-zinc-300">
												{responsibility}
											</p>
										</li>
									))}
								</ul>
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
					</div>
					<div className="lg:order-first lg:row-span-2">
						<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
							Hi there, I’m Austin.
						</h1>
						<div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
							<p>{about[0].text}</p>
							<p>{about[1].text}</p>
							<Positions positions={positions} />
							<p>{about[2].text}</p>
							<div>
								<h3 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
									Languages
								</h3>
								<TechnologyGrid array={technologies} filter={"language"} />
								<h3 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 my-4">
									Frameworks/Libraries
								</h3>
								<TechnologyGrid array={technologies} filter={"framework"} />
								<h3 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 my-4">
									Runtimes
								</h3>
								<TechnologyGrid array={technologies} filter={"runtime"} />
								<h3 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 my-4">
									Cloud
								</h3>
								<TechnologyGrid array={technologies} filter={"cloud"} />
								<h3 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 my-4">
									Database
								</h3>
								<TechnologyGrid array={technologies} filter={"database"} />
							</div>
							<p>{about[3].text}</p>
						</div>
					</div>
					<div className="lg:pl-20">
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
								icon={GitHubIcon}
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
							<SocialLink
								href={LINKS.EMAIL}
								icon={MailIcon}
								className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
							>
								austin.spinazze@austinspinazze.dev
							</SocialLink>
						</ul>
					</div>
				</div>
			</Container>
		</>
	);
}

export async function getStaticProps() {
	const data = await client.fetch(`*[_type in ["about", "technologies", "position"]] | order(index asc) {
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

	const about = data.filter((item) => item.hasOwnProperty("text") === true);
	const technologies = data.filter(
		(item) => item.hasOwnProperty("type") === true,
	);
	const positions = data.filter(
		(item) => item.hasOwnProperty("company") === true,
	);

	return {
		props: {
			about,
			technologies,
			positions,
		},
	};
}
