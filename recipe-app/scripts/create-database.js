const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Read JSON data
const recipesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/recipes.json'), 'utf8'));
const categoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/categories.json'), 'utf8'));

// Create database
const db = new sqlite3.Database('./recipes.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  // Recipes table
  db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    description TEXT,
    story TEXT,
    image TEXT,
    category TEXT,
    cuisine TEXT,
    continent TEXT,
    meal_type TEXT,
    country TEXT,
    prep_time TEXT,
    cook_time TEXT,
    total_time TEXT,
    rating REAL,
    difficulty TEXT,
    servings INTEGER,
    total_calories INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) console.error('Error creating recipes table:', err.message);
    else console.log('✓ Recipes table created');
  });

  // Ingredients table
  db.run(`CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id TEXT NOT NULL,
    name TEXT NOT NULL,
    amount TEXT,
    calories INTEGER,
    protein TEXT,
    carbs TEXT,
    fat TEXT,
    fiber TEXT,
    sugar TEXT,
    sodium TEXT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  )`, (err) => {
    if (err) console.error('Error creating ingredients table:', err.message);
    else console.log('✓ Ingredients table created');
  });

  // Instructions table
  db.run(`CREATE TABLE IF NOT EXISTS instructions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id TEXT NOT NULL,
    step INTEGER NOT NULL,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    detailed TEXT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  )`, (err) => {
    if (err) console.error('Error creating instructions table:', err.message);
    else console.log('✓ Instructions table created');
  });

  // Dietary restrictions table (many-to-many)
  db.run(`CREATE TABLE IF NOT EXISTS recipe_dietary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id TEXT NOT NULL,
    dietary_restriction TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  )`, (err) => {
    if (err) console.error('Error creating recipe_dietary table:', err.message);
    else console.log('✓ Recipe dietary table created');
  });

  // Audience table (many-to-many)
  db.run(`CREATE TABLE IF NOT EXISTS recipe_audience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id TEXT NOT NULL,
    audience TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  )`, (err) => {
    if (err) console.error('Error creating recipe_audience table:', err.message);
    else console.log('✓ Recipe audience table created');
  });

  // Extra notes table
  db.run(`CREATE TABLE IF NOT EXISTS recipe_extra (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id TEXT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  )`, (err) => {
    if (err) console.error('Error creating recipe_extra table:', err.message);
    else console.log('✓ Recipe extra table created');
  });

  // Categories table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    image TEXT,
    type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) console.error('Error creating categories table:', err.message);
    else console.log('✓ Categories table created');
  });

  console.log('\n--- Starting data insertion ---\n');

  // Insert recipes
  const recipeStmt = db.prepare(`INSERT OR REPLACE INTO recipes
    (id, slug, title, summary, description, story, image, category, cuisine, continent, meal_type, country, prep_time, cook_time, total_time, rating, difficulty, servings, total_calories)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  const ingredientStmt = db.prepare(`INSERT INTO ingredients
    (recipe_id, name, amount, calories, protein, carbs, fat, fiber, sugar, sodium)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  const instructionStmt = db.prepare(`INSERT INTO instructions
    (recipe_id, step, title, text, detailed)
    VALUES (?, ?, ?, ?, ?)`);

  const dietaryStmt = db.prepare(`INSERT INTO recipe_dietary
    (recipe_id, dietary_restriction)
    VALUES (?, ?)`);

  const audienceStmt = db.prepare(`INSERT INTO recipe_audience
    (recipe_id, audience)
    VALUES (?, ?)`);

  const extraStmt = db.prepare(`INSERT INTO recipe_extra
    (recipe_id, content)
    VALUES (?, ?)`);

  let recipeCount = 0;
  let ingredientCount = 0;
  let instructionCount = 0;
  let dietaryCount = 0;
  let audienceCount = 0;
  let extraCount = 0;

  recipesData.forEach((recipe) => {
    // Insert recipe
    recipeStmt.run(
      recipe.id,
      recipe.slug,
      recipe.title,
      recipe.summary,
      recipe.description,
      recipe.story,
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
      recipe.difficulty,
      recipe.servings,
      recipe.totalCalories
    );
    recipeCount++;

    // Insert ingredients
    recipe.ingredients.forEach((ingredient) => {
      ingredientStmt.run(
        recipe.id,
        ingredient.name,
        ingredient.amount,
        ingredient.calories,
        ingredient.protein,
        ingredient.carbs,
        ingredient.fat,
        ingredient.fiber || "0g",
        ingredient.sugar || "0g",
        ingredient.sodium || "0mg"
      );
      ingredientCount++;
    });

    // Insert instructions
    recipe.instructions.forEach((instruction) => {
      instructionStmt.run(
        recipe.id,
        instruction.step,
        instruction.title,
        instruction.text,
        instruction.detailed || null
      );
      instructionCount++;
    });

    // Insert dietary restrictions
    recipe.dietary.forEach((dietary) => {
      dietaryStmt.run(recipe.id, dietary);
      dietaryCount++;
    });

    // Insert audience
    recipe.audience.forEach((aud) => {
      audienceStmt.run(recipe.id, aud);
      audienceCount++;
    });

    // Insert extra notes
    if (recipe.extra) {
      recipe.extra.forEach((note) => {
        extraStmt.run(recipe.id, note);
        extraCount++;
      });
    }
  });

  recipeStmt.finalize();
  ingredientStmt.finalize();
  instructionStmt.finalize();
  dietaryStmt.finalize();
  audienceStmt.finalize();
  extraStmt.finalize();

  console.log(`✓ Inserted ${recipeCount} recipes`);
  console.log(`✓ Inserted ${ingredientCount} ingredients`);
  console.log(`✓ Inserted ${instructionCount} instructions`);
  console.log(`✓ Inserted ${dietaryCount} dietary restrictions`);
  console.log(`✓ Inserted ${audienceCount} audience entries`);
  console.log(`✓ Inserted ${extraCount} extra notes`);

  // Insert categories
  const categoryStmt = db.prepare(`INSERT OR REPLACE INTO categories
    (id, slug, title, image, type)
    VALUES (?, ?, ?, ?, ?)`);

  let categoryCount = 0;

  categoriesData.forEach((category) => {
    categoryStmt.run(
      category.id,
      category.slug,
      category.title,
      category.image,
      category.type
    );
    categoryCount++;
  });

  categoryStmt.finalize();

  console.log(`✓ Inserted ${categoryCount} categories`);

  console.log('\n--- Database creation complete! ---\n');
  console.log('Database file: recipes.db');
  console.log('\nTo view the database on Mac, you can use:');
  console.log('1. DB Browser for SQLite (GUI): https://sqlitebrowser.org/');
  console.log('2. Terminal: sqlite3 recipes.db');
  console.log('3. VS Code extension: SQLite Viewer');
});

// Close database
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  }
});
