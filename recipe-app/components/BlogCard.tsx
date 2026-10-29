import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, getCategoryBySlug, formatDate } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const category = getCategoryBySlug(post.category);

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
        <Link href={`/blog/${post.slug}`} className="block no-underline">
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {category && (
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ backgroundColor: category.color }}
                >
                  {category.title}
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2 leading-tight group-hover:underline decoration-1 underline-offset-2">
                {post.title}
              </h2>
              <p className="text-white/80 line-clamp-2 mb-3 hidden sm:block">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span>{formatDate(post.publishedAt)}</span>
                <span>-</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block no-underline">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <Link
            href={`/blog/category/${category.slug}`}
            className="text-xs font-semibold uppercase tracking-wider mb-2 transition-colors hover:opacity-80 no-underline"
            style={{ color: category.color }}
          >
            {category.title}
          </Link>
        )}
        <Link href={`/blog/${post.slug}`} className="no-underline">
          <h3 className="font-serif text-lg font-bold text-deep-brown mb-2 leading-snug group-hover:underline group-hover:text-blue-600 decoration-1 underline-offset-2 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-text text-sm line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-text">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  );
}
