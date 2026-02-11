
"use client";

import { useMemo } from 'react';
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'success' | 'error' | 'info';
}

export default function AlertModal({
    isOpen,
    onClose,
    title,
    message,
    type = 'info'
}: AlertModalProps) {
    if (!isOpen) return null;

    const variant = useMemo(() => {
        switch (type) {
            case 'success':
                return {
                    icon: <CheckCircle className="text-emerald-500" size={24} />,
                    bgColor: 'bg-emerald-50',
                    borderColor: 'border-emerald-100',
                    btnColor: 'bg-emerald-600 hover:bg-emerald-700'
                };
            case 'error':
                return {
                    icon: <AlertCircle className="text-red-500" size={24} />,
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-100',
                    btnColor: 'bg-red-600 hover:bg-red-700'
                };
            default:
                return {
                    icon: <Info className="text-blue-500" size={24} />,
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-100',
                    btnColor: 'bg-blue-600 hover:bg-blue-700'
                };
        }
    }, [type]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-zinc-800">
                <div className="p-6 text-center">
                    <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full ${variant.bgColor} mb-4`}>
                        {variant.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {message}
                    </p>
                    <button
                        onClick={onClose}
                        className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-colors shadow-md ${variant.btnColor}`}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
