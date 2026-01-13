// import React from 'react'

// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
// const API_TOKEN = process.env.STRAPI_API_TOKEN

// export async function strapiFetch(endpoint, options = {}) {
//   if (!STRAPI_URL) {
//     console.warn('NEXT_PUBLIC_STRAPI_URL not configured')
//     return { data: [] }
//   }

//   const url = `${STRAPI_URL}/api${endpoint}`
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
//       ...options.headers,
//     },
//     ...options,
//   }

//   try {
//     const response = await fetch(url, config)
//     if (!response.ok) {
//       console.error(`Strapi API error: ${response.status} ${response.statusText}`)
//       return { data: [] }
//     }
//     return await response.json()
//   } catch (error) {
//     console.error('Strapi connection failed:', error.message)
//     return { data: [] }
//   }
// }

// export async function getArticles(limit = 10) {
//   return strapiFetch(`/articles?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`)
// }

// export async function getArticleBySlug(slug) {
//   const response = await strapiFetch(`/articles?populate=*&filters[slug][$eq]=${slug}`)
//   return response.data?.[0] || null
// }

// export async function getCategories() {
//   return strapiFetch('/categories?sort=name:asc')
// }

// export async function getArticlesByCategorySlug(categorySlug, limit = 10) {
//   return strapiFetch(`/articles?populate=*&filters[category][slug][$eq]=${categorySlug}&sort=publishedAt:desc&pagination[limit]=${limit}`)
// }

// export function getStrapiMediaUrl(media) {
//   if (!media?.url) return '/placeholder.jpg'
//   return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`
// }

// export function renderRichText(content) {
//   if (typeof content === 'string') {
//     return <div dangerouslySetInnerHTML={{ __html: content }} />
//   }
  
//   if (Array.isArray(content)) {
//     return content.map((block, index) => {
//       switch (block.type) {
//         case 'paragraph':
//           return <p key={index} className="mb-4">{block.children?.[0]?.text}</p>
//         case 'heading':
//           const HeadingTag = `h${block.level || 2}`
//           return <HeadingTag key={index} className="font-bold mb-4">{block.children?.[0]?.text}</HeadingTag>
//         default:
//           return <p key={index} className="mb-4">{block.children?.[0]?.text || ''}</p>
//       }
//     })
//   }
  
//   return <p>{content}</p>
// }


// lib/strapi.js

import React from "react";

/**
 * Production Strapi configuration for nambikkai.info
 */
const STRAPI_URL = 'http://13.200.250.14:1338';
const API_TOKEN = '281b09a503849df4353f8be214da3d8eb0f9052b5bb426a59230c8579fa61502c409bb92df35c02cd2686df5ab394f02153d6bea29786d52b88f9ed98a99ffb50bde124023faa7c3dafebc70121ab107dcaf63a05d3d3565bbd80a670c373d6ba182869c171e13b2215097d2277d42512c47f0def1bc42ac28adf1b68adb13c8';

/**
 * Core fetch function
 */
export async function strapiFetch(endpoint, options = {}) {
  if (!STRAPI_URL) {
    console.warn("Strapi URL not configured");
    return { data: [] };
  }

  const url = `${STRAPI_URL}/api${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      console.error(
        `Strapi API Error: ${response.status} ${response.statusText}`
      );
      return { data: [] };
    }

    return await response.json();
  } catch (error) {
    console.error("Strapi connection failed:", error.message);
    return { data: [] };
  }
}

/* =========================
   CONTENT HELPERS
========================= */

// Articles
export async function getArticles(limit = 10) {
  return strapiFetch(
    `/articles?populate=*&sort=publishedDate:desc&pagination[limit]=${limit}`
  );
}

export async function getArticleBySlug(slug) {
  const response = await strapiFetch(
    `/articles?populate=*&filters[slug][$eq]=${slug}`
  );
  return response?.data?.[0] || null;
}

export async function getArticlesByCategorySlug(categorySlug, limit = 10) {
  return strapiFetch(
    `/articles?populate=*&filters[category][slug][$eq]=${categorySlug}&sort=publishedDate:desc&pagination[limit]=${limit}`
  );
}

// Categories
export async function getCategories() {
  return strapiFetch(`/categories?sort=sortOrder:asc`);
}

// Advertisements
export async function getAdsByPosition(position) {
  return strapiFetch(
    `/advertisements?filters[position][$eq]=${position}&filters[active][$eq]=true`
  );
}

/* =========================
   MEDIA HELPERS
========================= */

export function getStrapiMediaUrl(media) {
  if (!media?.data?.attributes?.url) return "/placeholder.jpg";

  const url = media.data.attributes.url;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

/* =========================
   RICH TEXT RENDER
========================= */

export function renderRichText(content) {
  if (!content) return null;

  if (typeof content === "string") {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  if (Array.isArray(content)) {
    return content.map((block, index) => {
      switch (block.type) {
        case "paragraph":
          return (
            <p key={index} className="mb-4">
              {block.children?.[0]?.text}
            </p>
          );

        case "heading": {
          const HeadingTag = `h${block.level || 2}`;
          return (
            <HeadingTag key={index} className="font-bold mb-4">
              {block.children?.[0]?.text}
            </HeadingTag>
          );
        }

        default:
          return null;
      }
    });
  }

  return null;
}
