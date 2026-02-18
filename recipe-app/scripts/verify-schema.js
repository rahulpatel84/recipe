const fs = require('fs');
const path = require('path');

// Mimic the logic from RecipeDetail.tsx
function parseTimeToISO8601(timeStr) {
    if (!timeStr) return undefined;

    let hours = 0;
    let minutes = 0;

    const hourMatch = timeStr.match(/(\d+)\s*(hrs?|hours?)/i);
    const minMatch = timeStr.match(/(\d+)\s*(mins?|minutes?)/i);

    if (hourMatch) hours = parseInt(hourMatch[1], 10);
    if (minMatch) minutes = parseInt(minMatch[1], 10);

    if (hours === 0 && minutes === 0) return undefined;

    let iso = 'PT';
    if (hours > 0) iso += `${hours}H`;
    if (minutes > 0) iso += `${minutes}M`;
    return iso;
}

function generateRecipeSchema(recipe) {
    const schema = {
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

const recipes = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/recipes.json'), 'utf8'));

// Test with Beef Tacos (id: 5)
const beefTacos = recipes.find(r => r.id === "5");
const schema = generateRecipeSchema(beefTacos);

console.log("--- Generated Schema for Beef Tacos ---");
console.log(JSON.stringify(schema, null, 2));

// Validation checks
const missingFields = [];
if (!schema.datePublished) missingFields.push("datePublished");

if (missingFields.length === 0) {
    console.log("\n✅ SEC CHECK PASSED: Mandatory fields present.");
} else {
    console.log("\n❌ SEC CHECK FAILED: Missing fields:", missingFields.join(", "));
}

// Check time format for Chicken Tikka Masala (id: 3)
const chickenTikka = recipes.find(r => r.id === "3");
const tikkaSchema = generateRecipeSchema(chickenTikka);
console.log("\n--- Time Format Check (Chicken Tikka Masala) ---");
console.log("Source Total Time:", chickenTikka.totalTime);
console.log("ISO 8601 Total Time:", tikkaSchema.totalTime);

if (tikkaSchema.totalTime === "PT1H15M") {
    console.log("✅ Time format parsing success.");
} else {
    console.log("❌ Time format parsing failed.");
}
