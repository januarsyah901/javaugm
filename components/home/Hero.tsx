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
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-100 bg-emerald-900/40 backdrop-blur-md border border-emerald-500/30 mb-8 shadow-lg shadow-emerald-900/20 cursor-default">
                    <span>Kabinet Fathul Afaq (1447/1448 H)</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.1] drop-shadow-sm">
                    Membuka <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Cakrawala</span>, <br />
                    Menebar <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Manfaat</span>.
                </h1>

                {/* Subheading */}
                <p className="mt-4 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                    Wadah intelektual muslim Sekolah Vokasi UGM yang beradab, solutif, dan berdaya guna dalam bingkai persaudaraan.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 items-center">
                    <Link
                        href="/profile"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-white transition-all duration-300 hover:bg-emerald-700 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                        <span className="mr-2">Tentang Kami</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href="/blog"
                        className="inline-flex h-12 items-center justify-center px-8 text-base font-medium text-white bg-transparent border border-white/30 rounded-full hover:bg-white/10 hover:text-white hover:border-white transition-all backdrop-blur-sm"
                    >
                        Baca Artikel
                    </Link>
                </div>

                {/* Footer Quote / Small Text */}
                <div className="mt-16 pt-8 border-t border-white/20 max-w-lg mx-auto">
                    <p className="text-xs text-slate-300 font-medium tracking-wide uppercase">
                        Sekolah Vokasi Universitas Gadjah Mada
                    </p>
                </div>
            </div>
        </section>
    );
}