'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/lib/data';
import { useFavorites } from '@/lib/useFavorites';

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(recipe.id);

    return (
        <div className="group relative block overflow-hidden rounded-3xl bg-white border border-sand/30 recipe-shadow recipe-hover">
            <Link
                href={`/${recipe.slug}`}
                className="block"
            >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-10">
                        <span className="glass rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-terracotta">
                            {recipe.category}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-olive/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </Link>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(recipe.id);
                }}
                className={`absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full glass transition-all duration-300 hover:scale-110 active:scale-90 ${isFav ? 'text-terracotta' : 'text-dark-olive/30 hover:text-terracotta'}`}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            <div className="p-6">
                <Link href={`/${recipe.slug}`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-sans font-bold text-dark-olive group-hover:text-terracotta transition-colors">
                                {recipe.title}
                            </h3>
                        </div>
                        <p className="text-sm text-dark-olive/50 leading-relaxed line-clamp-2">
                            {recipe.summary}
                        </p>
                    </div>
                </Link>
                <div className="mt-6 flex items-center justify-between border-t border-sand/40 pt-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-terracotta">★</span>
                            <span className="text-xs font-bold text-dark-olive">{recipe.rating}</span>
                        </div>
                        <span className="text-dark-olive/20">•</span>
                        <span className="text-xs uppercase tracking-wider font-bold text-dark-olive/40">{recipe.prepTime}</span>
                    </div>
                    <Link href={`/${recipe.slug}`} className="text-xs font-bold uppercase tracking-wider text-terracotta opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">View →</Link>
                </div>
            </div>
        </div>
    );
}
