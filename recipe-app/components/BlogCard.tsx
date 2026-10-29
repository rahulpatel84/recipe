import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, formatDate } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  /** Larger treatment for the top of a listing. */
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block hover:no-underline">
        <div className={`relative overflow-hidden rounded-card bg-cream ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 100vw, 33vw'}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <span className="eyebrow mt-3.5 block">{post.category.replace(/-/g, ' ')}</span>
        <h3 className={`mb-1.5 mt-1 font-serif leading-snug text-ink transition group-hover:text-tomato ${featured ? 'text-[1.7rem]' : 'text-[1.2rem]'}`}>
          {post.title}
        </h3>
        <p className="mb-2 line-clamp-2 text-[0.93rem] text-muted">{post.excerpt}</p>
      </Link>

      <div className="flex flex-wrap items-center gap-x-2.5 text-[0.83rem] text-muted">
        <span>{formatDate(post.publishedAt)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readTime}</span>
        {post.sources && post.sources.length > 0 && (
          <>
            <span aria-hidden="true">·</span>
            <span className="text-pickle">{post.sources.length} sources</span>
          </>
        )}
      </div>
    </article>
  );
}
