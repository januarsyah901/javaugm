import Image from 'next/image';
import { Users, BookOpen, Heart, Award } from 'lucide-react';

export const metadata = {
    title: 'Profil Organisasi - JAVA Fathul Afaq',
    description: 'Mengenal lebih dekat Jama’ah Vokasi Al-‘Alim (JAVA) Kabinet Fathul Afaq.',
};

export default function ProfilePage() {
    return (
        <div className="bg-slate-50 dark:bg-black min-h-screen pb-20">
            {/* Header Section */}
            <section className="relative bg-primary text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519817650390-b72a0a99fbd9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/90"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                        Mengenal lebih dekat Jama’ah Vokasi Al-‘Alim (JAVA) sebagai rumah perjuangan dan persaudaraan.
                    </p>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2070&auto=format&fit=crop"
                                alt="Philosophy Illustration"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <h3 className="text-2xl font-bold mb-2">Fathul Afaq</h3>
                                    <p className="text-emerald-300 font-medium">1447/1448 H</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-amber-600 bg-amber-100 mb-2">
                                Filosofi Kabinet
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                "Fathul Afaq" <br />
                                <span className="text-primary text-2xl font-normal">(Pembuka Cakrawala)</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                Nama ini merepresentasikan semangat perluasan wawasan dan kebermanfaatan nilai Islam di bidang vokasi. Kami percaya bahwa mahasiswa vokasi memiliki potensi luar biasa untuk membuka cakrawala baru dalam teknologi, sosial, dan humaniora yang dibingkai dengan nilai-nilai keislaman.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Intelektualitas</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Menjunjung tinggi ilmu pengetahuan.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Profesionalitas</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Ahli dan amanah dalam berkarya.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Organizational Structure Preview */}
            <section className="py-20 bg-white dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Struktur Organisasi</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { title: "PH", desc: "Pengurus Harian", icon: Users, color: "bg-blue-100 text-blue-600" },
                            { title: "Kaderisasi", desc: "Pengembangan SDM", icon: Users, color: "bg-green-100 text-green-600" },
                            { title: "Syiar", desc: "Media & Dakwah", icon: BookOpen, color: "bg-purple-100 text-purple-600" },
                            { title: "Kemuslimahan", desc: "Pemberdayaan Wanita", icon: Heart, color: "bg-pink-100 text-pink-600" },
                            { title: "Sosmas", desc: "Sosial Masyarakat", icon: Users, color: "bg-orange-100 text-orange-600" },
                            { title: "Danus", desc: "Dana & Usaha", icon: Award, color: "bg-yellow-100 text-yellow-600" },
                            // Add more departments as needed
                        ].map((dept, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 hover:shadow-lg transition-all">
                                <div className={`w-12 h-12 ${dept.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    <dept.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{dept.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{dept.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
