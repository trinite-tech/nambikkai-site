// Check environment variables in Next.js
export default function handler(req, res) {
  res.status(200).json({
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
    STRAPI_API_TOKEN_EXISTS: !!process.env.STRAPI_API_TOKEN,
    STRAPI_API_TOKEN_LENGTH: process.env.STRAPI_API_TOKEN?.length || 0,
    NODE_ENV: process.env.NODE_ENV
  })
}