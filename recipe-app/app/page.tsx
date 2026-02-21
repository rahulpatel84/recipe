import { recipes } from '@/lib/data';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import FavoritesSection from '@/components/FavoritesSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Relish Realm | Exquisite World Recipes",
  description: "Discover minimalist cooking and exquisite flavors from around the globe. Kitchen-tested recipes, nutrition focused, and designed for your home.",
  openGraph: {
    title: "Relish Realm | Exquisite World Recipes",
    description: "Discover minimalist cooking and exquisite flavors from around the globe. Kitchen-tested recipes, nutrition focused, and designed for your home.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relish Realm | Exquisite World Recipes",
    description: "Discover minimalist cooking and exquisite flavors from around the globe.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const sections = [
    { title: 'Signature Cuisines', path: '/recipes-by-cuisines', description: 'From rustic Italian to vibrant Indian classics.', recipes: recipes.filter(r => r.cuisine === 'Italian' || r.cuisine === 'Mexican' || r.cuisine === 'Indian' || r.cuisine === 'Japanese' || r.cuisine === 'French').slice(0, 5) },
    { title: 'Global Continents', path: '/recipes-by-continents', description: 'Taste your way across the world.', recipes: recipes.filter(r => r.continent).slice(0, 5) },
    { title: 'Wise Dietary Choices', path: '/recipes-by-dietary-choices', description: 'Deliciously inclusive for every lifestyle.', recipes: recipes.filter(r => r.dietary.length > 0).slice(0, 5) },
    { title: 'Daily Rituals', path: '/recipes-by-meal-types', description: 'Curated meals for every hour of the day.', recipes: recipes.filter(r => r.mealType === 'Breakfast' || r.mealType === 'Lunch' || r.mealType === 'Dinner').slice(0, 5) },
    { title: 'For Everyone', path: '/recipes-by-audiences', description: 'Recipes tailored for those you care about most.', recipes: recipes.filter(r => r.audience.includes('Kids') || r.audience.includes('Pregnancy')).slice(0, 5) },
    { title: 'Regional Gems', path: '/recipes-by-countries', description: 'Authentic flavors from specific locales.', recipes: recipes.filter(r => r.country).slice(0, 5) },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      <section className="relative min-h-[500px] w-full flex items-center justify-center px-4 bg-white py-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Subtle Grid Pattern only */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `radial-gradient(var(--color-dark-olive) 0.5px, transparent 0.5px)`, backgroundSize: '48px 48px' }} />

          {/* Floating Decorative Elements */}
          <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-terracotta/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-sage/5 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="mb-6 inline-flex items-center gap-3 rounded-xl bg-soft-gray px-5 py-2 border border-border-soft">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-olive/40">Curated Recipe Collection</span>
              <div className="h-3 w-px bg-dark-olive/10" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta">Kitchen-Tested Favorites</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-sans font-bold text-dark-olive leading-[1.1] mb-6 tracking-tight">
              Modern Recipes, <br />
              <span className="text-terracotta">Timeless Flavors.</span>
            </h1>

            <p className="text-lg md:text-xl text-dark-olive/50 font-sans max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover a carefully vetted library of recipes designed for your home.
              We've taken the guesswork out of cooking so you can focus on
              what matters most: sharing a great meal.
            </p>

            <div className="relative max-w-xl mx-auto drop-shadow-xl">
              <SearchBar />
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-dark-olive/30">
              <span className="flex items-center gap-2">Kitchen-Tested</span>
              <span className="flex items-center gap-2">•</span>
              <span className="flex items-center gap-2">Nutrition Focused</span>
              <span className="flex items-center gap-2">•</span>
              <span className="flex items-center gap-2">Global Cuisines</span>
            </div>

            <div className="mt-8">
              <Link
                href="/recipe-directory"
                className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta/10 hover:bg-terracotta/20 rounded-full text-sm font-semibold text-terracotta transition-all"
              >
                Browse Complete Recipe Directory
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8">
        <FavoritesSection />
      </div>

      {/* Dynamic Sections */}
      {sections.map((section, idx) => (
        <section key={idx} className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-12 duration-1000 delay-[200ms]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl font-sans font-bold text-dark-olive uppercase tracking-[0.1em] mb-2">
                {section.title}
              </h2>
              <p className="text-sm text-dark-olive/40 font-medium tracking-tight">
                {section.description}
              </p>
            </div>
            <Link href={section.path} className="group flex items-center gap-2 text-xs font-bold text-terracotta uppercase tracking-[0.2em] transition-all hover:gap-3">
              Browse the collection
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {section.recipes.length > 0 ? (
              section.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              // Add some fallbacks if filter results are empty for mock data
              recipes.slice(0, 5).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
