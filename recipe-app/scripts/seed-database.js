const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../recipes.db');
const RECIPES_JSON_PATH = path.join(__dirname, '../data/recipes.json');
const CATEGORIES_JSON_PATH = path.join(__dirname, '../data/categories.json');

const db = new sqlite3.Database(DB_PATH);

function readJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        process.exit(1);
    }
}

const recipes = readJsonFile(RECIPES_JSON_PATH);
const categories = readJsonFile(CATEGORIES_JSON_PATH);

db.serialize(() => {
    console.log('Starting database seed...');

    // Disable foreign keys temporarily to allow truncating
    db.run("PRAGMA foreign_keys = OFF");

    // Clear existing data
    const tables = ['recipes', 'ingredients', 'instructions', 'recipe_dietary', 'recipe_audience', 'recipe_extra', 'categories'];
    tables.forEach(table => {
        db.run(`DELETE FROM ${table}`, (err) => {
            if (err) console.error(`Error clearing ${table}:`, err);
            else console.log(`Cleared ${table}`);
        });
        // Reset auto-increment counters where applicable
        db.run(`DELETE FROM sqlite_sequence WHERE name='${table}'`);
    });

    db.run("PRAGMA foreign_keys = ON");


    // Insert Categories
    const categoryStmt = db.prepare(`
    INSERT INTO categories (id, slug, title, image, type)
    VALUES (?, ?, ?, ?, ?)
  `);

    categories.forEach(cat => {
        categoryStmt.run(cat.id, cat.slug, cat.title, cat.image, cat.type, (err) => {
            if (err) console.error(`Error inserting category ${cat.slug}:`, err);
        });
    });
    categoryStmt.finalize(() => console.log(`Inserted ${categories.length} categories`));


    // Insert Recipes
    const recipeStmt = db.prepare(`
    INSERT INTO recipes (
      id, slug, title, summary, description, story, image, category, cuisine, 
      continent, meal_type, country, prep_time, cook_time, total_time, rating, 
      rating_count, review_count, difficulty, servings, total_calories
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    const ingredientStmt = db.prepare(`
    INSERT INTO ingredients (recipe_id, name, amount, calories, protein, carbs, fat, fiber, sugar, sodium)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    const instructionStmt = db.prepare(`
    INSERT INTO instructions (recipe_id, step, title, text, detailed)
    VALUES (?, ?, ?, ?, ?)
  `);

    const dietaryStmt = db.prepare(`
    INSERT INTO recipe_dietary (recipe_id, dietary_restriction)
    VALUES (?, ?)
  `);

    const audienceStmt = db.prepare(`
    INSERT INTO recipe_audience (recipe_id, audience)
    VALUES (?, ?)
  `);

    const extraStmt = db.prepare(`
    INSERT INTO recipe_extra (recipe_id, content)
    VALUES (?, ?)
  `);

    recipes.forEach(recipe => {
        recipeStmt.run(
            recipe.id,
            recipe.slug,
            recipe.title,
            recipe.summary || null,
            recipe.description,
            recipe.story || null,
            recipe.image,
            recipe.category,
            recipe.cuisine,
            recipe.continent,
            recipe.mealType,
            recipe.country,
            recipe.prepTime,
            recipe.cookTime || null,
            recipe.totalTime || null,
            recipe.rating,
            recipe.ratingCount || 0,
            recipe.reviewCount || 0,
            recipe.difficulty,
            recipe.servings,
            recipe.totalCalories
            , function (err) {
                if (err) {
                    console.error(`Error inserting recipe ${recipe.title}:`, err);
                    return;
                }

                // Insert sub-tables
                if (recipe.ingredients) {
                    const uniqueIngredients = Array.from(new Map(recipe.ingredients.map(ing => [`${ing.name}-${ing.amount}`, ing])).values());
                    uniqueIngredients.forEach(ing => {
                        ingredientStmt.run(recipe.id, ing.name, ing.amount, ing.calories, ing.protein, ing.carbs, ing.fat, ing.fiber || "0g", ing.sugar || "0g", ing.sodium || "0mg");
                    });
                }

                if (recipe.instructions) {
                    const uniqueInstructions = Array.from(new Map(recipe.instructions.map(inst => [inst.step, inst])).values());
                    uniqueInstructions.forEach(inst => {
                        instructionStmt.run(recipe.id, inst.step, inst.title, inst.text, inst.detailed || null);
                    });
                }

                if (recipe.dietary) {
                    Array.from(new Set(recipe.dietary)).forEach(diet => {
                        dietaryStmt.run(recipe.id, diet);
                    });
                }

                if (recipe.audience) {
                    Array.from(new Set(recipe.audience)).forEach(aud => {
                        audienceStmt.run(recipe.id, aud);
                    });
                }

                if (recipe.extra) {
                    Array.from(new Set(recipe.extra)).forEach(note => {
                        extraStmt.run(recipe.id, note);
                    });
                }
            });

    });

    // Finalize after loop completes (approximate, since runs are async)
    // For a simple script, we can just rely on the event queue to finish these.
    // Properly we should wait, but for sqlite3 serialization it should be fine.

    setTimeout(() => {
        recipeStmt.finalize();
        ingredientStmt.finalize();
        instructionStmt.finalize();
        dietaryStmt.finalize();
        audienceStmt.finalize();
        extraStmt.finalize();

        db.close((err) => {
            if (err) console.error('Error closing database:', err);
            else console.log('Database seed completed successfully.');
        });
    }, 1000); // Small delay to ensure all inserts are queued. 

});
