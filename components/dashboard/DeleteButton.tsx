
'use client';

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, title }: { id: number, title?: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus artikel "${title || 'ini'}"?`);
        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Gagal menghapus artikel.");
            }

            // Refresh the page to reflect deletion
            router.refresh();
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Gagal menghapus artikel.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Hapus"
        >
            <Trash2 size={16} />
        </button>
    );
}
