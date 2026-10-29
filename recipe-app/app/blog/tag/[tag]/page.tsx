import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags, getPostsByTag, getAllCategories } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import BlogSidebar from '@/components/BlogSidebar';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `Articles tagged "${formattedTag}" | Blog`,
    description: `Explore all articles tagged with ${formattedTag} on Relish Realm.`,
    alternates: {
      canonical: `/blog/tag/${tag}`,
    },
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const allCategories = getAllCategories();
  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section */}
      <section className="bg-white border-b border-border-soft py-10 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-soft-gray rounded-full px-3 py-1.5 mb-3">
            <svg className="w-4 h-4 text-deep-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-deep-brown text-sm font-medium">#{tag}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-deep-brown mb-2">
            {formattedTag}
          </h1>
          <p className="text-muted-text">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-soft-gray/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            <Link
              href="/blog"
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium bg-white text-deep-brown border border-transparent hover:border-deep-brown transition-colors"
            >
              All
            </Link>
            {allCategories.map(cat => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium bg-white text-deep-brown border border-transparent hover:border-deep-brown transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            {posts.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <p className="text-muted-text">No articles with this tag yet.</p>
                <Link
                  href="/blog"
                  className="inline-block mt-4 text-terracotta hover:underline"
                >
                  Browse all articles
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
