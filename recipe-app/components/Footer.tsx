import Link from 'next/link';
import Pip from '@/components/Pip';

const footerLinks = [
    { title: 'Explore', links: [['All recipes', '/all-recipes'], ['Cuisines', '/recipes-by-cuisines'], ['Collections', '/recipe-directory'], ['Journal', '/blog']] },
    { title: 'Diet', links: [['Vegan', '/vegan-recipes'], ['Vegetarian', '/vegetarian-recipes'], ['Gluten free', '/recipes-by-dietary-choices'], ['Breakfast', '/breakfast-recipes']] },
    { title: 'About', links: [['Our test kitchen', '/about'], ['Contact', '/contact'], ['Privacy', '/privacy'], ['Terms', '/terms']] },
];

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-line">
            <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
                <div>
                    <Link href="/" className="flex items-center gap-2.5 hover:no-underline">
                        <Pip className="h-9 w-9" />
                        <span className="font-serif text-[1.35rem] font-bold text-ink">Relish Realm</span>
                    </Link>
                    <p className="mt-3 max-w-[300px] text-[0.93rem] leading-6 text-muted">
                        Modern recipes, timeless flavours. Tested in real kitchens, written for real people.
                    </p>
                </div>

                {footerLinks.map(group => (
                    <div key={group.title}>
                        <h4 className="mb-3.5 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-muted">{group.title}</h4>
                        <ul>
                            {group.links.map(([label, href]) => (
                                <li key={href} className="py-1 text-[0.93rem]">
                                    <Link href={href} className="hover:text-tomato hover:no-underline">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="col-span-full mt-6 flex flex-col gap-2 border-t border-line pt-6 text-[0.82rem] text-muted sm:flex-row sm:items-center sm:justify-between">
                    <span>© {new Date().getFullYear()} Relish Realm</span>
                    <div className="flex flex-wrap gap-5">
                        <Link href="/cookie-policy">Cookies</Link>
                        <a href="/sitemap.xml">Sitemap</a>
                        <span>Made with too much garlic.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
