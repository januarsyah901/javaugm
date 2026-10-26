'use client';

import { useState, useMemo } from "react";
import useSWR, { mutate } from "swr";
import {
    Plus,
    Edit2,
    Trash2,
    Shield,
    Users,
    Search,
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
        <div className="p-8 text-center text-rose-600 bg-white rounded-[36px] border border-[#ececee]">
            <Shield className="w-10 h-10 mx-auto mb-2 text-[#71717a]" />
            <p className="font-semibold text-sm">Gagal memuat data pengguna.</p>
        </div>
    );

    if (!users && isValidating) return (
        <div className="w-full h-80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-[#71717a]">
                <div className="w-8 h-8 border-2 border-[#ececee] border-t-[#09090b] rounded-full animate-spin" />
                <p className="text-xs font-medium">Memuat data anggota...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00] mb-1">
                        Hak Akses &amp; Tim
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#09090b] tracking-tight">
                        Daftar Pengguna
                    </h1>
                    <p className="text-xs sm:text-sm text-[#52525b] mt-1">
                        Kelola hak akses pengurus dan akun login Google organisasi.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]" size={15} />
                        <input
                            type="text"
                            placeholder="Cari nama, email, divisi..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-white border border-[#ececee] rounded-full text-xs text-[#09090b] focus:outline-none focus:border-[#09090b] transition-all w-full sm:w-60"
                        />
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="btn-dark-primary rounded-full px-5 py-2.5 text-xs font-semibold flex items-center gap-2 shrink-0"
                    >
                        <Plus size={15} />
                        <span>Tambah Pengguna</span>
                    </button>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white rounded-[36px] border border-[#ececee] overflow-hidden shadow-none">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[#18181b]">
                        <thead>
                            <tr className="border-b border-[#ececee] bg-[#fafafa] text-xs uppercase font-semibold text-[#71717a] tracking-wider">
                                <th className="px-6 py-4">Pengguna</th>
                                <th className="px-6 py-4">Peran &amp; Akses</th>
                                <th className="px-6 py-4">Departemen</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ececee]">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user: User) => (
                                    <tr key={user.id} className="hover:bg-[#fafafa] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#f4f4f5] border border-[#ececee] shrink-0">
                                                    <Image
                                                        src={user.image || '/logo.png'}
                                                        alt={user.name || 'User'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-xs sm:text-sm text-[#09090b]">
                                                        {user.name || 'Tanpa Nama'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-[#71717a] mt-0.5">
                                                        <Mail size={12} className="text-[#a1a1aa]" />
                                                        <span>{user.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Plain text with dot indicator (No badge box) */}
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'admin' ? 'bg-[#ff5a00]' : 'bg-emerald-500'}`} />
                                                <span className={user.role === 'admin' ? 'text-[#ff5a00] font-semibold uppercase tracking-wider' : 'text-[#18181b] font-medium'}>
                                                    {user.role === 'admin' ? 'Administrator' : 'Anggota'}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs font-medium text-[#52525b]">
                                                <Building2 size={13} className="text-[#a1a1aa]" />
                                                <span>{user.department || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="w-8 h-8 rounded-full border border-[#ececee] bg-white flex items-center justify-center text-[#71717a] hover:text-[#09090b] hover:border-[#09090b] transition-colors"
                                                    title="Edit Pengguna"
                                                    aria-label="Edit Pengguna"
                                                >
                                                    <Edit2 size={13} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(user)}
                                                    className="w-8 h-8 rounded-full border border-[#ececee] bg-white flex items-center justify-center text-[#71717a] hover:text-[#e11d48] hover:border-rose-200 hover:bg-rose-50 transition-colors"
                                                    title="Hapus Pengguna"
                                                    aria-label="Hapus Pengguna"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-[#71717a] text-xs">
                                        Tidak ada pengguna yang cocok dengan kriteria pencarian.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-[28px] w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#ececee] overflow-hidden">
                        <div className="p-6 border-b border-[#ececee] flex justify-between items-center">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00] mb-0.5">Pengurus Baru</p>
                                <h3 className="text-base font-semibold text-[#09090b]">Tambah Akses Pengguna</h3>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="w-8 h-8 rounded-full border border-[#ececee] flex items-center justify-center text-[#71717a] hover:text-[#09090b] transition-colors"
                            >
                                <Plus className="rotate-45" size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1.5">
                                    Email Akun Google
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-full border border-[#ececee] bg-white text-xs text-[#09090b] focus:outline-none focus:border-[#09090b] transition-colors"
                                    required
                                    placeholder="nama@ugm.ac.id"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1.5">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-full border border-[#ececee] bg-white text-xs text-[#09090b] focus:outline-none focus:border-[#09090b] transition-colors"
                                    placeholder="Nama Lengkap Pengurus"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1.5">
                                        Peran Akses
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                                        className="w-full px-3.5 py-2.5 rounded-full border border-[#ececee] bg-white text-xs font-medium text-[#09090b] focus:outline-none focus:border-[#09090b]"
                                    >
                                        <option value="user">Anggota</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1.5">
                                        Departemen
                                    </label>
                                    <select
                                        value={formData.department}
                                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-full border border-[#ececee] bg-white text-xs font-medium text-[#09090b] focus:outline-none focus:border-[#09090b]"
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
                                </div>
                            </div>
                            <div className="flex justify-end gap-2.5 pt-4 border-t border-[#ececee]">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="btn-light-neutral rounded-full px-5 py-2 text-xs font-semibold"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="btn-dark-primary rounded-full px-5 py-2 text-xs font-semibold"
                                >
                                    Simpan Pengguna
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-[28px] w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#ececee] overflow-hidden">
                        <div className="p-6 border-b border-[#ececee] flex justify-between items-center">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#ff5a00] mb-0.5">Perbarui Data</p>
                                <h3 className="text-base font-semibold text-[#09090b]">Edit Akses Pengguna</h3>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="w-8 h-8 rounded-full border border-[#ececee] flex items-center justify-center text-[#71717a] hover:text-[#09090b] transition-colors"
                            >
                                <Plus className="rotate-45" size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-2.5 rounded-full border border-[#ececee] bg-[#f4f4f5] text-xs text-[#71717a] cursor-not-allowed select-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1.5">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-full border border-[#ececee] bg-white text-xs text-[#09090b] focus:outline-none focus:border-[#09090b] transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1.5">
                                        Peran Akses
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                                        className="w-full px-3.5 py-2.5 rounded-full border border-[#ececee] bg-white text-xs font-medium text-[#09090b] focus:outline-none focus:border-[#09090b]"
                                    >
                                        <option value="user">Anggota</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1.5">
                                        Departemen
                                    </label>
                                    <select
                                        value={formData.department}
                                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-full border border-[#ececee] bg-white text-xs font-medium text-[#09090b] focus:outline-none focus:border-[#09090b]"
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
                                </div>
                            </div>
                            <div className="flex justify-end gap-2.5 pt-4 border-t border-[#ececee]">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="btn-light-neutral rounded-full px-5 py-2 text-xs font-semibold"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="btn-dark-primary rounded-full px-5 py-2 text-xs font-semibold"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Pengguna"
                message="Apakah Anda yakin ingin menghapus hak akses pengguna ini dari sistem?"
                itemName={selectedUser?.name || selectedUser?.email}
                confirmText="Hapus Akses"
                variant="danger"
            />
        </div>
    );
}
