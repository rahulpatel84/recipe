'use client';

import Image from 'next/image';
import Link from 'next/link';
import { hasRating, Recipe } from '@/lib/data';
import { useFavorites } from '@/lib/useFavorites';

interface RecipeCardProps {
    recipe: Recipe;
    /** 4/5 on editorial rows, 1/1 in the browse grid. */
    ratio?: 'portrait' | 'square';
}

export default function RecipeCard({ recipe, ratio = 'portrait' }: RecipeCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(recipe.id);

    return (
        <article className="group">
            <div className={`relative overflow-hidden rounded-card bg-cream transition duration-300 group-hover:-translate-y-1 ${ratio === 'square' ? 'aspect-square' : 'aspect-[4/5]'}`}>
                <Link href={`/${recipe.slug}`} aria-label={`Open ${recipe.title}`} className="block h-full">
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                </Link>
                <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-ink">
                    {recipe.cuisine || recipe.category}
                </span>
                <button
                    type="button"
                    onClick={() => toggleFavorite(recipe.id)}
                    className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:scale-105 ${isFav ? 'text-tomato' : 'text-ink/40 hover:text-tomato'}`}
                    aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                >
                    <svg className="h-[18px] w-[18px]" fill={isFav ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            <Link href={`/${recipe.slug}`} className="hover:no-underline">
                <h3 className="mb-1 mt-3.5 font-serif text-[1.2rem] leading-[1.25] text-ink transition group-hover:text-tomato">{recipe.title}</h3>
            </Link>
            <div className="flex flex-wrap gap-x-3 text-[0.83rem] text-muted">
                {hasRating(recipe) && <span><b className="font-semibold text-ink">★ {recipe.rating}</b> ({recipe.ratingCount})</span>}
                <span>{recipe.totalTime || recipe.prepTime}</span>
                <span>{recipe.difficulty}</span>
                {recipe.notes && <span className="text-pickle">Cook&rsquo;s notes</span>}
            </div>
        </article>
    );
}
