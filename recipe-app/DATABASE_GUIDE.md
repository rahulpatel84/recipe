# Recipe Database Guide

## ✅ Database Created Successfully!

Your SQLite database `recipes.db` contains **ALL** data from your JSON files:

### Database Contents:
- ✓ **14 recipes** (complete recipe details)
- ✓ **57 ingredients** (with full nutritional information)
- ✓ **44 instructions** (step-by-step cooking instructions)
- ✓ **13 dietary restrictions** (vegan, vegetarian, gluten-free, etc.)
- ✓ **16 audience entries** (kids, couples, families, etc.)
- ✓ **30 categories** (cuisines, continents, meal types, dietary, audience, countries)

### Database Tables:
1. `recipes` - Main recipe information
2. `ingredients` - All ingredients with nutritional data
3. `instructions` - Step-by-step cooking instructions
4. `recipe_dietary` - Dietary restrictions per recipe
5. `recipe_audience` - Target audience per recipe
6. `categories` - All category types (cuisine, continent, dietary, etc.)

---

## 📱 How to View the Database on Mac

### Method 1: DB Browser for SQLite (Recommended - Best GUI)

**Download & Install:**
1. Visit: https://sqlitebrowser.org/
2. Download the Mac version
3. Install the app

**Open Database:**
1. Launch "DB Browser for SQLite"
2. Click "Open Database"
3. Navigate to: `/Users/rahul/Desktop/Projects/Recipe/recipe-app/recipes.db`
4. Browse all tables with a beautiful interface!

**Features:**
- Browse data in tables
- Execute SQL queries
- Export data to CSV, JSON, SQL
- Visual schema design
- Edit data directly

---

### Method 2: Terminal (Command Line)

```bash
# Navigate to project folder
cd /Users/rahul/Desktop/Projects/Recipe/recipe-app

# Open SQLite database
sqlite3 recipes.db
```

**Useful Commands Inside sqlite3:**
```sql
-- List all tables
.tables

-- Show table structure
.schema recipes

-- View all recipes
SELECT * FROM recipes;

-- View a specific recipe with details
SELECT id, title, cuisine, rating, prep_time, total_calories
FROM recipes
WHERE id = '1';

-- Get ingredients for Classic Carbonara
SELECT name, amount, calories, protein, carbs, fat
FROM ingredients
WHERE recipe_id = '1';

-- Get cooking instructions
SELECT step, title, text
FROM instructions
WHERE recipe_id = '1'
ORDER BY step;

-- Find all vegan recipes
SELECT DISTINCT r.title, r.rating, r.prep_time
FROM recipes r
JOIN recipe_dietary rd ON r.id = rd.recipe_id
WHERE rd.dietary_restriction = 'Vegan';

-- Get top-rated recipes
SELECT title, rating, cuisine, total_calories
FROM recipes
ORDER BY rating DESC
LIMIT 5;

-- Count recipes by cuisine
SELECT cuisine, COUNT(*) as count
FROM recipes
GROUP BY cuisine
ORDER BY count DESC;

-- Exit sqlite3
.quit
```

---

### Method 3: VS Code Extension

1. Open VS Code
2. Install "SQLite Viewer" extension (by alexcvzz)
3. Navigate to `/Users/rahul/Desktop/Projects/Recipe/recipe-app/`
4. Right-click on `recipes.db`
5. Select "Open Database"
6. Browse tables and run queries!

---

### Method 4: Online SQLite Viewer

1. Visit: https://sqliteviewer.app/
2. Upload your `recipes.db` file
3. Browse and query data in your browser
4. Export results as needed

---

## 🔍 Quick Database Queries

Run these in your terminal to explore the data:

```bash
# View all recipe titles
sqlite3 recipes.db "SELECT title FROM recipes"

# Get recipe count by difficulty
sqlite3 recipes.db "SELECT difficulty, COUNT(*) FROM recipes GROUP BY difficulty"

# Find recipes under 400 calories
sqlite3 recipes.db "SELECT title, total_calories FROM recipes WHERE total_calories < 400"

# Get all categories by type
sqlite3 recipes.db "SELECT type, COUNT(*) FROM categories GROUP BY type"
```

---

## 📊 Sample Queries You Can Run

### Get Complete Recipe Details:
```bash
node scripts/query-database.js
```

### Custom Queries:
Edit `scripts/query-database.js` and change `recipeId` to view different recipes:
- `'1'` - Classic Carbonara
- `'2'` - Garden Avocado Toast
- `'3'` - Chicken Tikka Masala
- `'4'` - Energy Smoothie Bowl
- `'5'` - Street Style Beef Tacos
- ... up to `'14'`

---

## 🗂️ Database Location

**Full path:** `/Users/rahul/Desktop/Projects/Recipe/recipe-app/recipes.db`

You can:
- Open it with any SQLite client
- Query it from Node.js
- Use it in your Next.js app
- Export data to other formats
- Backup by copying the file

---

## 💡 Tips

1. **Backup:** Copy `recipes.db` to a safe location before making changes
2. **Browse:** Use DB Browser for the best visual experience
3. **Query:** Use the terminal for quick data lookups
4. **Export:** DB Browser can export to JSON, CSV, SQL formats
5. **Edit:** You can modify data directly in DB Browser

---

## 🚀 Next Steps

1. Install DB Browser for SQLite for the best experience
2. Open `recipes.db` and explore the tables
3. Run some sample queries to see your data
4. Use this database in your Next.js app if needed

---

**Need help?** All your recipe data is now safely stored in `recipes.db`!
