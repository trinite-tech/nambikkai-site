# Strapi Integration for Pages Router (Next.js)

## 📁 pages/index.js - Home Page with Featured Articles

```javascript
import { getArticles } from "@/lib/strapi";
import { NewsArticleCard } from "@/components/news-article-card";

export async function getStaticProps() {
  try {
    const articlesRes = await getArticles({ limit: 10, featured: true });
    
    return {
      props: {
        articles: articlesRes.data || [],
      },
      revalidate: 60, // ISR - revalidate every 60 seconds
    };
  } catch (error) {
    console.log('Strapi not available, using fallback');
    
    // Fallback to sample data
    const { sampleArticles } = await import('@/lib/sample-data');
    
    return {
      props: {
        articles: sampleArticles.slice(0, 10),
      },
      revalidate: 60,
    };
  }
}

export default function Home({ articles }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#003d7a] mb-8">சமீபத்திய செய்திகள்</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {article.attributes?.featuredImage?.data?.attributes?.url && (
              <img 
                src={article.attributes.featuredImage.data.attributes.url}
                alt={article.attributes.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{article.attributes.title}</h2>
              <p className="text-gray-600 mb-4">{article.attributes.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {article.attributes.author?.data?.attributes?.name}
                </span>
                <a 
                  href={`/article/${article.attributes.slug}`}
                  className="text-[#e60000] hover:underline font-semibold"
                >
                  மேலும் படிக்க →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
```

## 📁 pages/article/[slug].js - Single Article Page

```javascript
import { getArticleBySlug, getArticles } from "@/lib/strapi";
import Image from "next/image";

export async function getStaticPaths() {
  try {
    const articlesRes = await getArticles({ limit: 100 });
    
    const paths = articlesRes.data?.map((article) => ({
      params: { slug: article.attributes.slug }
    })) || [];
    
    return {
      paths,
      fallback: "blocking", // Enable ISR for new articles
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const article = await getArticleBySlug(params.slug);
    
    if (!article) {
      return { notFound: true };
    }
    
    return {
      props: { article },
      revalidate: 60,
    };
  } catch (error) {
    console.log('Strapi not available');
    return { notFound: true };
  }
}

export default function ArticlePage({ article }) {
  const data = article.attributes;
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          {data.breaking && (
            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
              அவசர செய்தி
            </span>
          )}
          <span className="bg-[#003d7a] text-white px-3 py-1 rounded text-sm">
            {data.category?.data?.attributes?.name}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-[#003d7a] mb-4">{data.title}</h1>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <div className="flex items-center space-x-4">
            <span>ஆசிரியர்: <strong>{data.author?.data?.attributes?.name}</strong></span>
            <span>{new Date(data.publishedDate).toLocaleDateString('ta-IN')}</span>
            <span>வாசிப்பு நேரம்: {data.readTime}</span>
          </div>
          <span>👁️ {data.viewCount || 0} பார்வைகள்</span>
        </div>
        
        {data.featuredImage?.data?.attributes?.url && (
          <div className="relative h-96 mb-6 rounded-lg overflow-hidden">
            <Image
              src={data.featuredImage.data.attributes.url}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {data.excerpt && (
          <p className="text-lg text-gray-700 mb-6 font-medium border-l-4 border-[#e60000] pl-4">
            {data.excerpt}
          </p>
        )}
      </header>
      
      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {/* Handle Strapi blocks content */}
        {Array.isArray(data.content) ? (
          data.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={index} className="mb-4">
                    {block.children?.map((child, childIndex) => (
                      <span key={childIndex}>{child.text}</span>
                    ))}
                  </p>
                );
              case 'heading':
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {block.children?.map((child, childIndex) => (
                      <span key={childIndex}>{child.text}</span>
                    ))}
                  </h2>
                );
              default:
                return null;
            }
          })
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        )}
      </div>
      
      {/* Tags */}
      {data.tags?.data?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-3">குறிச்சொற்கள்</h3>
          <div className="flex flex-wrap gap-2">
            {data.tags.data.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag.attributes.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
```

## 📁 pages/category/[category].js - Category Page

```javascript
import { getCategoryBySlug, getArticlesByCategory, getCategories } from "@/lib/strapi";
import { NewsArticleCard } from "@/components/news-article-card";

export async function getStaticPaths() {
  try {
    const categoriesRes = await getCategories();
    
    const paths = categoriesRes.data?.map((category) => ({
      params: { category: category.attributes.slug }
    })) || [];
    
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const [category, articlesRes] = await Promise.all([
      getCategoryBySlug(params.category),
      getArticlesByCategory(params.category, 20)
    ]);
    
    if (!category) {
      return { notFound: true };
    }
    
    return {
      props: {
        category,
        articles: articlesRes.data || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log('Strapi not available');
    return { notFound: true };
  }
}

export default function CategoryPage({ category, articles }) {
  const categoryData = category.attributes;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
            style={{ backgroundColor: categoryData.color || '#003d7a' }}
          >
            {categoryData.icon || '📰'}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#003d7a]">{categoryData.name}</h1>
            <p className="text-gray-600">{categoryData.description}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          மொத்தம் {articles.length} செய்திகள்
        </div>
      </header>
      
      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsArticleCard
              key={article.id}
              article={{
                id: article.id,
                title: article.attributes.title,
                excerpt: article.attributes.excerpt,
                image: article.attributes.featuredImage?.data?.attributes?.url,
                category: article.attributes.category?.data?.attributes?.name,
                author: article.attributes.author?.data?.attributes?.name,
                date: article.attributes.publishedDate,
                readTime: article.attributes.readTime,
                slug: article.attributes.slug
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">செய்திகள் இல்லை</h3>
          <p className="text-gray-500">இந்த பிரிவில் தற்போது செய்திகள் எதுவும் இல்லை</p>
        </div>
      )}
    </div>
  );
}
```

## 📁 pages/search.js - Search Page

```javascript
import { useState, useEffect } from 'react';
import { searchArticles } from "@/lib/strapi";
import { NewsArticleCard } from "@/components/news-article-card";
import { useRouter } from 'next/router';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (router.query.q) {
      setQuery(router.query.q);
      handleSearch(router.query.q);
    }
  }, [router.query.q]);
  
  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const searchRes = await searchArticles(searchQuery, 20);
      setResults(searchRes.data || []);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#003d7a] mb-8">செய்திகளை தேடுங்கள்</h1>
      
      {/* Search Form */}
      <form onSubmit={onSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="செய்திகளை தேடுங்கள்..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#e60000]"
          />
          <button
            type="submit"
            className="bg-[#e60000] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            தேடு
          </button>
        </div>
      </form>
      
      {/* Search Results */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e60000] mx-auto"></div>
          <p className="mt-4 text-gray-600">தேடுகிறது...</p>
        </div>
      ) : results.length > 0 ? (
        <>
          <p className="mb-6 text-gray-600">
            "{query}" க்கான {results.length} முடிவுகள்
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <NewsArticleCard
                key={article.id}
                article={{
                  id: article.id,
                  title: article.attributes.title,
                  excerpt: article.attributes.excerpt,
                  image: article.attributes.featuredImage?.data?.attributes?.url,
                  category: article.attributes.category?.data?.attributes?.name,
                  author: article.attributes.author?.data?.attributes?.name,
                  date: article.attributes.publishedDate,
                  readTime: article.attributes.readTime,
                  slug: article.attributes.slug
                }}
              />
            ))}
          </div>
        </>
      ) : query && !loading ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">முடிவுகள் இல்லை</h3>
          <p className="text-gray-500">"{query}" க்கான செய்திகள் கிடைக்கவில்லை</p>
        </div>
      ) : null}
    </div>
  );
}
```

## Key Differences from App Router:

1. **`getStaticProps()`** instead of server components
2. **`getStaticPaths()`** for dynamic routes
3. **ISR with `revalidate`** property
4. **Client-side state management** for search
5. **Manual error handling** with try-catch
6. **Fallback strategies** in getStaticProps

This Pages Router approach gives you full control over data fetching and static generation while maintaining compatibility with your existing codebase.