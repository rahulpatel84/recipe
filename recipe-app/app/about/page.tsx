import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Chloe, the mom behind Relish Realm. Every recipe is manually vetted, kitchen-tested, and shared with love. Discover our story and cooking philosophy.",
  openGraph: {
    title: "About Us | Relish Realm",
    description: "Meet Chloe, the mom behind Relish Realm. Every recipe is manually vetted, kitchen-tested, and shared with love.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Relish Realm",
    description: "Meet Chloe, the mom behind Relish Realm. Every recipe is manually vetted, kitchen-tested, and shared with love.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
            {/* Story Header */}
            <header className="mb-20 text-center max-w-4xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta mb-6 block">Our Kitchen Story</span>
                <h1 className="text-5xl md:text-7xl font-sans font-bold text-dark-olive leading-[1.1] tracking-tight mb-8">
                    Tested in My Kitchen, <br />
                    <span className="text-terracotta">Shared at Your Table.</span>
                </h1>
                <p className="text-lg md:text-xl text-dark-olive/50 font-sans leading-relaxed mb-12">
                    Welcome to Relish Realm. I'm Chloe—a mother of two and a passionate home cook
                    who manually vets, tests, and shares every recipe you see here.
                    I believe that good food should be simple, reliable, and above all,
                    made to be enjoyed with the people you love.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-dark-olive/30 mb-2 block">Let's Stay Connected</span>
                    <div className="flex items-center gap-8">
                        {/* Social Icons (Simplified for brevity in replacement) */}
                        <a href="#" className="text-dark-olive/40 hover:text-terracotta transition-all hover:-translate-y-1 transform pr-2" title="Instagram">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href="#" className="text-dark-olive/40 hover:text-terracotta transition-all hover:-translate-y-1 transform pr-2" title="Facebook">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
                        </a>
                        <a href="#" className="text-dark-olive/40 hover:text-terracotta transition-all hover:-translate-y-1 transform pr-2" title="Pinterest">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.164 0 7.399 2.967 7.399 6.935 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.033-1.002 2.324-1.492 3.12 1.12.348 2.311.535 3.546.535 6.627 0 12-5.373 12-12s-5.373-12-12-12z" /></svg>
                        </a>
                    </div>
                </div>
            </header>

            {/* 1. Who I Am: The Dream */}
            <div className="mb-32 max-w-4xl mx-auto text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta mb-6 block">The Vision</span>
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-dark-olive mb-8">Who I Am</h2>
                <p className="text-xl text-dark-olive/60 font-sans leading-relaxed">
                    For as long as I can remember, I dreamed of a single place where I could find
                    exactly what I needed to cook, without the clutter. I wanted a recipe
                    directory that was more than just a list—a searchable, organized home for
                    flavor that felt personal yet professional. Relish Realm is the realization
                    of that dream, a project I've personally poured my heart into to ensure
                    every search leads to a successful meal at your table.
                </p>
            </div>

            {/* 2. Mom Managed: The Reality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-xl border border-border-soft group">
                    <Image
                        src="/image1.jpeg"
                        alt="Me in my home kitchen"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                    />
                </div>
                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-sans font-bold text-dark-olive mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-terracotta"></span>
                            The Mom Behind the Screen
                        </h2>
                        <p className="text-lg text-dark-olive/60 font-sans leading-relaxed">
                            I manaully check every recipe, every instruction, and every measurement.
                            Being a mom means I don't have time for recipes that don't work.
                            Every single post on this database is manually uploaded and reviewed.
                            I don't believe in automated content—I believe in the human touch
                            that makes a recipe feel like home.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-sans font-bold text-dark-olive mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-terracotta"></span>
                            Our Testing Process
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <span className="font-bold text-terracotta italic text-lg">01.</span>
                                <div>
                                    <p className="font-bold text-dark-olive">Manual Vetting</p>
                                    <p className="text-dark-olive/60 font-sans">Every flavor profile is tested first in my own home kitchen.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold text-terracotta italic text-lg">02.</span>
                                <div>
                                    <p className="font-bold text-dark-olive">Instruction Clarity</p>
                                    <p className="text-dark-olive/60 font-sans">We break down complex techniques into manageable, family-friendly steps.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold text-terracotta italic text-lg">03.</span>
                                <div>
                                    <p className="font-bold text-dark-olive">Data Audits</p>
                                    <p className="text-dark-olive/60 font-sans">Regular reviews to ensure ingredients are accessible and nutritionally balanced.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* 3. Kitchen Tested: The Commitment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                <div className="order-2 md:order-1 space-y-12">
                    <section>
                        <h2 className="text-3xl font-sans font-bold text-dark-olive mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-terracotta"></span>
                            Kitchen Tested
                        </h2>
                        <p className="text-lg text-dark-olive/60 font-sans leading-relaxed mb-8">
                            I'm not a professional chef, but I am a professional at feeding a family.
                            I've spent years refining these blueprints so you don't have to
                            guess. My kitchen is my laboratory, and my family is the ultimate quality control.
                        </p>
                        <div className="bg-sage/5 border border-sage/20 rounded-2xl p-8 italic text-dark-olive/70">
                            "If my kids won't eat it, it doesn't make it to the site. It's the simplest and
                            toughest quality standard I have."
                        </div>
                    </section>
                </div>
                <div className="order-1 md:order-2 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-xl border border-border-soft group">
                    <Image
                        src="/image2.jpeg"
                        alt="Cooking in the kitchen"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>

            {/* My Kitchen Section */}
            <section className="mb-32">
                <header className="mb-16 text-center max-w-2xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta mb-4 block">The Creative Space</span>
                    <h2 className="text-4xl font-sans font-bold text-dark-olive mb-6">My Kitchen</h2>
                    <p className="text-lg text-dark-olive/50 font-sans leading-relaxed">
                        This is where the magic happens. From the early morning light hitting the counters
                        to the organized chaos of a dinner party, my kitchen is the soul of my home.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6 md:mt-12">
                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-border-soft group">
                            <Image
                                src="/SCR-20260117-uoih.jpeg"
                                alt="Modern Stove"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <h4 className="text-lg font-sans font-bold text-dark-olive">Where Flavors Ignite</h4>
                        <p className="text-sm text-dark-olive/60 leading-relaxed font-sans">The trusty stove that transforms simple ingredients into family memories.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-border-soft group">
                            <Image
                                src="/SCR-20260117-upal.jpeg"
                                alt="Organized Cutlery"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <h4 className="text-lg font-sans font-bold text-dark-olive">The Secret is Order</h4>
                        <p className="text-sm text-dark-olive/60 leading-relaxed font-sans">A little bit of organization goes a long way in making cooking a joy.</p>
                    </div>
                </div>
            </section>

            {/* Values Section - Cute Style */}
            <section className="bg-dark-olive text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-terracotta/20 flex items-center justify-center text-terracotta text-xl font-bold">1</div>
                            <h4 className="text-xl font-sans font-bold">Tested & True</h4>
                            <p className="text-white/40 leading-relaxed font-sans">Every recipe here has been cooked in my actual kitchen, served to my actual family, and approved by my picky kids.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-terracotta/20 flex items-center justify-center text-terracotta text-xl font-bold">2</div>
                            <h4 className="text-xl font-sans font-bold">Mom-Approved Speed</h4>
                            <p className="text-white/40 leading-relaxed font-sans">I know you're busy. My recipes focus on efficiency without sacrificing that deep, slow-cooked flavor we all love.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-terracotta/20 flex items-center justify-center text-terracotta text-xl font-bold">3</div>
                            <h4 className="text-xl font-sans font-bold">A Personal Touch</h4>
                            <p className="text-white/40 leading-relaxed font-sans">I don't just give you steps; I give you the 'why' and the 'how' through my notes, helping you become a better cook.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Sign-off */}
            <footer className="mt-32 text-center pb-20 max-w-2xl mx-auto">
                <p className="text-2xl font-sans font-bold text-dark-olive mb-8">
                    Let's cook something <span className="text-terracotta">beautiful</span> together.
                </p>
                <div className="flex flex-col items-center gap-10">
                    <div className="flex justify-center gap-6">
                        <Link
                            href="/recipes"
                            className="inline-flex items-center justify-center rounded-xl bg-dark-olive px-8 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-terracotta transition-all hover:shadow-lg active:scale-95"
                        >
                            Browse My Recipes
                        </Link>
                    </div>

                    <div className="pt-8 border-t border-border-soft w-full flex flex-col items-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-dark-olive/30 mb-8 block">Follow My Journey</span>
                        <div className="flex items-center gap-8">
                            <a href="#" className="text-dark-olive/40 hover:text-terracotta transition-all hover:-translate-y-1 transform pr-2" title="Instagram">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="#" className="text-dark-olive/40 hover:text-terracotta transition-all hover:-translate-y-1 transform pr-2" title="Facebook">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                </svg>
                            </a>
                            <a href="#" className="text-dark-olive/40 hover:text-terracotta transition-all hover:-translate-y-1 transform pr-2" title="TikTok">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.16 1.02.16 2.13.84 2.9.67.76 1.61 1.25 2.62 1.36.46.04.93.04 1.39-.01 1.11-.11 2.2-.74 2.82-1.67.36-.5.58-1.11.64-1.74.07-2.13.06-4.25.06-6.37.01-4.87-.01-9.74.02-14.61z" />
                                </svg>
                            </a>
                            <a href="#" className="text-dark-olive/40 hover:text-terracotta transition-all hover:-translate-y-1 transform" title="Pinterest">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.164 0 7.399 2.967 7.399 6.935 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.033-1.002 2.324-1.492 3.12 1.12.348 2.311.535 3.546.535 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
