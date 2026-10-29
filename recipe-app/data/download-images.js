const fs = require('fs');
const path = require('path');
const https = require('https');

const recipes = require('./recipes.json');
const publicDir = path.join(__dirname, '..', 'public');

// Find recipes with missing images
const missingImages = recipes.filter(recipe => {
  const imagePath = path.join(publicDir, recipe.image);
  return !fs.existsSync(imagePath);
});

console.log(`Found ${missingImages.length} recipes with missing images\n`);

// Function to download image with redirect handling
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const request = (urlToFetch, redirectCount = 0) => {
      if (redirectCount > 5) {
        reject(new Error('Too many redirects'));
        return;
      }

      const protocol = urlToFetch.startsWith('https') ? https : require('http');

      protocol.get(urlToFetch, (response) => {
        // Handle redirect
        if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
          const redirectUrl = response.headers.location;
          request(redirectUrl, redirectCount + 1);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }

        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      }).on('error', (err) => {
        reject(err);
      });
    };

    request(url);
  });
}

// Use Lorem Picsum - reliable placeholder image service
// Different seed for each image to get variety
async function downloadAllImages() {
  let success = 0;
  let failed = 0;

  for (let i = 0; i < missingImages.length; i++) {
    const recipe = missingImages[i];
    const imagePath = path.join(publicDir, recipe.image);

    // Use seed based on recipe id for consistent images
    // Lorem Picsum: https://picsum.photos/seed/{seed}/width/height
    const seed = recipe.id || recipe.slug || i;
    const url = `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;

    console.log(`[${i + 1}/${missingImages.length}] ${recipe.title}`);

    try {
      await downloadImage(url, imagePath);
      console.log(`  ✓ Saved: ${recipe.image}`);
      success++;
    } catch (err) {
      console.log(`  ✗ Failed: ${err.message}`);
      failed++;
    }

    // Small delay to be nice to the server
    if (i < missingImages.length - 1) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log(`\n=== Complete ===`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
}

downloadAllImages();
