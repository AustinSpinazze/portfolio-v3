import Head from "next/head";

import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { SimpleLayout } from "@/components/SimpleLayout";
import client from "../lib/client";

function ToolsSection({ children, ...props }) {
	return (
		<Section {...props}>
			<ul role="list" className="space-y-16">
				{children}
			</ul>
		</Section>
	);
}

function Tool({ title, href, children }) {
	return (
		<Card as="li">
			<Card.Title as="h3" href={href}>
				{title}
			</Card.Title>
			<Card.Description>{children}</Card.Description>
		</Card>
	);
}

export default function Gear({ gear }) {
	console.log(gear);
	return (
		<>
			<Head>
				<title>Gear - Gear</title>
				<meta
					name="description"
					content="Software I use, gadgets I love, and other things I recommend."
				/>
			</Head>
			<SimpleLayout
				title="Software I use, gadgets I love, and other things I recommend."
				intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
			>
				<div className="space-y-20">
					<ToolsSection title="Workstation">
						{gear.map((item) => {
							if (item.section === "workstation") {
								return (
									<Tool key={item.name} title={item.name}>
										{item.description}
									</Tool>
								);
							}
						})}
					</ToolsSection>
					<ToolsSection title="Development tools">
						{gear.map((item) => {
							if (item.section === "development") {
								return (
									<Tool key={item.name} title={item.name}>
										{item.description}
									</Tool>
								);
							}
						})}
					</ToolsSection>
					<ToolsSection title="Design">
						{gear.map((item) => {
							if (item.section === "design") {
								return (
									<Tool key={item.name} title={item.name}>
										{item.description}
									</Tool>
								);
							}
						})}
					</ToolsSection>
					<ToolsSection title="Productivity">
						{gear.map((item) => {
							if (item.section === "productivity") {
								return (
									<Tool key={item.name} title={item.name}>
										{item.description}
									</Tool>
								);
							}
						})}
					</ToolsSection>
				</div>
			</SimpleLayout>
		</>
	);
}

export async function getStaticProps() {
	const gear = await client.fetch(`
		*[_type == "gear"]{
			name,
			description,
			image,
			"gearImageUrl": gearImage.asset->url,
			url,
			section
		}`);
	return {
		props: {
			gear,
		},
	};
}
