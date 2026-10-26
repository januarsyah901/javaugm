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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-10">
            {/* Filter Pills and Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2">
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`h-10 px-4 rounded-[12px] text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-[#09090b] text-white shadow-none'
                                        : 'bg-white text-[#52525b] border border-[#ececee] hover:text-[#09090b] hover:border-[#d4d4d8]'
                                }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Cari artikel atau topik..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-[14px] border border-[#ececee] bg-white text-sm text-[#18181b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b] transition-colors"
                    />
                    <Search className="absolute left-3.5 top-3.5 text-[#a1a1aa]" size={16} />
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
                        <article
                            key={post.id}
                            className="group bg-white rounded-[36px] border border-[#ececee] p-7 flex flex-col h-full shadow-none transition-colors hover:border-[#09090b]"
                        >
                            {/* Card Image */}
                            <div className="relative h-52 w-full rounded-[24px] overflow-hidden bg-[#f4f4f5] border border-[#ececee] mb-6">
                                {post.image_url ? (
                                    <Image
                                        src={post.image_url}
                                        alt={post.title}
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
                                <div className="absolute top-3.5 left-3.5">
                                    <span className="inline-flex items-center px-3 py-1 rounded-[12px] bg-white/95 backdrop-blur-xs border border-[#ececee] text-[#09090b] text-xs font-semibold">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="flex flex-col flex-1">
                                {/* Metadata */}
                                <div className="flex items-center gap-4 text-xs text-[#71717a] mb-3">
                                    <span className="inline-flex items-center gap-1.5">
                                        <Calendar size={13} className="text-[#a1a1aa]" />
                                        {formatDate(post.created_at)}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <User size={13} className="text-[#a1a1aa]" />
                                        {post.author || 'Admin Java'}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-semibold text-[#09090b] group-hover:text-[#ff5a00] transition-colors line-clamp-2 leading-snug mb-3">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                {/* Excerpt */}
                                <p className="text-sm text-[#52525b] line-clamp-3 leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>

                                {/* Action Link */}
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#09090b] group-hover:text-[#ff5a00] transition-colors mt-auto pt-2"
                                >
                                    Baca Selengkapnya
                                    <ArrowRight size={15} />
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-[36px] border border-[#ececee] p-12 text-center text-[#52525b] shadow-none">
                        <p className="text-base font-medium text-[#18181b]">Tidak ada artikel yang cocok dengan pencarian.</p>
                        <p className="mt-1 text-sm text-[#71717a]">Gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-6">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="h-11 px-4 rounded-[14px] text-sm font-medium border border-[#ececee] bg-white text-[#18181b] hover:bg-[#f4f4f5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Sebelumnya
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`h-11 min-w-[44px] px-3.5 rounded-[14px] text-sm font-medium transition-colors ${
                                currentPage === pageNum
                                    ? 'bg-[#09090b] text-white border border-[#09090b]'
                                    : 'bg-white text-[#52525b] hover:text-[#09090b] hover:border-[#d4d4d8] border border-[#ececee]'
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="h-11 px-4 rounded-[14px] text-sm font-medium border border-[#ececee] bg-white text-[#18181b] hover:bg-[#f4f4f5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Berikutnya
                    </button>
                </div>
            )}
        </div>
    );
}
