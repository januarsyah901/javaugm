import { Target, CheckCircle2 } from 'lucide-react';

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
                            &#34;{vision}&#34;
                        </p>
                    </div>

                    {/* Mission List */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold">5</span>
                            Misi Kami
                        </h3>

                        <div className="space-y-4">
                            {missions.map((mission, index) => (
                                <div key={index} className="flex gap-4 items-start p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-300 dark:border-zinc-800 hover:shadow-md transition-shadow">
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
