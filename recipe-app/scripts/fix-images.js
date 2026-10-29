const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '../data/recipes.json');
const publicDir = path.join(__dirname, '../public');

const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

let modified = false;

recipes.forEach(recipe => {
  const imagePath = path.join(publicDir, recipe.image);
  if (!fs.existsSync(imagePath)) {
    console.log(`Missing image for ${recipe.title}: ${recipe.image}`);
    recipe.image = '/relish-recipe.png'; // Fallback
    modified = true;
  }
});

if (modified) {
  fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2));
  console.log('Updated recipes.json with fallback images.');
} else {
  console.log('All images exist.');
}
