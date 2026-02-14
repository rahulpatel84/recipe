import { Category, recipes } from '@/lib/data';
import RecipeCard from '@/components/RecipeCard';
import Image from 'next/image';

interface ItemPageProps {
    category: Category;
}

export default function ItemPage({ category }: ItemPageProps) {
    const filteredRecipes = recipes.filter(r =>
        r.category.toLowerCase() === category.title.toLowerCase() ||
        r.cuisine.toLowerCase() === category.title.toLowerCase() ||
        r.continent.toLowerCase() === category.title.toLowerCase() ||
        r.dietary.some(d => d.toLowerCase().includes(category.title.toLowerCase())) ||
        r.mealType.toLowerCase() === category.title.toLowerCase() ||
        r.audience.some(a => a.toLowerCase().includes(category.title.toLowerCase())) ||
        r.country.toLowerCase() === category.title.toLowerCase()
    );

    return (
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="relative h-48 w-full overflow-hidden rounded-xl mb-12 border border-border-soft">
                <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-dark-olive/80 via-dark-olive/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-10">
                    <span className="text-white/60 font-bold uppercase tracking-wider text-[10px] mb-2 block">Taxonomy: {category.type}</span>
                    <h1 className="text-4xl font-sans font-bold text-white uppercase tracking-tight">{category.title} Recipes</h1>
                    <p className="mt-2 text-white/80 max-w-md text-xs font-sans leading-relaxed">
                        Filtered dataset for {category.title} culinary specifications and dietary standards.
                    </p>
                </div>
            </div>

            {/* Stats/Filters Row */}
            <div className="flex flex-wrap gap-12 mb-12 items-center justify-center py-6 border-y border-border-soft">
                <div className="text-center">
                    <span className="block text-xl font-sans font-bold text-terracotta">{filteredRecipes.length}</span>
                    <span className="text-[10px] uppercase tracking-wider text-dark-olive/30 font-bold">Entries</span>
                </div>
                <div className="h-6 w-px bg-border-soft hidden sm:block" />
                <div className="text-center">
                    <span className="block text-xl font-sans font-bold text-terracotta">4.8</span>
                    <span className="text-[10px] uppercase tracking-wider text-dark-olive/30 font-bold">Avg. Score</span>
                </div>
                <div className="h-6 w-px bg-border-soft hidden sm:block" />
                <div className="text-center">
                    <span className="block text-xl font-sans font-bold text-terracotta">15m</span>
                    <span className="text-[10px] uppercase tracking-wider text-dark-olive/30 font-bold">Avg. Complexity</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-soft-gray rounded-xl text-center border border-border-soft">
                        <p className="text-dark-olive/30 text-xs font-sans uppercase tracking-widest">Dataset empty for this category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
