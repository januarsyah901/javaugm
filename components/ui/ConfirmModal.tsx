
"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    itemName?: string; // Optional: name of the item being deleted/acted upon
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
    if (!isOpen) return null;

    const getVariantColors = () => {
        switch (variant) {
            case 'danger':
                return {
                    icon: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400',
                    button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
                    border: 'border-red-100 dark:border-red-900/50'
                };
            case 'warning':
                return {
                    icon: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400',
                    button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
                    border: 'border-yellow-100 dark:border-yellow-900/50'
                };
            default:
                return {
                    icon: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
                    button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
                    border: 'border-blue-100 dark:border-blue-900/50'
                };
        }
    };

    const colors = getVariantColors();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-zinc-800">
                {/* Header */}
                <div className={`px-6 py-4 border-b ${colors.border} flex justify-between items-center bg-slate-50/50 dark:bg-zinc-800/50`}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg ${colors.icon}`}>
                            <AlertTriangle size={18} />
                        </span>
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {message}
                        {itemName && (
                            <span className="block mt-2 font-medium text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-zinc-800 p-3 rounded-lg border border-slate-100 dark:border-zinc-700">
                                "{itemName}"
                            </span>
                        )}
                    </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-600 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm font-bold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all flex items-center gap-2 ${colors.button} ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Memproses...
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
