
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
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

export const revalidate = 60; // ISR

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug } = await params;

    // Fetch the post from Supabase
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !post) {
        // If not found, return 404
        notFound();
    }

    // Format date inside component
    const formattedDate = new Date(post.created_at).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    // Fetch author department
    let authorDepartment = 'Divisi';

    try {
        // Try to find author in users table
        // First try by author_id (if exists from migration), then by name
        if ((post as any).author_id) {
            const { data } = await supabase.from('users').select('department').eq('id', (post as any).author_id).single();
            if (data?.department) authorDepartment = data.department;
        }

        // Fallback to name search if author_id didnt yield result or didnt exist
        if (authorDepartment === 'Divisi' && post.author) {
            const { data } = await supabase.from('users').select('department').eq('name', post.author).single();
            if (data?.department) authorDepartment = data.department;
        }
    } catch (e) {
        console.error('Error fetching author department:', e);
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen pb-20">

            {/* Hero Image / Featured Image */}
            <div className="relative h-[400px] w-full bg-slate-200 mt-20">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors"
                        >
                            <ArrowLeft size={16} className="mr-2" /> Kembali ke Blog
                        </Link>

                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">{post.category}</span>
                            <span className="text-white/80 text-sm flex items-center gap-1">
                                <Calendar size={14} /> {formattedDate}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-3 ">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white overflow-hidden">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">Ditulis oleh {post.author || 'Admin Java'}</p>
                                <p className="text-white/60 text-xs">{authorDepartment}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <article className="max-w-4xl mx-auto px-4 pt-6 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 md:p-12 border border-zinc-100 dark:border-zinc-800">

                    <div className="prose prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Share & Tags */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-zinc-800">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Tag size={18} className="text-slate-400" />
                                <div className="flex gap-2">
                                    <span className="bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm text-slate-600 dark:text-slate-300">
                                        #{post.category}
                                    </span>
                                    <span className="bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm text-slate-600 dark:text-slate-300">
                                        #JAVAUGM
                                    </span>
                                </div>
                            </div>

                            <ShareButton slug={post.slug} title={post.title} />
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts Placeholder */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Baca Artikel Lainnya</h3>
                    <Link href="/blog" className="text-primary hover:underline font-medium">Lihat Semua</Link>
                </div>
                {/* Related Posts Logic */}
                {(() => {
                    // Fetch related posts (server-side in async component)
                    // We need to use a separate function or direct logic here.
                    // Since this is an async component, we can wait for another supabase call.
                    return <RelatedPosts currentPostId={post.id} category={post.category} />;
                })()}

            </section>
        </div>
    );
}

async function RelatedPosts({ currentPostId, category }: { currentPostId: number, category: string }) {
    const { data: relatedPosts } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, image_url, created_at, category')
        .eq('category', category)
        .neq('id', currentPostId)
        .eq('is_published', true)
        .limit(3);

    if (!relatedPosts || relatedPosts.length === 0) {
        return (
            <div className="p-8 bg-slate-50 dark:bg-zinc-900 rounded-xl text-center border border-dashed border-slate-300 dark:border-zinc-700">
                <p className="text-slate-500">Belum ada artikel terkait lainnya.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group block bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 dark:border-zinc-800">
                    <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                        {post.image_url ? (
                            <Image
                                src={post.image_url}
                                alt={post.title}
                                fill
                                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <span className="text-4xl font-bold opacity-20">Java</span>
                            </div>
                        )}
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                            {post.category}
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                            <Calendar size={14} />
                            {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {post.excerpt}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
