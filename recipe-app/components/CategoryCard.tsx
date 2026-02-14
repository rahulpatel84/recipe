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
            className="group relative overflow-hidden rounded-xl bg-white border border-border-soft recipe-hover aspect-square"
        >
            <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 transition-all"
                sizes="(max-width: 768px) 50vw, 20vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark-olive/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider bg-dark-olive/60 px-2 py-1 backdrop-blur-sm inline-block rounded-md">
                    {category.title}
                </h3>
            </div>
        </Link>
    );
}
