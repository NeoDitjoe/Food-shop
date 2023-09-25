/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: [ 'image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol:'https',
        hostname: 'i.pinimg.com',
        port: '',
      }
    ]
  }
}

module.exports = nextConfig
