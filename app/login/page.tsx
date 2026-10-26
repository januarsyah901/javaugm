'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#ececee] text-xs font-semibold text-[#52525b] hover:text-[#09090b] hover:border-[#d4d4d8] transition-all"
                    >
                        <ArrowLeft size={14} />
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>

                <div className="bg-white rounded-[36px] border border-[#ececee] p-8 sm:p-10 shadow-none text-center">
                    <div className="w-16 h-16 rounded-full bg-[#f4f4f5] border border-[#ececee] mx-auto mb-6 flex items-center justify-center p-3">
                        <Image
                            src="/logo.png"
                            alt="Logo Java UGM"
                            width={40}
                            height={40}
                            className="object-contain"
                            priority
                        />
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00] mb-2">
                        Portal Pengurus
                    </p>
                    <h1 className="text-2xl font-semibold text-[#09090b] tracking-tight mb-2">
                        Masuk ke Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed mb-8">
                        Silakan gunakan akun Google resmi kampus UGM (@mail.ugm.ac.id) yang telah didaftarkan pengurus.
                    </p>

                    <button
                        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                        className="btn-dark-primary rounded-full w-full py-3.5 px-6 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
                    >
                        <span>Masuk dengan Akun Google UGM</span>
                        <ArrowUpRight size={16} className="opacity-80" />
                    </button>

                    <div className="mt-8 pt-6 border-t border-[#ececee]">
                        <p className="text-[11px] text-[#71717a]">
                            Belum memiliki hak akses? Hubungi pengurus Biro Kaderisasi &amp; PH Java UGM.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
