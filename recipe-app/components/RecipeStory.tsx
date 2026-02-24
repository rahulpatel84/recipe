'use client';

import { Recipe } from '@/lib/data';

interface RecipeStoryProps {
    recipe: Recipe;
}

export default function RecipeStory({ recipe }: RecipeStoryProps) {
    if (!recipe.story) return null;

    const paragraphs = recipe.story.split('\n\n').filter(p => p.trim());

    return (
        <section className="mt-20 border-t border-border-soft pt-16">
            <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-xl font-sans font-bold text-dark-olive uppercase tracking-wider">
                        The Heritage
                    </h2>
                    <div className="h-px flex-grow bg-border-soft"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-dark-olive/30">
                        Origin & Tradition
                    </span>
                </div>

                <article className="prose prose-stone max-w-none">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Story Content */}
                        <div className="lg:col-span-8">
                            <div className="space-y-6">
                                {paragraphs.map((paragraph, idx) => (
                                    <p
                                        key={idx}
                                        className="text-lg text-dark-olive/70 font-sans leading-relaxed"
                                    >
                                        {idx === 0 && (
                                            <span className="float-left text-5xl font-serif font-bold text-terracotta mr-3 mt-1 leading-none">
                                                {paragraph.charAt(0)}
                                            </span>
                                        )}
                                        {idx === 0 ? paragraph.slice(1) : paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar with Quick Facts */}
                        <aside className="lg:col-span-4">
                            <div className="rounded-2xl bg-sand/10 border border-sand/20 p-6 lg:sticky lg:top-28">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-terracotta mb-4">
                                    Quick Facts
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

                                {/* Cultural Keywords for SEO */}
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
                </article>
            </div>
        </section>
    );
}
