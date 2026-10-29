import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Pip from '@/components/Pip';
import RecipeCard from '@/components/RecipeCard';
import SearchBar from '@/components/SearchBar';
import { recipes } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Relish Realm | Good food, made easy to love',
  description: 'Reliable, kitchen-tested recipes for everyday cooks. Search by ingredient, cuisine, diet, or meal type.',
  alternates: { canonical: '/' },
};

const quickChips = [
  { label: 'Under 30 min', href: '/all-recipes?q=quick' },
  { label: 'One-pot', href: '/all-recipes?q=one-pot' },
  { label: 'Vegetarian', href: '/vegetarian-recipes' },
  { label: 'Weeknight pasta', href: '/all-recipes?q=pasta' },
  { label: 'Meal prep', href: '/all-recipes?q=bowl' },
];

const tiles = [
  { title: 'Cuisine', detail: 'Italian, Indian, Mexican…', href: '/recipes-by-cuisines', bg: 'bg-blush' },
  { title: 'Dietary', detail: 'Vegan, gluten-free…', href: '/recipes-by-dietary-choices', bg: 'bg-pickle-soft' },
  { title: 'Meal type', detail: 'Breakfast to late snacks', href: '/recipes-by-meal-types', bg: 'bg-mustard-soft' },
  { title: 'Continent', detail: 'Asia, Europe, Americas…', href: '/recipes-by-continents', bg: 'bg-sky' },
  { title: 'For everyone', detail: 'Kids, athletes, families', href: '/recipes-by-audiences', bg: 'bg-cream' },
  { title: 'Country', detail: 'India, Japan, Italy…', href: '/recipes-by-countries', bg: 'bg-blush' },
];

const strip = [
  { dot: 'bg-tomato', text: 'Every recipe tested in a home kitchen' },
  { dot: 'bg-pickle', text: 'Nutrition on every page' },
  { dot: 'bg-mustard', text: 'Clear, precise measurements' },
  { dot: 'bg-ink', text: 'No life story — jump straight to cooking' },
];

const collections = [
  { title: 'Weeknight in 20', copy: 'Recipes for when you’re tired but still want something good.', href: '/all-recipes?q=quick', colors: ['bg-tomato', 'bg-mustard', 'bg-pickle'] },
  { title: 'Plants, mostly', copy: 'Vegetarian & vegan dishes nobody will call “a side”.', href: '/vegan-recipes', colors: ['bg-pickle', 'bg-[#A8C686]', 'bg-mustard'] },
  { title: 'Sunday slow-cooks', copy: 'Low-and-slow recipes that make the whole house smell amazing.', href: '/all-recipes?q=slow', colors: ['bg-mustard', 'bg-tomato', 'bg-ink'] },
];

export default function Home() {
  const featured = recipes.find(recipe => recipe.slug === 'chicken-tikka-masala-recipe') || recipes[0];
  const popular = [...recipes].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const ofTheWeek = recipes.find(recipe => /lentil|soup|dal|curry/i.test(recipe.title)) || recipes[1];

  return (
    <div>
      {/* Hero */}
      <header className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 pb-12 pt-14 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:pt-[72px]">
        <div>
          <span className="eyebrow">Kitchen-tested · Globally inspired</span>
          <h1 className="mb-5 mt-3.5 font-serif text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.02em]">
            Good food,<br />made{' '}
            <span className="relative inline-block">
              <em className="italic text-tomato">easy</em>
              <svg viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-2.5 left-0 h-3.5 w-full" aria-hidden="true">
                <path d="M2 9q25-8 50 0t50 0 50 0 46-2" fill="none" stroke="#F4B740" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>{' '}
            to love.
          </h1>
          <p className="max-w-[520px] text-[1.15rem] text-muted">
            {recipes.length}+ tested recipes from kitchens around the world — written clearly, measured precisely, and ready when you are.
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
            <b className="block font-serif text-[1.05rem]">★ {featured.rating}</b>
            {featured.title}
          </div>
          <div className="sticker absolute bottom-7 right-4 rotate-[3deg]">
            <b className="block font-serif text-[1.05rem]">{featured.totalTime || featured.prepTime}</b>
            Tonight’s pick
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
            <span className="hand">people can’t stop making these</span>
            <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1]">Most-loved this week</h2>
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
          {collections.map(collection => (
            <Link key={collection.title} href={collection.href} className="flex flex-col gap-3.5 rounded-card border border-line p-7 transition hover:border-ink hover:shadow-[4px_4px_0_var(--color-ink)] hover:no-underline">
              <div className="flex">
                {collection.colors.map((color, index) => (
                  <span key={index} className={`-mr-3 h-[46px] w-[46px] rounded-full border-[3px] border-white ${color}`} />
                ))}
              </div>
              <h3 className="font-serif text-[1.4rem]">{collection.title}</h3>
              <p className="text-[0.9rem] text-muted">{collection.copy}</p>
            </Link>
          ))}
        </div>

        {/* Pip's note */}
        <div className="mt-20 flex flex-col items-start gap-7 rounded-[28px] bg-blush p-7 sm:flex-row sm:items-center sm:p-11">
          <Pip className="w-[110px] shrink-0" />
          <div className="flex-1">
            <span className="hand">psst — Pip here</span>
            <h3 className="font-serif text-[1.7rem] leading-[1.2]">Browse the whole collection, three dinner ideas at a time.</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link href="/all-recipes" className="btn btn-ink hover:no-underline">Explore all recipes</Link>
              <Link href="/blog" className="btn hover:no-underline">Read the journal</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
