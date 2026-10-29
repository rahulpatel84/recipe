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
            className="recipe-hover group flex items-center gap-4 rounded-card border border-line bg-white p-3 hover:no-underline"
        >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[14px]">
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="eyebrow mb-0.5">
                    {recipe.category}
                </span>
                <h4 className="font-serif text-[1.12rem] text-ink transition-colors group-hover:text-tomato">
                    {recipe.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted">{recipe.prepTime}</span>
                    <span className="text-xs font-semibold text-ink">★ {recipe.rating}</span>
                </div>
            </div>
        </Link>
    );
}
