import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import ShareButton from '@/components/blog/ShareButton';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
    const { data: posts } = await supabase.from('posts').select('slug');

    return posts?.map(({ slug }) => ({
        slug,
    })) || [];
}

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !post) {
        notFound();
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    let authorDepartment = 'Keluarga Mahasiswa';

    try {
        if ((post as any).author_id) {
            const { data } = await supabase
                .from('users')
                .select('department')
                .eq('id', (post as any).author_id)
                .single();
            if (data?.department) authorDepartment = data.department;
        }

        if (authorDepartment === 'Keluarga Mahasiswa' && post.author) {
            const { data } = await supabase
                .from('users')
                .select('department')
                .eq('name', post.author)
                .single();
            if (data?.department) authorDepartment = data.department;
        }
    } catch (e) {
        console.error('Error fetching author department:', e);
    }

    return (
        <div className="bg-[#f4f4f5] min-h-screen py-10 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-[14px] bg-white border border-[#ececee] text-xs font-semibold text-[#52525b] hover:text-[#09090b] hover:border-[#d4d4d8] transition-colors"
                    >
                        <ArrowLeft size={14} />
                        Kembali ke Blog
                    </Link>
                </div>

                {/* Article Header */}
                <header className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[12px] bg-[#ff5a00] text-white text-xs font-semibold tracking-wide uppercase mb-5">
                        {post.category || 'Artikel'}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#09090b] tracking-tight leading-[1.18] mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 py-4 border-y border-[#ececee]">
                        <div className="w-11 h-11 rounded-full bg-white border border-[#ececee] flex items-center justify-center text-[#09090b]">
                            <User size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#09090b]">
                                {post.author || 'Admin Java'}
                            </p>
                            <p className="text-xs text-[#71717a]">
                                {authorDepartment}
                            </p>
                        </div>
                        <div className="ml-auto text-xs text-[#71717a] flex items-center gap-1.5">
                            <Calendar size={13} className="text-[#a1a1aa]" />
                            {formattedDate}
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative w-full h-[360px] md:h-[460px] rounded-[36px] overflow-hidden bg-white border border-[#ececee] mb-10 shadow-none">
                    {post.image_url ? (
                        <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <Image
                            src="/placeholder.png"
                            alt="Placeholder"
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>

                {/* Content Article */}
                <article className="bg-white rounded-[36px] border border-[#ececee] p-8 md:p-14 shadow-none mb-16">
                    <div className="prose prose-zinc max-w-none text-[#18181b] 
                        prose-headings:font-semibold prose-headings:text-[#09090b] prose-headings:tracking-tight
                        prose-p:text-[#3f3f46] prose-p:leading-relaxed prose-p:text-base md:prose-p:text-[17px]
                        prose-a:text-[#09090b] prose-a:underline hover:prose-a:text-[#ff5a00]
                        prose-strong:text-[#09090b] prose-strong:font-semibold
                        prose-blockquote:border-l-2 prose-blockquote:border-[#ff5a00] prose-blockquote:text-[#52525b] prose-blockquote:italic
                        prose-li:text-[#3f3f46] prose-code:text-[#09090b] prose-code:bg-[#f4f4f5] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Tags & Social Share */}
                    <div className="mt-12 pt-8 border-t border-[#ececee]">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Tag size={16} className="text-[#a1a1aa]" />
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 rounded-[12px] bg-[#f4f4f5] border border-[#ececee] text-xs font-medium text-[#52525b]">
                                        #{post.category}
                                    </span>
                                    <span className="px-3 py-1 rounded-[12px] bg-[#f4f4f5] border border-[#ececee] text-xs font-medium text-[#52525b]">
                                        #JAVAUGM
                                    </span>
                                </div>
                            </div>

                            <ShareButton slug={post.slug} title={post.title} />
                        </div>
                    </div>
                </article>

                {/* Related Posts Section */}
                <section className="pt-4 pb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-xs uppercase font-semibold tracking-wider text-[#ff5a00]">
                                Rekomendasi
                            </span>
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#09090b] tracking-tight mt-1">
                                Artikel Terkait
                            </h2>
                        </div>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#09090b] hover:text-[#ff5a00] transition-colors"
                        >
                            Lihat Semua
                            <ArrowRight size={15} />
                        </Link>
                    </div>

                    <RelatedPosts currentPostId={post.id} category={post.category} />
                </section>
            </div>
        </div>
    );
}

async function RelatedPosts({ currentPostId, category }: { currentPostId: number; category: string }) {
    const { data: relatedPosts } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, image_url, created_at, category')
        .eq('category', category)
        .neq('id', currentPostId)
        .eq('is_published', true)
        .limit(3);

    if (!relatedPosts || relatedPosts.length === 0) {
        return (
            <div className="p-8 bg-white rounded-[36px] border border-[#ececee] text-center text-[#52525b] shadow-none">
                <p className="text-sm">Belum ada artikel terkait lainnya dalam topik ini.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((item) => (
                <Link
                    href={`/blog/${item.slug}`}
                    key={item.id}
                    className="group bg-white rounded-[36px] border border-[#ececee] p-6 flex flex-col h-full shadow-none hover:border-[#09090b] transition-colors"
                >
                    <div className="relative h-44 w-full rounded-[20px] overflow-hidden bg-[#f4f4f5] border border-[#ececee] mb-5">
                        {item.image_url ? (
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                            />
                        ) : (
                            <Image
                                src="/placeholder.png"
                                alt="Placeholder"
                                fill
                                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                            />
                        )}
                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-[12px] bg-white/95 backdrop-blur-xs border border-[#ececee] text-[#09090b] text-[11px] font-semibold">
                                {item.category}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-1.5 text-xs text-[#71717a] mb-2.5">
                            <Calendar size={13} className="text-[#a1a1aa]" />
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </div>

                        <h3 className="text-base font-semibold text-[#09090b] group-hover:text-[#ff5a00] transition-colors line-clamp-2 leading-snug mb-2">
                            {item.title}
                        </h3>

                        <p className="text-xs text-[#52525b] line-clamp-2 leading-relaxed mb-4 flex-1">
                            {item.excerpt}
                        </p>

                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09090b] group-hover:text-[#ff5a00] transition-colors mt-auto pt-1">
                            Baca Artikel
                            <ArrowRight size={13} />
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
