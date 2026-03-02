/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "ui.aceternity.com",
            },
            {
                protocol: "https",
                hostname: "**.unsplash.com",
            },
        ],
    },
};

export default nextConfig;
