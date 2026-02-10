'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 dark:bg-zinc-900/80 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            JAVA Fathul Afaq
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-zinc-600 hover:text-primary transition-colors dark:text-zinc-300">
                            Beranda
                        </Link>
                        <Link href="/profile" className="text-zinc-600 hover:text-primary transition-colors dark:text-zinc-300">
                            Profil
                        </Link>
                        <Link href="/blog" className="text-zinc-600 hover:text-primary transition-colors dark:text-zinc-300">
                            Blog
                        </Link>
                        <Link
                            href="/login"
                            className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
                        >
                            Login Pengurus
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-zinc-600 hover:text-primary focus:outline-none dark:text-zinc-300"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 hover:text-primary hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            onClick={() => setIsOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/profile"
                            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 hover:text-primary hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            onClick={() => setIsOpen(false)}
                        >
                            Profil
                        </Link>
                        <Link
                            href="/blog"
                            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 hover:text-primary hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/login"
                            className="block w-full text-center mt-4 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Login Pengurus
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
