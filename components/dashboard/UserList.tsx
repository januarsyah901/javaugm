
'use client';

import { useState, useMemo } from "react";
import useSWR, { mutate } from "swr";
import {
    Plus,
    Edit2,
    Trash2,
    Shield,
    User as UserIcon,
    Users,
    Search,
    MoreHorizontal,
    Mail,
    Building2,
    CheckCircle2
} from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Image from "next/image";

interface User {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'user';
    department: string;
    image: string;
    created_at: string;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function UserList() {
    const { data: users, error, isValidating } = useSWR<User[]>('/api/users', fetcher);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Filter Users
    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user: User) =>
            (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.department || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        role: 'user',
        department: 'Anggota'
    });

    const resetForm = () => {
        setFormData({ email: '', name: '', role: 'user', department: 'Anggota' });
    };

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setFormData({
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department || 'Anggota'
        });
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error('Gagal menambahkan user');
            mutate('/api/users');
            setIsAddModalOpen(false);
            resetForm();
        } catch (err) {
            alert('Gagal menambahkan user');
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        try {
            const res = await fetch(`/api/users/${selectedUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error('Gagal mengupdate user');
            mutate('/api/users');
            setIsEditModalOpen(false);
            setSelectedUser(null);
        } catch (err) {
            alert('Gagal mengupdate user');
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedUser) return;
        try {
            const res = await fetch(`/api/users/${selectedUser.id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Gagal menghapus user');
            mutate('/api/users');
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
        } catch (err) {
            alert('Gagal menghapus user');
        }
    };

    if (error) return (
        <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
            <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">Gagal memuat data pengguna.</p>
        </div>
    );

    if (!users && isValidating) return (
        <div className="w-full h-96 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-slate-400">
                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-sm font-medium animate-pulse">Memuat data pengguna...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Daftar Pengguna</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Kelola akses keanggotaan.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Cari user..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-full md:w-64"
                        />
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-95"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">Tambah User</span>
                    </button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800 overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-zinc-800/20 border-b border-slate-200 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User Profile</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role & Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Departemen</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/50">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user: User) => (
                                    <tr key={user.id} className="group hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-700 dark:to-zinc-800 shadow-inner flex-shrink-0 border-2 border-white dark:border-zinc-800">
                                                    <Image
                                                        src={user.image || '/logo.png'}
                                                        alt={user.name || 'User'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                        {user.name || 'Tanpa Nama'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                                                        <Mail size={12} />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-start gap-2">
                                                <span className={`inline-flex items-center gap-1.5 pl-2 pr-3 py-1 rounded-full text-xs font-semibold border ${user.role === 'admin'
                                                    ? 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800'
                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800'
                                                    }`}>
                                                    {user.role === 'admin' ? <Shield size={12} className="fill-current" /> : <CheckCircle2 size={12} className="fill-current" />}
                                                    {user.role === 'admin' ? 'Administrator' : 'Anggota'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <div className="p-1.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400">
                                                    <Building2 size={14} />
                                                </div>
                                                {user.department || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all transform hover:scale-105"
                                                    title="Edit User"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(user)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all transform hover:scale-105"
                                                    title="Hapus User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-500 dark:text-slate-400">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-2">
                                                <Users className="w-8 h-8 opacity-20" />
                                            </div>
                                            <p className="font-medium">Tidak ada user ditemukan</p>
                                            <p className="text-sm opacity-60">Coba kata kunci pencarian yang lain.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-zinc-800 transform scale-100 transition-all">
                        <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tambah User Baru</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <Plus className="rotate-45" size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email (Google Account)</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-zinc-950 dark:border-zinc-700 transition-all"
                                    required
                                    placeholder="contoh@gmail.com"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-zinc-950 dark:border-zinc-700 transition-all"
                                    placeholder="Nama Lengkap User"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Role</label>
                                    <div className="relative">
                                        <select
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-zinc-950 dark:border-zinc-700 appearance-none transition-all"
                                        >
                                            <option value="user">Anggota</option>
                                            <option value="admin">Administrator</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <Shield size={14} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Departemen</label>
                                    <div className="relative">
                                        <select
                                            value={formData.department}
                                            onChange={e => setFormData({ ...formData, department: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-zinc-950 dark:border-zinc-700 appearance-none transition-all"
                                        >
                                            <option value="Anggota">Anggota</option>
                                            <option value="PH">PH</option>
                                            <option value="BKK">BKK</option>
                                            <option value="Media">Media</option>
                                            <option value="Kemuslimahan">Kemuslimahan</option>
                                            <option value="DPS">DPS</option>
                                            <option value="Kewirausahaan">Kewirausahaan</option>
                                            <option value="VISA">VISA</option>
                                            <option value="Eksternal">Eksternal</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <Users size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-zinc-800">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors">Batal</button>
                                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform active:scale-95">Simpan User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-zinc-800 transform scale-100 transition-all">
                        <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit User</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <Plus className="rotate-45" size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-2.5 border rounded-xl bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:border-zinc-700 cursor-not-allowed select-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-zinc-950 dark:border-zinc-700 transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Role</label>
                                    <div className="relative">
                                        <select
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-zinc-950 dark:border-zinc-700 appearance-none transition-all"
                                        >
                                            <option value="user">Anggota</option>
                                            <option value="admin">Administrator</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <Shield size={14} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Departemen</label>
                                    <div className="relative">
                                        <select
                                            value={formData.department}
                                            onChange={e => setFormData({ ...formData, department: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-zinc-950 dark:border-zinc-700 appearance-none transition-all"
                                        >
                                            <option value="Anggota">Anggota</option>
                                            <option value="PH">PH</option>
                                            <option value="BKK">BKK</option>
                                            <option value="Media">Media</option>
                                            <option value="Kemuslimahan">Kemuslimahan</option>
                                            <option value="DPS">DPS</option>
                                            <option value="Kewirausahaan">Kewirausahaan</option>
                                            <option value="VISA">VISA</option>
                                            <option value="Eksternal">Eksternal</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <Users size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-zinc-800">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors">Batal</button>
                                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-95">Simpan Perubahan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus User"
                message="Apakah Anda yakin ingin menghapus user ini? Akses mereka akan dicabut."
                itemName={selectedUser?.name || selectedUser?.email}
                confirmText="Hapus User"
                variant="danger"
            />
        </div>
    );
}
