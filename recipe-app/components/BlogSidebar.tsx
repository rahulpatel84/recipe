import Link from 'next/link';
import Image from 'next/image';
import {
  BlogPost,
  BlogCategory,
  getAllCategories,
  getPostCountByCategory,
  getAllTags,
  getFeaturedPosts,
  formatDate
} from '@/lib/blog';

interface BlogSidebarProps {
  currentPost?: BlogPost;
  relatedPosts?: BlogPost[];
}

export default function BlogSidebar({ currentPost, relatedPosts = [] }: BlogSidebarProps) {
  const categories = getAllCategories();
  const tags = getAllTags();
  const featuredPosts = getFeaturedPosts().filter(p => p.id !== currentPost?.id).slice(0, 3);

  return (
    <aside className="space-y-8">
      {/* About Section */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h3 className="font-serif text-lg font-bold text-deep-brown mb-4">About Our Blog</h3>
        <p className="text-sm text-muted-text leading-relaxed">
          Explore the fascinating stories behind the food we eat. From the ancient origins of ingredients
          to the latest nutrition research, we bring you thoughtful content about culinary history, science, and culture.
        </p>
      </div>

      {/* Categories */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h3 className="font-serif text-lg font-bold text-deep-brown mb-4">Categories</h3>
        <ul className="space-y-3">
          {categories.map(category => (
            <li key={category.id}>
              <Link
                href={`/blog/category/${category.slug}`}
                className="flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-deep-brown group-hover:text-terracotta transition-colors">
                    {category.title}
                  </span>
                </span>
                <span className="text-xs text-muted-text bg-soft-gray px-2 py-0.5 rounded-full">
                  {getPostCountByCategory(category.slug)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Related or Featured Posts */}
      {(relatedPosts.length > 0 || featuredPosts.length > 0) && (
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h3 className="font-serif text-lg font-bold text-deep-brown mb-4">
            {relatedPosts.length > 0 ? 'Related Articles' : 'Popular Articles'}
          </h3>
          <div className="space-y-4">
            {(relatedPosts.length > 0 ? relatedPosts : featuredPosts).map(post => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex gap-3 group"
              >
                <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-deep-brown group-hover:text-terracotta transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <span className="text-xs text-muted-text">{formatDate(post.publishedAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h3 className="font-serif text-lg font-bold text-deep-brown mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map(tag => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className="text-xs px-3 py-1.5 bg-soft-gray text-deep-brown rounded-full hover:bg-terracotta hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="rounded-xl bg-gradient-to-br from-terracotta to-deep-brown p-6 text-white">
        <h3 className="font-serif text-lg font-bold mb-2">Stay Curious</h3>
        <p className="text-sm text-white/80 mb-4">
          Get weekly stories about food history, science, and culture delivered to your inbox.
        </p>
        <Link
          href="/contact"
          className="inline-block w-full text-center bg-white text-terracotta font-semibold py-2.5 rounded-lg hover:bg-soft-gray transition-colors"
        >
          Subscribe
        </Link>
      </div>
    </aside>
  );
}
