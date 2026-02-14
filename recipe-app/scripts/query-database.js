const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./recipes.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the recipes database.\n');
});

// Query to get a complete recipe with all details
const recipeId = '1'; // Classic Carbonara

console.log('=== RECIPE DETAILS ===\n');

db.get('SELECT * FROM recipes WHERE id = ?', [recipeId], (err, recipe) => {
  if (err) {
    console.error(err.message);
    return;
  }

  console.log(`📗 ${recipe.title}`);
  console.log(`   ${recipe.description}`);
  console.log(`   Cuisine: ${recipe.cuisine} | Rating: ${recipe.rating} ⭐`);
  console.log(`   Prep Time: ${recipe.prep_time} | Servings: ${recipe.servings}`);
  console.log(`   Calories: ${recipe.total_calories} kcal\n`);

  // Get ingredients
  console.log('🥘 INGREDIENTS:');
  db.all('SELECT * FROM ingredients WHERE recipe_id = ?', [recipeId], (err, ingredients) => {
    if (err) {
      console.error(err.message);
      return;
    }

    ingredients.forEach((ing, idx) => {
      console.log(`   ${idx + 1}. ${ing.name} - ${ing.amount}`);
      console.log(`      ${ing.calories} kcal | P: ${ing.protein} | C: ${ing.carbs} | F: ${ing.fat}`);
    });

    // Get instructions
    console.log('\n📝 INSTRUCTIONS:');
    db.all('SELECT * FROM instructions WHERE recipe_id = ? ORDER BY step', [recipeId], (err, instructions) => {
      if (err) {
        console.error(err.message);
        return;
      }

      instructions.forEach((inst) => {
        console.log(`   ${inst.step}. ${inst.title}`);
        console.log(`      ${inst.text}`);
      });

      // Get dietary info
      db.all('SELECT dietary_restriction FROM recipe_dietary WHERE recipe_id = ?', [recipeId], (err, dietary) => {
        if (err) {
          console.error(err.message);
          return;
        }

        if (dietary.length > 0) {
          console.log('\n🌱 DIETARY:');
          dietary.forEach((d) => {
            console.log(`   • ${d.dietary_restriction}`);
          });
        }

        // Get audience info
        db.all('SELECT audience FROM recipe_audience WHERE recipe_id = ?', [recipeId], (err, audience) => {
          if (err) {
            console.error(err.message);
            return;
          }

          if (audience.length > 0) {
            console.log('\n👥 PERFECT FOR:');
            audience.forEach((a) => {
              console.log(`   • ${a.audience}`);
            });
          }

          console.log('\n===================\n');

          // Summary statistics
          console.log('=== DATABASE STATISTICS ===\n');

          db.get('SELECT COUNT(*) as count FROM recipes', [], (err, row) => {
            if (!err) console.log(`Total Recipes: ${row.count}`);
          });

          db.get('SELECT COUNT(*) as count FROM ingredients', [], (err, row) => {
            if (!err) console.log(`Total Ingredients: ${row.count}`);
          });

          db.get('SELECT COUNT(*) as count FROM instructions', [], (err, row) => {
            if (!err) console.log(`Total Instructions: ${row.count}`);
          });

          db.get('SELECT COUNT(*) as count FROM categories', [], (err, row) => {
            if (!err) {
              console.log(`Total Categories: ${row.count}`);
              console.log('\n===================\n');

              // Close database
              db.close();
            }
          });
        });
      });
    });
  });
});
