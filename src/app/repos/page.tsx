import { Metadata } from "next";
import { Suspense } from "react";
import ContributionCalendar from "@/components/ContributionCalendar";
import ReposSection from "@/components/Sections/ReposSection";
import { pullGithubRepos } from "@/services/Github";
import createMetadata from "@/utils/Metadata";

export let revalidate = 60 * 60 * 24;

export const metadata: Metadata = createMetadata({
	title: "Repositories",
	description:
		"David Pataki's repositories. Collection of all my published repositories.",
	keywords: [
		"repositories",
		"projects",
		"portfolio",
		"open-source",
		"software",
		"development",
	],
});

async function pullRepos() {
	let [githubRepos] = await Promise.all([pullGithubRepos()]);
	let repos = githubRepos;
	return repos;
}

export default async function ReposPage() {
	const repos = await pullRepos();

	return (
		<>
			<h1 className={"header"}>Repositories</h1>
			<p>Collection of all my published repositories.</p>
			<div className={"py-2"}>
				<ContributionCalendar />
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<ReposSection repos={repos} />
			</Suspense>
		</>
	);
}
