/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [["next-superjson-plugin", {}]],
	},
	images: {
		domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
	},
};

export default nextConfig;
