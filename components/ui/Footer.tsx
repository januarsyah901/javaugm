'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Mail, Instagram, ArrowRight, Youtube } from 'lucide-react';

export default function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    // Hide footer on dashboard pages
    if (pathname?.startsWith('/dashboard')) {
        return null;
    }

    return (
        <footer className="bg-zinc-950 text-zinc-300 pt-20 pb-10 border-t border-zinc-900 relative overflow-hidden">
            {/* Dekorasi Background Halus (Opsional) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

                    {/* 1. Logo & Identitas (Mengambil 5 kolom di desktop) */}
                    <div className="md:col-span-5 space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white inline-block">
                                Java Al-'Alim
                            </h3>
                            <p className="text-emerald-400 text-xs mt-1 font-semibold">
                                Kabinet Fathul Afaq (1447/1448 H)
                            </p>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                            Jama’ah Vokasi Al-‘Alim (Java) adalah Lembaga Dakwah Fakultas di Sekolah Vokasi UGM. Berkomitmen untuk membuka cakrawala pemikiran dan menebar kebermanfaatan.
                        </p>

                        {/* Quote Kecil / Tagline */}
                        <div className="inline-block px-3.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 italic">
                            "Membuka Cakrawala, Menebar Manfaat."
                        </div>
                    </div>

                    {/* 2. Quick Links (Mengambil 3 kolom) */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-white font-semibold text-base border-b border-zinc-800 pb-2 inline-block">
                            Menu Utama
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { name: 'Beranda', href: '/' },
                                { name: 'Profil Organisasi', href: '/profile' },
                                { name: 'Blog & Dakwah', href: '/blog' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Kontak & Sosmed (Mengambil 4 kolom) */}
                    <div className="md:col-span-4 space-y-6">
                        <h4 className="text-white font-semibold text-base border-b border-zinc-800 pb-2 inline-block">
                            Hubungi Kami
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3 text-zinc-400">
                                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>
                                    Sekolah Vokasi, Universitas Gadjah Mada,<br />
                                    Yogyakarta, Indonesia.
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <a href="mailto:javaugm1447@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
                                    javaugm1447@gmail.com
                                </a>
                            </li>
                        </ul>

                        {/* Social Media Buttons */}
                        <div className="pt-2">
                            <p className="text-xs text-zinc-400 mb-3 uppercase tracking-wider font-semibold">
                                Media Sosial
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {/* 1. Instagram */}
                                <a
                                    href="https://instagram.com/javaugm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="min-w-11 min-h-11 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>

                                {/* 2. TikTok (Custom SVG Icon) */}
                                <a
                                    href="https://www.tiktok.com/@Javaugm1147"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="min-w-11 min-h-11 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                                    aria-label="TikTok"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-5 h-5"
                                    >
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                </a>

                                {/* 3. YouTube */}
                                <a
                                    href="https://youtube.com/@javaugm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="min-w-11 min-h-11 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="w-5 h-5" />
                                </a>

                                {/* 4. Email */}
                                <a
                                    href="mailto:javaugm1447@gmail.com"
                                    className="min-w-11 min-h-11 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-zinc-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                    <p className="text-zinc-400">&copy; {currentYear} Jama’ah Vokasi Al-‘Alim (Java) UGM. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}