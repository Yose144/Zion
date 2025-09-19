/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // API proxy for local development
  async rewrites() {
    return [
      {
        source: '/api/node/:path*',
        destination: 'http://localhost:18081/:path*'
      }
    ]
  }
}

module.exports = nextConfig