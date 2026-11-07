'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
});

const headlineWords = ['Membuka', 'Cakrawala,', 'Menebar', 'Manfaat.'];

export default function Hero() {
    return (
        <section className="relative pt-8 sm:pt-12 overflow-hidden">
            {/* Soft drifting background glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
                <motion.div
                    className="absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-[#ff5a00]/10 blur-3xl"
                    animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute -top-10 right-[6%] h-80 w-80 rounded-full bg-[#fe45e2]/10 blur-3xl"
                    animate={{ x: [0, -36, 0], y: [0, 30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                    <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00]" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00]">
                            Kabinet Fathul Afaq 1447/1448 H
                        </span>
                    </motion.div>

                    <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-semibold text-[#09090b] tracking-tight leading-[1.14]">
                        {headlineWords.map((word, i) => (
                            <span key={word} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em] last:mr-0">
                                <motion.span
                                    className="inline-block"
                                    initial={{ y: '110%' }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: EASE }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        {...fadeUp(0.55)}
                        className="mt-5 text-base sm:text-lg text-[#52525b] leading-relaxed max-w-2xl"
                    >
                        Wadah intelektual muslim Sekolah Vokasi Universitas Gadjah Mada yang beradab, solutif, dan berdaya guna dalam bingkai persaudaraan.
                    </motion.p>

                    <motion.div
                        {...fadeUp(0.7)}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
                    >
                        <Link
                            href="/profile"
                            className="group btn-dark-primary rounded-full w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium"
                        >
                            <span>Tentang Kami</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/blog"
                            className="btn-light-neutral rounded-full w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium"
                        >
                            <span>Baca Artikel</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        {...fadeUp(0.85)}
                        className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-[#71717a]"
                    >
                        <span>Sekolah Vokasi UGM</span>
                        <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                        <span>Lembaga Dakwah Fakultas</span>
                        <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                        <span>Ukhuwah &amp; Aksi Nyata</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
