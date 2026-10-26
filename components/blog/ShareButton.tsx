'use client';

import { useState, useEffect, useRef } from "react";
import { Share2, X, Link as LinkIcon, Check } from "lucide-react";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon
} from 'next-share';

interface ShareButtonProps {
    slug: string;
    title: string;
}

export default function ShareButton({ slug, title }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(`${window.location.origin}/blog/${slug}`);
        }
    }, [slug]);

    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        const onClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [isOpen]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (!url) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn-light-neutral rounded-full px-5 py-2 text-xs font-semibold flex items-center gap-2 hover:border-[#09090b] transition-all"
                aria-label="Share this post"
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={15} /> : <Share2 size={15} />}
                <span>{isOpen ? 'Tutup' : 'Bagikan Tulisan'}</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 bottom-full mb-3 w-64 bg-white rounded-[24px] shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-[#ececee] p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3">
                        Bagikan ke Media Sosial
                    </p>

                    <div className="grid grid-cols-5 gap-2 mb-4">
                        <WhatsappShareButton url={url} title={title} separator=" - ">
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>

                        <TwitterShareButton url={url} title={title}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>

                        <FacebookShareButton url={url} quote={title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <LinkedinShareButton url={url} title={title}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>

                        <TelegramShareButton url={url} title={title}>
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                    </div>

                    <div className="relative">
                        <div className="flex items-center justify-between bg-[#f4f4f5] rounded-full pl-3 pr-1.5 py-1 border border-[#ececee]">
                            <span className="text-xs text-[#71717a] truncate max-w-[140px]">{url}</span>
                            <button
                                onClick={handleCopy}
                                className="w-7 h-7 rounded-full bg-white border border-[#ececee] flex items-center justify-center hover:bg-[#ececee] transition-colors text-[#09090b]"
                                title="Salin Tautan"
                            >
                                {copied ? <Check size={13} className="text-emerald-600" /> : <LinkIcon size={13} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
