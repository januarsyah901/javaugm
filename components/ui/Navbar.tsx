'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronRight, User } from 'lucide-react';
import { useState, useEffect } from 'react';

// Data Navigasi (Mudah diedit)
const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profile' },
    { name: 'Blog & Dakwah', href: '/blog' },
    // { name: 'Galeri', href: '/gallery' }, // Tambahan opsional
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Efek untuk mendeteksi scroll (mengubah style navbar)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-lg border-b border-zinc-200/50 dark:border-zinc-800/50 py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* 1. Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        {/* Logo Image */}
                        <div className="relative w-10 h-10 overflow-hidden rounded-full shadow-sm">
                            <Image
                                src="/logo.png"
                                alt="Logo JAVA UGM"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <Link
                            href="/"
                            className={`font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-zinc-800 dark:text-zinc-100' : 'text-zinc-800 dark:text-white'
                                }`}
                        >
                            JAVA <span className="text-primary">Al-'Alim</span>
                        </Link>
                    </div>

                    {/* 2. Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative group text-sm font-medium transition-colors ${scrolled ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-700 dark:text-zinc-200'
                                    } hover:text-primary dark:hover:text-primary`}
                            >
                                {link.name}
                                {/* Animated Underline */}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}

                        {/* Login Button */}
                        <Link
                            href="/login"
                            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <User size={16} />
                            <span>Login Pengurus</span>
                        </Link>
                    </div>

                    {/* 3. Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md transition-colors ${scrolled
                                    ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                    : 'text-zinc-800 dark:text-zinc-100 hover:bg-white/10'
                                }`}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. Mobile Menu Dropdown (Animated) */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 shadow-xl transition-all duration-300 ease-in-out origin-top ${isOpen
                        ? 'opacity-100 scale-y-100 translate-y-0 visible'
                        : 'opacity-0 scale-y-95 -translate-y-2 invisible'
                    }`}
            >
                <div className="px-4 py-6 space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center justify-between p-3 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-primary dark:hover:text-primary transition-all group"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="font-medium">{link.name}</span>
                            <ChevronRight size={16} className="text-zinc-400 group-hover:text-primary transition-colors" />
                        </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-900">
                        <Link
                            href="/login"
                            className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
                            onClick={() => setIsOpen(false)}
                        >
                            <User size={18} />
                            Login Pengurus
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}