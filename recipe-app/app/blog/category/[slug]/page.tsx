import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  blogCategories,
  getCategoryBySlug,
  getPostsByCategory,
  getAllCategories
} from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import BlogSidebar from '@/components/BlogSidebar';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogCategories.map(category => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.title} | Blog`,
    description: category.description,
    openGraph: {
      title: `${category.title} Articles | Relish Realm Blog`,
      description: category.description,
      images: [{ url: category.image }],
    },
    alternates: {
      canonical: `/blog/category/${slug}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);
  const allCategories = getAllCategories();

  return (
    <div className="min-h-screen bg-cream">
      {/* Header Section */}
      <section className="bg-white border-b border-line">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-ink font-medium">{category.title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink mb-3">
            {category.title}
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-cream/50">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            <Link
              href="/blog"
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium bg-white text-ink border border-transparent hover:border-ink transition-colors"
            >
              All
            </Link>
            {allCategories.map(cat => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  cat.slug === slug
                    ? 'bg-ink text-white'
                    : 'bg-white text-ink border border-transparent hover:border-ink'
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink">
                {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
              </h2>
            </div>

            {posts.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <p className="text-muted">No articles in this category yet.</p>
                <Link
                  href="/blog"
                  className="inline-block mt-4 text-tomato hover:underline"
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
