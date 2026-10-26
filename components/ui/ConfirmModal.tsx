"use client";

import { AlertTriangle, X } from "lucide-react";
import { useDialog } from '@/lib/use-dialog';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    itemName?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Ya, Lanjutkan",
    cancelText = "Batal",
    isLoading = false,
    itemName,
    variant = 'danger'
}: ConfirmModalProps) {
    const panelRef = useDialog(isOpen, onClose);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                className="bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-[#ececee]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#ececee] flex justify-between items-center">
                    <h3 id="confirm-title" className="text-base font-semibold text-[#09090b] flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[#e11d48]">
                            <AlertTriangle size={15} />
                        </span>
                        <span>{title}</span>
                    </h3>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-8 h-8 rounded-full border border-[#ececee] flex items-center justify-center text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-colors"
                        aria-label="Tutup"
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className="text-sm text-[#52525b] leading-relaxed">
                        {message}
                    </p>
                    {itemName && (
                        <div className="mt-3 text-xs font-semibold text-[#09090b] bg-[#f4f4f5] p-3 rounded-[16px] border border-[#ececee] truncate">
                            "{itemName}"
                        </div>
                    )}
                </div>

                {/* Footer - Full Rounded Buttons */}
                <div className="px-6 py-4 bg-[#fafafa] border-t border-[#ececee] flex justify-end gap-2.5">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="btn-light-neutral rounded-full px-5 py-2 text-xs font-semibold hover:border-[#09090b] transition-all"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`rounded-full px-5 py-2 text-xs font-semibold text-white transition-all flex items-center gap-2 ${
                            variant === 'danger'
                                ? 'bg-[#e11d48] hover:bg-rose-700 shadow-sm'
                                : 'btn-dark-primary'
                        } ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                <span>Memproses...</span>
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
