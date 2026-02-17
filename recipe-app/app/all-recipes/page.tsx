import { recipes } from '@/lib/data';
import AllRecipes from '@/components/AllRecipes';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "All Recipes Index",
    description: "A complete list of all kitchen-tested recipes at Relish Realm. Discover every dish, from Italian classics to vegan delights.",
    alternates: {
        canonical: "/all-recipes",
    },
};

export default function AllRecipesPage() {
    return <AllRecipes recipes={recipes} />;
}
