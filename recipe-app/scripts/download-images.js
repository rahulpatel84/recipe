const fs = require('fs');
const https = require('https');
const path = require('path');

const recipesFile = path.join(__dirname, '../data/recipes.json');
const publicDir = path.join(__dirname, '../public');

// Read recipes.json
const recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// Function to download an image
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImage(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  const missingImages = [];

  recipes.forEach(recipe => {
    // Some image values might be like "/Recipe-Name.png" Let's strip the leading slash for filename.
    const imageName = recipe.image.startsWith('/') ? recipe.image.substring(1) : recipe.image;
    const destPath = path.join(publicDir, imageName);

    if (!fs.existsSync(destPath)) {
      missingImages.push({
        url: `https://picsum.photos/seed/${encodeURIComponent(recipe.slug)}/800/600.jpg`,
        dest: destPath,
        name: imageName
      });
    }
  });

  console.log(`Found ${missingImages.length} missing images to download.`);

  for (let i = 0; i < missingImages.length; i++) {
    const item = missingImages[i];
    console.log(`Downloading (${i + 1}/${missingImages.length}): ${item.name}...`);
    try {
      await downloadImage(item.url, item.dest);
    } catch (err) {
      console.error(`Error downloading ${item.name}:`, err.message);
    }
  }

  console.log('Finished downloading images.');
}

main().catch(err => console.error(err));
