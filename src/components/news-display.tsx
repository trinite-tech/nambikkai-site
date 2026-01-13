import { getNews } from '@/lib/api'

interface Post {
  id: string;
  title: string;
  excerpt: string;
}

export default async function NewsDisplay() {
  const posts = await getNews();

  return (
    <div>
      {posts.data?.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}