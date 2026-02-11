
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PostEditorProps {
    initialData?: {
        id?: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        category: string;
        image_url: string;
        is_published: boolean;
    };
    pageTitle?: string;
}

// Helper to generate slug from title
const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
};

export default function PostEditor({ initialData, pageTitle = "Tambah Artikel Baru" }: PostEditorProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPreview, setIsPreview] = useState(false);

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        category: initialData?.category || 'Dakwah',
        image_url: initialData?.image_url || '',
        is_published: initialData?.is_published || false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Handle checkbox manually? No, checkbox is input type checkbox handled below separately if strict checking
        // But for text/select/textarea, this is generic.

        setFormData(prev => {
            const updates = { ...prev, [name]: value };
            // Auto generate slug from title if slug hasn't been manually edited (simple heuristic)
            // Only IF creating new post (no initialData) OR if user clears slug field
            if (name === 'title' && !initialData && !prev.slug) {
                updates.slug = generateSlug(value);
            }
            return updates;
        });
    };

    // Checkbox handler
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    }

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, slug: e.target.value }));
        // Allow manual editing without auto-format? Or force slugify?
        // Let's force lowercase but allow dashes
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (!formData.title || !formData.slug || !formData.content) {
                throw new Error("Judul, Slug, dan Konten wajib diisi.");
            }

            let response;
            if (initialData?.id) {
                // UPDATE via API
                response = await fetch(`/api/posts/${initialData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                // INSERT via API
                response = await fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Gagal menyimpan artikel via API.");
            }

            // Redirect back to dashboard
            router.push('/dashboard');
            router.refresh();
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Terjadi kesalahan saat menyimpan artikel.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-slate-600 dark:text-slate-300" />
                </Link>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{pageTitle}</h1>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2 border border-red-100">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
                {/* Main Content Area */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Judul Artikel</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Masukkan judul menarik..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold text-lg"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Slug (URL)</label>
                            <div className="flex items-center">
                                <span className="bg-slate-100 dark:bg-zinc-800 px-3 py-3 border border-r-0 border-slate-200 dark:border-zinc-700 rounded-l-xl text-slate-500 text-sm font-mono whitespace-nowrap">/blog/</span>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleSlugChange}
                                    className="w-full px-4 py-3 rounded-r-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-mono text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Konten Artikel</label>
                                <div className="flex bg-slate-100 dark:bg-zinc-800 rounded-lg p-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsPreview(false)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${!isPreview
                                            ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                                            }`}
                                    >
                                        Tulis
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsPreview(true)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${isPreview
                                            ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                                            }`}
                                    >
                                        Preview
                                    </button>
                                </div>
                            </div>

                            {isPreview ? (
                                <div className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 min-h-[500px] prose prose-sm dark:prose-invert max-w-none overflow-y-auto">
                                    {formData.content ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {formData.content}
                                        </ReactMarkdown>
                                    ) : (
                                        <p className="text-slate-400 italic">Belum ada konten untuk ditampilkan.</p>
                                    )}
                                </div>
                            ) : (
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={20}
                                    placeholder="Tulis konten artikel di sini (mendukung Markdown)..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200"
                                ></textarea>
                            )}
                            <div className="flex justify-between mt-2">
                                <p className="text-xs text-slate-400">Mendukung format Markdown.</p>
                                <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                                    Panduan Markdown
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="w-full lg:w-80 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm sticky top-6">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg border-b border-slate-100 pb-2">Publikasi</h3>

                        {/* Status */}
                        <div className="mb-6">
                            <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg transition-colors border border-slate-200 dark:border-zinc-700">
                                <input
                                    type="checkbox"
                                    name="is_published"
                                    checked={formData.is_published}
                                    onChange={handleCheckboxChange}
                                    className="w-5 h-5 text-primary rounded focus:ring-primary accent-primary"
                                />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                    Publish Sekarang
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                        >
                            <Save size={18} />
                            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800">
                            <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wide">Metadata</h3>

                            {/* Category */}
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Kategori</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                >
                                    {["Dakwah", "Vokasi", "Internal", "Opini", "Informasi"].map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Excerpt */}
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Ringkasan</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                ></textarea>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Cover Image URL</label>
                                <input
                                    type="text"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    placeholder="https://"
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm mb-3"
                                />
                                {formData.image_url && (
                                    <div className="relative h-32 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-700 bg-slate-100">
                                        <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

