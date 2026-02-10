import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white dark:bg-zinc-900 py-20 sm:py-32">
            {/* Background Effect */}
            <div className="absolute inset-0 z-0 opacity-10 pattern-dots pattern-emerald-500 pattern-bg-white pattern-size-4 pattern-opacity-100 dark:pattern-bg-zinc-900"></div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/20 blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-emerald-800 bg-emerald-100 mb-8 border border-emerald-200">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-600 mr-2"></span>
                    Kabinet Fathul Afaq (1447/1448 H)
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                    Membuka <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">Cakrawala</span>, <br className="hidden sm:block" />
                    Menebar <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-500">Manfaat</span>.
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Jama’ah Vokasi Al-‘Alim (JAVA) hadir sebagai wadah intelektual muslim yang beradab, solutif, dan berdaya guna bagi Sekolah Vokasi UGM.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/profile"
                        className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                    >
                        Tentang Kami
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all hover:border-slate-300 dark:bg-zinc-800 dark:text-slate-200 dark:border-zinc-700 dark:hover:bg-zinc-700"
                    >
                        Baca Artikel
                    </Link>
                </div>
            </div>
        </section>
    );
}
