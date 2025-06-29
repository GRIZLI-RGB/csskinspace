import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "csgomarket.webalchemy.fun",
			},
			{
				protocol: "https",
				hostname: "avatars.steamstatic.com",
			},
		],
	},
};

export default nextConfig;
