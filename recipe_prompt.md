# Recipe Generation Prompt

Use the following prompt to generate new recipes that match the current data structure of the application.

## The Prompt

```text
Act as a professional culinary data engineer. Generate a new recipe for [RECIPE NAME] in a strict JSON format that adheres to the following structural requirements.

### Core Principles:
1. **Teaching Style**: Instructions should be natural and teaching-oriented.
2. **Detailed Notes**: Each instruction step MUST include a `detailed` field with professional guidance (e.g., "how it should look", "scary parts", "pro tips").
3. **Narrative Story**: Provide a 2-paragraph `story` that captures the history or craftsmanship of the dish.
4. **Structured Data**: Ensure all nutritional fields and metadata (cuisine, difficulty, prepTime) are accurate.

### JSON Schema:
{
  "id": "unique_string_id",
  "slug": "url-friendly-slug",
  "title": "Clear Recipe Name",
  "summary": "1-sentence marketing pitch",
  "description": "2-sentence overview",
  "image": "https://images.unsplash.com/... (valid Unsplash URL)",
  "category": "Main Category (e.g., Italian, Breakfast, Vegan)",
  "cuisine": "Specific Cuisine",
  "continent": "Continent",
  "dietary": ["List", "of", "tags"],
  "mealType": "Breakfast/Lunch/Dinner/Dessert",
  "audience": ["Kids", "Couples", "Gourmet"],
  "country": "Origin Country",
  "prepTime": "XX mins",
  "rating": 5.0,
  "difficulty": "Easy/Medium/Hard",
  "servings": 2,
  "totalCalories": 000,
  "ingredients": [
    {
      "name": "Ingredient Name",
      "amount": "Quantity",
      "calories": 0,
      "protein": "0g",
      "carbs": "0g",
      "fat": "0g"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "title": "Action Title",
      "text": "The basic instruction.",
      "detailed": "Natural, teaching-style note explaining the nuance or technique."
    }
  ],
  "story": "Two paragraphs of narrative context."
}
```

## JSON Fields Reference Table

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `summary` | String | High-level marketing summary used for cards. | "A creamy Roman pasta dish..." |
| `description` | String | Detailed description used in the hero section. | "A traditional Roman classic..." |
| `detailed` | String | **CRITICAL**: The teaching note for each instruction step. | "Keep the pan off the heat to avoid scrambling..." |
| `story` | String | Editorial narrative about the dish's origin. | "Carbonara's name comes from..." |
| `totalCalories` | Number | Integer sum of all ingredient calories. | 650 |
| `audience` | Array | Who this recipe is specifically curated for. | `["Couples", "Gourmet"]` |
