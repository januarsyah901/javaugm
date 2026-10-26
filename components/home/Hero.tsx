import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="pt-8 sm:pt-12">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Text Block */}
                <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                    {/* Editorial Text Label (No Badge Box) */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#ff5a00] animate-pulse" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00]">
                            Kabinet Fathul Afaq 1447/1448 H
                        </span>
                    </div>

                    {/* Display Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-semibold text-[#09090b] tracking-tight leading-[1.14]">
                        Membuka Cakrawala, Menebar Manfaat.
                    </h1>

                    {/* Subheading */}
                    <p className="mt-5 text-base sm:text-lg text-[#52525b] leading-relaxed max-w-2xl">
                        Wadah intelektual muslim Sekolah Vokasi Universitas Gadjah Mada yang beradab, solutif, dan berdaya guna dalam bingkai persaudaraan.
                    </p>

                    {/* Action Buttons - Full Rounded */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                        <Link
                            href="/profile"
                            className="btn-dark-primary rounded-full w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium"
                        >
                            <span>Tentang Kami</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                            href="/blog"
                            className="btn-light-neutral rounded-full w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium"
                        >
                            <span>Baca Artikel</span>
                        </Link>
                    </div>

                    {/* Clean Text List (No Badge Pills) */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-[#71717a]">
                        <span>Sekolah Vokasi UGM</span>
                        <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                        <span>Lembaga Dakwah Fakultas</span>
                        <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                        <span>Ukhuwah &amp; Aksi Nyata</span>
                    </div>
                </div>

                {/* Stats Block Card */}
                <div className="mt-14 sm:mt-16 rounded-[36px] bg-white border border-[#ececee] p-7 md:p-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#ececee]">
                        <div className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-3 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
                            <span className="text-4xl sm:text-5xl font-semibold text-[#09090b] tracking-tight leading-none">
                                5
                            </span>
                            <span className="text-sm font-normal text-[#52525b] leading-snug">
                                Departemen dan biro aktif
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-3 pt-4 sm:pt-0 sm:px-4 first:pt-0">
                            <span className="text-4xl sm:text-5xl font-semibold text-[#09090b] tracking-tight leading-none">
                                20+
                            </span>
                            <span className="text-sm font-normal text-[#52525b] leading-snug">
                                Program dakwah dan kajian
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-3 pt-4 sm:pt-0 sm:px-4 first:pt-0">
                            <span className="text-4xl sm:text-5xl font-semibold text-[#09090b] tracking-tight leading-none">
                                100+
                            </span>
                            <span className="text-sm font-normal text-[#52525b] leading-snug">
                                Kader mahasiswa vokasi
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-3 pt-4 sm:pt-0 sm:px-4 first:pt-0">
                            <span className="text-4xl sm:text-5xl font-semibold text-[#09090b] tracking-tight leading-none">
                                1447 H
                            </span>
                            <span className="text-sm font-normal text-[#52525b] leading-snug">
                                Masa bakti kepengurusan
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
