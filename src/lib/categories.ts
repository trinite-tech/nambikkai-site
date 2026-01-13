// Fetch categories from Strapi CMS
export async function getCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?populate=*`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    // Transform Strapi data to navbar format
    const categories = data.data?.map((category: any) => ({
      label: category.attributes?.name || category.name,
      href: `/category/${category.attributes?.slug || category.slug}`,
      slug: category.attributes?.slug || category.slug
    })) || []

    return {
      success: true,
      categories
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    
    // Fallback to static categories
    const fallbackCategories = [
      { label: "முகப்பு", href: "/" },
      { label: "செய்திகள்", href: "/news" },
      { label: "உலகம்", href: "/category/world" },
      { label: "இந்தியா", href: "/category/india" },
      { label: "தமிழ்நாடு", href: "/category/tamilnadu" },
      { label: "விளையாட்டு", href: "/category/sports" },
      { label: "தொழில்நுட்பம்", href: "/category/tech" },
      { label: "வணிகம்", href: "/category/business" },
      { label: "படங்கள்", href: "/images" },
    ]
    
    return {
      success: false,
      categories: fallbackCategories,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}