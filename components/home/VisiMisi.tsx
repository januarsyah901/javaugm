import { Target, CheckCircle2 } from 'lucide-react';

export default function VisiMisi() {
    const missions = [
        "Menanamkan nilai-nilai keislaman yang rahmatan lil 'alamin dalam setiap aspek kegiatan.",
        "Membangun budaya intelektual yang kritis, inovatif, dan solutif di lingkungan vokasi.",
        "Mempererat ukhuwah islamiyah antar mahasiswa Sekolah Vokasi UGM.",
        "Mengembangkan potensi minat dan bakat mahasiswa dalam kerangka dakwah kreatif.",
        "Memberikan kontribusi nyata bagi masyarakat melalui kegiatan sosial dan pemberdayaan."
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Visi & Misi</h2>
                    <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Vision Card */}
                    <div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Visi Kami</h3>
                        </div>

                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic">
                            "Mewujudkan JAVA sebagai ruang untuk menumbuhkan intelektual muslim yang beradab, solutif, dan berdaya guna dalam rangka membangun peradaban yang mulia."
                        </p>
                    </div>

                    {/* Mission List */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold">5</span>
                            Poin Misi
                        </h3>

                        <div className="space-y-4">
                            {missions.map((mission, index) => (
                                <div key={index} className="flex gap-4 items-start p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                                    <CheckCircle2 className="flex-shrink-0 text-secondary mt-1" size={20} />
                                    <p className="text-slate-700 dark:text-slate-300">{mission}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
