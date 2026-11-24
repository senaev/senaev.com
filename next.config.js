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

    async redirects() {
        // The short (1min) and detailed (5min) CVs were merged into one page at /cv.
        return [
            {
                source: '/cv/5min',
                destination: '/cv',
                permanent: true,
            },
            {
                source: '/cv/1min',
                destination: '/cv',
                permanent: true,
            },
        ];
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
