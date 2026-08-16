
"use client";

import { useMemo } from 'react';
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { useDialog } from '@/lib/use-dialog';

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
    const panelRef = useDialog(isOpen, onClose);

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

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="alert-title"
                className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 text-center">
                    <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full ${variant.bgColor} mb-4`}>
                        {variant.icon}
                    </div>
                    <h3 id="alert-title" className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {message}
                    </p>
                    <button
                        onClick={onClose}
                        className={`w-full min-h-11 py-2.5 px-4 rounded-lg text-white font-medium transition-colors shadow-md ${variant.btnColor}`}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
