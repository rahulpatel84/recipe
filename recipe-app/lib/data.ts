// TypeScript Interfaces
export interface Ingredient {
  name: string;
  amount: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  saturatedFat?: string;
  cholesterol?: string;
  fiber?: string;
  sugar?: string;
  sodium?: string;
  vitaminD?: string;
  calcium?: string;
  iron?: string;
  potassium?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  description: string;
  image: string;
  category: string;
  cuisine: string;
  continent: string;
  dietary: string[];
  mealType: string;
  audience: string[];
  country: string;
  prepTime: string;
  cookTime?: string;
  totalTime?: string;
  rating: number;
  ratingCount?: number;
  reviewCount?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  ingredients: Ingredient[];
  totalCalories: number;
  instructions: { step: number; title: string; text: string; detailed?: string }[];
  story?: string;
  extra?: string[];
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  image: string;
  type: 'cuisine' | 'continent' | 'dietary' | 'mealType' | 'audience' | 'country';
}

// Import data from JSON files
import recipesData from '../data/recipes.json';
import categoriesData from '../data/categories.json';

// Export the data with proper typing
export const recipes: Recipe[] = recipesData as Recipe[];
export const categories: Category[] = categoriesData as Category[];

// Helper metadata and functions
export const groupTypeMetadata = {
  cuisine: { label: 'Cuisines', plural: 'cuisines', path: 'recipes-by-cuisines' },
  continent: { label: 'Continents', plural: 'continents', path: 'recipes-by-continents' },
  dietary: { label: 'Dietary Choice', plural: 'dietary-choices', path: 'recipes-by-dietary-choices' },
  mealType: { label: 'Meal Type', plural: 'meal-types', path: 'recipes-by-meal-types' },
  audience: { label: 'For Everyone', plural: 'audiences', path: 'recipes-by-audiences' },
  country: { label: 'By Country', plural: 'countries', path: 'recipes-by-countries' },
};

export type GroupType = keyof typeof groupTypeMetadata;

export function getGroupByType(type: string) {
  return Object.entries(groupTypeMetadata).find(([_, meta]) => meta.path === type);
}

export function getCategoryByItemSlug(slug: string) {
  if (!slug.endsWith('-recipes')) return null;
  const originalSlug = slug.replace('-recipes', '');
  return categories.find(c => c.slug === originalSlug);
}
