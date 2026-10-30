import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getAllCategories, getPostCountByCategory, formatDate } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Food History and the Science of Cooking',
  description: 'Where our ingredients come from and why we cook them the way we do. Sourced writing on food history, ingredient origins and the research behind plant based eating.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'The Relish Realm Blog',
    description: 'Where our ingredients come from and why we cook them the way we do.',
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const [lead, ...rest] = allPosts;

  return (
    <div className="mx-auto max-w-[1180px] px-4 pb-24 sm:px-6">
      <header className="max-w-[640px] pb-10 pt-14">
        <span className="hand">the reading half of the site</span>
        <h1 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05]">The blog</h1>
        <p className="mt-3 text-[1.1rem] text-muted">
          Where our ingredients came from, who carried them, and what the research actually says.
          Every figure here is sourced at the foot of the piece, and when we cannot source it, we leave it out.
        </p>
      </header>

      {/* Categories */}
      <div className="mb-12 flex flex-wrap gap-2 border-y border-line py-4">
        <span className="chip border-ink bg-ink text-white">All</span>
        {categories.map(category => (
          <Link key={category.id} href={`/blog/category/${category.slug}`} className="chip hover:no-underline">
            {category.title}
            <span className="ml-1.5 text-muted">{getPostCountByCategory(category.slug)}</span>
          </Link>
        ))}
      </div>

      {/* Lead story */}
      {lead && (
        <Link href={`/blog/${lead.slug}`} className="group mb-16 grid gap-8 hover:no-underline lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-cream">
            <Image
              src={lead.image}
              alt={lead.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div>
            <span className="eyebrow">{lead.category.replace(/-/g, ' ')}</span>
            <h2 className="mb-3 mt-2 font-serif text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.1] group-hover:text-tomato">
              {lead.title}
            </h2>
            <p className="mb-4 text-[1.05rem] text-muted">{lead.excerpt}</p>
            <div className="flex items-center gap-3 text-[0.88rem] text-muted">
              <span>{formatDate(lead.publishedAt)}</span>
              <span>·</span>
              <span>{lead.readTime}</span>
              {lead.sources && <><span>·</span><span className="text-pickle">{lead.sources.length} sources</span></>}
            </div>
          </div>
        </Link>
      )}

      {/* Everything else */}
      <div className="mb-7">
        <span className="hand">more from the kitchen table</span>
        <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1]">Keep reading</h2>
      </div>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map(post => <BlogCard key={post.id} post={post} />)}
      </div>

      {/* Back to cooking */}
      <div className="mt-20 flex flex-col items-start gap-4 rounded-[28px] bg-pickle-soft p-8 sm:flex-row sm:items-center sm:justify-between sm:p-11">
        <div>
          <span className="hand">enough reading</span>
          <h3 className="font-serif text-[1.7rem] leading-[1.2]">Go and cook something.</h3>
        </div>
        <Link href="/all-recipes" className="btn btn-ink hover:no-underline">Browse the recipes</Link>
      </div>
    </div>
  );
}
