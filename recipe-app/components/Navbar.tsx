'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories, groupTypeMetadata, GroupType } from '@/lib/data';

export default function Navbar() {
    const [isRecipesOpen, setIsRecipesOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<GroupType | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileRecipesOpen, setMobileRecipesOpen] = useState(false);
    const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<GroupType | null>(null);

    const recipeGroups = Object.entries(groupTypeMetadata).map(([type, meta]) => ({
        type: type as GroupType,
        label: `By ${meta.label}`,
        href: `/${meta.path}`
    }));

    const getSubMenuItems = (type: GroupType) => {
        return categories.filter(c => c.type === type);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileRecipesOpen(false);
        setMobileActiveSubmenu(null);
    };

    return (
        <nav className="sticky top-0 z-[1000] w-full bg-white/90 backdrop-blur-md border-b border-border-soft">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tight text-dark-olive font-sans hover:no-underline">Relish Realm</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden space-x-8 md:flex items-center">
                    <Link href="/" className="text-[16px] font-medium tracking-tight text-dark-olive/60 hover:text-dark-olive transition-colors hover:no-underline">Home</Link>
                    <Link href="/recipe-directory" className="text-[16px] font-medium tracking-tight text-dark-olive/60 hover:text-dark-olive transition-colors hover:no-underline">Directory</Link>
                    <Link href="/category" className="text-[16px] font-medium tracking-tight text-dark-olive/60 hover:text-dark-olive transition-colors hover:no-underline">Categories</Link>

                    {/* Recipes Dropdown */}
                    <div
                        className="relative group h-full flex items-center"
                        onMouseEnter={() => setIsRecipesOpen(true)}
                        onMouseLeave={() => {
                            setIsRecipesOpen(false);
                            setActiveSubmenu(null);
                        }}
                    >
                        <button
                            className="flex items-center gap-1 text-[16px] font-medium tracking-tight text-dark-olive/60 hover:text-dark-olive transition-colors"
                        >
                            Recipes
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-200 ${isRecipesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* First Level Dropdown Menu */}
                        <div className={`absolute top-full left-0 mt-0 w-64 origin-top-left rounded-b-2xl bg-white p-2 shadow-2xl border border-sand transition-all duration-200 ease-out ${isRecipesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                            {recipeGroups.map((group) => (
                                <div
                                    key={group.type}
                                    className="relative"
                                    onMouseEnter={() => setActiveSubmenu(group.type)}
                                >
                                    <Link
                                        href={group.href}
                                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-[16px] font-medium tracking-tight transition-all hover:no-underline ${activeSubmenu === group.type ? 'text-terracotta bg-sand/10' : 'text-dark-olive/60 hover:text-terracotta hover:bg-sand/10'}`}
                                    >
                                        {group.label}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>

                                    {/* Second Level (Sub-submenu) */}
                                    {activeSubmenu === group.type && (
                                        <div
                                            className="absolute right-full top-0 mr-1 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-sand animate-in fade-in slide-in-from-right-2 duration-200"
                                            onMouseLeave={() => setActiveSubmenu(null)}
                                        >
                                            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                                {getSubMenuItems(group.type).map((item) => (
                                                    <Link
                                                        key={item.slug}
                                                        href={`/${item.slug}-recipes`}
                                                        className="block rounded-xl px-4 py-3 text-[16px] font-medium text-dark-olive/60 hover:text-terracotta hover:bg-sand/10 transition-all hover:no-underline"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                ))}
                                                {getSubMenuItems(group.type).length === 0 && (
                                                    <span className="block px-4 py-3 text-[10px] text-dark-olive/40 font-serif">Coming soon...</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link href="/about" className="text-[16px] font-medium tracking-tight text-dark-olive/60 hover:text-dark-olive transition-colors hover:no-underline">About</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-dark-olive/60 hover:text-dark-olive transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden border-t border-border-soft bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-4 py-2 space-y-1">
                    <Link href="/" onClick={closeMenu} className="block py-3 text-base font-medium text-dark-olive/60 hover:text-dark-olive transition-colors hover:no-underline">
                        Home
                    </Link>
                    <Link href="/recipe-directory" onClick={closeMenu} className="block py-3 text-base font-medium text-dark-olive/60 hover:text-dark-olive transition-colors hover:no-underline">
                        Directory
                    </Link>
                    <Link href="/category" onClick={closeMenu} className="block py-3 text-base font-medium text-dark-olive/60 hover:text-dark-olive transition-colors hover:no-underline">
                        Categories
                    </Link>

                    {/* Mobile Recipes Accordion */}
                    <div className="border-t border-border-soft">
                        <button
                            onClick={() => setMobileRecipesOpen(!mobileRecipesOpen)}
                            className="flex items-center justify-between w-full py-3 text-base font-medium text-dark-olive/60 hover:text-dark-olive transition-colors"
                        >
                            Recipes
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${mobileRecipesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Mobile Recipe Groups */}
                        {mobileRecipesOpen && (
                            <div className="pl-4 space-y-1 pb-2">
                                <Link href="/recipes" onClick={closeMenu} className="block py-2 text-sm font-medium text-dark-olive/60 hover:text-dark-olive transition-colors hover:no-underline">
                                    All Recipes
                                </Link>
                                {recipeGroups.map((group) => (
                                    <div key={group.type} className="border-l-2 border-white/10 pl-3">
                                        <button
                                            onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === group.type ? null : group.type)}
                                            className="flex items-center justify-between w-full py-2 text-sm font-medium text-dark-olive/60 hover:text-dark-olive transition-colors"
                                        >
                                            {group.label}
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-200 ${mobileActiveSubmenu === group.type ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Mobile Sub-categories */}
                                        {mobileActiveSubmenu === group.type && (
                                            <div className="pl-3 space-y-1 max-h-[200px] overflow-y-auto">
                                                {getSubMenuItems(group.type).map((item) => (
                                                    <Link
                                                        key={item.slug}
                                                        href={`/${item.slug}-recipes`}
                                                        onClick={closeMenu}
                                                        className="block py-2 text-[13px] font-medium text-dark-olive/60 hover:text-dark-olive transition-colors hover:no-underline"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                ))}
                                                {getSubMenuItems(group.type).length === 0 && (
                                                    <span className="block py-2 text-[10px] text-dark-olive/30 font-sans">Coming soon...</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/about" onClick={closeMenu} className="block py-3 text-base font-medium text-dark-olive/60 hover:text-dark-olive transition-colors border-t border-border-soft hover:no-underline">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
