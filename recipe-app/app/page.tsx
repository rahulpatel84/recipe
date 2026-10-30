import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Pip from '@/components/Pip';
import RecipeCard from '@/components/RecipeCard';
import SearchBar from '@/components/SearchBar';
import { collections, plantBasedRecipes, recipesInCollection } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Vegan Recipes, Written Out in Full',
  description: 'Plant based recipes from around the world, with the part most sites leave out: what the dish looks like when it works, what usually goes wrong, and how to fix it.',
  alternates: { canonical: '/' },
};

const quickChips = [
  { label: 'Lentils', href: '/all-recipes?q=lentil' },
  { label: 'Chickpeas', href: '/all-recipes?q=chickpea' },
  { label: 'Tofu', href: '/all-recipes?q=tofu' },
  { label: 'Noodles', href: '/all-recipes?q=noodle' },
  { label: 'Good for lunchboxes', href: '/all-recipes?q=bowl' },
];

const tiles = [
  { title: 'Cuisine', detail: 'Italian, Indian, Mexican…', href: '/recipes-by-cuisines', bg: 'bg-blush' },
  { title: 'Dietary', detail: 'Vegan, gluten free, high protein', href: '/recipes-by-dietary-choices', bg: 'bg-pickle-soft' },
  { title: 'Meal type', detail: 'Breakfast to late snacks', href: '/recipes-by-meal-types', bg: 'bg-mustard-soft' },
  { title: 'Continent', detail: 'Asia, Europe, Americas…', href: '/recipes-by-continents', bg: 'bg-sky' },
  { title: 'For everyone', detail: 'Kids, athletes, families', href: '/recipes-by-audiences', bg: 'bg-cream' },
  { title: 'Country', detail: 'India, Japan, Italy…', href: '/recipes-by-countries', bg: 'bg-blush' },
];

const strip = [
  { dot: 'bg-pickle', text: 'Plant based, all the way through' },
  { dot: 'bg-tomato', text: 'Every flagship recipe says what goes wrong' },
  { dot: 'bg-mustard', text: 'Nutrition worked out per serving' },
  { dot: 'bg-ink', text: 'No life story, no sign up, no pop ups' },
];

export default function Home() {
  const flagships = plantBasedRecipes.filter(recipe => recipe.flagship);
  const featured = flagships.find(recipe => recipe.slug === 'hearty-lentil-bolognese-recipe') || flagships[0];
  const popular = flagships.filter(recipe => recipe.slug !== featured.slug).slice(0, 4);
  const ofTheWeek = flagships.find(recipe => recipe.slug === 'mediterranean-falafel-plate-recipe') || flagships[1];
  const posts = getAllPosts().slice(0, 3);

  // Built from the live recipes, so a collection with nothing in it never renders.
  const liveCollections = collections
    .map(collection => ({ ...collection, matches: recipesInCollection(collection.slug) }))
    .filter(collection => collection.matches.length > 0);

  return (
    <div>
      {/* Hero */}
      <header className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 pb-12 pt-14 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:pt-[72px]">
        <div>
          <span className="eyebrow">Plant based · Cooked, then written</span>
          <h1 className="mb-5 mt-3.5 font-serif text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.02em]">
            Plants, cooked{' '}
            <span className="relative inline-block">
              <em className="italic text-tomato">properly</em>
              <svg viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-2.5 left-0 h-3.5 w-full" aria-hidden="true">
                <path d="M2 9q25-8 50 0t50 0 50 0 46-2" fill="none" stroke="#F4B740" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="max-w-[520px] text-[1.15rem] text-muted">
            {plantBasedRecipes.length} plant based recipes from around the world. Each flagship one tells you what it
            looks like when it works, what usually goes wrong, and what to do about it.
          </p>

          <div className="mt-8 max-w-[560px]">
            <SearchBar />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickChips.map(chip => (
              <Link key={chip.label} href={chip.href} className="chip hover:no-underline">{chip.label}</Link>
            ))}
          </div>
        </div>

        {/* Real photo of the featured recipe, not a placeholder illustration */}
        <div className="relative">
          <Link href={`/${featured.slug}`} className="block hover:no-underline">
            <div className="relative aspect-square overflow-hidden rounded-[32px] bg-mustard-soft">
              <Image src={featured.image} alt={featured.title} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </div>
          </Link>
          <div className="sticker absolute left-5 top-6 -rotate-[4deg]">
            <b className="block font-serif text-[1.05rem]">Cook&rsquo;s notes</b>
            {featured.title}
          </div>
          <div className="sticker absolute bottom-7 right-4 rotate-[3deg]">
            <b className="block font-serif text-[1.05rem]">{featured.totalTime || featured.prepTime}</b>
            Start to finish
          </div>
          <Pip className="absolute -bottom-1.5 left-5 w-24" />
        </div>
      </header>

      {/* Trust strip */}
      <div className="mt-10 border-y border-line">
        <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-6 px-4 py-[22px] sm:px-6">
          {strip.map(item => (
            <div key={item.text} className="flex items-center gap-2.5 text-[0.95rem] font-medium">
              <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Browse the realm */}
      <section className="mx-auto max-w-[1180px] px-4 pt-20 sm:px-6">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <span className="hand">find your way in</span>
            <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1]">Browse the realm</h2>
          </div>
          <Link href="/recipe-directory" className="whitespace-nowrap border-b-[1.5px] border-ink pb-0.5 font-semibold hover:border-tomato hover:text-tomato hover:no-underline">Full directory →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map(tile => (
            <Link key={tile.title} href={tile.href} className={`flex min-h-[150px] flex-col justify-end gap-1 rounded-card border-[1.5px] border-transparent p-5 transition duration-200 hover:-translate-y-1 hover:border-ink hover:no-underline ${tile.bg}`}>
              <h3 className="font-serif text-[1.15rem]">{tile.title}</h3>
              <p className="text-[0.8rem] text-muted">{tile.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Most loved */}
      <section className="mx-auto max-w-[1180px] px-4 pt-20 sm:px-6">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <span className="hand">written out in full</span>
            <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1]">Start with these</h2>
          </div>
          <Link href="/all-recipes" className="hidden whitespace-nowrap border-b-[1.5px] border-ink pb-0.5 font-semibold hover:border-tomato hover:text-tomato hover:no-underline sm:block">See all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {popular.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      </section>

      {/* Recipe of the week */}
      <section className="mx-auto max-w-[1180px] px-4 pt-20 sm:px-6">
        <div className="grid overflow-hidden rounded-[28px] bg-cream lg:grid-cols-2">
          <div className="relative min-h-[320px] bg-pickle-soft lg:min-h-[440px]">
            <Image src={ofTheWeek.image} alt={ofTheWeek.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="p-8 sm:p-14">
            <span className="eyebrow">Recipe of the week</span>
            <h2 className="mb-4 mt-3 font-serif text-[2.1rem] leading-[1.08] sm:text-[2.4rem]">{ofTheWeek.title}</h2>
            <p className="mb-6 text-muted">{ofTheWeek.summary || ofTheWeek.description}</p>
            <ul className="mb-7">
              <li className="dashed-row flex justify-between py-2.5 text-[0.95rem]"><span>Prep</span><b className="font-semibold">{ofTheWeek.prepTime}</b></li>
              {ofTheWeek.cookTime && <li className="dashed-row flex justify-between py-2.5 text-[0.95rem]"><span>Cook</span><b className="font-semibold">{ofTheWeek.cookTime}</b></li>}
              <li className="dashed-row flex justify-between py-2.5 text-[0.95rem]"><span>Serves</span><b className="font-semibold">{ofTheWeek.servings}</b></li>
              <li className="dashed-row flex justify-between py-2.5 text-[0.95rem]"><span>Per serving</span><b className="font-semibold">{Math.round(ofTheWeek.totalCalories / ofTheWeek.servings)} kcal</b></li>
            </ul>
            <Link href={`/${ofTheWeek.slug}`} className="btn btn-ink hover:no-underline">Cook this →</Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-[1180px] px-4 pt-20 sm:px-6">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <span className="hand">hand-picked by our editors</span>
            <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1]">Collections</h2>
          </div>
          <Link href="/recipe-directory" className="hidden whitespace-nowrap border-b-[1.5px] border-ink pb-0.5 font-semibold hover:border-tomato hover:text-tomato hover:no-underline sm:block">All collections →</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {liveCollections.map(collection => (
            <Link
              key={collection.slug}
              href={`/all-recipes?collection=${collection.slug}`}
              className="flex flex-col gap-3.5 rounded-card border border-line p-7 transition hover:border-ink hover:shadow-[4px_4px_0_var(--color-ink)] hover:no-underline"
            >
              <div className="flex">
                {collection.colors.map((color, index) => (
                  <span key={index} className={`-mr-3 h-[46px] w-[46px] rounded-full border-[3px] border-white ${color}`} />
                ))}
              </div>
              <h3 className="font-serif text-[1.4rem]">{collection.title}</h3>
              <p className="text-[0.9rem] text-muted">{collection.copy}</p>
              <span className="text-[0.85rem] font-semibold text-tomato">{collection.matches.length} recipes</span>
            </Link>
          ))}
        </div>

        {/* From the blog */}
        <div className="mt-20 border-t border-line pt-10">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <span className="hand">why we eat what we eat</span>
              <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1]">From the blog</h2>
            </div>
            <Link href="/blog" className="hidden whitespace-nowrap border-b-[1.5px] border-ink pb-0.5 font-semibold hover:border-tomato hover:text-tomato hover:no-underline sm:block">All writing →</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-2 hover:no-underline">
                <div className="relative mb-1 aspect-[16/10] overflow-hidden rounded-card bg-cream">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <span className="eyebrow">{post.category.replace(/-/g, ' ')}</span>
                <h3 className="font-serif text-[1.2rem] leading-snug group-hover:text-tomato">{post.title}</h3>
                <p className="text-[0.9rem] text-muted">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Pip's note */}
        <div className="mt-20 flex flex-col items-start gap-7 rounded-[28px] bg-blush p-7 sm:flex-row sm:items-center sm:p-11">
          <Pip className="w-[110px] shrink-0" />
          <div className="flex-1">
            <span className="hand">psst, Pip here</span>
            <h3 className="font-serif text-[1.7rem] leading-[1.2]">We would rather have thirty recipes worth cooking than three hundred that are not.</h3>
            <p className="mt-2 text-muted">
              Everything published here has a full ingredient list, a real method, and notes from actually making it.
              When a recipe is not ready, it stays off the site.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link href="/all-recipes" className="btn btn-ink hover:no-underline">Browse every recipe</Link>
              <Link href="/blog" className="btn hover:no-underline">Read the blog</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
