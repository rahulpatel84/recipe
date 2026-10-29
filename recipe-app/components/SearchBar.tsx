'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { recipes, categories, Recipe, Category } from '@/lib/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                inputRef.current?.focus();
                if (query.trim().length >= 2) setIsOpen(true);
            }
            if (event.key === 'Escape') {
                setIsOpen(false);
                inputRef.current?.blur();
            }
        };
        document.addEventListener('keydown', handleShortcut);
        return () => document.removeEventListener('keydown', handleShortcut);
    }, [query]);

    const results: { recipes: Recipe[], categories: Category[] } = useMemo(() => {
        if (query.trim().length < 2) return { recipes: [], categories: [] };
        const searchTerm = query.toLowerCase();
        const filteredRecipes = recipes.filter(r =>
            r.title.toLowerCase().includes(searchTerm) ||
            r.cuisine.toLowerCase().includes(searchTerm) ||
            r.category.toLowerCase().includes(searchTerm) ||
            r.ingredients.some(i => i.name.toLowerCase().includes(searchTerm))
        ).slice(0, 5);

        const filteredCategories = categories.filter(c =>
            c.title.toLowerCase().includes(searchTerm)
        ).slice(0, 4);
        return { recipes: filteredRecipes, categories: filteredCategories };
    }, [query]);

    const handleSelect = (slug: string) => {
        setQuery('');
        setIsOpen(false);
        router.push(slug);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!query.trim()) {
            inputRef.current?.focus();
            return;
        }
        router.push(`/all-recipes?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={searchRef}>
            <form className="relative group" onSubmit={handleSubmit} role="search">
                <label htmlFor="home-recipe-search" className="sr-only">Search recipes, ingredients, and cuisines</label>
                <svg aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    ref={inputRef}
                    id="home-recipe-search"
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(e.target.value.trim().length >= 2);
                    }}
                    onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                    placeholder="What’s in your fridge? Try “chickpeas”"
                    autoComplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={isOpen}
                    aria-controls="home-search-results"
                    className="hard-shadow h-14 w-full rounded-full border-[1.5px] border-ink bg-white pl-12 pr-32 text-base text-ink outline-none transition placeholder:text-muted focus:border-tomato"
                />
                <button type="submit" aria-label="Search all recipes" className="btn btn-ink absolute bottom-1.5 right-1.5 top-1.5">
                    Search
                </button>
            </form>

            {isOpen && (
                <div id="home-search-results" className="absolute left-0 right-0 top-full z-[500] mt-2 max-h-[70vh] overflow-y-auto rounded-3xl border-[1.5px] border-ink bg-white p-3 shadow-[6px_6px_0_var(--color-ink)] animate-in fade-in slide-in-from-top-2 duration-200">
                    {results.categories.length > 0 && (
                        <div className="mb-5">
                            <h3 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-dark-olive/40">Categories</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {results.categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleSelect(`/${cat.slug}-recipes`)}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-soft-gray transition-colors text-left group"
                                    >
                                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border-soft">
                                            <Image src={cat.image} alt={cat.title} fill className="object-cover" />
                                        </div>
                                        <span className="text-sm font-bold text-dark-olive group-hover:text-terracotta transition-colors">{cat.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.recipes.length > 0 && (
                        <div>
                            <h3 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-dark-olive/40">Recipes</h3>
                            <div className="flex flex-col gap-2">
                                {results.recipes.map(recipe => (
                                    <button
                                        key={recipe.id}
                                        onClick={() => handleSelect(`/${recipe.slug}`)}
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-soft-gray transition-colors text-left group"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border-soft">
                                                <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <span className="block text-sm font-bold text-dark-olive group-hover:text-terracotta transition-colors">{recipe.title}</span>
                                                <span className="text-xs text-dark-olive/30 uppercase font-bold tracking-tight">{recipe.cuisine} • {recipe.prepTime}</span>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-border-soft rounded-lg text-xs font-bold text-dark-olive/40 lowercase tracking-wider">★ {recipe.rating}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.recipes.length === 0 && results.categories.length === 0 && (
                        <div className="px-4 py-8 text-center">
                            <p className="font-bold text-dark-olive">No quick matches</p>
                            <p className="mt-1 text-sm text-dark-olive/45">Try another ingredient or browse the full collection.</p>
                        </div>
                    )}

                    <button onClick={() => handleSelect(`/all-recipes?q=${encodeURIComponent(query.trim())}`)} className="mt-3 flex w-full items-center justify-center rounded-xl border border-border-soft bg-soft-gray px-4 py-3 text-sm font-bold text-dark-olive transition hover:border-terracotta hover:text-terracotta">
                        View all results for “{query.trim()}”
                    </button>
                </div>
            )}
        </div>
    );
}
