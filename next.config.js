const withPWA = require('next-pwa')({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.pexels.com', 'i.pinimg.com', 'www.pexels.com'], 
  },

  env: {
    SECRET : '7$Dp@9!z#Rt*2QvP'
  },
}

module.exports = withPWA(nextConfig)
