import { recipes, categories, groupTypeMetadata, GroupType } from '@/lib/data';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Recipe Directory - Complete Recipe Index",
    description: "Browse our complete directory of kitchen-tested recipes. Find recipes by cuisine, meal type, dietary preference, and more. Your gateway to discovering delicious dishes from around the world.",
    keywords: [
        "recipe directory",
        "recipe index",
        "all recipes",
        "recipe collection",
        "cooking recipes",
        "food recipes",
        "italian recipes",
        "mexican recipes",
        "indian recipes",
        "vegan recipes",
        "vegetarian recipes",
        "breakfast recipes",
        "dinner recipes",
        "healthy recipes"
    ],
    alternates: {
        canonical: "/recipe-directory",
    },
    openGraph: {
        title: "Recipe Directory - Complete Recipe Index | Relish Realm",
        description: "Browse our complete directory of kitchen-tested recipes organized by cuisine, meal type, and dietary preference.",
        url: "/recipe-directory",
        type: "website",
    },
};

// Generate schema for the directory page
function generateDirectorySchema() {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Recipe Directory - Relish Realm",
        "description": "Complete directory of all recipes at Relish Realm, organized by cuisine, meal type, and dietary preferences.",
        "url": "https://relishrealm.com/recipe-directory",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": recipes.map((recipe, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": recipe.title,
                "url": `https://relishrealm.com/${recipe.slug}`
            }))
        }
    };
}

export default function RecipeDirectoryPage() {
    // Group recipes by various criteria for comprehensive linking
    const recipesByCuisine = recipes.reduce((acc, recipe) => {
        const cuisine = recipe.cuisine || 'Other';
        if (!acc[cuisine]) acc[cuisine] = [];
        acc[cuisine].push(recipe);
        return acc;
    }, {} as Record<string, typeof recipes>);

    const recipesByMealType = recipes.reduce((acc, recipe) => {
        const mealType = recipe.mealType || 'Other';
        if (!acc[mealType]) acc[mealType] = [];
        acc[mealType].push(recipe);
        return acc;
    }, {} as Record<string, typeof recipes>);

    const recipesByDietary = recipes.reduce((acc, recipe) => {
        if (recipe.dietary.length === 0) {
            if (!acc['Regular']) acc['Regular'] = [];
            acc['Regular'].push(recipe);
        } else {
            recipe.dietary.forEach(diet => {
                if (!acc[diet]) acc[diet] = [];
                acc[diet].push(recipe);
            });
        }
        return acc;
    }, {} as Record<string, typeof recipes>);

    const cuisines = Object.keys(recipesByCuisine).sort();
    const mealTypes = Object.keys(recipesByMealType).sort();
    const dietaryOptions = Object.keys(recipesByDietary).sort();

    // Get category pages for each group type
    const categoryGroups = (Object.keys(groupTypeMetadata) as GroupType[]).map(type => ({
        type,
        label: groupTypeMetadata[type].label,
        path: groupTypeMetadata[type].path,
        categories: categories.filter(c => c.type === type)
    }));

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateDirectorySchema()) }}
            />
            <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
                {/* Header */}
                <header className="mb-16 border-b border-border-soft pb-8">
                    <h1 className="text-4xl md:text-5xl font-sans font-bold text-dark-olive leading-tight tracking-tight">
                        Recipe Directory
                    </h1>
                    <p className="mt-4 text-lg text-dark-olive/60 font-sans leading-relaxed max-w-3xl">
                        Welcome to our complete recipe index. This directory contains every recipe in our collection,
                        organized for easy discovery. Whether you&apos;re searching for a specific cuisine, meal type,
                        or dietary preference, you&apos;ll find it here.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4 text-sm">
                        <span className="px-4 py-2 bg-sage/10 rounded-full text-dark-olive/70 font-medium">
                            {recipes.length} Total Recipes
                        </span>
                        <span className="px-4 py-2 bg-terracotta/10 rounded-full text-dark-olive/70 font-medium">
                            {cuisines.length} Cuisines
                        </span>
                        <span className="px-4 py-2 bg-sand/30 rounded-full text-dark-olive/70 font-medium">
                            {categories.length} Categories
                        </span>
                    </div>
                </header>

                {/* Quick Navigation */}
                <nav className="mb-16 p-6 bg-soft-gray rounded-2xl border border-border-soft">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-dark-olive/40 mb-4">
                        Quick Navigation
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <a href="#all-recipes" className="text-sm font-medium text-terracotta hover:underline">All Recipes</a>
                        <span className="text-dark-olive/20">|</span>
                        <a href="#by-cuisine" className="text-sm font-medium text-terracotta hover:underline">By Cuisine</a>
                        <span className="text-dark-olive/20">|</span>
                        <a href="#by-meal-type" className="text-sm font-medium text-terracotta hover:underline">By Meal Type</a>
                        <span className="text-dark-olive/20">|</span>
                        <a href="#by-dietary" className="text-sm font-medium text-terracotta hover:underline">By Dietary</a>
                        <span className="text-dark-olive/20">|</span>
                        <a href="#category-pages" className="text-sm font-medium text-terracotta hover:underline">Category Pages</a>
                    </div>
                </nav>

                {/* All Recipes - Complete List */}
                <section id="all-recipes" className="mb-20">
                    <h2 className="text-2xl font-sans font-bold text-dark-olive mb-2">
                        Complete Recipe List
                    </h2>
                    <p className="text-sm text-dark-olive/50 mb-8">
                        Every recipe in our collection, listed alphabetically.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...recipes].sort((a, b) => a.title.localeCompare(b.title)).map((recipe) => (
                            <Link
                                key={recipe.id}
                                href={`/${recipe.slug}`}
                                className="group p-4 rounded-xl border border-border-soft hover:border-terracotta hover:bg-sand/5 transition-all"
                            >
                                <h3 className="font-medium text-dark-olive group-hover:text-terracotta transition-colors">
                                    {recipe.title}
                                </h3>
                                <p className="text-xs text-dark-olive/40 mt-1">
                                    {recipe.cuisine} • {recipe.mealType} • {recipe.prepTime || 'Quick'}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* By Cuisine */}
                <section id="by-cuisine" className="mb-20">
                    <h2 className="text-2xl font-sans font-bold text-dark-olive mb-2">
                        Recipes by Cuisine
                    </h2>
                    <p className="text-sm text-dark-olive/50 mb-8">
                        Explore recipes organized by their culinary tradition.
                    </p>
                    <div className="space-y-8">
                        {cuisines.map((cuisine) => (
                            <div key={cuisine} className="border-l-4 border-terracotta pl-6">
                                <h3 className="text-lg font-bold text-dark-olive mb-3">
                                    {cuisine} Recipes
                                    <Link
                                        href={`/${cuisine.toLowerCase()}-recipes`}
                                        className="ml-3 text-sm font-normal text-terracotta hover:underline"
                                    >
                                        View all →
                                    </Link>
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {recipesByCuisine[cuisine].map((recipe) => (
                                        <li key={recipe.id}>
                                            <Link
                                                href={`/${recipe.slug}`}
                                                className="text-dark-olive/70 hover:text-terracotta transition-colors"
                                            >
                                                {recipe.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* By Meal Type */}
                <section id="by-meal-type" className="mb-20">
                    <h2 className="text-2xl font-sans font-bold text-dark-olive mb-2">
                        Recipes by Meal Type
                    </h2>
                    <p className="text-sm text-dark-olive/50 mb-8">
                        Find the perfect recipe for any time of day.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {mealTypes.map((mealType) => (
                            <div key={mealType} className="p-6 bg-soft-gray rounded-xl">
                                <h3 className="text-lg font-bold text-dark-olive mb-3">
                                    {mealType}
                                    <Link
                                        href={`/${mealType.toLowerCase()}-recipes`}
                                        className="ml-3 text-sm font-normal text-terracotta hover:underline"
                                    >
                                        View all →
                                    </Link>
                                </h3>
                                <ul className="space-y-2">
                                    {recipesByMealType[mealType].map((recipe) => (
                                        <li key={recipe.id}>
                                            <Link
                                                href={`/${recipe.slug}`}
                                                className="text-dark-olive/70 hover:text-terracotta transition-colors"
                                            >
                                                {recipe.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* By Dietary Preference */}
                <section id="by-dietary" className="mb-20">
                    <h2 className="text-2xl font-sans font-bold text-dark-olive mb-2">
                        Recipes by Dietary Preference
                    </h2>
                    <p className="text-sm text-dark-olive/50 mb-8">
                        Recipes that fit your dietary needs and lifestyle.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dietaryOptions.map((dietary) => (
                            <div key={dietary} className="p-5 border border-border-soft rounded-xl hover:border-sage transition-colors">
                                <h3 className="text-base font-bold text-dark-olive mb-3">
                                    {dietary}
                                </h3>
                                <ul className="space-y-1">
                                    {recipesByDietary[dietary].slice(0, 5).map((recipe) => (
                                        <li key={recipe.id}>
                                            <Link
                                                href={`/${recipe.slug}`}
                                                className="text-sm text-dark-olive/70 hover:text-terracotta transition-colors"
                                            >
                                                {recipe.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                {recipesByDietary[dietary].length > 5 && (
                                    <p className="mt-2 text-xs text-dark-olive/40">
                                        +{recipesByDietary[dietary].length - 5} more recipes
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Category Pages */}
                <section id="category-pages" className="mb-20">
                    <h2 className="text-2xl font-sans font-bold text-dark-olive mb-2">
                        Browse Category Pages
                    </h2>
                    <p className="text-sm text-dark-olive/50 mb-8">
                        Explore our organized category pages to find exactly what you&apos;re looking for.
                    </p>
                    <div className="space-y-10">
                        {categoryGroups.map((group) => (
                            <div key={group.type}>
                                <h3 className="text-lg font-bold text-terracotta mb-4 flex items-center gap-3">
                                    <Link href={`/${group.path}`} className="hover:underline">
                                        Recipes by {group.label}
                                    </Link>
                                    <span className="text-xs font-normal text-dark-olive/40">
                                        ({group.categories.length} categories)
                                    </span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.categories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={`/${cat.slug}-recipes`}
                                            className="px-4 py-2 text-sm bg-soft-gray hover:bg-sand/30 rounded-full text-dark-olive/70 hover:text-dark-olive transition-all"
                                        >
                                            {cat.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Site Navigation Links */}
                <section className="mb-16 p-8 bg-dark-olive/5 rounded-2xl">
                    <h2 className="text-xl font-bold text-dark-olive mb-6">
                        Explore More
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/" className="p-4 bg-white rounded-xl hover:shadow-md transition-shadow text-center">
                            <span className="block font-medium text-dark-olive">Home</span>
                            <span className="text-xs text-dark-olive/40">Back to homepage</span>
                        </Link>
                        <Link href="/recipes" className="p-4 bg-white rounded-xl hover:shadow-md transition-shadow text-center">
                            <span className="block font-medium text-dark-olive">Recipe Library</span>
                            <span className="text-xs text-dark-olive/40">Featured recipes</span>
                        </Link>
                        <Link href="/category" className="p-4 bg-white rounded-xl hover:shadow-md transition-shadow text-center">
                            <span className="block font-medium text-dark-olive">Categories</span>
                            <span className="text-xs text-dark-olive/40">Browse taxonomy</span>
                        </Link>
                        <Link href="/about" className="p-4 bg-white rounded-xl hover:shadow-md transition-shadow text-center">
                            <span className="block font-medium text-dark-olive">About Us</span>
                            <span className="text-xs text-dark-olive/40">Our story</span>
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="pt-12 border-t border-border-soft text-center">
                    <p className="text-sm text-dark-olive/40">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-dark-olive/40 hover:text-terracotta transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        Back to Home
                    </Link>
                </footer>
            </main>
        </>
    );
}
