
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Calendar, User } from 'lucide-react';
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
                            className={`min-h-11 px-4 py-2 rounded-lg text-sm font-medium ${selectedCategory === cat
                                ? 'bg-primary text-white'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
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
                        className="w-full min-h-11 pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <article key={post.id} className="bg-white border border-slate-200 overflow-hidden flex flex-col h-full">
                            <div className="relative h-48 overflow-hidden bg-slate-100">
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

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.created_at)}</span>
                                    <span className="flex items-center gap-1"><User size={14} /> {post.author || 'Admin'}</span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
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
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-slate-500">
                        <p>Tidak ada artikel yang ditemukan.</p>
                    </div>
                )}
            </div>


        </>
    );
}
