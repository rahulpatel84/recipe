import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getFeaturedPosts, getAllCategories, getPostCountByCategory, formatDate } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Food Stories & History | Blog',
  description: 'Explore fascinating stories about food history, ingredient origins, culinary traditions, and the latest food science research.',
  openGraph: {
    title: 'Food Stories & History | Relish Realm Blog',
    description: 'Explore fascinating stories about food history, ingredient origins, culinary traditions, and the latest food science research.',
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const categories = getAllCategories();

  // Separate research/statistics posts (food-science category or research/statistics tags)
  const researchPosts = allPosts.filter(p =>
    p.category === 'food-science' && (p.tags.includes('statistics') || p.tags.includes('research'))
  );

  // Featured posts excluding research posts
  const featuredNonResearch = featuredPosts.filter(p =>
    !researchPosts.some(r => r.id === p.id)
  );

  // Latest posts excluding featured and research
  const latestPosts = allPosts.filter(p =>
    !p.featured && !researchPosts.some(r => r.id === p.id)
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section */}
      <section className="bg-white border-b border-border-soft py-10 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-deep-brown mb-2">
            Blog
          </h1>
          <p className="text-muted-text">
            Stories about food history, ingredients, and culinary traditions.
          </p>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-soft-gray/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            <Link
              href="/blog"
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium bg-deep-brown text-white"
            >
              All
            </Link>
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium bg-white text-deep-brown border border-transparent hover:border-deep-brown transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Research & Data Section */}
        {researchPosts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h2 className="text-xl font-semibold text-deep-brown">Research & Data</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {researchPosts.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block p-4 bg-white border border-border-soft rounded-xl hover:border-blue-300 hover:shadow-md transition-all no-underline"
                >
                  <span className="text-xs text-muted-text">{formatDate(post.publishedAt)}</span>
                  <h3 className="mt-1 font-semibold text-deep-brown group-hover:text-blue-600 group-hover:underline decoration-1 underline-offset-2 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center text-xs text-muted-text">
                    <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    {post.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Posts */}
        {featuredNonResearch.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-deep-brown">
                Featured Stories
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredNonResearch.slice(0, 2).map(post => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-deep-brown mb-8">
              Latest Articles
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {latestPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {allPosts.length > 8 && (
              <div className="mt-10 text-center">
                <button className="px-8 py-3 bg-deep-brown text-white rounded-full font-medium hover:bg-terracotta transition-colors">
                  Load More Articles
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* About */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h3 className="font-serif text-lg font-bold text-deep-brown mb-4">About Our Blog</h3>
              <p className="text-sm text-muted-text leading-relaxed">
                Explore the fascinating stories behind the food we eat. From ancient origins to modern science,
                we bring you thoughtful content about culinary history and culture.
              </p>
            </div>

            {/* Categories */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h3 className="font-serif text-lg font-bold text-deep-brown mb-4">Explore Topics</h3>
              <div className="space-y-3">
                {categories.map(category => (
                  <Link
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className="flex items-center gap-3 group p-3 rounded-lg hover:bg-soft-gray transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.title.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-deep-brown group-hover:text-terracotta transition-colors">
                        {category.title}
                      </span>
                      <span className="block text-xs text-muted-text">
                        {getPostCountByCategory(category.slug)} articles
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-xl bg-gradient-to-br from-terracotta to-deep-brown p-6 text-white">
              <h3 className="font-serif text-lg font-bold mb-2">Stay Curious</h3>
              <p className="text-sm text-white/80 mb-4">
                Get weekly stories about food history, science, and culture.
              </p>
              <Link
                href="/contact"
                className="inline-block w-full text-center bg-white text-terracotta font-semibold py-2.5 rounded-lg hover:bg-soft-gray transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
