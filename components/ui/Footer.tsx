import Link from 'next/link';
import { MapPin, Mail, Instagram, ArrowRight, ExternalLink, Youtube } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 text-zinc-300 pt-20 pb-10 border-t border-zinc-900 relative overflow-hidden">
            {/* Dekorasi Background Halus (Opsional) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

                    {/* 1. Logo & Identitas (Mengambil 5 kolom di desktop) */}
                    <div className="md:col-span-5 space-y-6">
                        <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
                                JAVA Al-'Alim
                            </h3>
                            <p className="text-zinc-500 text-sm mt-2 font-medium tracking-wide">
                                KABINET FATHUL AFAQ (1447/1448 H)
                            </p>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                            Jama’ah Vokasi Al-‘Alim (JAVA) adalah Lembaga dakwah Fakultas di Sekolah Vokasi UGM. Berkomitmen untuk membuka cakrawala pemikiran dan menebar kebermanfaatan.
                        </p>

                        {/* Quote Kecil / Tagline */}
                        <div className="inline-block px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 italic">
                            "Membuka Cakrawala, Menebar Manfaat."
                        </div>
                    </div>

                    {/* 2. Quick Links (Mengambil 3 kolom) */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-white font-semibold text-lg border-b border-zinc-800 pb-2 inline-block">
                            Menu Utama
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'Beranda', href: '/' },
                                { name: 'Profil Organisasi', href: '/profile' },
                                { name: 'Blog & Dakwah', href: '/blog' },
                                { name: 'Program Kerja', href: '/proker' }, // Tambahan opsional
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="group flex items-center text-sm text-zinc-400 hover:text-primary transition-colors duration-300"
                                    >
                                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Kontak & Sosmed (Mengambil 4 kolom) */}
                    <div className="md:col-span-4 space-y-6">
                        <h4 className="text-white font-semibold text-lg border-b border-zinc-800 pb-2 inline-block">
                            Hubungi Kami
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 text-zinc-400">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>
                                    Sekolah Vokasi, Universitas Gadjah Mada,<br />
                                    Yogyakarta, Indonesia.
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                <a href="mailto:java.sv@ugm.ac.id" className="text-zinc-400 hover:text-white transition-colors">
                                    java.sv@ugm.ac.id
                                </a>
                            </li>
                        </ul>

                        {/* Social Media Buttons */}
                        <div className="pt-2">
                            <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider font-semibold">
                                Media Sosial
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {/* 1. Instagram */}
                                <a
                                    href="https://instagram.com/javaugm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>

                                {/* 2. TikTok (Custom SVG Icon) */}
                                <a
                                    href="https://www.tiktok.com/@Javaugm1147"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-black hover:text-white hover:border-zinc-500 transition-all duration-300"
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
                                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="w-5 h-5" />
                                </a>

                                {/* 4. Email */}
                                <a
                                    href="mailto:javaugm1447@gmail.com"
                                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300"
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
                    <p>&copy; {currentYear} Jama’ah Vokasi Al-‘Alim (JAVA) UGM. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}