import { recipes } from '@/lib/data';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';
import FavoritesSection from '@/components/FavoritesSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Recipe Library",
  description: "Browse our comprehensive collection of kitchen-tested recipes. From Italian classics to Japanese zen, vegan delights to gourmet dinners - find your next favorite dish.",
  openGraph: {
    title: "Recipe Library | Relish Realm",
    description: "Browse our comprehensive collection of kitchen-tested recipes. From Italian classics to Japanese zen, vegan delights to gourmet dinners.",
    url: "/recipes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipe Library | Relish Realm",
    description: "Browse our comprehensive collection of kitchen-tested recipes. From Italian classics to Japanese zen, vegan delights to gourmet dinners.",
  },
  alternates: {
    canonical: "/recipes",
  },
};

export default function RecipesPage() {
    // Define the sections we want to showcase
    const sections = [
        {
            title: 'Italian Classics',
            id: 'italian',
            path: '/italian-recipes',
            items: recipes.filter(r => r.cuisine === 'Italian').slice(0, 10)
        },
        {
            title: 'Japanese Zen',
            id: 'japanese',
            path: '/japanese-recipes',
            items: recipes.filter(r => r.cuisine === 'Japanese').slice(0, 10)
        },
        {
            title: 'Vegan Delights',
            id: 'vegan',
            path: '/vegan-recipes',
            items: recipes.filter(r => r.dietary.includes('Vegan')).slice(0, 10)
        },
        {
            title: 'Gourmet Dinners',
            id: 'dinners',
            path: '/dinner-recipes',
            items: recipes.filter(r => r.mealType === 'Dinner').slice(0, 10)
        }
    ];

    return (
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
            <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-soft pb-12">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-sans font-bold text-dark-olive leading-tight tracking-tight">
                        Recipe Library.
                    </h1>
                </div>
                <div className="flex flex-col gap-2 text-left md:text-right">
                    <span className="text-xs font-bold uppercase tracking-wider text-dark-olive/40 font-sans">Structured Database</span>
                    <p className="max-w-xs text-sm text-dark-olive/40 font-sans leading-relaxed">
                        Explore our comprehensive collection of recipes, categorized by cuisine, diet, and meal type.
                    </p>
                </div>
            </header>

            <FavoritesSection />

            <div className="flex flex-col gap-40">
                {sections.map((section, sidx) => (
                    <section key={section.id} className="relative">
                        <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-sans font-bold text-dark-olive/10">0{sidx + 1}</span>
                                <div>
                                    <h2 className="text-xl font-sans font-bold text-dark-olive uppercase tracking-wider">{section.title}</h2>
                                    <div className="h-0.5 w-8 bg-terracotta mt-2" />
                                </div>
                            </div>
                            <Link
                                href={section.path}
                                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-terracotta hover:text-dark-olive transition-colors underline-offset-4 hover:underline"
                            >
                                Explore all {section.title}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Creative Asymmetric Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                            {/* Large Featured Card (First item) */}
                            {section.items.length > 0 && (
                                <div className="md:col-span-12 lg:col-span-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-soft-gray p-6 rounded-2xl border border-border-soft group transition-all">
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                                            <img
                                                src={section.items[0].image}
                                                alt={section.items[0].title}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold uppercase tracking-wider text-terracotta">{section.items[0].category}</span>
                                                <h3 className="text-3xl font-sans font-bold text-dark-olive">{section.items[0].title}</h3>
                                            </div>
                                            <p className="text-sm text-dark-olive/40 font-sans leading-relaxed">{section.items[0].summary}</p>
                                            <div className="flex items-center gap-4 border-t border-border-soft pt-4 text-xs font-bold uppercase text-dark-olive/30 tracking-wider">
                                                <span>{section.items[0].prepTime}</span>
                                                <span className="h-1 w-1 bg-dark-olive/10 rounded-full" />
                                                <span>★ {section.items[0].rating}</span>
                                                <span className="h-1 w-1 bg-dark-olive/10 rounded-full" />
                                                <span>{section.items[0].difficulty}</span>
                                            </div>
                                            <Link
                                                href={`/${section.items[0].slug}`}
                                                className="mt-2 inline-flex items-center justify-center rounded-lg bg-dark-olive px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-terracotta transition-colors active:scale-95"
                                            >
                                                Open Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="md:col-span-12 lg:col-span-4 grid grid-cols-1 gap-6">
                                {section.items.slice(1, 3).map(recipe => (
                                    <Link key={recipe.id} href={`/${recipe.slug}`} className="group flex items-center gap-4 bg-white p-4 rounded-xl border border-border-soft hover:bg-soft-gray transition-all active:scale-[0.98]">
                                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                                            <img src={recipe.image} alt={recipe.title} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <span className="text-xs font-bold uppercase tracking-tight text-terracotta truncate">{recipe.category}</span>
                                            <h4 className="text-base font-sans font-bold text-dark-olive truncate underline-offset-4 group-hover:underline">{recipe.title}</h4>
                                            <span className="text-xs font-bold text-dark-olive/30 uppercase tracking-widest">★ {recipe.rating} • {recipe.prepTime}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Horizontal Scrolling Grid for the rest */}
                            <div className="md:col-span-12 grid grid-cols-2 lg:grid-cols-5 gap-6 mt-4">
                                {section.items.slice(3, 8).map(recipe => (
                                    <RecipeCard key={recipe.id} recipe={recipe} />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Bottom Accent */}
            <footer className="mt-32 text-center pb-20">
                <div className="inline-block px-8 py-4 bg-soft-gray rounded-lg border border-border-soft">
                    <p className="text-[10px] font-sans font-bold text-dark-olive/30 uppercase tracking-widest">
                        System status: optimal • new recipes weekly
                    </p>
                </div>
            </footer>
        </main>
    );
}
