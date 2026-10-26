"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, AlertCircle, Upload, X } from "lucide-react";
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

const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const generateExcerpt = (content: string) => {
    const plainText = content
        .replace(/#{1,6}\s/g, '')
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '')
        .replace(/`{3,}[\s\S]*?`{3,}/g, '')
        .replace(/`(.+?)`/g, '$1')
        .replace(/\n/g, ' ')
        .trim();

    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
};

export default function PostEditor({ initialData, pageTitle = "Tambah Artikel Baru" }: PostEditorProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialData?.slug);
    const [excerptManuallyEdited, setExcerptManuallyEdited] = useState(!!initialData?.excerpt);

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

        setFormData(prev => {
            const updates = { ...prev, [name]: value };

            if (name === 'title' && !slugManuallyEdited) {
                updates.slug = generateSlug(value);
            }

            if (name === 'content' && !excerptManuallyEdited) {
                if (value.length > 10) {
                    updates.excerpt = generateExcerpt(value);
                }
            }

            return updates;
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, slug: e.target.value }));
        setSlugManuallyEdited(true);
    };

    const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, excerpt: e.target.value }));
        setExcerptManuallyEdited(true);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
        if (file.size > MAX_FILE_SIZE) {
            setUploadError("Ukuran file terlalu besar. Maksimal 2MB.");
            return;
        }

        setIsUploading(true);
        setUploadError(null);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Gagal mengunggah gambar.");
            }

            setFormData(prev => ({ ...prev, image_url: result.url }));
        } catch (err: any) {
            console.error(err);
            setUploadError(err.message || "Terjadi kesalahan saat mengunggah.");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image_url: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (!formData.title || !formData.slug || !formData.content) {
                throw new Error("Judul, Slug, dan Konten wajib diisi.");
            }

            let finalFormData = { ...formData };
            if (!finalFormData.excerpt.trim()) {
                finalFormData.excerpt = generateExcerpt(finalFormData.content);
            }

            let response;
            if (initialData?.id) {
                response = await fetch(`/api/posts/${initialData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalFormData),
                });
            } else {
                response = await fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalFormData),
                });
            }

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Gagal menyimpan artikel via API.");
            }

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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link
                    href="/dashboard"
                    className="w-9 h-9 rounded-full border border-[#ececee] bg-white flex items-center justify-center text-[#71717a] hover:text-[#09090b] hover:border-[#09090b] transition-colors"
                    aria-label="Kembali ke Dashboard"
                >
                    <ChevronLeft size={18} />
                </Link>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00]">
                        Editor
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#09090b] tracking-tight">
                        {pageTitle}
                    </h1>
                </div>
            </div>

            {error && (
                <div className="bg-rose-50 text-rose-700 p-4 rounded-[20px] flex items-center gap-2.5 border border-rose-200 text-xs font-medium">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Main Content Area */}
                <div className="flex-1 w-full space-y-6">
                    <div className="bg-white p-6 sm:p-8 rounded-[36px] border border-[#ececee] shadow-none space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-2">
                                Judul Artikel
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Masukkan judul artikel yang memikat..."
                                className="w-full px-4 py-3 rounded-[16px] border border-[#ececee] bg-white focus:outline-none focus:border-[#09090b] transition-colors font-semibold text-base sm:text-lg text-[#09090b] placeholder:text-[#a1a1aa]"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-2">
                                Tautan URL (Slug)
                            </label>
                            <div className="flex items-center">
                                <span className="bg-[#f4f4f5] px-3.5 py-2.5 border border-r-0 border-[#ececee] rounded-l-[14px] text-[#71717a] text-xs font-mono whitespace-nowrap">
                                    /blog/
                                </span>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleSlugChange}
                                    className="w-full px-3.5 py-2.5 rounded-r-[14px] border border-[#ececee] bg-white focus:outline-none focus:border-[#09090b] transition-colors text-xs font-mono text-[#09090b]"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a]">
                                    Konten Tulisan
                                </label>
                                <div className="flex bg-[#f4f4f5] p-1 rounded-full border border-[#ececee]">
                                    <button
                                        type="button"
                                        onClick={() => setIsPreview(false)}
                                        className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all ${
                                            !isPreview
                                                ? 'bg-white text-[#09090b] shadow-xs'
                                                : 'text-[#71717a] hover:text-[#09090b]'
                                        }`}
                                    >
                                        Tulis
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsPreview(true)}
                                        className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all ${
                                            isPreview
                                                ? 'bg-white text-[#09090b] shadow-xs'
                                                : 'text-[#71717a] hover:text-[#09090b]'
                                        }`}
                                    >
                                        Pratinjau
                                    </button>
                                </div>
                            </div>

                            {isPreview ? (
                                <div className="w-full px-5 py-4 rounded-[20px] border border-[#ececee] bg-[#fafafa] min-h-[460px] prose prose-zinc max-w-none text-sm overflow-y-auto">
                                    {formData.content ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {formData.content}
                                        </ReactMarkdown>
                                    ) : (
                                        <p className="text-[#a1a1aa] italic">Belum ada konten untuk ditampilkan.</p>
                                    )}
                                </div>
                            ) : (
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={18}
                                    placeholder="Tulis draf naskah Anda di sini dengan format Markdown..."
                                    className="w-full px-4 py-3.5 rounded-[20px] border border-[#ececee] bg-white focus:outline-none focus:border-[#09090b] transition-colors font-mono text-xs sm:text-sm leading-relaxed text-[#09090b] placeholder:text-[#a1a1aa]"
                                ></textarea>
                            )}
                            <div className="flex justify-between mt-2 text-[11px] text-[#71717a]">
                                <span>Mendukung sintaks Markdown dan tabel GFM.</span>
                                <a
                                    href="https://www.markdownguide.org/basic-syntax/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium text-[#09090b] underline hover:text-[#ff5a00]"
                                >
                                    Panduan Format
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="w-full lg:w-80 space-y-6 shrink-0">
                    <div className="bg-white p-6 rounded-[36px] border border-[#ececee] shadow-none space-y-5 sticky top-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1">
                                Pengaturan
                            </p>
                            <h3 className="font-semibold text-lg text-[#09090b]">
                                Publikasi
                            </h3>
                        </div>

                        {/* Status Checkbox */}
                        <label className="flex items-center gap-3 cursor-pointer p-3.5 hover:bg-[#fafafa] rounded-[18px] transition-colors border border-[#ececee]">
                            <input
                                type="checkbox"
                                name="is_published"
                                checked={formData.is_published}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 rounded text-[#09090b] focus:ring-0 accent-[#09090b]"
                            />
                            <div className="text-xs">
                                <span className="font-semibold text-[#09090b] block">Terbitkan Langsung</span>
                                <span className="text-[#71717a]">Dapat diakses publik</span>
                            </div>
                        </label>

                        {/* Save Button - Full Rounded */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-dark-primary rounded-full w-full py-3 px-5 text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Save size={15} />
                            <span>{isLoading ? 'Menyimpan...' : 'Simpan Artikel'}</span>
                        </button>

                        <div className="pt-4 border-t border-[#ececee] space-y-4">
                            {/* Category */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-2">
                                    Kategori
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 rounded-full border border-[#ececee] bg-white focus:outline-none focus:border-[#09090b] text-xs font-medium text-[#09090b]"
                                >
                                    {["Dakwah", "Internal", "Informasi"].map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-2">
                                    Ringkasan (Excerpt)
                                </label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleExcerptChange}
                                    rows={3}
                                    placeholder="Tulis ringkasan singkat artikel..."
                                    className="w-full px-3.5 py-2.5 rounded-[16px] border border-[#ececee] bg-white focus:outline-none focus:border-[#09090b] text-xs text-[#09090b] placeholder:text-[#a1a1aa]"
                                ></textarea>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-2">
                                    Gambar Sampul
                                </label>

                                <div className="space-y-3">
                                    {/* Upload Button */}
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="image-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className={`btn-light-neutral rounded-full w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                                                isUploading ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        >
                                            <Upload size={14} />
                                            <span>{isUploading ? 'Mengunggah...' : 'Pilih Gambar File'}</span>
                                        </label>
                                    </div>

                                    {/* URL Input */}
                                    <input
                                        type="text"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        placeholder="Atau tautan URL gambar..."
                                        className="w-full px-3.5 py-2.5 rounded-full border border-[#ececee] bg-white focus:outline-none focus:border-[#09090b] text-xs text-[#09090b] placeholder:text-[#a1a1aa]"
                                    />

                                    {uploadError && (
                                        <p className="text-[11px] text-rose-600 font-medium">{uploadError}</p>
                                    )}

                                    {/* Image Preview */}
                                    {formData.image_url && (
                                        <div className="relative rounded-[20px] overflow-hidden border border-[#ececee] bg-[#f4f4f5] h-36">
                                            <Image
                                                src={formData.image_url}
                                                alt="Pratinjau Sampul"
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                                                title="Hapus gambar"
                                            >
                                                <X size={13} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
