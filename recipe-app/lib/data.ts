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

/** Minutes from a string like "35 mins" or "1 hr 10 min". */
export function timeInMinutes(value?: string) {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const hours = value.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hour)/i);
  const minutes = value.match(/(\d+)\s*(?:m|min|minute)/i);
  return (hours ? Number(hours[1]) * 60 : 0) + (minutes ? Number(minutes[1]) : 0) || Number.MAX_SAFE_INTEGER;
}

export function totalMinutes(recipe: Recipe) {
  return timeInMinutes(recipe.totalTime || recipe.prepTime);
}

/** "Breakfast/Lunch" is two meal types, not one. */
export function mealTypesOf(recipe: Recipe): string[] {
  return (recipe.mealType || '').split('/').map(part => part.trim()).filter(Boolean);
}

/** The text a search runs against. */
export function searchableText(recipe: Recipe) {
  return [
    recipe.title, recipe.summary, recipe.description, recipe.cuisine,
    recipe.category, recipe.country, recipe.mealType, ...recipe.dietary,
    ...recipe.ingredients.map(ingredient => ingredient.name),
  ].filter(Boolean).join(' ').toLowerCase();
}

/**
 * Collections are defined by what the recipes actually are, not by a text
 * query typed into a link. A hand written ?q=stew link silently returned
 * nothing the moment the matching recipe was unpublished.
 */
export const collections = [
  {
    slug: 'quick',
    title: 'Cooks in half an hour',
    copy: 'For the evenings when you are tired and still want something good.',
    colors: ['bg-tomato', 'bg-mustard', 'bg-pickle'],
    match: (recipe: Recipe) => totalMinutes(recipe) <= 30,
  },
  {
    slug: 'protein',
    title: 'Protein without the meat',
    copy: 'Lentils, chickpeas, beans and tofu doing the heavy lifting.',
    colors: ['bg-pickle', 'bg-[#A8C686]', 'bg-mustard'],
    match: (recipe: Recipe) => /lentil|chickpea|tofu|bean|tempeh|quinoa/i.test(
      recipe.ingredients.map(ingredient => ingredient.name).join(' ')
    ),
  },
  {
    slug: 'keeps',
    title: 'Better the next day',
    copy: 'The ones you make on Sunday and are glad of on Tuesday.',
    colors: ['bg-mustard', 'bg-tomato', 'bg-ink'],
    match: (recipe: Recipe) => Boolean(recipe.notes && /better|keeps|freeze/i.test(recipe.notes.leftovers)),
  },
] as const;

export type CollectionSlug = (typeof collections)[number]['slug'];

export function getCollection(slug?: string | null) {
  return collections.find(collection => collection.slug === slug);
}

/** Always derived from the live set, so a collection can never render empty. */
export function recipesInCollection(slug: string, from: Recipe[] = recipes) {
  const collection = getCollection(slug);
  return collection ? from.filter(collection.match) : [];
}
