/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '3.108.194.91',
        port: '1338',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'strapi-nambikkai.herokuapp.com',
        pathname: '/uploads/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://3.108.194.91:1338/',
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig