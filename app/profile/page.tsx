import Image from 'next/image';
import {
    Users,
    BookOpen,
    Heart,
    Award,
    Target,
    UserCircle,
    Camera,
    Globe,
    Compass
} from 'lucide-react';

const departments = [
    {
        title: "PH (Pengurus Harian)",
        desc: "Jantung koordinasi organisasi yang mengelola administrasi, tata kelola keuangan, serta perumusan kebijakan strategis lembaga.",
        icon: UserCircle,
    },
    {
        title: "BKK (Biro Kaderisasi)",
        desc: "Fokus pada pembinaan ruhiyah pengurus, peningkatan kompetensi kepemimpinan, dan keberlanjutan regenerasi kader dakwah.",
        icon: Users,
    },
    {
        title: "Media & Syiar Digital",
        desc: "Wajah publik organisasi yang memproduksi konten dakwah kreatif, publikasi digital, dan pengelolaan identitas visual lembaga.",
        icon: Camera,
    },
    {
        title: "Kemuslimahan",
        desc: "Ruang aktualisasi mahasiswi vokasi untuk berdaya, mengkaji fikih perempuan, serta memperkuat solidaritas muslimah.",
        icon: Heart,
    },
    {
        title: "DPS (Departemen Pelayanan Sosial)",
        desc: "Penyalur aksi nyata pengabdian, tanggap kemanusiaan, serta advokasi kepedulian sosial bagi civitas dan masyarakat luas.",
        icon: Target,
    },
    {
        title: "Kewirausahaan",
        desc: "Motor kemandirian finansial lembaga melalui pengelolaan unit usaha kreatif mahasiswa berbasis nilai syariah.",
        icon: Award,
    },
    {
        title: "VISA (Vokasi Studi Al-Qur'an)",
        desc: "Wadah pendalaman ilmu Al-Qur'an, tahsin, kajian keislaman tematik, dan pembiasaan adab Qur'ani dalam keseharian.",
        icon: BookOpen,
    },
    {
        title: "Hubungan Eksternal",
        desc: "Pembangun jejaring kolaborasi dengan birokrasi kampus, himpunan mahasiswa, serta lembaga dakwah tingkat universitas dan nasional.",
        icon: Globe,
    }
];

const missions = [
    "Menanamkan nilai-nilai keislaman berlandaskan Al-Qur'an dan As-Sunnah dalam kehidupan akademis.",
    "Menumbuhkan kesadaran civitas academica untuk berkontribusi bagi kemaslahatan masyarakat.",
    "Meningkatkan dan mendiseminasikan ilmu pengetahuan aplikatif untuk kebaikan umat.",
    "Mempererat ukhuwah islamiyah dan rasa persaudaraan antar civitas academica Sekolah Vokasi UGM.",
    "Membangun hubungan kolaboratif multilateral dengan mitra kelembagaan di dalam dan luar kampus."
];

export default function ProfilePage() {
    return (
        <div className="bg-[#f4f4f5] min-h-screen py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                {/* 1. Hero Editorial Section */}
                <section className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[12px] bg-[#ff5a00] text-white text-xs font-semibold tracking-wide uppercase mb-4">
                        Profil Lembaga
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#09090b] tracking-tight leading-[1.14]">
                        Jama'ah Vokasi Al-'Alim.
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-[#52525b] leading-relaxed">
                        Rumah perjuangan dan persaudaraan mahasiswa Sekolah Vokasi UGM dalam bingkai nilai keislaman, membuka wawasan dan menebar kemanfaatan bersama.
                    </p>
                </section>

                {/* 2. Profil Lembaga & Identitas */}
                <section className="bg-white rounded-[36px] border border-[#ececee] p-7 md:p-12 shadow-none">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                        {/* Logo Container */}
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="w-48 h-48 md:w-56 md:h-56 rounded-[28px] bg-[#f4f4f5] border border-[#ececee] p-8 flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="Logo Jama'ah Vokasi Al-'Alim"
                                    width={180}
                                    height={180}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-8 space-y-5">
                            <div>
                                <span className="inline-flex items-center px-3 py-1 rounded-[12px] bg-[#f4f4f5] border border-[#ececee] text-xs font-medium text-[#52525b] mb-3">
                                    Lembaga Dakwah Fakultas
                                </span>
                                <h2 className="text-2xl md:text-3xl font-semibold text-[#09090b] tracking-tight">
                                    Fondasi Gerakan Intelektual Muslim
                                </h2>
                            </div>

                            <p className="text-sm md:text-base text-[#3f3f46] leading-relaxed">
                                <strong className="text-[#09090b] font-semibold">Jama'ah Vokasi Al-'Alim (JAVA) UGM</strong> merupakan ruang gerak mahasiswa muslim untuk membentuk atmosfer kampus vokasi yang menjunjung tinggi keimanan, ketakwaan, dan keluhuran akhlak. Kami berikhtiar menanamkan prinsip Al-Qur'an dan As-Sunnah sebagai landasan setiap karya vokasional.
                            </p>

                            <div className="border-l-2 border-[#ff5a00] pl-4 py-1">
                                <p className="text-sm text-[#52525b] italic leading-relaxed">
                                    "Menumbuhkan kesadaran kolektif untuk berkontribusi nyata, memperkuat ukhuwah, serta membangun kolaborasi demi pengembangan ilmu yang bermanfaat bagi masyarakat."
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                <span className="px-3 py-1 rounded-[12px] bg-white border border-[#ececee] text-xs font-medium text-[#18181b]">
                                    #IntelektualMuslim
                                </span>
                                <span className="px-3 py-1 rounded-[12px] bg-white border border-[#ececee] text-xs font-medium text-[#18181b]">
                                    #LembagaDakwahVokasi
                                </span>
                                <span className="px-3 py-1 rounded-[12px] bg-white border border-[#ececee] text-xs font-medium text-[#18181b]">
                                    #FathulAfaq
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Filosofi Kabinet Fathul Afaq */}
                <section className="bg-[#09090b] text-white rounded-[36px] border border-[#27272a] p-7 md:p-12 shadow-none">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[12px] bg-[#ff5a00] text-white text-xs font-semibold tracking-wide uppercase">
                                Kabinet Fathul Afaq (1447/1448 H)
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.16]">
                                Membuka Cakrawala, Menebar Manfaat.
                            </h2>

                            <p className="text-sm md:text-base text-[#a1a1aa] leading-relaxed">
                                <span className="text-white font-medium">Fathul Afaq</span> bermakna pembuka cakrawala. Nama ini menegaskan komitmen pengurus untuk memperluas perspektif keilmuan, mengasah kepedulian sosial, serta mengalirkan maslahat Islam di lingkungan vokasi UGM.
                            </p>

                            <div className="p-5 rounded-[20px] bg-[#18181b] border border-[#27272a]">
                                <p className="text-sm text-[#d4d4d8] leading-relaxed italic">
                                    Mahasiswa vokasi memiliki kapasitas terapan yang krusial. Nilai spiritualitas menjadi kompas agar keahlian teknis senantiasa bermuara pada pengabdian tulus bagi sesama.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="relative h-64 md:h-80 w-full rounded-[24px] overflow-hidden border border-[#27272a] bg-[#18181b]">
                                <Image
                                    src="/kabinet.png"
                                    alt="Filosofi Kabinet Fathul Afaq"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-5 left-5 right-5">
                                    <p className="text-xs uppercase font-semibold text-[#ff5a00] tracking-wider mb-1">
                                        Spirit Perjuangan
                                    </p>
                                    <p className="text-sm font-medium text-white">
                                        Integritas Ruhiyah dan Keunggulan Terapan
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Sambutan Mas'ul Utama */}
                <section className="bg-white rounded-[36px] border border-[#ececee] p-7 md:p-12 shadow-none">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                        <div className="md:col-span-4 flex justify-center">
                            <div className="relative w-60 h-80 rounded-[28px] overflow-hidden border border-[#ececee] bg-[#f4f4f5]">
                                <Image
                                    src="/ketua.png"
                                    alt="Muhammad Taufiqul Hakim"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-8 space-y-5">
                            <div>
                                <span className="inline-flex items-center px-3 py-1 rounded-[12px] bg-[#f4f4f5] border border-[#ececee] text-xs font-semibold text-[#09090b] mb-3">
                                    Sambutan Pimpinan
                                </span>
                                <h2 className="text-2xl md:text-3xl font-semibold text-[#09090b] tracking-tight">
                                    Muhammad Taufiqul Hakim
                                </h2>
                                <p className="text-xs text-[#71717a] mt-1 font-medium">
                                    Ketua Umum (Mas'ul Utama) Kabinet Fathul Afaq 1447/1448 H
                                </p>
                            </div>

                            <blockquote className="border-l-2 border-[#ff5a00] pl-5 py-2">
                                <p className="text-base md:text-lg text-[#3f3f46] italic leading-relaxed">
                                    "Selamat datang di keluarga besar Java Al-'Alim. Di tengah dinamika zaman, kita memerlukan generasi muda yang cakap secara kompetensi terapan sekaligus kokoh dalam keteguhan ruhiyah. Mari bersama-sama meluaskan ruang gerak dakwah dan menebar kebermanfaatan seluas-luasnya."
                                </p>
                            </blockquote>

                            <div className="pt-2">
                                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#09090b]">
                                    <Compass size={14} className="text-[#ff5a00]" />
                                    Sekolah Vokasi Universitas Gadjah Mada
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Nilai Dakwah (Visi & Misi) */}
                <section className="space-y-6">
                    <div>
                        <span className="text-xs uppercase font-semibold tracking-wider text-[#ff5a00]">
                            Arah & Nilai Gerak
                        </span>
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#09090b] tracking-tight mt-1">
                            Visi & Misi Strategis
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Visi Card */}
                        <div className="lg:col-span-5 bg-white rounded-[36px] border border-[#ececee] p-7 md:p-10 flex flex-col justify-between shadow-none">
                            <div>
                                <div className="inline-flex items-center px-3 py-1 rounded-[12px] bg-[#09090b] text-white text-xs font-semibold mb-6">
                                    Visi Lembaga
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold text-[#09090b] leading-snug">
                                    Wadah strategis mahasiswa muslim dalam membangun lingkungan Sekolah Vokasi yang beriman, bertakwa, dan berakhlak mulia.
                                </h3>
                            </div>
                            <div className="pt-8 border-t border-[#ececee] mt-8">
                                <p className="text-xs text-[#71717a]">
                                    Landasan pergerakan seluruh elemen kepengurusan JAVA UGM.
                                </p>
                            </div>
                        </div>

                        {/* Misi Card */}
                        <div className="lg:col-span-7 bg-white rounded-[36px] border border-[#ececee] p-7 md:p-10 shadow-none">
                            <div className="inline-flex items-center px-3 py-1 rounded-[12px] bg-[#f4f4f5] border border-[#ececee] text-xs font-semibold text-[#09090b] mb-6">
                                Misi Pelaksanaan
                            </div>

                            <ul className="space-y-4">
                                {missions.map((mission, idx) => (
                                    <li key={idx} className="flex items-start gap-4 p-3.5 rounded-[16px] bg-[#f4f4f5] border border-[#ececee]">
                                        <span className="w-7 h-7 rounded-[10px] bg-white border border-[#ececee] text-[#09090b] text-xs font-semibold flex items-center justify-center shrink-0">
                                            {idx + 1}
                                        </span>
                                        <p className="text-sm text-[#3f3f46] leading-relaxed">
                                            {mission}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 6. Struktur Organisasi */}
                <section className="space-y-6">
                    <div>
                        <span className="text-xs uppercase font-semibold tracking-wider text-[#ff5a00]">
                            Sinergi Bidang
                        </span>
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#09090b] tracking-tight mt-1">
                            Struktur Organisasi
                        </h2>
                        <p className="text-sm md:text-base text-[#52525b] mt-2">
                            Kolaborasi antardivisi yang menggerakkan dakwah aplikatif, inklusif, dan profesional.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {departments.map((dept, idx) => {
                            const IconComponent = dept.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group bg-white rounded-[36px] border border-[#ececee] p-7 flex flex-col shadow-none hover:border-[#09090b] transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-[14px] bg-[#f4f4f5] border border-[#ececee] flex items-center justify-center text-[#09090b] mb-5 group-hover:bg-[#09090b] group-hover:text-white transition-colors">
                                        <IconComponent size={22} />
                                    </div>

                                    <h3 className="text-base font-semibold text-[#09090b] mb-2 leading-snug">
                                        {dept.title}
                                    </h3>

                                    <p className="text-xs md:text-sm text-[#52525b] leading-relaxed">
                                        {dept.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
        </div>
    );
}
