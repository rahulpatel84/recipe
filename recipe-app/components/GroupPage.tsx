import { categories, recipes, GroupType, groupTypeMetadata } from '@/lib/data';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';

interface GroupPageProps {
    type: GroupType;
}

export default function GroupPage({ type }: GroupPageProps) {
    const meta = groupTypeMetadata[type];
    const groupItems = categories.filter(c => c.type === type);

    return (
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-sans font-bold text-dark-olive uppercase tracking-tight">{meta.label}</h1>
                <p className="mt-4 text-[10px] font-sans font-bold text-dark-olive/30 uppercase tracking-widest">Database entry grouping by {meta.plural}</p>
            </div>

            <div className="space-y-20">
                {groupItems.map((item) => {
                    const itemRecipes = recipes.filter(r =>
                        r.category.toLowerCase() === item.title.toLowerCase() ||
                        r.cuisine.toLowerCase() === item.title.toLowerCase() ||
                        r.continent.toLowerCase() === item.title.toLowerCase() ||
                        r.dietary.some(d => d.toLowerCase().includes(item.title.toLowerCase())) ||
                        r.mealType.toLowerCase() === item.title.toLowerCase() ||
                        r.audience.some(a => a.toLowerCase().includes(item.title.toLowerCase())) ||
                        r.country.toLowerCase() === item.title.toLowerCase()
                    ).slice(0, 5);

                    return (
                        <section key={item.id} className="border-b border-border-soft pb-16 last:border-0">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-sans font-bold text-dark-olive uppercase tracking-wider">{item.title}</h2>
                                    <p className="text-[10px] font-sans font-bold text-dark-olive/30 uppercase tracking-tight mt-1">Status: active • {itemRecipes.length} entries</p>
                                </div>
                                <Link
                                    href={`/${item.slug}-recipes`}
                                    className="text-[10px] font-bold text-terracotta uppercase tracking-wider hover:underline bg-soft-gray px-4 py-2 rounded-lg border border-border-soft"
                                >
                                    Browse catalog →
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                {itemRecipes.length > 0 ? (
                                    itemRecipes.map(recipe => (
                                        <RecipeCard key={recipe.id} recipe={recipe} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-10 bg-soft-gray rounded-xl text-center border border-border-soft">
                                        <p className="text-dark-olive/30 text-[10px] uppercase font-bold tracking-widest">Queue: pending for {item.title}</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
