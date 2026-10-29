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

      <article className="min-h-screen bg-cream">
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
                <h1 className="mb-4 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-[3.2rem]">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <Link href="/about" className="flex items-center gap-2 transition-colors hover:text-white">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-white/20">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{post.author.name}</span>
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
              <p className="mb-8 border-b border-line pb-8 text-[1.25rem] leading-relaxed text-ink/80">
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

              {/* Where the figures come from */}
              {post.sources && post.sources.length > 0 && (
                <section className="mt-14 rounded-[22px] bg-cream p-7">
                  <span className="hand">check our work</span>
                  <h2 className="mb-4 font-serif text-[1.5rem]">Sources</h2>
                  <ol className="list-decimal pl-5">
                    {post.sources.map(source => (
                      <li key={source.url} className="dashed-row py-2.5 text-[0.95rem] last:border-0">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink underline decoration-line underline-offset-4 hover:decoration-tomato"
                        >
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-line">
                <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                  Tagged In
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="px-4 py-2 bg-cream text-ink text-sm rounded-full hover:bg-tomato hover:text-white transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-line">
                <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                  Share This Article
                </h4>
                <ShareButtons
                  title={post.title}
                  url={`/blog/${post.slug}`}
                  image={post.image}
                />
              </div>

              {/* Author Box */}
              <Link href="/about" className="group mt-12 block rounded-[22px] border border-line p-7 transition hover:border-ink hover:shadow-[4px_4px_0_var(--color-ink)] hover:no-underline">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="mx-auto h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-cream sm:mx-0">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="eyebrow">Written by</span>
                    <h4 className="mt-1 font-serif text-[1.3rem] text-ink group-hover:text-tomato">{post.author.name}</h4>
                    <p className="mt-2 text-muted">
                      We write about where food comes from and cook the recipes we publish. Figures are sourced at
                      the foot of every piece, and anything we cannot stand behind does not go up.
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
            <section className="mt-16 pt-16 border-t border-line">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink mb-8">
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
                      <h3 className="font-serif text-lg font-bold text-ink group-hover:text-tomato transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted mt-2">{relatedPost.readTime}</p>
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
