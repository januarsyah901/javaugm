'use client';

import Image from 'next/image';
import { Users, BookOpen, Heart, Award, Target, UserCircle, Quote, Camera, Globe } from 'lucide-react';
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
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950"></div>
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-emerald-950/40"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-md px-3.5 py-1 text-xs font-medium text-emerald-200 bg-emerald-950/70 border border-emerald-500/40 mb-6">
                        <span>Lembaga Dakwah Fakultas</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                        Java <span className="text-emerald-300">Al-'Alim</span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light italic">
                        "Rumah perjuangan dan persaudaraan mahasiswa Sekolah Vokasi UGM dalam bingkai nilai-nilai keislaman."
                    </p>

                    <div className="mt-10 flex flex-col items-center">
                        <div className="h-12 w-px bg-emerald-500/30"></div>
                        <p className="mt-4 text-xs text-emerald-300 font-medium">
                            Kabinet Fathul Afaq (1447/1448 H)
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Profil JAVA */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="relative bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                            {/* Bagian Logo */}
                            <div className="relative">
                                <div className="w-48 h-48 md:w-56 md:h-56 bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                                    <Image
                                        src="/logo.png"
                                        alt="Logo Jama'ah Vokasi Al-'Alim"
                                        width={200}
                                        height={200}
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Bagian Deskripsi */}
                            <div className="flex-1 text-center md:text-left">
                                <span className="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Profil Organisasi</span>
                                <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-white mt-1 mb-4 tracking-tight">
                                    Jama'ah Vokasi <span className="text-emerald-700">Al-'Alim</span>
                                </h2>

                                <div className="space-y-4">
                                    <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        <strong className="text-emerald-800 dark:text-emerald-300 font-semibold">Jama’ah Vokasi Al-‘Alim (JAVA) UGM</strong> adalah wadah strategis bagi mahasiswa muslim dalam membangun lingkungan Sekolah Vokasi yang beriman, bertakwa, dan berakhlak mulia. Kami hadir untuk menanamkan nilai-nilai keislaman berdasarkan Al-Qur’an dan As-Sunnah sebagai fondasi utama dalam setiap aktivitas akademis.
                                    </p>
                                    <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-3 border-emerald-600/40 pl-4 italic">
                                        "Menumbuhkan kesadaran civitas academica untuk berkontribusi bagi kemaslahatan umat, mempererat ukhuwah, serta membangun sinergi multilateral guna mengembangkan ilmu pengetahuan yang bermanfaat bagi masyarakat luas."
                                    </p>
                                </div>

                                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
                                    <span className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                                        #IntelektualMuslim
                                    </span>
                                    <span className="px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                                        #LembagaDakwahVokasi
                                    </span>
                                    <span className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
                                        #FathulAfaq
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Visi Misi */}
            <div className="py-12 bg-zinc-50/50 dark:bg-transparent">
                <VisiMisi/>
            </div>

            {/* 4. Philosophy Section */}
            <section className="py-12 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8 order-2 lg:order-1">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                                    Filosofi <span className="text-emerald-500">Kabinet</span>
                                </h2>
                                <div className="h-1 w-20 bg-emerald-600 rounded-sm"></div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl md:text-3xl font-serif italic text-zinc-800 dark:text-zinc-200">
                                    "Fathul Afaq"
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed">
                                    Bermakna <strong className="text-emerald-700">"Pembuka Cakrawala"</strong>. Nama ini merepresentasikan semangat perluasan wawasan dan kebermanfaatan nilai Islam di bidang vokasi.
                                </p>
                                <div className="p-5 bg-emerald-50/60 border-l-3 border-emerald-700 rounded-r-lg">
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                                        "Kami percaya bahwa mahasiswa vokasi memiliki potensi luar biasa untuk membuka cakrawala baru dalam teknologi, sosial, dan humaniora."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative">
                            <div className="relative h-[400px] md:h-[450px] w-full overflow-hidden rounded-2xl shadow-sm border border-slate-200">
                                <Image
                                    src="/kabinet.png"
                                    alt="Philosophy"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-emerald-300 font-semibold text-xs mb-1">Spirit 1447 H</p>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                        Membuka Cakrawala,<br />Menebar Manfaat.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Sambutan Ketua */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="relative bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-8 md:p-14 border border-zinc-200 dark:border-zinc-800">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Quote className="text-emerald-700 w-20 h-20 stroke-[1px]"/>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                            {/* Frame Foto */}
                            <div className="relative">
                                <div className="relative w-56 h-72 md:w-72 md:h-96 rounded-xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800 p-2 bg-white dark:bg-zinc-900 shadow-xs">
                                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                                        <Image
                                            src="/ketua.png"
                                            alt="Ketua Umum Java"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <div className="h-px w-6 bg-emerald-700"></div>
                                        <span className="text-emerald-800 dark:text-emerald-300 font-medium text-xs uppercase tracking-wider">
                                            Sambutan Ketua
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-zinc-900 dark:text-zinc-50">
                                        Muhammad Taufiqul Hakim
                                    </h2>
                                </div>

                                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-serif italic">
                                    "Selamat datang di keluarga besar Java Al-'Alim. Di era disrupsi ini, kita membutuhkan pemuda yang tidak hanya cakap secara vokasional, tetapi juga kokoh secara spiritual. Mari bersama-sama membuka cakrawala untuk menebar kebermanfaatan seluas-luasnya."
                                </p>

                                <div className="pt-2">
                                    <div className="inline-flex items-center gap-3">
                                        <div className="h-10 w-px bg-zinc-300 dark:bg-zinc-700"></div>
                                        <div className="text-left">
                                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                                Mas'ul Utama
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                Kabinet Fathul Afaq 1447/1448 H
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Organizational Structure */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">Struktur Organisasi</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
                            Sinergi antar bidang untuk mewujudkan visi besar Fathul Afaq.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {departments.map((dept, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl transition-colors hover:border-emerald-600/40 shadow-xs"
                            >
                                <div className="w-11 h-11 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center mb-4 border border-emerald-100">
                                    <dept.icon size={22}/>
                                </div>
                                <h3 className="font-bold text-zinc-900 dark:text-white text-lg mb-2">
                                    {dept.title}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
    },
    {
        title: "BKK",
        desc: "Fokus pada penjagaan ruhiyah pengurus, peningkatan kompetensi, dan regenerasi kader.",
        icon: Users,
    },
    {
        title: "Media",
        desc: "Wajah organisasi yang menyebarkan konten dakwah kreatif melalui desain dan media digital.",
        icon: Camera,
    },
    {
        title: "Kemuslimahan",
        desc: "Wadah khusus mahasiswi untuk berkarya, berdaya, dan mengkaji isu keperempuanan.",
        icon: Heart,
    },
    {
        title: "DPS",
        desc: "Jembatan kebaikan yang terjun langsung membantu masyarakat dan merespons isu sosial.",
        icon: Target,
    },
    {
        title: "Kewirausahaan",
        desc: "Penopang kemandirian finansial organisasi melalui kewirausahaan mahasiswa.",
        icon: Award,
    },
    {
        title: "VISA",
        desc: "Divisi yang berfokus pada pendalaman ilmu Al-Qur’an dan Hadits serta penerapannya.",
        icon: BookOpen,
    },
    {
        title: "Eksternal",
        desc: "Menjalin hubungan strategis dengan stakeholder luar dan memperluas jejaring organisasi.",
        icon: Globe,
    }
];