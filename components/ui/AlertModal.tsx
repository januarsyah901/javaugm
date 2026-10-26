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
                    icon: <CheckCircle className="text-emerald-600" size={20} />,
                    bgColor: 'bg-emerald-50 border-emerald-200'
                };
            case 'error':
                return {
                    icon: <AlertCircle className="text-[#e11d48]" size={20} />,
                    bgColor: 'bg-rose-50 border-rose-200'
                };
            default:
                return {
                    icon: <Info className="text-[#09090b]" size={20} />,
                    bgColor: 'bg-[#f4f4f5] border-[#ececee]'
                };
        }
    }, [type]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="alert-title"
                className="bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-[#ececee]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 text-center">
                    <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full border ${variant.bgColor} mb-4`}>
                        {variant.icon}
                    </div>
                    <h3 id="alert-title" className="text-base font-semibold text-[#09090b] mb-2">{title}</h3>
                    <p className="text-sm text-[#52525b] leading-relaxed mb-6">
                        {message}
                    </p>
                    <button
                        onClick={onClose}
                        className="btn-dark-primary rounded-full w-full py-2.5 px-5 text-xs font-semibold"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
