import { recipes, categories, groupTypeMetadata, getGroupByType, getCategoryByItemSlug, GroupType } from '@/lib/data';
import { generateRecipeSchema } from '@/lib/schema';
import { notFound } from 'next/navigation';
import RecipeDetail from '@/components/RecipeDetail';
import GroupPage from '@/components/GroupPage';
import ItemPage from '@/components/ItemPage';
import AllRecipes from '@/components/AllRecipes';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    if (slug === 'all-recipes') {
        return {
            title: "All Recipes Index",
            description: "A complete list of all kitchen-tested recipes at Relish Realm. Discover every dish, from Italian classics to vegan delights.",
            alternates: {
                canonical: "/all-recipes",
            },
        };
    }

    // 1. Group Page (e.g., /recipes-by-cuisines)
    const groupMatch = getGroupByType(slug);
    if (groupMatch) {
        const title = groupMatch[1].label;
        const fullTitle = `${title} | Relish Realm`;
        const description = `Explore our collection of recipes organized by ${groupMatch[1].plural}. Discover dishes from around the world.`;
        return {
            title,
            description,
            openGraph: {
                title: fullTitle,
                description,
                url: `/${slug}`,
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: fullTitle,
                description,
            },
            alternates: {
                canonical: `/${slug}`,
            },
        };
    }

    // 2. Item Page (Category, e.g., /italian-recipes)
    const categoryMatch = getCategoryByItemSlug(slug);
    if (categoryMatch) {
        const title = `${categoryMatch.title} Recipes`;
        const fullTitle = `${title} | Relish Realm`;
        const description = `Discover delicious ${categoryMatch.title.toLowerCase()} recipes. Kitchen-tested dishes and cooking inspiration for your next meal.`;
        return {
            title,
            description,
            openGraph: {
                title: fullTitle,
                description,
                url: `/${slug}`,
                type: "website",
                images: categoryMatch.image ? [categoryMatch.image] : undefined,
            },
            twitter: {
                card: "summary_large_image",
                title: fullTitle,
                description,
                images: categoryMatch.image ? [categoryMatch.image] : undefined,
            },
            alternates: {
                canonical: `/${slug}`,
            },
        };
    }

    // 3. Recipe Page (e.g., /spaghetti-carbonara)
    const recipe = recipes.find((r) => r.slug === slug);
    if (recipe) {
        // Avoid "Recipe Recipe" if title already ends with "Recipe"
        const title = recipe.title.toLowerCase().endsWith('recipe')
            ? recipe.title
            : `${recipe.title} Recipe`;
        const fullTitle = `${title} | Relish Realm`;
        const description = recipe.description || `Learn how to make ${recipe.title} with our easy-to-follow, kitchen-tested recipe.`;
        return {
            title,
            description,
            keywords: [recipe.title, recipe.cuisine, recipe.category, ...recipe.dietary, recipe.mealType].filter(Boolean),
            openGraph: {
                title: fullTitle,
                description,
                url: `/${slug}`,
                type: "article",
                images: [
                    {
                        url: recipe.image,
                        width: 1200,
                        height: 630,
                        alt: recipe.title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: fullTitle,
                description,
                images: [recipe.image],
            },
            alternates: {
                canonical: `/${slug}`,
            },
        };
    }

    return {
        title: 'Page Not Found',
        description: 'The page you are looking for could not be found.',
    };
}

export async function generateStaticParams() {
    const recipeParams = recipes.map((recipe) => ({
        slug: recipe.slug,
    }));

    const itemParams = categories.map((category) => ({
        slug: `${category.slug}-recipes`,
    }));

    const groupParams = Object.values(groupTypeMetadata).map((meta) => ({
        slug: meta.path,
    }));

    return [
        { slug: 'all-recipes' },
        ...recipeParams,
        ...itemParams,
        ...groupParams
    ];
}

export default async function UniversalRoutePage({ params }: Props) {
    const { slug } = await params;

    // 0. Check if it's the All Recipes index page
    if (slug === 'all-recipes') {
        return <AllRecipes recipes={recipes} />;
    }

    // 1. Check if it's a Group Page (e.g., /recipes-by-continents)
    const groupMatch = getGroupByType(slug);
    if (groupMatch) {
        return <GroupPage type={groupMatch[0] as GroupType} />;
    }

    // 2. Check if it's an Item Page (e.g., /indian-recipes)
    const categoryMatch = getCategoryByItemSlug(slug);
    if (categoryMatch) {
        return <ItemPage category={categoryMatch} />;
    }

    // 3. Check if it's a Recipe Page (e.g., /spaghetti-carbonara)
    const recipe = recipes.find((r) => r.slug === slug);
    if (recipe) {
        const recipeSchema = generateRecipeSchema(recipe);
        const relatedRecipes = recipes
            .filter((r) => r.id !== recipe.id && (r.category === recipe.category || r.cuisine === recipe.cuisine))
            .slice(0, 3);
        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
                />
                <RecipeDetail recipe={recipe} relatedRecipes={relatedRecipes} />
            </>
        );
    }

    // 4. Default to 404
    notFound();
}
