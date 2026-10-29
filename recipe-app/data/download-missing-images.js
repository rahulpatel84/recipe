const fs = require('fs');
const https = require('https');
const path = require('path');

const recipes = require('./recipes.json');

// Map of recipe keywords to Unsplash image IDs
const imageMap = {
  'chili': 'photo-1455619452474-d2be8b1e70cd',
  'jambalaya': 'photo-1512058564366-18510be2db19',
  'banana bread': 'photo-1605286978633-2dec93f87f5e',
  'shepherd': 'photo-1600626334420-e7e8e2d30dc2',
  'lasagna': 'photo-1574894709920-11b28e7367e3',
  'fettuccine': 'photo-1645112411341-6c4fd023714a',
  'alfredo': 'photo-1645112411341-6c4fd023714a',
  'gnocchi': 'photo-1589227365533-cee630bd59bd',
  'pesto': 'photo-1473093295043-cdd812d0e601',
  'moussaka': 'photo-1544025162-d76694265947',
  'ratatouille': 'photo-1572453800999-e8d2d1589b7c',
  'palak': 'photo-1601050690597-df0568f70950',
  'chana masala': 'photo-1585937421612-70a008356fbe',
  'khichdi': 'photo-1596797038530-2c107229654b',
  'dal': 'photo-1546833999-b9f581a1996d',
  'soba': 'photo-1569718212165-3a8278d5f624',
  'noodle': 'photo-1569718212165-3a8278d5f624',
  'kimchi': 'photo-1498654896293-37aacf113fd9',
  'fried rice': 'photo-1603133872878-684f208fb84b',
  'mapo tofu': 'photo-1582878826629-29b7ad1cdc43',
  'lentil': 'photo-1546833999-b9f581a1996d',
  'peanut': 'photo-1569718212165-3a8278d5f624',
  'cauliflower': 'photo-1568901346375-23c9450c58cd',
  'taco': 'photo-1565299585323-38d6b0865b47',
  'mousse': 'photo-1541783245831-57d6fb0926d3',
  'chocolate': 'photo-1541783245831-57d6fb0926d3',
  'stew': 'photo-1547592166-23ac45744acd',
  'scramble': 'photo-1525351484163-7529414344d8',
  'tofu': 'photo-1546069901-ba9599a7e63c',
  'curry': 'photo-1585937421612-70a008356fbe',
  'soup': 'photo-1547592166-23ac45744acd',
  'quinoa': 'photo-1512621776951-a57141f2eefd',
  'bowl': 'photo-1512621776951-a57141f2eefd',
  'stir fry': 'photo-1512058533999-81d6e1a26b8f',
  'bean': 'photo-1511690656952-34342bb7c2f2',
  'pasta': 'photo-1473093295043-cdd812d0e601',
  'couscous': 'photo-1505576399279-565b52d4ac71',
  'falafel': 'photo-1593001874117-c99c800e3eb6',
  'wrap': 'photo-1626700051175-6818013e1d4f',
  'rice': 'photo-1596560548464-f010549b84d7',
  'tempeh': 'photo-1511690656952-34342bb7c2f2',
  'risotto': 'photo-1476124369491-e7addf5db371',
  'pumpkin': 'photo-1476718406336-bb5a9690ee2a',
  'minestrone': 'photo-1547592166-23ac45744acd',
  'eggplant': 'photo-1572453800999-e8d2d1589b7c',
  'tagine': 'photo-1511690656952-34342bb7c2f2',
  'enchilada': 'photo-1534352956036-cd81e27dd615',
  'zucchini': 'photo-1556909114-44e3e70034e2',
  'fritter': 'photo-1556909114-44e3e70034e2',
  'avocado': 'photo-1525351484163-7529414344d8',
  'toast': 'photo-1525351484163-7529414344d8',
  'paella': 'photo-1512058564366-18510be2db19',
  'miso': 'photo-1569718212165-3a8278d5f624',
  'katsu': 'photo-1569718212165-3a8278d5f624',
  'satay': 'photo-1569718212165-3a8278d5f624',
  'primavera': 'photo-1473093295043-cdd812d0e601',
  'kale': 'photo-1512621776951-a57141f2eefd',
  'skillet': 'photo-1511690656952-34342bb7c2f2',
  'bibimbap': 'photo-1498654896293-37aacf113fd9',
  'hummus': 'photo-1593001874117-c99c800e3eb6',
  'beet': 'photo-1593001874117-c99c800e3eb6',
  'ramen': 'photo-1569718212165-3a8278d5f624',
  'stroganoff': 'photo-1511690656952-34342bb7c2f2',
  'cajun': 'photo-1512058564366-18510be2db19',
  'makhani': 'photo-1585937421612-70a008356fbe',
  'harissa': 'photo-1511690656952-34342bb7c2f2',
  'salad': 'photo-1512621776951-a57141f2eefd',
  'burrito': 'photo-1626700051175-6818013e1d4f',
  'tomato': 'photo-1547592166-23ac45744acd',
  'korma': 'photo-1585937421612-70a008356fbe',
  'shakshuka': 'photo-1590412200988-a436970781fa',
  'udon': 'photo-1569718212165-3a8278d5f624',
  'coconut': 'photo-1596560548464-f010549b84d7',
  'pho': 'photo-1569718212165-3a8278d5f624',
  'orzo': 'photo-1473093295043-cdd812d0e601',
  'piccata': 'photo-1473093295043-cdd812d0e601',
  'gochujang': 'photo-1498654896293-37aacf113fd9',
  'patties': 'photo-1556909114-44e3e70034e2',
  'farro': 'photo-1505576399279-565b52d4ac71',
  'chickpea': 'photo-1511690656952-34342bb7c2f2',
  'chowder': 'photo-1547592166-23ac45744acd',
  'sloppy': 'photo-1568901346375-23c9450c58cd',
  'bolognese': 'photo-1473093295043-cdd812d0e601',
  'tahini': 'photo-1569718212165-3a8278d5f624',
  'caesar': 'photo-1512621776951-a57141f2eefd',
  'pilaf': 'photo-1596560548464-f010549b84d7',
  'jalfrezi': 'photo-1585937421612-70a008356fbe',
  'walnut': 'photo-1473093295043-cdd812d0e601',
  'pot pie': 'photo-1600626334420-e7e8e2d30dc2',
  'kofta': 'photo-1585937421612-70a008356fbe',
  'sandwich': 'photo-1528735602780-2552fd46c7af',
  'pepper': 'photo-1511690656952-34342bb7c2f2',
  'veggie': 'photo-1512621776951-a57141f2eefd',
  'roasted': 'photo-1511690656952-34342bb7c2f2',
  'glazed': 'photo-1546069901-ba9599a7e63c',
  'crispy': 'photo-1546069901-ba9599a7e63c',
  'spicy': 'photo-1569718212165-3a8278d5f624',
  'creamy': 'photo-1473093295043-cdd812d0e601',
  'herb': 'photo-1512621776951-a57141f2eefd',
  'garlic': 'photo-1546069901-ba9599a7e63c',
  'maple': 'photo-1511690656952-34342bb7c2f2',
  'green': 'photo-1512621776951-a57141f2eefd',
  'red': 'photo-1511690656952-34342bb7c2f2',
  'white': 'photo-1473093295043-cdd812d0e601',
  'spinach': 'photo-1512621776951-a57141f2eefd',
  'mushroom': 'photo-1511690656952-34342bb7c2f2',
  'sweet potato': 'photo-1596097635121-14b63a7a671b',
  'corn': 'photo-1547592166-23ac45744acd',
  'basil': 'photo-1473093295043-cdd812d0e601',
  'lemon': 'photo-1512621776951-a57141f2eefd',
  'lime': 'photo-1596560548464-f010549b84d7',
  'ginger': 'photo-1546069901-ba9599a7e63c',
  'sesame': 'photo-1569718212165-3a8278d5f624',
  'broccoli': 'photo-1512621776951-a57141f2eefd',
  'warm': 'photo-1505576399279-565b52d4ac71',
  'baked': 'photo-1556909114-44e3e70034e2',
  'moroccan': 'photo-1511690656952-34342bb7c2f2',
  'smoky': 'photo-1511690656952-34342bb7c2f2',
  'thai': 'photo-1569718212165-3a8278d5f624',
  'mediterranean': 'photo-1505576399279-565b52d4ac71',
  'indian': 'photo-1585937421612-70a008356fbe',
  'korean': 'photo-1498654896293-37aacf113fd9',
  'japanese': 'photo-1569718212165-3a8278d5f624',
  'italian': 'photo-1473093295043-cdd812d0e601',
  'american': 'photo-1568901346375-23c9450c58cd',
  'french': 'photo-1541783245831-57d6fb0926d3',
  'chinese': 'photo-1582878826629-29b7ad1cdc43',
  'middle eastern': 'photo-1593001874117-c99c800e3eb6',
  'global': 'photo-1512621776951-a57141f2eefd',
  'asian': 'photo-1569718212165-3a8278d5f624',
  'british': 'photo-1600626334420-e7e8e2d30dc2',
  'cajun': 'photo-1512058564366-18510be2db19',
  'greek': 'photo-1544025162-d76694265947',
};

// Default fallback image
const defaultImage = 'photo-1512621776951-a57141f2eefd';

function getImageIdForRecipe(title) {
  const lowerTitle = title.toLowerCase();

  for (const [keyword, imageId] of Object.entries(imageMap)) {
    if (lowerTitle.includes(keyword)) {
      return imageId;
    }
  }

  return defaultImage;
}

function slugToFilename(title) {
  return title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-') + '.png';
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function main() {
  const placeholderRecipes = recipes.filter(r => r.image === '/relish-recipe.png');
  console.log(`Found ${placeholderRecipes.length} recipes with placeholder images\n`);

  const publicDir = path.join(__dirname, '..', 'public');
  const updates = [];

  for (let i = 0; i < placeholderRecipes.length; i++) {
    const recipe = placeholderRecipes[i];
    const imageId = getImageIdForRecipe(recipe.title);
    const filename = slugToFilename(recipe.title);
    const filepath = path.join(publicDir, filename);
    const url = `https://images.unsplash.com/${imageId}?w=800&h=600&fit=crop`;

    console.log(`[${i + 1}/${placeholderRecipes.length}] ${recipe.title}`);
    console.log(`   -> ${filename}`);

    try {
      await downloadImage(url, filepath);
      updates.push({ slug: recipe.slug, image: '/' + filename });
      console.log(`   ✅ Downloaded\n`);
    } catch (err) {
      console.log(`   ❌ Failed: ${err.message}\n`);
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 100));
  }

  // Update recipes.json
  console.log('\nUpdating recipes.json...');
  const updatedRecipes = recipes.map(r => {
    const update = updates.find(u => u.slug === r.slug);
    if (update) {
      return { ...r, image: update.image };
    }
    return r;
  });

  fs.writeFileSync(
    path.join(__dirname, 'recipes.json'),
    JSON.stringify(updatedRecipes, null, 2)
  );

  console.log(`\n✅ Done! Updated ${updates.length} recipes.`);
}

main().catch(console.error);
