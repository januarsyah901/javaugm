import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const DUMMY_POSTS = [
    {
        id: 1,
        title: "Menggali Hikmah di Balik Bulan Ramadhan",
        excerpt: "Ramadhan bukan sekadar menahan lapar dan dahaga, tetapi momentum untuk...",
        category: "Dakwah",
        author: "Fulan bin Fulan",
        date: "10 Mar 2025",
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Peran Mahasiswa Vokasi dalam Membangun Bangsa",
        excerpt: "Sebagai mahasiswa vokasi, kita memiliki tanggung jawab moral untuk mengaplikasikan ilmu...",
        category: "Vokasi",
        author: "Admin JAVA",
        date: "05 Mar 2025",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Recap Kegiatan: JAVA Camp 2025",
        excerpt: "Keseruan kegiatan JAVA Camp tahun ini yang dilaksanakan di Kaliurang...",
        category: "Kegiatan",
        author: "Divisi Kaderisasi",
        date: "01 Mar 2025",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop"
    }
];

export default function LatestPosts() {
    return (
        <section className="py-20 bg-white dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Terbaru dari Kami</h2>
                        <p className="text-slate-600 dark:text-slate-400">Ikuti perkembangan berita dan kajian terkini.</p>
                    </div>
                    <Link href="/blog" className="hidden sm:flex items-center text-primary font-medium hover:text-emerald-700 transition-colors">
                        Lihat Semua <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {DUMMY_POSTS.map((post) => (
                        <article key={post.id} className="group flex flex-col bg-slate-50 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-zinc-700">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-lg">
                                    {post.category}
                                </div>
                            </div>

                            <div className="flex-1 p-6 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/blog/${post.id}`}
                                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-emerald-700 transition-colors mt-auto"
                                >
                                    Baca Selengkapnya
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link href="/blog" className="inline-flex items-center text-primary font-medium hover:text-emerald-700 transition-colors">
                        Lihat Semua Artikel <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
