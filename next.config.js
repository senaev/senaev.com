/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: '/wedding',
        destination: '/wedding/index.html',
      },
    ]
  },
};

module.exports = nextConfig;
