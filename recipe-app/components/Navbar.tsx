'use client';

import Link from 'next/link';
import { useState } from 'react';
import Pip from '@/components/Pip';

const links = [
    { href: '/all-recipes', label: 'Recipes' },
    { href: '/recipes-by-cuisines', label: 'Cuisines' },
    { href: '/recipes-by-dietary-choices', label: 'Dietary' },
    { href: '/recipe-directory', label: 'Collections' },
    { href: '/blog', label: 'Journal' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-[1000] w-full border-b border-line bg-white/90 backdrop-blur-xl" aria-label="Primary navigation">
            <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2.5 hover:no-underline" onClick={() => setIsOpen(false)}>
                    <Pip className="h-9 w-9" />
                    <span className="font-serif text-[1.35rem] font-bold text-ink">Relish Realm</span>
                </Link>

                <div className="hidden items-center gap-7 md:flex">
                    {links.map(link => (
                        <Link key={link.href} href={link.href} className="text-[0.93rem] font-medium text-ink transition hover:text-tomato hover:no-underline">
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <Link href="/all-recipes" className="flex min-w-[200px] items-center gap-2.5 rounded-full border border-line px-4 py-2 text-[0.85rem] text-muted hover:border-ink hover:no-underline">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
                        Search recipes…
                    </Link>
                    <Link href="/all-recipes" className="btn btn-ink hover:no-underline">Start cooking</Link>
                </div>

                <button type="button" onClick={() => setIsOpen(value => !value)} className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-ink text-ink md:hidden" aria-expanded={isOpen} aria-label="Toggle menu">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />}
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="border-t border-line bg-white px-4 py-4 md:hidden">
                    <div className="mx-auto flex max-w-[1180px] flex-col">
                        {links.map(link => (
                            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-cream hover:text-tomato hover:no-underline">
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/all-recipes" onClick={() => setIsOpen(false)} className="btn btn-ink mt-3 hover:no-underline">Start cooking</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
