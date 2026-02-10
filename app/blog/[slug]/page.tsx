import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';

// This is a dynamic route component
// Ideally we would fetch data based on valid params
// For now we use dummy data

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
    // Await the params object
    const { slug } = await params;

    return (
        <div className="bg-white dark:bg-black min-h-screen pb-20">

            {/* Hero Image / Featured Image */}
            <div className="relative h-[400px] w-full bg-slate-200">
                <Image
                    src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2070&auto=format&fit=crop"
                    alt="Blog Featured Image"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors"
                        >
                            <ArrowLeft size={16} className="mr-2" /> Kembali ke Blog
                        </Link>

                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">Dakwah</span>
                            <span className="text-white/80 text-sm flex items-center gap-1"><Calendar size={14} /> 10 Mar 2025</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            Menggali Hikmah di Balik Bulan Ramadhan (Slug: {slug})
                        </h1>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">Ditulis oleh Admin JAVA</p>
                                <p className="text-white/60 text-xs">Divisi Syiar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 md:p-12">

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="lead text-xl text-slate-600 dark:text-slate-300">
                            Ramadhan adalah bulan yang penuh dengan keberkahan, ampunan, dan rahmat Allah SWT. Namun seringkali kita hanya memaknainya sebatas menahan lapar dan dahaga.
                        </p>

                        <h3>Mengapa Ramadhan Istimewa?</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>

                        <img
                            src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2070&auto=format&fit=crop"
                            alt="Ilustrasi Ramadhan"
                            className="w-full rounded-xl my-8 object-cover h-[400px]"
                        />

                        <h3>Peran Mahasiswa Vokasi</h3>
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                        </p>
                        <ul>
                            <li>Meningkatkan ibadah</li>
                            <li>Berbagi dengan sesama</li>
                            <li>Menuntut ilmu agama</li>
                        </ul>

                        <blockquote>
                            "Barangsiapa yang berpuasa di bulan Ramadhan karena iman dan mengharap pahala dari Allah maka akan diampuni dosa-dosanya yang telah lalu." (HR. Bukhari)
                        </blockquote>
                    </div>

                    {/* Share & Tags */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-zinc-800">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Tag size={18} className="text-slate-400" />
                                <div className="flex gap-2">
                                    <span className="bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm text-slate-600 dark:text-slate-300">#Ramadhan</span>
                                    <span className="bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm text-slate-600 dark:text-slate-300">#Dakwah</span>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 text-primary font-medium hover:text-emerald-700 transition-colors">
                                <Share2 size={20} />
                                Bagikan Tulisan Ini
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Artikel Terkait</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Dummy Related Posts */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-zinc-800">
                            <div className="h-40 bg-slate-200 relative">
                                <Image
                                    src={`https://images.unsplash.com/photo-${i === 1 ? '1523240795612-9a054b0db644' : '1517486808906-6ca8b3f04846'}?q=80&w=2070&auto=format&fit=crop`}
                                    alt="Related"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold mb-2 text-slate-900 dark:text-white line-clamp-2">Judul Artikel Terkait {i}</h4>
                                <Link href={`/blog/${i}`} className="text-sm text-primary font-medium hover:underline">Baca selengkapnya</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
