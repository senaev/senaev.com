/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/wedding',
                destination: '/wedding/index.html',
            },
        ];
    },
};

module.exports = nextConfig;
