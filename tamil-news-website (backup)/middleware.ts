import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Middleware disabled - using Strapi only
  return
}

export const config = {
  matcher: [],
}
