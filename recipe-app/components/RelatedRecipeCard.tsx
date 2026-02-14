import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/lib/data';

interface RelatedRecipeCardProps {
    recipe: Recipe;
}

export default function RelatedRecipeCard({ recipe }: RelatedRecipeCardProps) {
    return (
        <Link
            href={`/${recipe.slug}`}
            className="recipe-hover group flex items-center gap-4 rounded-xl bg-white p-3 border border-border-soft"
        >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta/70 mb-0.5">
                    {recipe.category}
                </span>
                <h4 className="text-base font-sans font-bold text-dark-olive group-hover:text-terracotta transition-colors">
                    {recipe.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-dark-olive/50">{recipe.prepTime}</span>
                    <span className="text-xs font-bold text-sage">★ {recipe.rating}</span>
                </div>
            </div>
        </Link>
    );
}
