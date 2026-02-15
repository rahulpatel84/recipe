'use client';

import { Recipe } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import RelatedRecipeCard from './RelatedRecipeCard';
import { useFavorites } from '@/lib/useFavorites';
import { useState } from 'react';

interface RecipeDetailProps {
    recipe: Recipe;
    relatedRecipes: Recipe[];
}


export default function RecipeDetail({ recipe, relatedRecipes }: RecipeDetailProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(recipe.id);
    const [isPrinting, setIsPrinting] = useState(false);

    const handlePrint = () => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 100);
    };

    return (
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
                <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                    <div className="relative aspect-square w-full overflow-hidden rounded-3xl recipe-shadow motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in duration-700">
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-8 duration-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/${recipe.category.toLowerCase()}-recipes`}
                                className="rounded-lg border border-border-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-terracotta transition-colors hover:bg-soft-gray active:scale-95"
                            >
                                {recipe.category}
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleFavorite(recipe.id)}
                                className={`flex items-center gap-2 rounded-lg border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${isFav ? 'bg-terracotta text-white border-terracotta' : 'border-border-soft text-dark-olive/60 hover:bg-soft-gray'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {isFav ? 'Saved' : 'Save'}
                            </button>
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 rounded-lg border border-border-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-dark-olive/60 transition-all hover:bg-soft-gray active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                Print
                            </button>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-sans font-bold text-dark-olive leading-tight">{recipe.title}</h1>

                    <p className="text-lg text-dark-olive/50 font-sans leading-relaxed max-w-2xl">
                        {recipe.description}
                    </p>

                    {/* Compact Stats Grid - Clean & Integrated */}
                    <div className="mt-2 pt-2 flex flex-col gap-8 font-sans">
                        {/* Row 1: Key Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Cuisine</span>
                                <span className="text-sm font-bold text-dark-olive">{recipe.cuisine}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Rating</span>
                                <span className="text-sm font-bold text-dark-olive">★ {recipe.rating}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Level</span>
                                <span className="text-sm font-bold text-dark-olive">{recipe.difficulty}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Servings</span>
                                <span className="text-sm font-bold text-dark-olive">{recipe.servings} ppl</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Prep Time</span>
                                <span className="text-sm font-bold text-dark-olive">{recipe.prepTime}</span>
                            </div>
                            {recipe.cookTime && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Cook Time</span>
                                    <span className="text-sm font-bold text-dark-olive">{recipe.cookTime}</span>
                                </div>
                            )}
                            {recipe.totalTime && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Total Time</span>
                                    <span className="text-sm font-bold text-dark-olive">{recipe.totalTime}</span>
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Calories</span>
                                <span className="text-sm font-bold text-dark-olive">{recipe.totalCalories} kcal</span>
                            </div>
                        </div>

                        {/* Row 2: Dietary & Audience */}
                        <div className="grid grid-cols-2 gap-10 pt-6 border-t border-border-soft">
                            <div className="flex flex-col gap-3">
                                <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Dietary</span>
                                <div className="flex flex-wrap gap-2">
                                    {recipe.dietary.length > 0 ? Array.from(new Set(recipe.dietary)).map(d => (
                                        <span key={d} className="px-2 py-0.5 text-sage text-xs font-bold rounded-md bg-soft-gray border border-border-soft uppercase tracking-wider">{d}</span>
                                    )) : <span className="text-sm text-dark-olive/40 font-sans">No specific restrictions</span>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="text-xs uppercase tracking-wider text-dark-olive/30 font-bold">Perfect For</span>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from(new Set(recipe.audience)).map(a => (
                                        <span key={a} className="px-2 py-0.5 text-terracotta text-xs font-bold rounded-md bg-soft-gray border border-border-soft uppercase tracking-wider">{a}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-sand pt-16 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
                    {/* Ingredients Column - STICKY */}
                    <div className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-xl font-sans font-bold text-dark-olive uppercase tracking-wider">Ingredients</h2>
                            <div className="h-px flex-grow bg-border-soft"></div>
                        </div>
                        <ul className="space-y-4 font-sans bg-soft-gray rounded-2xl p-6 border border-border-soft">
                            {Array.from(new Map(recipe.ingredients.map(ing => [`${ing.name}-${ing.amount}`, ing])).values()).map((ing, idx) => (
                                <li key={`${ing.name}-${idx}`} className="flex items-start justify-between group py-2 border-b border-border-soft last:border-0 transition-all">
                                    <div className="flex flex-col">
                                        <p className="text-base font-bold text-dark-olive group-hover:text-terracotta transition-colors">{ing.name}</p>
                                        <span className="text-sm text-dark-olive/30 font-bold uppercase tracking-wider">{ing.amount}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions Column */}
                    <div className="lg:col-span-6">
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-xl font-sans font-bold text-dark-olive uppercase tracking-wider">Instructions</h2>
                            <div className="h-px flex-grow bg-border-soft"></div>
                        </div>
                        <div className="space-y-10 font-sans">
                            {Array.from(new Map(recipe.instructions.map(inst => [inst.step, inst])).values()).map((step) => (
                                <div key={step.step} className="flex gap-6 group relative">
                                    <div className="flex flex-col items-center shrink-0">
                                        <div className="w-8 h-8 rounded-lg bg-soft-gray border border-border-soft flex items-center justify-center text-xs font-bold text-dark-olive/40 group-hover:bg-terracotta group-hover:text-white group-hover:border-terracotta transition-all duration-300 z-10">
                                            {step.step}
                                        </div>
                                    </div>
                                    <div className="pb-8 border-b border-border-soft last:border-0 w-full">
                                        <h4 className="text-xl font-bold text-dark-olive mb-2 group-hover:text-terracotta transition-colors">{step.title}</h4>
                                        <p className="text-dark-olive/60 text-lg leading-relaxed">{step.text}</p>

                                        {step.detailed && (
                                            <div className="mt-4 p-4 rounded-xl bg-sage/5 border border-sage/10 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-sage/20"></div>
                                                <p className="text-lg text-dark-olive/70 leading-relaxed">
                                                    <span className="text-base font-bold uppercase tracking-widest text-sage block mb-2">Note</span>
                                                    {step.detailed}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Extra Section - Conditional */}
                        {recipe.extra && recipe.extra.length > 0 && (
                            <section className="mt-16 border-t border-border-soft pt-12">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h2 className="text-xl font-sans font-bold text-dark-olive uppercase tracking-wider">
                                            Extra <span className="text-terracotta">Notes.</span>
                                        </h2>
                                        <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-dark-olive/30 leading-relaxed">
                                            Practical advice for kitchen success.
                                        </p>
                                    </div>
                                    <ul className="space-y-6">
                                        {recipe.extra.map((item, index) => (
                                            <li key={index} className="flex gap-4 items-start group">
                                                <div className="w-6 h-6 rounded-full bg-sand/20 flex items-center justify-center shrink-0 mt-1 group-hover:bg-terracotta/10 transition-colors">
                                                    <span className="text-[10px] font-bold text-terracotta">{index + 1}</span>
                                                </div>
                                                <p className="text-lg text-dark-olive/70 leading-relaxed font-sans">
                                                    {item}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}

                        {/* The Story Section - Editorial Layout */}
                        {recipe.story && (
                            <section className="mt-16 border-t border-border-soft pt-12">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h2 className="text-xl font-sans font-bold text-dark-olive uppercase tracking-wider">
                                            The <span className="text-terracotta">Story.</span>
                                        </h2>
                                        <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-dark-olive/30 leading-relaxed">
                                            Tradition and craftsmanship.
                                        </p>
                                    </div>
                                    <div className="prose prose-stone prose-sm max-w-none">
                                        {recipe.story.split('\n\n').map((paragraph, pIdx) => (
                                            <p
                                                key={pIdx}
                                                className="text-base text-dark-olive/60 font-sans leading-relaxed mb-6 last:mb-0"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Column - STICKY */}
                    <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-28 lg:self-start">
                        {/* Cooking Tips */}
                        <div className="rounded-2xl border border-sand bg-sand/5 p-6">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-terracotta mb-4">Cooking Secrets</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta/40 mt-1.5 shrink-0"></span>
                                    <p className="text-sm text-dark-olive/70 font-sans leading-relaxed italic">"Always use room temperature ingredients for the best emulsion."</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta/40 mt-1.5 shrink-0"></span>
                                    <p className="text-sm text-dark-olive/70 font-sans leading-relaxed italic">"A sprinkle of fresh herbs at the very end preserves their vibrant color."</p>
                                </li>
                            </ul>
                        </div>

                        {/* Storage Box */}
                        <div className="rounded-2xl bg-sage/10 p-6 border border-sage/20">
                            <div className="flex items-center gap-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-sage">Keep & Enjoy</h3>
                            </div>
                            <p className="text-sm text-dark-olive/60 font-sans leading-relaxed">
                                Store in an airtight container for up to 3 days. Reheat gently in a dry skillet to regain that signature crispness.
                            </p>
                        </div>

                        {/* Compact Nutritional Breakdown - AT BOTTOM */}
                        <div className="rounded-2xl bg-dark-olive p-6 text-white shadow-xl">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 border-b border-white/10 pb-4 mb-6">Nutrition <span className="text-[10px] opacity-60 ml-1">/ per serving</span></h3>

                            <div className="space-y-4">
                                {/* Primary Stats */}
                                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold font-sans text-terracotta">{Math.round(recipe.totalCalories / (recipe.servings || 1))}</span>
                                        <span className="text-xs uppercase font-bold text-white/40 tracking-tighter">Calories</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-2xl font-bold font-sans">{(recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.protein) || 0), 0) / (recipe.servings || 1)).toFixed(1)}g</span>
                                        <span className="text-xs uppercase font-bold text-white/40 tracking-tighter">Protein</span>
                                    </div>
                                </div>

                                {/* Detailed List */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm font-sans">
                                        <span className="text-white/40 uppercase font-bold tracking-wider">Total Fat</span>
                                        <span className="font-bold">{(recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.fat) || 0), 0) / (recipe.servings || 1)).toFixed(1)}g</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans pl-3 border-l border-white/20">
                                        <span className="text-white/40 font-medium">Saturated Fat</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.saturatedFat || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(1)}g` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans">
                                        <span className="text-white/40 uppercase font-bold tracking-wider">Cholesterol</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.cholesterol || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}mg` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans">
                                        <span className="text-white/40 uppercase font-bold tracking-wider">Sodium</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.sodium || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}mg` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans">
                                        <span className="text-white/40 uppercase font-bold tracking-wider">Total Carbs</span>
                                        <span className="font-bold">{(recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.carbs) || 0), 0) / (recipe.servings || 1)).toFixed(1)}g</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans pl-3 border-l border-white/20">
                                        <span className="text-white/40 font-medium">Dietary Fiber</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.fiber || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(1)}g` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans pl-3 border-l border-white/20">
                                        <span className="text-white/40 font-medium">Sugars</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.sugar || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(1)}g` : '-';
                                            })()}
                                        </span>
                                    </div>
                                </div>

                                {/* Micro-nutrients */}
                                <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-x-8 gap-y-4">
                                    <div className="flex justify-between items-center text-xs font-sans">
                                        <span className="text-white/40 font-bold uppercase tracking-wider">Vitamin D</span>
                                        <span className="text-white/60 font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.vitaminD || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}%` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-sans">
                                        <span className="text-white/40 font-bold uppercase tracking-wider">Calcium</span>
                                        <span className="text-white/60 font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.calcium || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}%` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-sans">
                                        <span className="text-white/40 font-bold uppercase tracking-wider">Iron</span>
                                        <span className="text-white/60 font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.iron || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}%` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-sans">
                                        <span className="text-white/40 font-bold uppercase tracking-wider">Potassium</span>
                                        <span className="text-white/60 font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc: number, curr: any) => acc + (parseFloat(curr.potassium || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}%` : '-';
                                            })()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>


            {/* Related Recipes Section */}
            {
                relatedRecipes.length > 0 && (
                    <section className="mt-20 border-t border-border-soft pt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-sans font-bold text-dark-olive uppercase tracking-wider">Related Recipes</h2>
                            <span className="text-xs font-bold uppercase tracking-wider text-dark-olive/30">From the same category</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {relatedRecipes.map(rel => (
                                <RelatedRecipeCard key={rel.id} recipe={rel} />
                            ))}
                        </div>
                    </section>
                )
            }
        </div>
    );
}
