'use client';

import { useEffect, useMemo, useState } from 'react';
import { Recipe } from '@/lib/data';
import Pip from '@/components/Pip';
import RecipeCard from '@/components/RecipeCard';

interface RecipeExplorerProps {
    recipes: Recipe[];
}

type SortOption = 'recommended' | 'quickest' | 'name';
const PAGE_SIZE = 24;
const TIME_FILTERS = [15, 30, 60];

function timeInMinutes(value?: string) {
    if (!value) return Number.MAX_SAFE_INTEGER;
    const hours = value.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hour)/i);
    const minutes = value.match(/(\d+)\s*(?:m|min|minute)/i);
    return (hours ? Number(hours[1]) * 60 : 0) + (minutes ? Number(minutes[1]) : 0) || Number.MAX_SAFE_INTEGER;
}

function toggleInSet(set: Set<string>, value: string) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value); else next.add(value);
    return next;
}

export default function RecipeExplorer({ recipes }: RecipeExplorerProps) {
    const [query, setQuery] = useState('');
    const [mealType, setMealType] = useState('');
    const [cuisineFilters, setCuisineFilters] = useState<Set<string>>(new Set());
    const [dietFilters, setDietFilters] = useState<Set<string>>(new Set());
    const [maxTime, setMaxTime] = useState(0);
    const [sortBy, setSortBy] = useState<SortOption>('recommended');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
        const initialQuery = new URLSearchParams(window.location.search).get('q');
        if (!initialQuery) return;
        const timer = window.setTimeout(() => setQuery(initialQuery), 0);
        return () => window.clearTimeout(timer);
    }, []);

    const cuisines = useMemo(() => [...new Set(recipes.map(recipe => recipe.cuisine).filter(Boolean))].sort(), [recipes]);
    const diets = useMemo(() => [...new Set(recipes.flatMap(recipe => recipe.dietary))].sort(), [recipes]);
    const mealTypes = useMemo(() => [...new Set(recipes.map(recipe => recipe.mealType).filter(Boolean))].sort(), [recipes]);

    const filteredRecipes = useMemo(() => {
        const search = query.trim().toLowerCase();
        const matches = recipes.filter(recipe => {
            const searchable = [
                recipe.title, recipe.summary, recipe.description, recipe.cuisine,
                recipe.category, recipe.country, recipe.mealType, ...recipe.dietary,
                ...recipe.ingredients.map(ingredient => ingredient.name),
            ].filter(Boolean).join(' ').toLowerCase();

            return (!search || searchable.includes(search))
                && (!mealType || recipe.mealType === mealType)
                && (!cuisineFilters.size || cuisineFilters.has(recipe.cuisine))
                && [...dietFilters].every(diet => recipe.dietary.includes(diet))
                && (!maxTime || timeInMinutes(recipe.totalTime || recipe.prepTime) <= maxTime);
        });

        return [...matches].sort((a, b) => {
            if (sortBy === 'quickest') return timeInMinutes(a.totalTime || a.prepTime) - timeInMinutes(b.totalTime || b.prepTime);
            if (sortBy === 'name') return a.title.localeCompare(b.title);
            // Recipes with written cook's notes first, then the rest.
            return Number(Boolean(b.notes)) - Number(Boolean(a.notes));
        });
    }, [recipes, query, mealType, cuisineFilters, dietFilters, maxTime, sortBy]);

    const activeTags = [...cuisineFilters, ...dietFilters, ...(maxTime ? [`≤ ${maxTime} min`] : [])];
    const hasFilters = Boolean(query || mealType || activeTags.length) || sortBy !== 'recommended';

    const resetAll = () => {
        setQuery('');
        setMealType('');
        setCuisineFilters(new Set());
        setDietFilters(new Set());
        setMaxTime(0);
        setSortBy('recommended');
        setVisibleCount(PAGE_SIZE);
        window.history.replaceState({}, '', window.location.pathname);
    };

    return (
        <main className="mx-auto max-w-[1180px] px-4 pb-24 sm:px-6">
            <header className="flex flex-wrap items-end justify-between gap-6 pb-8 pt-14">
                <div>
                    <span className="hand">everything that is ready to cook</span>
                    <h1 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05]">All recipes</h1>
                    <p className="mt-2 text-muted">{recipes.length} recipes, written out in full. Filter until you find tonight’s dinner.</p>
                </div>
                <div className="hard-shadow flex min-w-[320px] flex-1 items-center gap-2.5 rounded-full border-[1.5px] border-ink px-5 py-3 sm:max-w-[380px]">
                    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
                    <label htmlFor="recipe-search" className="sr-only">Search recipes and ingredients</label>
                    <input
                        id="recipe-search"
                        type="search"
                        value={query}
                        onChange={event => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }}
                        placeholder="Search recipes or ingredients…"
                        className="w-full flex-1 border-0 bg-transparent text-base outline-none placeholder:text-muted"
                    />
                </div>
            </header>

            {/* Meal type tabs */}
            <div className="mb-8 flex gap-2 overflow-x-auto border-b border-line pb-1">
                {[{ label: 'All', value: '' }, ...mealTypes.map(value => ({ label: value, value }))].map(tab => (
                    <button
                        key={tab.label}
                        onClick={() => { setMealType(tab.value); setVisibleCount(PAGE_SIZE); }}
                        className={`whitespace-nowrap border-b-[2.5px] px-4 py-3 text-[0.95rem] font-medium transition ${mealType === tab.value ? 'border-tomato text-ink' : 'border-transparent text-muted hover:text-ink'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
                {/* Filters */}
                <aside aria-label="Recipe filters">
                    <FilterGroup title="Cuisine">
                        {cuisines.map(cuisine => (
                            <CheckRow
                                key={cuisine}
                                label={cuisine}
                                count={recipes.filter(recipe => recipe.cuisine === cuisine).length}
                                checked={cuisineFilters.has(cuisine)}
                                onChange={() => { setCuisineFilters(set => toggleInSet(set, cuisine)); setVisibleCount(PAGE_SIZE); }}
                            />
                        ))}
                    </FilterGroup>

                    <FilterGroup title="Dietary">
                        {diets.map(diet => (
                            <CheckRow
                                key={diet}
                                label={diet}
                                count={recipes.filter(recipe => recipe.dietary.includes(diet)).length}
                                checked={dietFilters.has(diet)}
                                onChange={() => { setDietFilters(set => toggleInSet(set, diet)); setVisibleCount(PAGE_SIZE); }}
                            />
                        ))}
                    </FilterGroup>

                    <FilterGroup title="Total time">
                        <div className="flex flex-wrap gap-1.5">
                            {TIME_FILTERS.map(minutes => (
                                <button
                                    key={minutes}
                                    onClick={() => { setMaxTime(current => (current === minutes ? 0 : minutes)); setVisibleCount(PAGE_SIZE); }}
                                    className={`rounded-full border px-3 py-1.5 text-[0.83rem] font-medium transition ${maxTime === minutes ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'}`}
                                >
                                    {minutes === 60 ? '≤ 1 hr' : `≤ ${minutes} min`}
                                </button>
                            ))}
                        </div>
                    </FilterGroup>

                    <button onClick={resetAll} className="btn w-full">Clear all</button>
                </aside>

                {/* Results */}
                <div>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-[0.9rem] text-muted">
                        <div className="flex flex-wrap items-center gap-2">
                            <span><b className="font-semibold text-ink">{filteredRecipes.length}</b> recipes</span>
                            {activeTags.map(tag => <span key={tag} className="rounded-full bg-cream px-2.5 py-1 text-[0.8rem] text-ink">{tag}</span>)}
                            {hasFilters && <button onClick={resetAll} className="font-semibold text-tomato hover:underline">reset</button>}
                        </div>
                        <label className="flex items-center gap-2">
                            <span className="sr-only">Sort recipes</span>
                            <select
                                value={sortBy}
                                onChange={event => { setSortBy(event.target.value as SortOption); setVisibleCount(PAGE_SIZE); }}
                                className="rounded-full border border-line bg-white px-3.5 py-2 text-ink outline-none focus:border-ink"
                            >
                                <option value="recommended">Recommended</option>
                                <option value="quickest">Quickest</option>
                                <option value="name">A–Z</option>
                            </select>
                        </label>
                    </div>

                    {filteredRecipes.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3">
                                {filteredRecipes.slice(0, visibleCount).map(recipe => <RecipeCard key={recipe.id} recipe={recipe} ratio="square" />)}
                            </div>
                            {visibleCount < filteredRecipes.length && (
                                <div className="mt-12 flex justify-center">
                                    <button onClick={() => setVisibleCount(count => count + PAGE_SIZE)} className="btn">Load more recipes</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-16 text-center text-muted">
                            <Pip className="mx-auto mb-3 w-[90px]" />
                            <p><b className="font-semibold text-ink">Pip couldn’t find anything.</b><br />Try removing a filter or two.</p>
                            <button onClick={resetAll} className="btn mt-6">Clear all filters</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-6 border-b border-line pb-6">
            <h4 className="mb-3 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted">{title}</h4>
            {children}
        </div>
    );
}

function CheckRow({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
    return (
        <label className="flex cursor-pointer items-center gap-2.5 py-1 text-[0.93rem]">
            <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] border-ink text-[0.7rem] text-white transition ${checked ? 'bg-ink' : 'bg-white'}`}>
                {checked ? '✓' : ''}
            </span>
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
            {label}
            <span className="ml-auto text-[0.8rem] text-muted">{count}</span>
        </label>
    );
}
