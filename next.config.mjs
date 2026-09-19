// import bundleAnalyzer from "@next/bundle-analyzer";

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: process.env.NEXT_DIST_DIR ?? ".next",
	output: "standalone",
	reactStrictMode: true,
	crossOrigin: "anonymous",
	compress: true,
	redirects: async () => {
		return [
			{
				source: "/blog",
				destination: "/projects",
				permanent: false,
			},
		];
	},
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{ hostname: "cdn.simpleicons.org" },
			{ hostname: "placehold.co" },
			{ hostname: "yt3.ggpht.com" },
			{ hostname: "i.ytimg.com" },
			{ hostname: "noah.devla.dev" },
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

// export default withBundleAnalyzer(nextConfig);
export default nextConfig;
