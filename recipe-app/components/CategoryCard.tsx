import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/lib/data';

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link
            href={`/${category.slug}-recipes`}
            className="recipe-hover group relative aspect-square overflow-hidden rounded-card border border-line bg-white hover:no-underline"
        >
            <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 transition-all"
                sizes="(max-width: 768px) 50vw, 20vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/55 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
                <h3 className="inline-block rounded-full bg-white px-3 py-1 font-serif text-[0.95rem] text-ink">
                    {category.title}
                </h3>
            </div>
        </Link>
    );
}
