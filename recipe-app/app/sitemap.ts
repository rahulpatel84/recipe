import { Metadata, ResolvingMetadata } from 'next';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { recipes, categories, groupTypeMetadata, getGroupByType, getCategoryByItemSlug, GroupType } from '@/lib/data';

const BASE_URL = 'https://relishrealm.com';

export default function sitemap(): MetadataRoute.Sitemap {
    // 1. Static Pages
    const statics = [
        '',
        '/about',
        '/category',
        '/recipes',
        '/all-recipes',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    // 2. Recipe Pages
    const recipeRoutes = recipes.map((recipe) => ({
        url: `${BASE_URL}/${recipe.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // 3. Category Pages (e.g., /italian-recipes)
    const categoryRoutes = categories.map((category) => ({
        url: `${BASE_URL}/${category.slug}-recipes`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 4. Group Pages (e.g., /recipes-by-cuisines)
    const groupRoutes = Object.values(groupTypeMetadata).map((meta) => ({
        url: `${BASE_URL}/${meta.path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    return [...statics, ...recipeRoutes, ...categoryRoutes, ...groupRoutes];
}
