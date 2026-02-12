
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default async function LatestPosts() {
    const { data: posts } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, category, author, created_at, image_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);

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
                    {posts?.map((post) => (
                        <article key={post.id} className="group flex flex-col bg-slate-50 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-zinc-700 h-full">
                            <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-zinc-700">
                                {post.image_url ? (
                                    <Image
                                        src={post.image_url}
                                        alt={post.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-slate-400">
                                        <span className="text-4xl font-bold opacity-20">Java</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-lg">
                                    {post.category}
                                </div>
                            </div>

                            <div className="flex-1 p-6 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {new Date(post.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <User size={14} /> {post.author || 'Admin'}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-emerald-700 transition-colors mt-auto"
                                >
                                    Baca Selengkapnya
                                </Link>
                            </div>
                        </article>
                    ))}

                    {(!posts || posts.length === 0) && (
                        <div className="col-span-full text-center py-10 text-slate-500 dark:text-slate-400">
                            Belum ada artikel terbaru.
                        </div>
                    )}
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
