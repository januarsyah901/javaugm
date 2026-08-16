
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default async function LatestPosts() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, category, author, created_at, image_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Terbaru dari Kami</h2>
                        <p className="text-slate-600 dark:text-slate-400">Ikuti perkembangan berita dan kajian terkini.</p>
                    </div>
                    <Link href="/blog" className="hidden sm:inline text-primary font-medium hover:text-emerald-800">
                        Lihat semua artikel
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {error && (
                        <div className="col-span-full rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
                            <p className="font-semibold text-red-800">Artikel gagal dimuat.</p>
                            <p className="mt-2 text-sm text-red-700">Coba muat ulang halaman.</p>
                        </div>
                    )}

                    {!error && posts?.map((post, index) => (
                        <article key={post.id} className={`flex flex-col border border-slate-200 bg-white overflow-hidden ${index === 0 ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}>
                            <div className={`relative overflow-hidden bg-slate-200 ${index === 0 ? 'h-64 md:h-full min-h-56' : 'h-48'}`}>
                                <Image
                                    src={post.image_url || '/placeholder.png'}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                                <span className="absolute top-4 left-4 bg-white px-2 py-0.5 text-xs font-semibold text-primary">
                                    {post.category}
                                </span>
                            </div>

                            <div className="flex-1 p-6 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
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

                                <h3 className={`font-bold text-slate-900 mb-3 line-clamp-2 ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                                    <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-sm font-semibold text-primary hover:text-emerald-800 mt-auto"
                                >
                                    Baca selengkapnya
                                </Link>
                            </div>
                        </article>
                    ))}

                    {!error && (!posts || posts.length === 0) && (
                        <div className="col-span-full text-center py-10 text-slate-500 dark:text-slate-400">
                            Belum ada artikel terbaru.
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link href="/blog" className="inline-flex min-h-11 items-center text-primary font-medium hover:text-emerald-800">
                        Lihat semua artikel
                    </Link>
                </div>
            </div>
        </section>
    );
}
