
'use client';

import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { Plus, Edit2, Trash2, Shield, User as UserIcon, Users } from "lucide-react";
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
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    if (error) return <div className="text-red-500 text-center py-10">Gagal memuat data pengguna.</div>;
    if (!users && isValidating) return <div className="text-center py-10 animate-pulse">Memuat data...</div>;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800 overflow-hidden">
            {/* Toolbar */}
            <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="bg-primary hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                    >
                        <Plus size={16} /> Tambah User
                    </button>
                </div>
                <div className="text-sm text-slate-500">
                    Total: {users?.length || 0} Pengguna
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-zinc-800">
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Departemen</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {users?.map((user: User) => (
                            <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                                            {user.image ? (
                                                <Image src={user.image} alt={user.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold bg-slate-100 dark:bg-zinc-800">
                                                    {user.name?.[0] || user.email?.[0] || '?'}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">{user.name || 'Tanpa Nama'}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${user.role === 'admin'
                                        ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
                                        : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                                        }`}>
                                        {user.role === 'admin' ? <Shield size={12} /> : <UserIcon size={12} />}
                                        {user.role === 'admin' ? 'Administrator' : 'Anggota'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">
                                        {user.department || '-'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(user)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-200 dark:border-zinc-800">
                        <h3 className="text-lg font-bold mb-4">Tambah User Baru</h3>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Email (Google Account)</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-700"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-700"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-700"
                                    >
                                        <option value="user">Anggota</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Departemen</label>
                                    <select
                                        value={formData.department}
                                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-700"
                                    >
                                        <option value="Anggota">Anggota (Default)</option>
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
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-emerald-700 rounded-lg">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-200 dark:border-zinc-800">
                        <h3 className="text-lg font-bold mb-4">Edit User</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-3 py-2 border rounded-lg bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:border-zinc-700 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-700"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-700"
                                    >
                                        <option value="user">Anggota</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Departemen</label>
                                    <select
                                        value={formData.department}
                                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-700"
                                    >
                                        <option value="Anggota">Anggota (Default)</option>
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
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-emerald-700 rounded-lg">Update</button>
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
