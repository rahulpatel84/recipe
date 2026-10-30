import Link from 'next/link';
import Pip from '@/components/Pip';

const footerLinks = [
    { title: 'Explore', links: [['All recipes', '/all-recipes'], ['Cuisines', '/recipes-by-cuisines'], ['Collections', '/recipe-directory'], ['Blog', '/blog']] },
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
                        Plant based cooking from around the world. Every recipe here is written out in full,
                        including the parts that go wrong.
                    </p>
                    <a
                        href="https://uk.pinterest.com/relishrealm/"
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-muted transition hover:text-[#E60023] hover:no-underline"
                    >
                        <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                        </svg>
                        Follow on Pinterest
                    </a>
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
