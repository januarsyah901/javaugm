
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    author: string;
    created_at: string;
    image_url: string;
}

const CATEGORIES = ["Semua", "Dakwah", "Internal", "Informasi"];
const POSTS_PER_PAGE = 9;

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPosts = initialPosts.filter(post => {
        const matchCategory = selectedCategory === "Semua" || post.category === selectedCategory;
        const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setCurrentPage(1);
    };

    // Helper for formatting date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    return (
        <>
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`min-h-11 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedCategory === cat
                                    ? 'bg-emerald-700 text-white shadow-xs'
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Cari artikel..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full min-h-11 pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all text-sm"
                    />
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
                        <article key={post.id} className="group bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-slate-200 flex flex-col h-full">
                            <div className="relative h-48 overflow-hidden bg-slate-100">
                                {post.image_url ? (
                                    <Image
                                        src={post.image_url}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Image
                                        src="/placeholder.png"
                                        alt="Placeholder"
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <div className="absolute top-3 left-3 bg-white/95 border border-slate-200 px-2.5 py-0.5 rounded-md text-xs font-semibold text-emerald-800 shadow-xs">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.created_at)}</span>
                                    <span className="flex items-center gap-1"><User size={14} /> {post.author || 'Admin'}</span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors mt-auto"
                                >
                                    Baca Selengkapnya
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
                        <p>Tidak ada artikel yang ditemukan.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="min-h-11 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Sebelumnya
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`min-h-11 min-w-11 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                                currentPage === pageNum
                                    ? 'bg-emerald-700 text-white shadow-xs'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="min-h-11 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Berikutnya
                    </button>
                </div>
            )}
        </>
    );
}
