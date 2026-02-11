import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import Link from 'next/link';
import { Plus, Trash2, Edit } from 'lucide-react';
import DeleteButton from "@/components/dashboard/DeleteButton";

export const revalidate = 0; // Ensure data is always fresh

export default async function DashboardPage() {
    // 1. Fetch Posts from Supabase
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    // 2. Render List
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-950/20">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Daftar Artikel</h2>
                    <p className="text-sm text-slate-500">Kelola konten blog dan berita.</p>
                </div>
                <Link
                    href="/dashboard/editor"
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    <span className="font-medium">Tambah Baru</span>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-50 dark:bg-zinc-950/20 border-b border-slate-100 dark:border-zinc-800 text-xs uppercase font-semibold text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Judul</th>
                            <th className="px-6 py-4">Kategori</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Tanggal</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {posts?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                    Belum ada artikel. Silakan buat yang baru.
                                </td>
                            </tr>
                        ) : (
                            posts?.map((post) => (
                                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white max-w-xs truncate">
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-slate-300">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.is_published
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                            }`}>
                                            {post.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/dashboard/editor/${post.id}`}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            {/* Delete Button needs client interaction */}
                                            <DeleteButton id={post.id} title={post.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
