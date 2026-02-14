const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../recipes.db');
const RECIPES_JSON_PATH = path.join(__dirname, '../data/recipes.json');
const CATEGORIES_JSON_PATH = path.join(__dirname, '../data/categories.json');

const db = new sqlite3.Database(DB_PATH);

function writeJsonFile(filePath, data) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(`Error writing ${filePath}:`, err);
            process.exit(1);
        }
        console.log(`Generated ${filePath}`);
    });
}

db.serialize(() => {
    console.log('Starting data generation from database...');

    // 1. Generate Categories
    db.all("SELECT * FROM categories", (err, rows) => {
        if (err) {
            console.error("Error fetching categories:", err);
            return;
        }
        // Filter out created_at if not present in original JSON or if desired
        const categories = rows.map(row => ({
            id: row.id,
            slug: row.slug,
            title: row.title,
            image: row.image,
            type: row.type
        }));
        writeJsonFile(CATEGORIES_JSON_PATH, categories);
    });

    // 2. Generate Recipes with all relations
    db.all("SELECT * FROM recipes", async (err, recipes) => {
        if (err) {
            console.error("Error fetching recipes:", err);
            return;
        }

        const fullRecipes = await Promise.all(recipes.map(async (recipe) => {
            // Fetch Ingredients
            const ingredients = await new Promise((resolve, reject) => {
                db.all("SELECT name, amount, calories, protein, carbs, fat, fiber, sugar, sodium FROM ingredients WHERE recipe_id = ?", [recipe.id], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(r => ({
                        name: r.name,
                        amount: r.amount,
                        calories: r.calories,
                        protein: r.protein,
                        carbs: r.carbs,
                        fat: r.fat,
                        fiber: r.fiber,
                        sugar: r.sugar,
                        sodium: r.sodium
                    })));
                });
            });

            // Fetch Instructions
            const instructions = await new Promise((resolve, reject) => {
                db.all("SELECT step, title, text FROM instructions WHERE recipe_id = ? ORDER BY step", [recipe.id], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(r => ({
                        step: r.step,
                        title: r.title,
                        text: r.text
                    })));
                });
            });

            // Fetch Dietary
            const dietary = await new Promise((resolve, reject) => {
                db.all("SELECT DISTINCT dietary_restriction FROM recipe_dietary WHERE recipe_id = ?", [recipe.id], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(r => r.dietary_restriction));
                });
            });

            // Fetch Audience
            const audience = await new Promise((resolve, reject) => {
                db.all("SELECT DISTINCT audience FROM recipe_audience WHERE recipe_id = ?", [recipe.id], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(r => r.audience));
                });
            });

            // Fetch Extra Notes
            const extra = await new Promise((resolve, reject) => {
                db.all("SELECT DISTINCT content FROM recipe_extra WHERE recipe_id = ?", [recipe.id], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(r => r.content));
                });
            });

            // Reconstruct Recipe Object
            return {
                id: recipe.id,
                slug: recipe.slug,
                title: recipe.title,
                summary: recipe.summary,
                description: recipe.description,
                image: recipe.image,
                category: recipe.category,
                cuisine: recipe.cuisine,
                continent: recipe.continent,
                dietary: dietary,
                mealType: recipe.meal_type, // Map back to camelCase
                audience: audience,
                country: recipe.country,
                prepTime: recipe.prep_time, // Map back to camelCase
                cookTime: recipe.cook_time,
                totalTime: recipe.total_time,
                rating: recipe.rating,
                difficulty: recipe.difficulty,
                servings: recipe.servings,
                totalCalories: recipe.total_calories, // Map back to camelCase
                ingredients: Array.from(new Map(ingredients.map(ing => [`${ing.name}-${ing.amount}`, ing])).values()),
                instructions: Array.from(new Map(instructions.map(inst => [inst.step, inst])).values()),
                story: recipe.story,
                extra: extra
            };
        }));

        writeJsonFile(RECIPES_JSON_PATH, fullRecipes);

        // Close DB after all operations
        db.close();
    });
});
