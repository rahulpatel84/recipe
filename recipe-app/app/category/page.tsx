import { categories, groupTypeMetadata, GroupType } from '@/lib/data';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Browse Categories",
  description: "Explore our recipe taxonomy organized by cuisines, continents, dietary choices, meal types, and more. Find the perfect recipe category for your next meal.",
  openGraph: {
    title: "Browse Categories | Relish Realm",
    description: "Explore our recipe taxonomy organized by cuisines, continents, dietary choices, meal types, and more.",
    url: "/category",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Categories | Relish Realm",
    description: "Explore our recipe taxonomy organized by cuisines, continents, dietary choices, meal types, and more.",
  },
  alternates: {
    canonical: "/category",
  },
};

export default function CategoryPage() {
    const categoryGroups = Object.entries(groupTypeMetadata).map(([type, meta]) => ({
        title: meta.label,
        type: type as GroupType,
        path: meta.path
    }));

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-sans font-bold text-dark-olive tracking-tight">Browse Taxonomy</h1>
                <p className="mt-4 text-sm text-dark-olive/40 font-sans uppercase tracking-wider">Structured categorization of all culinary data</p>
            </div>

            <div className="space-y-16">
                {categoryGroups.map((group) => (
                    <section key={group.title}>
                        <div className="flex items-center justify-between mb-8 border-b border-border-soft pb-4">
                            <h2 className="text-xl font-sans font-bold text-dark-olive uppercase tracking-wider">
                                {group.title}
                            </h2>
                            <Link href={`/${group.path}`} className="text-xs font-bold text-terracotta uppercase tracking-wider hover:underline">
                                Browse details →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {categories
                                .filter((cat) => cat.type === group.type)
                                .map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
