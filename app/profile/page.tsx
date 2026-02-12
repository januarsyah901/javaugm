'use client';

import Image from 'next/image';
import { Users, BookOpen, Heart, Award, Target, Zap, UserCircle, Quote, Camera, Globe } from 'lucide-react';
import VisiMisi from '@/components/home/VisiMisi';

export default function ProfilePage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen pb-20 overflow-x-hidden">
            {/* 1. Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/herobg.png"
                        alt="Profile Background"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    {/* Overlay Layered Gradients */}
                    <div className="absolute inset-0 bg-zinc-950/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-emerald-950/40"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 mb-8 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        LEMBAGA DAKWAH FAKULTAS
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6">
                        Java <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-200">Al-'Alim</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light italic">
                        "Rumah perjuangan dan persaudaraan mahasiswa Sekolah Vokasi UGM dalam bingkai nilai-nilai keislaman."
                    </p>

                    <div className="mt-12 flex flex-col items-center">
                        <div className="h-16 w-px bg-gradient-to-b from-emerald-500 to-transparent"></div>
                        <p className="mt-4 text-[10px] text-emerald-400/80 font-bold tracking-[0.3em] uppercase">
                            Kabinet Fathul Afaq • 1447/1448 H
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Sambutan Ketua */}
            <section className="py-24 relative">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="group relative bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] p-8 md:p-16 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:border-emerald-500/30">
                        <Quote className="absolute top-10 right-10 text-emerald-500/10 w-32 h-32 " />

                        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                            <div className="relative">
                                <div className="w-56 h-56 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/ketua.png"
                                        alt="Ketua Umum Java"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <span className="text-emerald-500 font-bold tracking-widest text-sm uppercase">Sambutan Mas'ul</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">Januarsyah Akbar</h2>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400 italic leading-relaxed mb-8">
                                    "Selamat datang di keluarga besar Java Al-'Alim. Di era disrupsi ini, kita membutuhkan pemuda yang tidak hanya cakap secara vokasional, tetapi juga kokoh secara spiritual. Mari bersama-sama membuka cakrawala untuk menebar kebermanfaatan seluas-luasnya."
                                </p>
                                <div className="inline-block px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium">
                                    Ketua Umum Java 1447 H
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Visi Misi */}
            <div className="py-12 bg-zinc-50/50 dark:bg-transparent">
                <VisiMisi />
            </div>

            {/* 4. Philosophy Section */}
            <section className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8 order-2 lg:order-1">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                                    Filosofi <span className="text-emerald-500">Kabinet</span>
                                </h2>
                                <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-3xl font-serif italic text-zinc-800 dark:text-zinc-200">
                                    "Fathul Afaq"
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                                    Bermakna <strong className="text-emerald-500">"Pembuka Cakrawala"</strong>. Nama ini merepresentasikan semangat perluasan wawasan dan kebermanfaatan nilai Islam di bidang vokasi.
                                </p>
                                <div className="p-6 bg-emerald-500/5 border-l-4 border-emerald-500 rounded-r-xl">
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                                        "Kami percaya bahwa mahasiswa vokasi memiliki potensi luar biasa untuk membuka cakrawala baru dalam teknologi, sosial, dan humaniora."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative group">
                            <div className="relative h-[450px] w-full overflow-hidden shadow-2xl">
                                <Image
                                    src="/kabinet.png"
                                    alt="Philosophy"
                                    fill
                                    className="object-cover transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-2">Spirit 1447 H</p>
                                    <h3 className="text-3xl font-bold text-white leading-tight">Membuka Cakrawala,<br />Menebar Manfaat.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Organizational Structure */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Struktur Organisasi</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                            Sinergi antar bidang untuk mewujudkan visi besar Fathul Afaq.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {departments.map((dept, idx) => (
                            <div
                                key={idx}
                                className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 hover:border-emerald-500/50"
                            >
                                <div className={`w-14 h-14 ${dept.bgColor} ${dept.textColor} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 `}>
                                    <dept.icon size={28} />
                                </div>
                                <h3 className="font-bold text-zinc-900 dark:text-white text-xl mb-3">
                                    {dept.title}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {dept.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

const departments = [
    {
        title: "PH",
        desc: "Jantung organisasi yang mengelola administrasi, keuangan, dan kebijakan strategis.",
        icon: UserCircle,
        bgColor: "bg-blue-500/10",
        textColor: "text-blue-500",
    },
    {
        title: "BKK",
        desc: "Fokus pada penjagaan ruhiyah pengurus, upgrading skill, dan regenerasi kader.",
        icon: Users,
        bgColor: "bg-emerald-500/10",
        textColor: "text-emerald-500",
    },
    {
        title: "Media",
        desc: "Wajah organisasi yang menyebarkan konten dakwah kreatif melalui desain & video.",
        icon: Camera,
        bgColor: "bg-violet-500/10",
        textColor: "text-violet-500",
    },
    {
        title: "Kemuslimahan",
        desc: "Wadah khusus mahasiswi untuk berkarya, berdaya, dan mengkaji isu kewanitaan.",
        icon: Heart,
        bgColor: "bg-pink-500/10",
        textColor: "text-pink-500",
    },
    {
        title: "DPS",
        desc: "Jembatan kebaikan yang terjun langsung membantu masyarakat dan merespons isu sosial.",
        icon: Target,
        bgColor: "bg-orange-500/10",
        textColor: "text-orange-500",
    },
    {
        title: "Kewirausahaan",
        desc: "Penopang kemandirian finansial organisasi melalui entrepreneurship kreatif.",
        icon: Award,
        bgColor: "bg-amber-500/10",
        textColor: "text-amber-500",
    },
    {
        title: "VISA",
        desc: "Divisi yang berfokus pada pendalaman ilmu Al-Qur’an dan Hadits serta penerapannya.",
        icon: BookOpen,
        bgColor: "bg-purple-500/10",
        textColor: "text-purple-500",
    },
    {
        title: "Eksternal",
        desc: "Menjalin hubungan strategis dengan stakeholder luar dan meningkatkan citra organisasi.",
        icon: Globe,
        bgColor: "bg-cyan-500/10",
        textColor: "text-cyan-500",
    }
];