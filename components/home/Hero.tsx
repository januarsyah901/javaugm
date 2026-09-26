import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white dark:bg-zinc-950 pt-32 pb-20 sm:pt-40 sm:pb-32">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/herobg.png"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Badge Kabinet */}
                <div className="inline-flex items-center gap-2 rounded-md px-3.5 py-1 text-xs font-medium text-emerald-200 bg-emerald-950/70 border border-emerald-500/40 mb-8 cursor-default">
                    <span>Kabinet Fathul Afaq 1447/1448 H</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                    Membuka <span className="text-emerald-300">Cakrawala</span>, <br />
                    Menebar <span className="text-amber-300">Manfaat</span>.
                </h1>

                {/* Subheading */}
                <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
                    Wadah intelektual muslim Sekolah Vokasi UGM yang beradab, solutif, dan berdaya guna dalam bingkai persaudaraan.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 items-center">
                    <Link
                        href="/profile"
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-emerald-700 hover:bg-emerald-800 px-6 text-sm font-medium text-white transition-colors shadow-sm"
                    >
                        Tentang Kami
                    </Link>

                    <Link
                        href="/blog"
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-white/40 hover:bg-white/10 px-6 text-sm font-medium text-white transition-colors"
                    >
                        Baca Artikel
                    </Link>
                </div>

                {/* Footer Quote / Small Text */}
                <div className="mt-16 pt-8 border-t border-white/15 max-w-lg mx-auto">
                    <p className="text-xs text-slate-300 font-medium">
                        Sekolah Vokasi Universitas Gadjah Mada
                    </p>
                </div>
            </div>
        </section>
    );
}