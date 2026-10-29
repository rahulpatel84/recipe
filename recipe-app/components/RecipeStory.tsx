'use client';

import { Recipe } from '@/lib/data';

interface RecipeStoryProps {
    recipe: Recipe;
}

export default function RecipeStory({ recipe }: RecipeStoryProps) {
    if (!recipe.heritage) return null;

    const { origin, facts, tradition } = recipe.heritage;

    return (
        <section className="mt-16 border-t border-line pt-12">
            <span className="hand">before it reached your kitchen</span>
            <h2 className="mb-8 font-serif text-[1.8rem]">Where it comes from</h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Story Content */}
                <div className="lg:col-span-9 space-y-8">
                    {/* Origin Section */}
                    <div>
                        <h3 className="mb-3 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted">
                            Origin
                        </h3>
                        <p className="text-lg text-dark-olive/70 font-sans leading-relaxed">
                            <span className="float-left mr-3 mt-1 font-serif text-5xl font-semibold leading-none text-tomato">
                                {origin.charAt(0)}
                            </span>
                            {origin.slice(1)}
                        </p>
                    </div>

                    {/* Facts Section */}
                    <div className="rounded-[22px] bg-cream p-6">
                        <h3 className="mb-4 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted">
                            Worth knowing
                        </h3>
                        <ul className="space-y-3">
                            {facts.map((fact, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold flex items-center justify-center mt-0.5">
                                        {idx + 1}
                                    </span>
                                    <span className="text-dark-olive/70 font-sans leading-relaxed">
                                        {fact}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tradition Section */}
                    <div className="border-l-4 border-pickle pl-6">
                        <h3 className="mb-3 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted">
                            How it is served
                        </h3>
                        <p className="text-dark-olive/70 font-sans leading-relaxed italic">
                            {tradition}
                        </p>
                    </div>
                </div>

                {/* Sidebar with Quick Facts */}
                <aside className="lg:col-span-3">
                    <div className="rounded-[22px] border border-line bg-cream p-6 lg:sticky lg:top-28">
                        <h3 className="mb-4 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted">
                            At a glance
                        </h3>
                        <dl className="space-y-4 text-sm font-sans">
                            <div>
                                <dt className="text-dark-olive/40 font-bold uppercase tracking-wider text-xs">Origin</dt>
                                <dd className="text-dark-olive font-medium mt-1">{recipe.country}</dd>
                            </div>
                            <div>
                                <dt className="text-dark-olive/40 font-bold uppercase tracking-wider text-xs">Cuisine</dt>
                                <dd className="text-dark-olive font-medium mt-1">{recipe.cuisine}</dd>
                            </div>
                            <div>
                                <dt className="text-dark-olive/40 font-bold uppercase tracking-wider text-xs">Region</dt>
                                <dd className="text-dark-olive font-medium mt-1">{recipe.continent}</dd>
                            </div>
                            <div>
                                <dt className="text-dark-olive/40 font-bold uppercase tracking-wider text-xs">Best For</dt>
                                <dd className="text-dark-olive font-medium mt-1">{recipe.mealType}</dd>
                            </div>
                        </dl>

                        {/* At a glance */}
                        <div className="mt-6 pt-4 border-t border-sand/20">
                            <div className="flex flex-wrap gap-2">
                                {[recipe.cuisine, recipe.category, recipe.mealType, ...recipe.dietary.slice(0, 2)].filter(Boolean).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-sage bg-sage/10 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
