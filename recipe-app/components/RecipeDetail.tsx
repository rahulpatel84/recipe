'use client';

import { hasRating, KitchenNotes, Recipe } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import RelatedRecipeCard from './RelatedRecipeCard';
import RecipeStory from './RecipeStory';
import Pip from '@/components/Pip';
import { getPostBySlug } from '@/lib/blog';
import { useFavorites } from '@/lib/useFavorites';
import { useEffect, useState } from 'react';

interface RecipeDetailProps {
    recipe: Recipe;
    relatedRecipes: Recipe[];
}

const fractionValues: Record<string, number> = {
    '¼': 0.25, '½': 0.5, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3,
    '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875,
};

function scaleAmount(amount: string, ratio: number) {
    if (ratio === 1) return amount;
    const match = amount.match(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])(.*)$/);
    if (!match) return amount;

    const raw = match[1];
    let value: number;
    if (raw in fractionValues) value = fractionValues[raw];
    else if (raw.includes(' ')) {
        const [whole, fraction] = raw.split(' ');
        const [top, bottom] = fraction.split('/').map(Number);
        value = Number(whole) + top / bottom;
    } else if (raw.includes('/')) {
        const [top, bottom] = raw.split('/').map(Number);
        value = top / bottom;
    } else value = Number(raw);

    const scaled = Math.round(value * ratio * 100) / 100;
    return `${scaled}${match[2]}`;
}


export default function RecipeDetail({ recipe, relatedRecipes }: RecipeDetailProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(recipe.id);
    const [servings, setServings] = useState(recipe.servings);
    const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [cookMode, setCookMode] = useState(false);
    const ingredientList = Array.from(new Map(recipe.ingredients.map(ingredient => [`${ingredient.name}-${ingredient.amount}`, ingredient])).values());
    const instructionList = Array.from(new Map(recipe.instructions.map(instruction => [instruction.step, instruction])).values());

    const toggleNumber = (value: number, values: number[], update: (next: number[]) => void) => {
        update(values.includes(value) ? values.filter(item => item !== value) : [...values, value]);
    };

    // Cook mode enlarges the method text and keeps the screen awake while cooking.
    useEffect(() => {
        document.body.classList.toggle('cook-mode', cookMode);
        return () => document.body.classList.remove('cook-mode');
    }, [cookMode]);

    const toggleCookMode = () => setCookMode(value => !value);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="mx-auto max-w-[1180px] px-4 pb-10 sm:px-6">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="pt-7 text-[0.85rem] text-muted">
                <Link href="/" className="hover:text-ink">Home</Link>
                {' / '}
                <Link href={`/${recipe.category.toLowerCase()}-recipes`} className="hover:text-ink">{recipe.category}</Link>
                {' / '}
                <span className="text-ink">{recipe.title}</span>
            </nav>

            {/* Hero */}
            <div className="grid items-center gap-10 pb-12 pt-6 lg:grid-cols-2 lg:gap-14">
                <div>
                    <span className="eyebrow">
                        {[recipe.cuisine, ...Array.from(new Set(recipe.dietary)).slice(0, 2)].filter(Boolean).join(' · ')}
                    </span>
                    <h1 className="mb-4 mt-2.5 font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.04]">{recipe.title}</h1>

                    <div className="mb-4 flex flex-wrap items-center gap-2.5 text-[0.92rem] text-muted">
                        {hasRating(recipe) ? (
                            <>
                                <span className="tracking-[2px] text-mustard">{'★'.repeat(Math.round(recipe.rating))}</span>
                                <b className="font-semibold text-ink">{recipe.rating}</b>
                                <span>from {recipe.ratingCount} ratings</span>
                                <span>· {recipe.difficulty}</span>
                            </>
                        ) : (
                            <>
                                <span>{recipe.difficulty}</span>
                                <span>· serves {recipe.servings}</span>
                                <span>· {recipe.mealType}</span>
                            </>
                        )}
                    </div>

                    <p className="max-w-[520px] text-[1.1rem] text-ink/75">{recipe.summary || recipe.description}</p>

                    {recipe.intro && (
                        <p className="mt-4 max-w-[520px] border-l-[3px] border-mustard pl-4 text-[1.02rem] text-ink/80">
                            {recipe.intro}
                        </p>
                    )}

                    <div className="my-6 text-[0.9rem] text-muted">
                        {recipe.dietary.includes('Vegan') ? 'Fully plant based' : 'Contains animal products'}
                        {recipe.country ? ` · ${recipe.country}` : ''}
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        <a href="#recipe" className="btn btn-ink hover:no-underline">Jump to recipe ↓</a>
                        <button type="button" onClick={() => toggleFavorite(recipe.id)} className="btn">
                            {isFav ? '♥ Saved' : '♡ Save'}
                        </button>
                        <button type="button" onClick={handlePrint} className="btn">Print</button>
                    </div>
                </div>

                {/* Real photo of this recipe */}
                <div className="relative">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-mustard-soft">
                        <Image src={recipe.image} alt={recipe.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                    {recipe.dietary.includes('Vegan') && (
                        <div className="absolute right-5 top-5 grid h-24 w-24 rotate-[10deg] place-items-center rounded-full border-2 border-dashed border-white bg-pickle text-center font-hand text-[1.2rem] leading-none text-white outline outline-[6px] outline-pickle">
                            plants<br />only
                        </div>
                    )}
                </div>
            </div>

            {/* Facts strip */}
            <div className="hard-shadow grid grid-cols-2 overflow-hidden rounded-card border-[1.5px] border-ink sm:grid-cols-3 lg:grid-cols-5">
                {[
                    ['Prep', recipe.prepTime],
                    ['Cook', recipe.cookTime || '—'],
                    ['Total', recipe.totalTime || recipe.prepTime],
                    ['Level', recipe.difficulty],
                    ['Calories', `${Math.round(recipe.totalCalories / (recipe.servings || 1))}`],
                ].map(([label, value]) => (
                    <div key={label} className="border-b border-r border-line px-5 py-4 last:border-r-0">
                        <span className="block font-sans text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">{label}</span>
                        <b className="font-serif text-[1.35rem]">{value}</b>
                    </div>
                ))}
            </div>

            <div id="recipe" className="mt-12 text-left">
                <div className="grid grid-cols-1 gap-12 text-left lg:grid-cols-12">
                    {/* Ingredients panel */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
                        <div className="rounded-[22px] bg-cream p-7">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h2 className="font-serif text-[1.7rem]">Ingredients</h2>
                                <div className="flex items-center gap-1.5 rounded-full border border-line bg-white p-1">
                                    <button type="button" onClick={() => setServings(value => Math.max(1, value - 1))} aria-label="Fewer servings" className="h-[30px] w-[30px] rounded-full bg-ink text-white">−</button>
                                    <span className="min-w-[70px] text-center text-[0.88rem] font-semibold">{servings} {servings === 1 ? 'serving' : 'servings'}</span>
                                    <button type="button" onClick={() => setServings(value => Math.min(24, value + 1))} aria-label="More servings" className="h-[30px] w-[30px] rounded-full bg-ink text-white">+</button>
                                </div>
                            </div>

                            <div className="mb-3 flex items-center justify-between text-[0.82rem] text-muted">
                                <span>{checkedIngredients.length} of {ingredientList.length} gathered</span>
                                {checkedIngredients.length > 0 && <button type="button" onClick={() => setCheckedIngredients([])} className="font-semibold text-tomato hover:underline">Reset</button>}
                            </div>

                            <ul>
                                {ingredientList.map((ing, idx) => {
                                    const done = checkedIngredients.includes(idx);
                                    return (
                                        <li key={`${ing.name}-${idx}`} className="dashed-row last:border-0">
                                            <button type="button" onClick={() => toggleNumber(idx, checkedIngredients, setCheckedIngredients)} aria-pressed={done} className="flex w-full items-start gap-3 py-2.5 text-left text-[0.97rem]">
                                                <span className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md border-[1.5px] text-[0.75rem] text-white transition ${done ? 'border-pickle bg-pickle' : 'border-ink bg-white'}`}>{done ? '✓' : ''}</span>
                                                <span className={done ? 'text-muted line-through' : ''}>
                                                    <b className="font-semibold">{scaleAmount(ing.amount, servings / recipe.servings)}</b> {ing.name}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>

                    {/* Method */}
                    <div className="lg:col-span-5">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="font-serif text-[1.7rem]">Method</h2>
                            <div className="flex items-center gap-3 text-[0.9rem]">
                                {completedSteps.length > 0 && <button type="button" onClick={() => setCompletedSteps([])} className="font-semibold text-tomato hover:underline">Start over</button>}
                                <button type="button" onClick={toggleCookMode} aria-pressed={cookMode} className="flex items-center gap-2.5 font-medium">
                                    <span className={`relative h-[26px] w-11 rounded-full transition ${cookMode ? 'bg-pickle' : 'bg-line'}`}>
                                        <span className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition-all ${cookMode ? 'left-[21px]' : 'left-[3px]'}`} />
                                    </span>
                                    Cook mode
                                </button>
                            </div>
                        </div>

                        <div>
                            {instructionList.map((step) => {
                                const done = completedSteps.includes(step.step);
                                return (
                                    <div key={step.step} className={`cook-step grid grid-cols-[56px_1fr] gap-4 border-t border-line py-6 transition ${done ? 'opacity-40' : ''}`}>
                                        <button
                                            type="button"
                                            onClick={() => toggleNumber(step.step, completedSteps, setCompletedSteps)}
                                            aria-pressed={done}
                                            aria-label={`Mark step ${step.step} ${done ? 'incomplete' : 'complete'}`}
                                            className={`grid h-[46px] w-[46px] place-items-center rounded-full border-[1.5px] border-ink font-serif text-[1.2rem] font-semibold transition ${done ? 'bg-ink text-white' : 'bg-white'}`}
                                        >
                                            {done ? '✓' : step.step}
                                        </button>
                                        <div>
                                            <h4 className={`mb-1 font-sans text-[1.05rem] font-semibold ${done ? 'line-through' : ''}`}>{step.title}</h4>
                                            <p className="text-ink/75">{step.text}</p>
                                            {step.detailed && (
                                                <p className="mt-3 rounded-2xl bg-mustard-soft px-4 py-3 text-[0.95rem] text-ink/80">
                                                    <span className="hand block text-[1.1rem]">note</span>
                                                    {step.detailed}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* How you know it worked */}
                        <div className="my-7 flex items-start gap-5 rounded-[22px] bg-pickle-soft px-6 py-5">
                            <Pip className="w-[62px] shrink-0" />
                            <div>
                                <span className="hand text-[1.3rem]">how you know it worked</span>
                                <p className="text-[0.95rem]">
                                    {recipe.notes
                                        ? recipe.notes.looksRight
                                        : 'Read the method through once before you start and get everything measured out. It turns a rushed dinner into a calm one.'}
                                </p>
                            </div>
                        </div>

                        {recipe.notes && <KitchenNotesSection notes={recipe.notes} />}
                        {recipe.relatedReading && recipe.relatedReading.length > 0 && (
                            <ReadingSection slugs={recipe.relatedReading} />
                        )}


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

                    </div>

                    {/* Sidebar Column - STICKY */}
                    <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-28 lg:self-start">
                        {/* Cooking Tips */}
                        <div className="rounded-2xl border border-sand bg-sand/5 p-6">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-terracotta mb-4">Cooking Secrets</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta/40 mt-1.5 shrink-0"></span>
                                    <p className="text-sm text-dark-olive/70 font-sans leading-relaxed italic">&ldquo;Always use room temperature ingredients for the best emulsion.&rdquo;</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta/40 mt-1.5 shrink-0"></span>
                                    <p className="text-sm text-dark-olive/70 font-sans leading-relaxed italic">&ldquo;A sprinkle of fresh herbs at the very end preserves their vibrant color.&rdquo;</p>
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
                                        <span className="text-2xl font-bold font-sans">{(recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.protein) || 0), 0) / (recipe.servings || 1)).toFixed(1)}g</span>
                                        <span className="text-xs uppercase font-bold text-white/40 tracking-tighter">Protein</span>
                                    </div>
                                </div>

                                {/* Detailed List */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm font-sans">
                                        <span className="text-white/40 uppercase font-bold tracking-wider">Total Fat</span>
                                        <span className="font-bold">{(recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.fat) || 0), 0) / (recipe.servings || 1)).toFixed(1)}g</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans pl-3 border-l border-white/20">
                                        <span className="text-white/40 font-medium">Saturated Fat</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.saturatedFat || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(1)}g` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans">
                                        <span className="text-white/40 uppercase font-bold tracking-wider">Cholesterol</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.cholesterol || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}mg` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans">
                                        <span className="text-white/40 uppercase font-bold tracking-wider">Sodium</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.sodium || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}mg` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans">
                                        <span className="text-white/40 uppercase font-bold tracking-wider">Total Carbs</span>
                                        <span className="font-bold">{(recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.carbs) || 0), 0) / (recipe.servings || 1)).toFixed(1)}g</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans pl-3 border-l border-white/20">
                                        <span className="text-white/40 font-medium">Dietary Fiber</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.fiber || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(1)}g` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-sans pl-3 border-l border-white/20">
                                        <span className="text-white/40 font-medium">Sugars</span>
                                        <span className="font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.sugar || '0') || 0), 0) / (recipe.servings || 1);
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
                                                const val = recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.vitaminD || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}%` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-sans">
                                        <span className="text-white/40 font-bold uppercase tracking-wider">Calcium</span>
                                        <span className="text-white/60 font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.calcium || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}%` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-sans">
                                        <span className="text-white/40 font-bold uppercase tracking-wider">Iron</span>
                                        <span className="text-white/60 font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.iron || '0') || 0), 0) / (recipe.servings || 1);
                                                return val > 0 ? `${val.toFixed(0)}%` : '-';
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-sans">
                                        <span className="text-white/40 font-bold uppercase tracking-wider">Potassium</span>
                                        <span className="text-white/60 font-bold">
                                            {(() => {
                                                const val = recipe.ingredients.reduce((acc, curr) => acc + (parseFloat(curr.potassium || '0') || 0), 0) / (recipe.servings || 1);
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


            {/* Recipe Heritage Story Section */}
            <RecipeStory recipe={recipe} />

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

/** The part of a recipe you only get from having cooked it. */
function KitchenNotesSection({ notes }: { notes: KitchenNotes }) {
    return (
        <section className="mt-12 border-t border-line pt-10">
            <span className="hand">from cooking it more than once</span>
            <h2 className="mb-6 font-serif text-[1.7rem]">Cook&rsquo;s notes</h2>

            <h3 className="mb-3 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted">If it goes wrong</h3>
            <div className="mb-8">
                {notes.goesWrong.map(item => (
                    <details key={item.problem} className="dashed-row py-3 last:border-0">
                        <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">
                            <span className="mr-2 text-tomato">?</span>{item.problem}
                        </summary>
                        <p className="mt-2 pl-5 text-ink/75">{item.fix}</p>
                    </details>
                ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[22px] bg-cream p-6">
                    <h3 className="mb-3 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted">Swaps that work</h3>
                    <ul>
                        {notes.swaps.map(swap => (
                            <li key={swap.from} className="dashed-row py-2.5 text-[0.95rem] last:border-0">
                                <b className="font-semibold">{swap.from}</b>
                                <span className="block text-ink/75">{swap.to}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-[22px] bg-mustard-soft p-6">
                    <h3 className="mb-3 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted">Leftovers and getting ahead</h3>
                    <p className="text-[0.95rem] text-ink/80">{notes.leftovers}</p>
                    {notes.makeAhead && <p className="mt-3 text-[0.95rem] text-ink/80">{notes.makeAhead}</p>}
                </div>
            </div>
        </section>
    );
}

/** Links through to the journal pieces that give the dish its context. */
function ReadingSection({ slugs }: { slugs: string[] }) {
    const posts = slugs.map(slug => getPostBySlug(slug)).filter(Boolean);
    if (posts.length === 0) return null;

    return (
        <section className="mt-12 border-t border-line pt-10">
            <span className="hand">where this dish comes from</span>
            <h2 className="mb-5 font-serif text-[1.7rem]">Keep reading</h2>
            <div className="grid gap-4 sm:grid-cols-2">
                {posts.map(post => (
                    <Link
                        key={post!.slug}
                        href={`/blog/${post!.slug}`}
                        className="flex flex-col gap-2 rounded-card border border-line p-5 transition hover:border-ink hover:shadow-[4px_4px_0_var(--color-ink)] hover:no-underline"
                    >
                        <span className="eyebrow">{post!.category.replace(/-/g, ' ')}</span>
                        <h3 className="font-serif text-[1.15rem] leading-snug">{post!.title}</h3>
                        <p className="text-[0.9rem] text-muted">{post!.readTime}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
