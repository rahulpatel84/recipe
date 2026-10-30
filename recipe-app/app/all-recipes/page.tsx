import { recipes } from '@/lib/data';
import RecipeExplorer from '@/components/RecipeExplorer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Explore All Recipes",
    description: "Search and filter every plant based recipe at Relish Realm by ingredient, cuisine, diet, meal type and difficulty.",
    alternates: {
        canonical: "/all-recipes",
    },
};

export default function AllRecipesPage() {
    return <RecipeExplorer recipes={recipes} />;
}
