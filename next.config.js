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
      },
      {
        protocol:'https',
        hostname: 'images.pexels.com',
        port: '',
      },
    ]
  },

  env: {
    SECRET : '7$Dp@9!z#Rt*2QvP'
  },
}

module.exports = nextConfig
