/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mox-s3-console-assets.s3.us-east-1.amazonaws.com'
      }
    ]
  }
}
module.exports = nextConfig
