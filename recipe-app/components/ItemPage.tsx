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
        r.country.toLowerCase() === category.title.toLowerCase() ||
        r.appliance?.some(a => a.toLowerCase().includes(category.title.toLowerCase()))
    );

    return (
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
            {/* Header */}
            <div className="relative h-[300px] w-full overflow-hidden mb-10 rounded-[28px] border border-line">
                <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                    <span className="mb-2 block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/70">Explore the collection</span>
                    <h1 className="font-serif text-4xl text-white sm:text-5xl">{category.title} recipes</h1>
                    <p className="mt-3 max-w-md text-base leading-7 text-white/75">
                        Discover reliable {category.title.toLowerCase()} recipes for your next meal.
                    </p>
                </div>
            </div>

            {/* Stats/Filters Row */}
            <div className="mb-8 flex items-center justify-between border-b border-line pb-5">
                <p className="text-sm text-muted"><strong className="text-dark-olive">{filteredRecipes.length}</strong> {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                ) : (
                    <div className="col-span-full rounded-card border border-line bg-cream py-20 text-center">
                        <p className="text-dark-olive/30 text-xs font-sans uppercase tracking-widest">Dataset empty for this category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
