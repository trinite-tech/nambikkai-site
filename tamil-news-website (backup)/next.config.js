/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: 'http://13.200.250.14:1338'
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig