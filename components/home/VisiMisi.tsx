import { Target } from 'lucide-react';

export default function VisiMisi() {
    const vision = "Visi JAVA UGM adalah sebagai wadah bagi mahasiswa muslim dalam membangun lingkungan Sekolah Vokasi yang beriman, bertakwa, dan berakhlak mulia.";

    const missions = [
        "Menanamkan nilai-nilai keislaman berdasarkan Al-Qur'an dan As-Sunnah",
        "Menumbuhkan kesadaran civitas academica untuk berkontribusi bagi kemaslahatan umat",
        "Meningkatkan dan mengembangkan ilmu pengetahuan untuk kemaslahatan umat",
        "Mempererat ukhuwah islamiyah antar civitas academica Sekolah Vokasi UGM",
        "Menjalin hubungan multilateral antara JAVA UGM dengan lembaga dakwah lain, baik di dalam maupun di luar Universitas Gadjah Mada"
    ];

    return (
        <section className="relative">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-10 sm:mb-12">
                    <span className="tag-badge mb-3">Arah Gerak</span>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#09090b] tracking-tight leading-[1.2]">
                        Visi &amp; Misi Organisasi
                    </h2>
                    <p className="text-sm sm:text-base text-[#52525b] mt-1.5 max-w-xl">
                        Landasan nilai dan orientasi program kerja Jama&apos;ah Vokasi Al-&apos;Alim dalam menebar manfaat di kampus.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                    {/* Vision Card */}
                    <div className="lg:col-span-5 rounded-[36px] bg-white border border-[#ececee] p-7 md:p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="tag-badge">Visi Utama</span>
                                <span className="inline-flex items-center rounded-[12px] bg-[#ff5a00]/10 px-2.5 py-1 text-xs font-semibold text-[#ff5a00]">
                                    Orientasi
                                </span>
                            </div>

                            <h3 className="text-2xl font-semibold text-[#09090b] tracking-tight mt-6 mb-4">
                                Membangun Lingkungan Beriman &amp; Berakhlak Mulia
                            </h3>

                            <p className="text-base text-[#18181b] leading-relaxed">
                                &ldquo;{vision}&rdquo;
                            </p>
                        </div>

                        <div className="mt-8 rounded-[20px] bg-[#f4f4f5] border border-[#ececee] p-5">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-white border border-[#ececee] flex items-center justify-center shrink-0 mt-0.5">
                                    <Target className="w-4 h-4 text-[#ff5a00]" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[#09090b]">Fokus Gerakan</p>
                                    <p className="text-xs text-[#52525b] mt-0.5 leading-relaxed">
                                        Pembinaan karakter, penguatan akidah, serta kepedulian sosial mahasiswa vokasi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission Card */}
                    <div className="lg:col-span-7 rounded-[36px] bg-white border border-[#ececee] p-7 md:p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-5 border-b border-[#ececee]">
                                <div>
                                    <span className="tag-badge mb-2">Langkah Strategis</span>
                                    <h3 className="text-2xl font-semibold text-[#09090b] tracking-tight">
                                        5 Pilar Misi
                                    </h3>
                                </div>
                                <span className="text-xs font-medium text-[#52525b] bg-[#f4f4f5] border border-[#ececee] rounded-[12px] px-3 py-1">
                                    Aksi Nyata
                                </span>
                            </div>

                            <div className="divide-y divide-[#ececee]">
                                {missions.map((mission, index) => (
                                    <div key={index} className="py-4 first:pt-4 last:pb-0 flex items-start gap-3.5">
                                        <span className="w-7 h-7 rounded-full bg-[#f4f4f5] border border-[#ececee] text-xs font-semibold text-[#09090b] flex items-center justify-center shrink-0 mt-0.5">
                                            0{index + 1}
                                        </span>
                                        <p className="text-sm sm:text-[15px] text-[#18181b] leading-relaxed">
                                            {mission}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
