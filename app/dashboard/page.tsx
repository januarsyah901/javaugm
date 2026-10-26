import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import DeleteButton from "@/components/dashboard/DeleteButton";

export const revalidate = 0; // Ensure data is always fresh

export default async function DashboardPage() {
    // 1. Fetch Posts from Supabase Admin (Bypass RLS to see all posts including drafts)
    const { data: posts } = await supabaseAdmin
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    // 2. Render List
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00] mb-1">
                        Manajemen Konten
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#09090b] tracking-tight">
                        Daftar Artikel
                    </h1>
                    <p className="text-xs sm:text-sm text-[#52525b] mt-1">
                        Kelola publikasi tulisan, catatan dakwah, dan warta kegiatan organisasi.
                    </p>
                </div>

                <Link
                    href="/dashboard/editor"
                    className="btn-dark-primary rounded-full px-5 py-2.5 text-xs font-semibold flex items-center gap-2 self-start sm:self-auto shrink-0"
                >
                    <Plus size={15} />
                    <span>Tambah Artikel</span>
                </Link>
            </div>

            {/* Articles Table Card */}
            <div className="bg-white rounded-[36px] border border-[#ececee] overflow-hidden shadow-none">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[#18181b]">
                        <thead className="border-b border-[#ececee] bg-[#fafafa] text-xs uppercase font-semibold text-[#71717a] tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Judul Artikel</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Tanggal Buat</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ececee]">
                            {posts?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-[#71717a] text-sm">
                                        Belum ada artikel yang tersimpan. Mulai tulis artikel pertama Anda.
                                    </td>
                                </tr>
                            ) : (
                                posts?.map((post) => (
                                    <tr key={post.id} className="hover:bg-[#fafafa] transition-colors">
                                        <td className="px-6 py-4 font-semibold text-[#09090b] max-w-xs md:max-w-md truncate">
                                            {post.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00]">
                                                {post.category || 'Dakwah'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                                                <span className={`w-1.5 h-1.5 rounded-full ${post.is_published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                <span className={post.is_published ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                                                    {post.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-[#71717a]">
                                            {new Date(post.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/editor/${post.id}`}
                                                    className="w-8 h-8 rounded-full border border-[#ececee] bg-white flex items-center justify-center text-[#71717a] hover:text-[#09090b] hover:border-[#09090b] transition-colors"
                                                    title="Edit Artikel"
                                                    aria-label="Edit Artikel"
                                                >
                                                    <Edit size={14} />
                                                </Link>
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
        </div>
    );
}
