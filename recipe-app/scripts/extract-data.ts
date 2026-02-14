import { recipes, categories } from '../lib/data';
import * as fs from 'fs';

// Write recipes to JSON
fs.writeFileSync(
    './data/recipes.json',
    JSON.stringify(recipes, null, 2)
);

// Write categories to JSON (overwrite the manual one to ensure consistency)
fs.writeFileSync(
    './data/categories.json',
    JSON.stringify(categories, null, 2)
);

console.log('Data extraction complete!');
console.log(`Extracted ${recipes.length} recipes`);
console.log(`Extracted ${categories.length} categories`);
