import { Recipe } from './data';

export function parseTimeToISO8601(timeStr: string | undefined | null): string | undefined {
    if (!timeStr) return undefined;

    let hours = 0;
    let minutes = 0;

    // Support formats like "1 hr 15 mins", "45 mins", "2 hours", "1.5 hrs"
    const hourMatch = timeStr.match(/(\d+(?:\.\d+)?)\s*(hrs?|hours?)/i);
    const minMatch = timeStr.match(/(\d+)\s*(mins?|minutes?)/i);

    if (hourMatch) hours = parseFloat(hourMatch[1]);
    if (minMatch) minutes = parseInt(minMatch[1], 10);

    if (hours === 0 && minutes === 0) {
        // Fallback for just digits if it's a simple number (assume minutes)
        const pureMinMatch = timeStr.match(/^(\d+)$/);
        if (pureMinMatch) {
            minutes = parseInt(pureMinMatch[1], 10);
        } else {
            return undefined;
        }
    }

    let iso = 'PT';
    if (hours > 0) {
        const wholeHours = Math.floor(hours);
        const extraMinutes = Math.round((hours - wholeHours) * 60);
        if (wholeHours > 0) iso += `${wholeHours}H`;
        minutes += extraMinutes;
    }
    if (minutes > 0) iso += `${minutes}M`;
    return iso;
}

export function generateRecipeSchema(recipe: Recipe) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: recipe.title,
        image: recipe.image,
        description: recipe.description,
        recipeCuisine: recipe.cuisine,
        recipeCategory: recipe.category,
        recipeYield: `${recipe.servings} servings`,
        recipeIngredient: recipe.ingredients.map(ing => `${ing.amount} ${ing.name}`),
        recipeInstructions: recipe.instructions.map(inst => ({
            '@type': 'HowToStep',
            name: inst.title,
            text: inst.text,
        })),
        nutrition: {
            '@type': 'NutritionInformation',
            calories: `${recipe.totalCalories} calories`,
        },
        author: {
            '@type': 'Organization',
            name: 'Relish Realm',
            url: 'https://relishrealm.com'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Relish Realm',
            logo: {
                '@type': 'ImageObject',
                url: 'https://relishrealm.com/logo.png'
            }
        },
        datePublished: '2024-01-01',
        keywords: [recipe.cuisine, recipe.category, recipe.mealType, ...recipe.dietary].join(', '),
    };

    const prepTime = parseTimeToISO8601(recipe.prepTime);
    if (prepTime) schema.prepTime = prepTime;

    const cookTime = parseTimeToISO8601(recipe.cookTime);
    if (cookTime) schema.cookTime = cookTime;

    const totalTime = parseTimeToISO8601(recipe.totalTime);
    if (totalTime) schema.totalTime = totalTime;

    return schema;
}
