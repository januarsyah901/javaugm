'use client';

import { useState, useEffect } from "react";
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(`${window.location.origin}/blog/${slug}`);
        }
    }, [slug]);

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
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-primary font-medium hover:text-emerald-700 transition-colors"
                aria-label="Share this post"
            >
                {isOpen ? <X size={20} /> : <Share2 size={20} />}
                <span>{isOpen ? 'Tutup' : 'Bagikan Tulisan Ini'}</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-64 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-slate-100 dark:border-zinc-700 p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Bagikan ke Media Sosial</h4>

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
                        <div className="flex items-center justify-between bg-slate-100 dark:bg-zinc-900 rounded-lg p-2 border border-slate-200 dark:border-zinc-700">
                            <span className="text-xs text-slate-500 truncate max-w-[150px]">{url}</span>
                            <button
                                onClick={handleCopy}
                                className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-md transition-colors text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                title="Copy Link"
                            >
                                {copied ? <Check size={14} className="text-emerald-500" /> : <LinkIcon size={14} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
