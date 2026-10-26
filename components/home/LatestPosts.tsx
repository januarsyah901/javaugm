import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
        <section className="relative">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00] mb-3">
                            Warta &amp; Inspirasi
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-[#09090b] tracking-tight leading-[1.2]">
                            Terbaru dari Kami
                        </h2>
                        <p className="text-sm sm:text-base text-[#52525b] mt-1.5">
                            Ikuti perkembangan warta dakwah, gagasan, dan catatan kegiatan kampus.
                        </p>
                    </div>

                    <Link
                        href="/blog"
                        className="btn-light-neutral rounded-full hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium shrink-0"
                    >
                        <span>Lihat Semua</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {error && (
                        <div className="col-span-full rounded-[36px] border border-[#ececee] bg-white p-8 text-center">
                            <p className="text-sm font-semibold text-[#09090b]">Artikel belum dapat dimuat</p>
                            <p className="text-xs text-[#52525b] mt-1">Silakan segarkan halaman untuk mencoba kembali.</p>
                        </div>
                    )}

                    {!error && posts?.map((post) => (
                        <article
                            key={post.id}
                            className="group flex flex-col rounded-[36px] bg-white border border-[#ececee] overflow-hidden transition-colors hover:border-[#d4d4d8]"
                        >
                            {/* Image Header */}
                            <div className="relative h-48 sm:h-52 w-full bg-[#f4f4f5] overflow-hidden">
                                {post.image_url ? (
                                    <Image
                                        src={post.image_url}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <Image
                                        src="/placeholder.png"
                                        alt="Placeholder"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                            </div>

                            {/* Content Body with 28px internal padding (p-7) */}
                            <div className="p-7 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00]">
                                            {post.category || 'Artikel'}
                                        </span>
                                        <span className="text-xs text-[#52525b]">
                                            {new Date(post.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-[#09090b] tracking-tight mb-2 line-clamp-2 group-hover:text-[#ff5a00] transition-colors leading-snug">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-sm text-[#52525b] leading-relaxed line-clamp-3 mb-6">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-[#ececee] flex items-center justify-between text-xs">
                                    <span className="text-[#71717a] font-normal">
                                        {post.author || 'Admin'}
                                    </span>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-1.5 font-semibold text-[#09090b] group-hover:text-[#ff5a00] transition-colors"
                                    >
                                        <span>Baca Tulisan</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}

                    {!error && (!posts || posts.length === 0) && (
                        <div className="col-span-full rounded-[36px] border border-[#ececee] bg-white p-8 text-center text-sm text-[#52525b]">
                            Belum ada artikel terbaru yang dipublikasikan.
                        </div>
                    )}
                </div>

                {/* Mobile All Posts Button */}
                <div className="mt-8 text-center sm:hidden">
                    <Link
                        href="/blog"
                        className="btn-light-neutral rounded-full inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-medium"
                    >
                        <span>Lihat Semua Artikel</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
