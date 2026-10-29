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

export interface KitchenNotes {
  /** What the dish looks like when it has gone right. */
  looksRight: string;
  /** The failures people actually hit, and the fix for each. */
  goesWrong: { problem: string; fix: string }[];
  swaps: { from: string; to: string }[];
  leftovers: string;
  makeAhead?: string;
}

export interface RecipeHeritage {
  origin: string;
  facts: string[];
  tradition: string;
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
  /** Only present when real ratings exist. Never display a star without one. */
  rating?: number;
  ratingCount?: number;
  reviewCount?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  ingredients: Ingredient[];
  totalCalories: number;
  instructions: { step: number; title: string; text: string; detailed?: string }[];
  story?: string;
  heritage?: RecipeHeritage;
  extra?: string[];
  appliance?: string[];
  /** 'draft' recipes are withheld from the site until they are written and cooked. */
  status?: 'published' | 'draft';
  draftReason?: string;
  /** A cook's note in a human voice, shown above the method. */
  intro?: string;
  notes?: KitchenNotes;
  /** Journal post slugs that give this dish its context. */
  relatedReading?: string[];
  flagship?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  image: string;
  type: 'cuisine' | 'continent' | 'dietary' | 'mealType' | 'audience' | 'country' | 'appliance';
}

// Import data from JSON files
import recipesData from '../data/recipes.json';
import categoriesData from '../data/categories.json';

// Export the data with proper typing
const allRecipes: Recipe[] = recipesData as Recipe[];

/** Everything in the dataset, drafts included. For tooling, not for pages. */
export const recipesIncludingDrafts: Recipe[] = allRecipes;

/** What the site serves. Drafts are withheld deliberately. */
export const recipes: Recipe[] = allRecipes.filter(recipe => recipe.status !== 'draft');

/** A rating is only real when people actually left one. */
export function hasRating(recipe: Recipe): recipe is Recipe & { rating: number } {
  return typeof recipe.rating === 'number' && Boolean(recipe.ratingCount);
}

export const plantBasedRecipes = recipes.filter(recipe => recipe.dietary.includes('Vegan'));
export const categories: Category[] = categoriesData as Category[];

// Helper metadata and functions
export const groupTypeMetadata = {
  cuisine: { label: 'Cuisines', plural: 'cuisines', path: 'recipes-by-cuisines' },
  continent: { label: 'Continents', plural: 'continents', path: 'recipes-by-continents' },
  dietary: { label: 'Dietary Choice', plural: 'dietary-choices', path: 'recipes-by-dietary-choices' },
  mealType: { label: 'Meal Type', plural: 'meal-types', path: 'recipes-by-meal-types' },
  audience: { label: 'For Everyone', plural: 'audiences', path: 'recipes-by-audiences' },
  country: { label: 'By Country', plural: 'countries', path: 'recipes-by-countries' },
  appliance: { label: 'Appliances', plural: 'appliances', path: 'recipes-by-appliances', hidden: true },
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
