/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,

    // Experimental features for faster builds
    experimental: {
        // Enable SWC minification optimizations
        optimizePackageImports: [
            'marked',
            'highlight.js',
            'react',
            'react-dom',
        ],
    },

    async rewrites() {
        return [
            {
                source: '/wedding',
                destination: '/wedding/index.html',
            },
        ];
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
