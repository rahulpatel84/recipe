import { recipes } from '@/lib/data';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "All Recipes Index",
    description: "A complete list of all kitchen-tested recipes at Relish Realm. Discover every dish, from Italian classics to vegan delights.",
    alternates: {
        canonical: "/all-recipes",
    },
};

export default function AllRecipesPage() {
    // Group recipes by cuisine for better organization
    const recipesByCuisine = recipes.reduce((acc, recipe) => {
        const cuisine = recipe.cuisine || 'Other';
        if (!acc[cuisine]) {
            acc[cuisine] = [];
        }
        acc[cuisine].push(recipe);
        return acc;
    }, {} as Record<string, typeof recipes>);

    const cuisines = Object.keys(recipesByCuisine).sort();

    return (
        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
            <header className="mb-16 border-b border-border-soft pb-8">
                <h1 className="text-4xl font-sans font-bold text-dark-olive leading-tight tracking-tight">
                    All Recipes.
                </h1>
                <p className="mt-4 text-sm text-dark-olive/40 font-sans leading-relaxed max-w-xl">
                    A comprehensive index of every recipe in our collection, designed for easy discovery and search engine optimization.
                </p>
            </header>

            <div className="space-y-12">
                {cuisines.map((cuisine) => (
                    <section key={cuisine}>
                        <h2 className="text-lg font-sans font-bold text-terracotta uppercase tracking-[0.2em] mb-6 border-l-4 border-terracotta pl-4">
                            {cuisine}
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {recipesByCuisine[cuisine].map((recipe) => (
                                <li key={recipe.id} className="group">
                                    <Link
                                        href={`/${recipe.slug}`}
                                        className="flex items-center justify-between py-2 border-b border-border-soft/30 hover:border-terracotta transition-all"
                                    >
                                        <span className="text-[16px] font-medium text-dark-olive/70 group-hover:text-dark-olive transition-colors">
                                            {recipe.title}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-terracotta opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            <footer className="mt-24 pt-12 border-t border-border-soft text-center">
                <Link
                    href="/recipes"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark-olive/40 hover:text-terracotta transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    Back to Library
                </Link>
            </footer>
        </main>
    );
}
