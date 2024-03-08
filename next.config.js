/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  async redirects () {
    return [
      {
        source: '/wedding',
        destination: '/wedding/index.html',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
