
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

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = initialPosts.filter(post => {
        const matchCategory = selectedCategory === "Semua" || post.category === selectedCategory;
        const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

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
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-700'
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <article key={post.id} className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-zinc-800 flex flex-col h-full">
                            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                                {post.image_url ? (
                                    <Image
                                        src={post.image_url}
                                        alt={post.title}
                                        fill
                                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <Image
                                        src="/placeholder.png"
                                        alt="Placeholder"
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                )}
                                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.created_at)}</span>
                                    <span className="flex items-center gap-1"><User size={14} /> {post.author || 'Admin'}</span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4 flex-1">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-emerald-700 transition-colors mt-auto"
                                >
                                    Baca Selengkapnya
                                    <ArrowRight size={16} className="ml-2" />
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-slate-500">
                        <p>Tidak ada artikel yang ditemukan.</p>
                    </div>
                )}
            </div>

            {/* Pagination Placeholder */}
            {filteredPosts.length > 9 && (
                <div className="mt-16 flex justify-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold">1</button>
                    {/* Add logic for more pages if needed */}
                </div>
            )}
        </>
    );
}
