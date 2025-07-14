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
			{
				protocol: "https",
				hostname: "api.csskinspace.com",
			},
		],
	},
};

export default nextConfig;
