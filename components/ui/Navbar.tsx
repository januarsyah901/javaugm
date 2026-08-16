'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';

// Data Navigasi (Mudah diedit)
const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profile' },
    { name: 'Blog', href: '/blog' },
    // { name: 'Galeri', href: '/gallery' }, // Tambahan opsional
];

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
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

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen]);

    // Don't show navbar on dashboard
    if (pathname?.startsWith('/dashboard')) return null;

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200 py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* 1. Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="relative flex-shrink-0 rounded-full shadow-sm overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Logo Java UGM"
                                width={40}   // Setara w-10 (40px)
                                height={40}  // Setara h-10 (40px)
                                className="object-cover w-10 h-10" // Tetap beri class size untuk memastikan responsivitas
                                priority     // Tambahkan ini agar logo dimuat duluan (mencegah flickering)
                            />
                        </div>

                        <Link
                            href="/"
                            className={`font-bold text-xl tracking-tight transition-colors ${scrolled || pathname?.startsWith('/blog') ? 'text-zinc-800 dark:text-zinc-100' : 'text-white'
                                }`}
                        >
                            Java Al-'Alim
                        </Link>
                    </div>

                    {/* 2. Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative group text-sm font-medium transition-colors ${scrolled || pathname?.startsWith('/blog') ? 'text-zinc-800 dark:text-white' : 'text-white'
                                    }`}
                            >
                                {link.name}
                                {/* Animated Underline */}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled || pathname?.startsWith('/blog') ? 'bg-primary' : 'bg-white'}`}></span>
                            </Link>
                        ))}

                        {/* Dashboard Link for Logged-in Users */}
                        {session && (
                            <Link
                                href="/dashboard"
                                className={`relative group text-sm font-medium transition-colors ${scrolled || pathname?.startsWith('/blog') ? 'text-zinc-800 dark:text-white' : 'text-white'
                                    }`}
                            >
                                Dashboard
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled || pathname?.startsWith('/blog') ? 'bg-primary' : 'bg-white'}`}></span>
                            </Link>
                        )}

                        {/* Login Button - Updated to use session */}
                        {session ? (
                            <div className="flex items-center gap-4">
                                {session.user?.image && (
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700">
                                        <Image
                                            src={session.user.image}
                                            alt={session.user.name || "User"}
                                            width={32}
                                            height={32}
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <button
                                    onClick={() => signOut()}
                                    className="flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700"
                                >
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn('google')}
                                className="flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-primary"
                            >
                                <User size={16} />
                                <span>Login Pengurus</span>
                            </button>
                        )}
                    </div>

                    {/* 3. Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`min-h-11 min-w-11 p-2.5 rounded-md transition-colors ${scrolled || pathname?.startsWith('/blog')
                                ? 'text-zinc-600 hover:bg-zinc-100'
                                : 'text-white hover:bg-white/10'
                                }`}
                            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
                            aria-expanded={isOpen}
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
                            className="flex items-center min-h-11 p-3 rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    ))}

                    {/* Dashboard Link Mobile */}
                    {session && (
                        <Link
                            href="/dashboard"
                            className="flex items-center min-h-11 p-3 rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    )}

                    <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-900">
                        {session ? (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    signOut();
                                }}
                                className="flex w-full min-h-11 items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    signIn('google');
                                }}
                                className="flex w-full min-h-11 items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-emerald-800"
                            >
                                <User size={18} />
                                Login Pengurus
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
