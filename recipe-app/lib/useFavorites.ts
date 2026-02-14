'use client';

import { useState, useEffect } from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('aroma_favorites');
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse favorites', e);
            }
        }
    }, []);

    const toggleFavorite = (recipeId: string) => {
        setFavorites(prev => {
            const next = prev.includes(recipeId)
                ? prev.filter(id => id !== recipeId)
                : [...prev, recipeId];
            localStorage.setItem('aroma_favorites', JSON.stringify(next));
            return next;
        });
    };

    const isFavorite = (recipeId: string) => favorites.includes(recipeId);

    return { favorites, toggleFavorite, isFavorite };
}
