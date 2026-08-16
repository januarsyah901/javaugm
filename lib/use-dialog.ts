'use client';

import { useEffect, useRef } from 'react';

export function useDialog(isOpen: boolean, onClose: () => void) {
    const panelRef = useRef<HTMLDivElement>(null);
    const lastFocus = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        lastFocus.current = document.activeElement as HTMLElement | null;
        const panel = panelRef.current;
        const focusables = () =>
            panel?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) ?? [];
        focusables()[0]?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (e.key !== 'Tab') return;
            const nodes = Array.from(focusables());
            if (nodes.length === 0) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            lastFocus.current?.focus();
        };
    }, [isOpen, onClose]);

    return panelRef;
}
