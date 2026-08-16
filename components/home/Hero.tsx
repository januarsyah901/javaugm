import Link from 'next/link';
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
                <p className="mb-8 text-sm font-medium text-emerald-200">
                    Kabinet Fathul Afaq (1447/1448 H)
                </p>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.1] drop-shadow-sm">
                    Membuka <span className="text-emerald-300">Cakrawala</span>, <br />
                    Menebar <span className="text-amber-300">Manfaat</span>.
                </h1>

                {/* Subheading */}
                <p className="mt-4 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                    Wadah intelektual muslim Sekolah Vokasi UGM yang beradab, solutif, dan berdaya guna dalam bingkai persaudaraan.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 items-center">
                    <Link
                        href="/profile"
                        className="inline-flex h-12 min-h-11 items-center justify-center rounded-lg bg-primary px-8 font-medium text-white hover:bg-emerald-800"
                    >
                        Tentang Kami
                    </Link>

                    <Link
                        href="/blog"
                        className="inline-flex h-12 min-h-11 items-center justify-center rounded-lg border border-white/50 px-8 text-base font-medium text-white hover:bg-white/10"
                    >
                        Baca Artikel
                    </Link>
                </div>

                {/* Footer Quote / Small Text */}
                <div className="mt-16 pt-8 border-t border-white/20 max-w-lg mx-auto">
                    <p className="text-sm text-slate-200 font-medium">
                        Sekolah Vokasi Universitas Gadjah Mada
                    </p>
                </div>
            </div>
        </section>
    );
}