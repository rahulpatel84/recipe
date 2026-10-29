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
        <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-6">
            <div className="mb-14 max-w-2xl">
                <span className="hand">browse the realm</span>
                <h1 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05]">Recipes by {meta.label.toLowerCase()}</h1>
                <p className="mt-3 text-muted">Find a recipe that fits the way you want to cook today.</p>
            </div>

            <div className="space-y-16">
                {groupItems.map((item) => {
                    const itemRecipes = recipes.filter(r =>
                        r.category.toLowerCase() === item.title.toLowerCase() ||
                        r.cuisine.toLowerCase() === item.title.toLowerCase() ||
                        r.continent.toLowerCase() === item.title.toLowerCase() ||
                        r.dietary.some(d => d.toLowerCase().includes(item.title.toLowerCase())) ||
                        r.mealType.toLowerCase() === item.title.toLowerCase() ||
                        r.audience.some(a => a.toLowerCase().includes(item.title.toLowerCase())) ||
                        r.country.toLowerCase() === item.title.toLowerCase() ||
                        r.appliance?.some(a => a.toLowerCase().includes(item.title.toLowerCase()))
                    ).slice(0, 5);

                    return (
                        <section key={item.id} className="border-b border-border-soft pb-14 last:border-0">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="font-serif text-[1.8rem]">{item.title}</h2>
                                    <p className="mt-1 text-sm text-muted">{itemRecipes.length} {itemRecipes.length === 1 ? 'recipe' : 'recipes'}</p>
                                </div>
                                <Link
                                    href={`/${item.slug}-recipes`}
                                    className="btn hover:no-underline"
                                >
                                    View all →
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                {itemRecipes.length > 0 ? (
                                    itemRecipes.map(recipe => (
                                        <RecipeCard key={recipe.id} recipe={recipe} />
                                    ))
                                ) : (
                                    <div className="col-span-full rounded-card border border-line bg-cream py-10 text-center">
                                        <p className="text-sm text-muted">No {item.title.toLowerCase()} recipes yet.</p>
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
