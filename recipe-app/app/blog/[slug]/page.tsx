import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  blogPosts,
  getPostBySlug,
  getCategoryBySlug,
  getRelatedPosts,
  formatDate,
  generateBlogPostSchema
} from '@/lib/blog';
import BlogContent from '@/components/BlogContent';
import RecipeCard from '@/components/RecipeCard';
import { recipes } from '@/lib/data';
import BlogSidebar from '@/components/BlogSidebar';
import ShareButtons from '@/components/ShareButtons';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | Relish Realm`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const category = getCategoryBySlug(post.category);
  const relatedPosts = getRelatedPosts(post, 3);
  const cookNext = (post.relatedRecipes || [])
    .map(slug => recipes.find(recipe => recipe.slug === slug))
    .filter((recipe): recipe is NonNullable<typeof recipe> => Boolean(recipe));

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogPostSchema(post)),
        }}
      />

      <article className="min-h-screen bg-warm-cream">
        {/* Hero Section */}
        <header className="relative">
          <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16">
              <div className="max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span>/</span>
                  <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                  {category && (
                    <>
                      <span>/</span>
                      <Link
                        href={`/blog/category/${category.slug}`}
                        className="hover:text-white transition-colors"
                      >
                        {category.title}
                      </Link>
                    </>
                  )}
                </nav>

                {/* Category Badge */}
                {category && (
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white mb-4 transition-opacity hover:opacity-80"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.title}
                  </Link>
                )}

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <Link href="/about" className="flex items-center gap-2 hover:text-white transition-colors">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20">
                      <Image
                        src="/mom.jpeg"
                        alt="Chloe"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">Chloe</span>
                  </Link>
                  <span className="hidden sm:inline">-</span>
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="hidden sm:inline">-</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Excerpt/Lead */}
              <p className="text-xl text-deep-brown/90 font-medium leading-relaxed mb-8 pb-8 border-b border-border-soft">
                {post.excerpt}
              </p>

              {/* Article Content */}
              <BlogContent content={post.content} />

              {/* Hand the reader on to the kitchen */}
              {cookNext.length > 0 && (
                <section className="mt-14 border-t border-line pt-10">
                  <span className="hand">enough reading</span>
                  <h2 className="font-serif text-[1.8rem]">Cook it next</h2>
                  {post.cookNext && <p className="mt-2 mb-7 text-muted">{post.cookNext}</p>}
                  <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                    {cookNext.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} ratio="square" />
                    ))}
                  </div>
                </section>
              )}

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border-soft">
                <h4 className="text-sm font-semibold text-muted-text uppercase tracking-wider mb-4">
                  Tagged In
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="px-4 py-2 bg-soft-gray text-deep-brown text-sm rounded-full hover:bg-terracotta hover:text-white transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-border-soft">
                <h4 className="text-sm font-semibold text-muted-text uppercase tracking-wider mb-4">
                  Share This Article
                </h4>
                <ShareButtons
                  title={post.title}
                  url={`/blog/${post.slug}`}
                  image={post.image}
                />
              </div>

              {/* Author Box */}
              <Link href="/about" className="block mt-12 p-6 sm:p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                    <Image
                      src="/mom.jpeg"
                      alt="Chloe"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-xs text-muted-text uppercase tracking-wider">Written by</span>
                    <h4 className="font-serif text-xl font-bold text-deep-brown mt-1 hover:text-terracotta transition-colors">Chloe</h4>
                    <p className="text-muted-text mt-2">
                      A mother of two and passionate home cook. I manually vet, test, and share every recipe.
                      I believe good food should be simple, reliable, and made to be enjoyed with the people you love.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <BlogSidebar currentPost={post} relatedPosts={relatedPosts} />
              </div>
            </div>
          </div>

          {/* Related Posts - Full Width */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-16 border-t border-border-soft">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-deep-brown mb-8">
                You Might Also Enjoy
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <article key={relatedPost.id} className="group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-deep-brown group-hover:text-terracotta transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-text mt-2">{relatedPost.readTime}</p>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
