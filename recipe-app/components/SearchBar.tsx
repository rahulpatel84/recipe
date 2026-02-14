'use client';

import { useState, useEffect, useRef } from 'react';
import { recipes, categories, Recipe, Category } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<{ recipes: Recipe[], categories: Category[] }>({ recipes: [], categories: [] });
    const searchRef = useRef<HTMLDivElement>(null);
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
        if (query.trim().length < 2) {
            setResults({ recipes: [], categories: [] });
            setIsOpen(false);
            return;
        }

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

        setResults({ recipes: filteredRecipes, categories: filteredCategories });
        setIsOpen(true);
    }, [query]);

    const handleSelect = (slug: string) => {
        setQuery('');
        setIsOpen(false);
        router.push(slug);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search recipes, ingredients, cuisines..."
                    className="w-full px-6 py-4 text-lg rounded-xl border border-border-soft bg-white text-dark-olive placeholder:text-dark-olive/30 focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 outline-none transition-all shadow-sm group-hover:shadow-md"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-lg bg-dark-olive text-white font-bold text-xs uppercase tracking-wider hover:bg-terracotta transition-colors flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="hidden md:inline">COMMAND+K</span>
                </button>
            </div>

            {isOpen && (results.recipes.length > 0 || results.categories.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-white rounded-2xl shadow-2xl z-[500] border border-border-soft animate-in fade-in slide-in-from-top-2 duration-300">
                    {results.categories.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-dark-olive/40 px-4 mb-4 font-sans">Categories</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {results.categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleSelect(`/${cat.slug}-recipes`)}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-soft-gray transition-colors text-left group"
                                    >
                                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border-soft">
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
                            <h3 className="text-xs font-bold uppercase tracking-widest text-dark-olive/40 px-4 mb-4 font-sans">Recipes</h3>
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
                </div>
            )}
        </div>
    );
}
