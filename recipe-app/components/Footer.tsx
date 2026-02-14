import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full border-t border-border-soft bg-white py-20">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
                    <div className="col-span-1">
                        <Link href="/" className="text-3xl font-bold text-dark-olive font-sans tracking-tight">Relish Realm</Link>
                        <p className="mt-6 text-[16px] text-dark-olive/50 leading-relaxed font-sans">
                            Hi, I'm Chloe. I share my favorite family-tested recipes and kitchen stories,
                            crafted to bring a little magic back to your table.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-dark-olive/40 font-sans">By Continent</h3>
                        <ul className="mt-6 space-y-4">
                            <li><Link href="/asia-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Asia</Link></li>
                            <li><Link href="/europe-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Europe</Link></li>
                            <li><Link href="/africa-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Africa</Link></li>
                            <li><Link href="/america-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Americas</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-dark-olive/40 font-sans">By Diet</h3>
                        <ul className="mt-6 space-y-4">
                            <li><Link href="/vegan-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Vegan</Link></li>
                            <li><Link href="/vegetarian-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Vegetarian</Link></li>
                            <li><Link href="/gluten-free-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Gluten Free</Link></li>
                            <li><Link href="/dairy-free-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Dairy Free</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-dark-olive/40 font-sans">By Cuisine</h3>
                        <ul className="mt-6 space-y-4">
                            <li><Link href="/italian-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Italian</Link></li>
                            <li><Link href="/mexican-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Mexican</Link></li>
                            <li><Link href="/indian-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Indian</Link></li>
                            <li><Link href="/japanese-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Japanese</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-dark-olive/40 font-sans">By Meal Type</h3>
                        <ul className="mt-6 space-y-4">
                            <li><Link href="/breakfast-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Breakfast</Link></li>
                            <li><Link href="/lunch-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Lunch</Link></li>
                            <li><Link href="/dinner-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Dinner</Link></li>
                            <li><Link href="/dessert-recipes" className="text-[16px] font-medium text-dark-olive/60 hover:text-terracotta transition-colors hover:no-underline">Dessert</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-24 border-t border-sand/20 pt-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-8">
                            <Link href="/about" className="text-sm font-bold uppercase tracking-widest text-dark-olive/40 hover:text-terracotta transition-colors">About Us</Link>
                            <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-dark-olive/40 hover:text-terracotta transition-colors">Contact</Link>
                            <Link href="/privacy" className="text-sm font-bold uppercase tracking-widest text-dark-olive/40 hover:text-terracotta transition-colors">Privacy Policy</Link>
                        </div>
                        <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-dark-olive/20 font-sans">
                            &copy; {new Date().getFullYear()} Relish Realm. Developed for the curious palate.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
