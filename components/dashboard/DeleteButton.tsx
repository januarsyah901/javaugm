
'use client';

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/ConfirmModal";
import AlertModal from "@/components/ui/AlertModal";

export default function DeleteButton({ id, title }: { id: number, title?: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async () => {
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
            setShowConfirm(false); // Close modal on success (though refresh might unmount component)
        } catch (error: any) {
            console.error("Error deleting post:", error);
            setError(error.message || "Gagal menghapus artikel.");
            setShowConfirm(false); // Close confirm modal
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                disabled={isDeleting}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Hapus"
            >
                <Trash2 size={16} />
            </button>

            <ConfirmModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleDelete}
                title="Hapus Artikel"
                message="Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan."
                itemName={title}
                confirmText="Hapus"
                cancelText="Batal"
                isLoading={isDeleting}
                variant="danger"
            />

            <AlertModal
                isOpen={!!error}
                onClose={() => setError(null)}
                title="Gagal Menghapus"
                message={error || "Terjadi kesalahan saat menghapus artikel."}
                type="error"
            />
        </>
    );
}
