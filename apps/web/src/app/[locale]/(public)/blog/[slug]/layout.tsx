import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  let post: any = null;
  try {
    const res = await fetch(`${apiUrl}/blog/${slug}`, { cache: 'no-store' });
    post = await res.json();
  } catch {}

  if (!post) return { title: 'Blog Post Not Found' };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || '',
    keywords: post.keywords || '',
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || '',
      type: 'article',
      publishedTime: post.createdAt,
    },
  };
}

export default function BlogArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
