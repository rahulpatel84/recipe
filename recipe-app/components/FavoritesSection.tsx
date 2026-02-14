'use client';

import { useFavorites } from '@/lib/useFavorites';
import { recipes } from '@/lib/data';
import RecipeCard from './RecipeCard';

export default function FavoritesSection() {
    const { favorites } = useFavorites();

    if (favorites.length === 0) return null;

    const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

    return (
        <section className="mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-2xl font-sans font-bold text-dark-olive uppercase tracking-[0.1em] mb-2">
                        Your Kitchen Favorites
                    </h2>
                    <p className="text-sm text-dark-olive/40 font-medium tracking-tight">
                        The recipes you've saved for later.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {favoriteRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
            <div className="mt-16 h-px w-full bg-border-soft" />
        </section>
    );
}
