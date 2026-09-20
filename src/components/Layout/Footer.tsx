import Link from "../Atoms/Link";

export default function Footer() {
	return (
		<footer className={"sticky top-[100vh] mb-6 mt-40"}>
			<p>
				This website is open-source on{" "}
				<Link
					href={"https://github.com/GitDevla/devla.dev"}
					className={"link"}
					external
				>
					Github
				</Link>
				.
			</p>
		</footer>
	);
}
