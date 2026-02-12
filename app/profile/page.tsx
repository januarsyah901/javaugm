'use client'; // Penting karena ada interaksi UI

import Image from 'next/image';
import { Users, BookOpen, Heart, Award, Target, Zap, UserCircle, Quote, Camera } from 'lucide-react';
import VisiMisi from '@/components/home/VisiMisi';
import { title } from 'process';

export default function ProfilePage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen pb-20 overflow-x-hidden">
            {/* 1. Hero Section (Parallax Vibe) */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-900 pt-32 pb-20 sm:pt-40 sm:pb-32">

                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/herobg.png"
                        alt="Profile Background"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* 1. Base Dark Layer (Agar teks tetap terbaca di area terang foto) */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* 2. Gradient Overlay (Hijau Emerald Mewah - Seperti Sebelumnya) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/60 to-emerald-950/30"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    {/* Badge Style (Disamakan dengan Hero Utama) */}
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-100 bg-emerald-900/40 backdrop-blur-md border border-emerald-500/30 mb-6 shadow-lg shadow-emerald-900/20 cursor-default">
                        <span>Lembaga dakwah Fakultas</span>
                    </div>

                    {/* Main Heading (Font Extrabold & Gradient Text) */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] drop-shadow-sm">
                        Java <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Al-'Alim</span>
                    </h1>

                    {/* Subheading (Style Slate-200) */}
                    <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
                        "Rumah perjuangan dan persaudaraan mahasiswa Sekolah Vokasi UGM dalam bingkai nilai-nilai keislaman."
                    </p>

                    {/* Footer Quote / Small Text */}
                    <div className="mt-12 pt-8 border-t border-white/20 max-w-lg mx-auto">
                        <p className="text-xs text-emerald-100/80 font-medium tracking-wide uppercase">
                            Kabinet Fathul Afaq (1447/1448 H)
                        </p>
                    </div>
                </div>
            </section>


            {/* 2. Sambutan Ketua (New Section) */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-emerald-50 dark:bg-zinc-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-emerald-100 dark:border-zinc-800 relative">
                        {/* Decorative Quote Icon */}
                        <Quote className="absolute top-8 left-8 text-emerald-200 dark:text-emerald-900 w-16 h-16 -z-10" />

                        <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative rounded-full border-4 border-white dark:border-zinc-800 shadow-xl overflow-hidden">
                            {/* Ganti src dengan foto ketua umum asli */}
                            <Image
                                src="/ketua.png"
                                alt="Ketua Umum Java"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sambutan Ketua Media</h2>
                            <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed">
                                "Selamat datang di keluarga besar Java Al-'Alim. Di era disrupsi ini, kita membutuhkan pemuda yang tidak hanya cakap secara vokasional, tetapi juga kokoh secara spiritual. Mari bersama-sama membuka cakrawala (Fathul Afaq) untuk menebar kebermanfaatan seluas-luasnya."
                            </p>
                            <div>
                                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">Januarsyah Akbar</h4>
                                <span className="text-sm text-slate-500 uppercase tracking-wider">Mas’ul Java 1447 H</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Visi Misi (Component) */}
            <div className="py-10">
                <VisiMisi />
            </div>

            {/* 4. Philosophy Section */}
            <section className="py-24 bg-slate-50 dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text Content */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                                    Filosofi <span className="text-emerald-600">Kabinet</span>
                                </h2>
                                <div className="h-1 w-20 bg-amber-400 rounded-full"></div>
                            </div>

                            <div className="prose dark:prose-invert">
                                <h3 className="text-2xl font-serif italic text-slate-700 dark:text-slate-200">
                                    "Fathul Afaq"
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-loose">
                                    Bermakna <strong>"Pembuka Cakrawala"</strong>. Nama ini merepresentasikan semangat perluasan wawasan dan kebermanfaatan nilai Islam di bidang vokasi. Kami percaya bahwa mahasiswa vokasi memiliki potensi luar biasa untuk membuka cakrawala baru dalam teknologi, sosial, dan humaniora.
                                </p>
                            </div>
                        </div>

                        {/* Right: Visual Imagery */}
                        <div className="order-1 lg:order-2 relative">
                            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                                <Image
                                    src="/kabinet.png"
                                    alt="Philosophy"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent"></div>
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-2">Periode 1447/1448 H</p>
                                    <h3 className="text-4xl font-bold">Membuka Cakrawala,<br />Menebar Manfaat.</h3>
                                </div>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-dots-pattern opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Organizational Structure (UPDATED: Infinite Carousel) */}
            <section className="py-20 bg-slate-50 dark:bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="text-center mb-12 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Struktur Organisasi
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Bidang-bidang yang bersinergi dalam menggerakkan roda organisasi.
                        </p>
                    </div>

                    {/* Simple Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map((dept, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-xl hover:border-emerald-500/50 transition-colors duration-300"
                            >
                                {/* Icon & Title Wrapper */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`w-10 h-10 ${dept.bgColor} ${dept.textColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <dept.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                                            {dept.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {dept.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tambahkan Style Khusus untuk Animasi di sini */}
            <style jsx global>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
            `}</style>
        </div>
    );
}

// Data Departemen
const departments = [
    {
        title: "Pengurus Harian (PH)",
        desc: "Jantung organisasi yang mengelola administrasi, keuangan, dan kebijakan strategis.",
        icon: UserCircle,
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400",
        barColor: "bg-blue-500"
    },
    {
        title: "Biro Khusus Kaderisasi (BKK)",
        desc: "Fokus pada penjagaan ruhiyah pengurus, upgrading skill, dan regenerasi kader.",
        icon: Users,
        bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
        textColor: "text-emerald-600 dark:text-emerald-400",
        barColor: "bg-emerald-500"
    },
    {
        title: "Media",
        desc: "Wajah organisasi yang menyebarkan konten dakwah kreatif melalui desain & video.",
        icon: Camera,
        bgColor: "bg-violet-100 dark:bg-violet-900/30",
        textColor: "text-violet-600 dark:text-violet-400",
        barColor: "bg-violet-500"
    },
    {
        title: "Kemuslimahan",
        desc: "Wadah khusus mahasiswi untuk berkarya, berdaya, dan mengkaji isu kewanitaan.",
        icon: Heart,
        bgColor: "bg-pink-100 dark:bg-pink-900/30",
        textColor: "text-pink-600 dark:text-pink-400",
        barColor: "bg-pink-500"
    },
    {
        title: "Departemen Pelayanan dan Syiar (DPS)",
        desc: "Jembatan kebaikan yang terjun langsung membantu masyarakat dan merespons isu sosial.",
        icon: Target,
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        textColor: "text-orange-600 dark:text-orange-400",
        barColor: "bg-orange-500"
    },
    {
        title: "Kewirausahaan",
        desc: "Penopang kemandirian finansial organisasi melalui entrepreneurship kreatif.",
        icon: Award,
        bgColor: "bg-amber-100 dark:bg-amber-900/30",
        textColor: "text-amber-600 dark:text-amber-400",
        barColor: "bg-amber-500"
    },
    {
        title: "Vocational Study of Al-Qur’an (VISA)",
        desc: "Divisi yang berfokus pada pendalaman ilmu Al-Qur’an dan Hadits, serta penerapannya dalam kehidupan sehari-hari.",
        icon: BookOpen,
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        textColor: "text-purple-600 dark:text-purple-400",
        barColor: "bg-purple-500"
    },
    {
        title: "Eksternal",
        desc: "Divisi yang berfokus pada menjalin hubungan dengan organisasi lain dan meningkatkan citra organisasi.",
        icon: Users,
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400",
        barColor: "bg-blue-500"
    }
];