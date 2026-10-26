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
            setShowConfirm(false);
        } catch (error: any) {
            console.error("Error deleting post:", error);
            setError(error.message || "Gagal menghapus artikel.");
            setShowConfirm(false);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                disabled={isDeleting}
                className="w-8 h-8 rounded-full border border-[#ececee] bg-white flex items-center justify-center text-[#71717a] hover:text-[#e11d48] hover:border-rose-200 hover:bg-rose-50 transition-colors disabled:opacity-50"
                title="Hapus Artikel"
                aria-label="Hapus Artikel"
            >
                <Trash2 size={14} />
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
