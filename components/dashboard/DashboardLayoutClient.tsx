"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FileText, X, Menu, Users, ArrowUpRight, Shield } from "lucide-react";
import SignOutButton from "@/components/dashboard/SignOutButton";

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    department?: string | null;
}

export default function DashboardLayoutClient({
    children,
    user
}: {
    children: React.ReactNode;
    user: User;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const navItems = [
        {
            href: "/dashboard",
            label: "Kelola Artikel",
            icon: FileText
        },
    ];

    // Add admin-only links
    if (user?.role === 'admin') {
        navItems.push({
            href: "/dashboard/users",
            label: "Kelola Pengguna",
            icon: Users
        });
    }

    useEffect(() => {
        if (!isSidebarOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsSidebarOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isSidebarOpen]);

    return (
        <div className="min-h-screen bg-[#f4f4f5] text-[#18181b]">
            {/* Mobile Top Navigation */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md border-b border-[#ececee] md:hidden">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#ececee]">
                        <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <div className="leading-tight">
                        <span className="font-semibold text-sm text-[#09090b]">Java Al-'Alim</span>
                        <p className="text-[10px] text-[#71717a]">Panel Pengurus</p>
                    </div>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="w-10 h-10 rounded-full border border-[#ececee] flex items-center justify-center text-[#09090b] hover:bg-[#f4f4f5] transition-colors"
                    aria-label="Buka menu navigasi"
                    aria-expanded={isSidebarOpen}
                >
                    <Menu size={18} />
                </button>
            </header>

            {/* Backdrop Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-[#ececee] bg-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="flex h-20 items-center justify-between px-6 border-b border-[#ececee]">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#ececee] group-hover:scale-105 transition-transform">
                            <Image
                                src="/logo.png"
                                alt="Logo Java UGM"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div>
                            <span className="text-sm font-semibold tracking-tight text-[#09090b] block">
                                Java Al-'Alim
                            </span>
                            <span className="text-[11px] font-medium text-[#71717a]">
                                Panel Pengurus
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="w-8 h-8 rounded-full border border-[#ececee] flex items-center justify-center text-[#71717a] hover:text-[#09090b] md:hidden"
                        aria-label="Tutup menu navigasi"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
                    <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">
                        Menu Utama
                    </p>

                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                                    isActive
                                        ? 'bg-[#09090b] text-white shadow-none'
                                        : 'text-[#52525b] hover:text-[#09090b] hover:bg-[#f4f4f5]'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={16} />
                                    <span>{item.label}</span>
                                </div>
                                {isActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-[#ececee]">
                        <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">
                            Akses Cepat
                        </p>
                        <Link
                            href="/"
                            className="flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-semibold text-[#52525b] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-all"
                        >
                            <span>Lihat Website</span>
                            <ArrowUpRight size={14} className="text-[#a1a1aa]" />
                        </Link>
                    </div>
                </nav>

                {/* User Profile Card */}
                <div className="border-t border-[#ececee] p-4">
                    <div className="mb-3 flex items-center gap-3 rounded-[20px] bg-[#f4f4f5] border border-[#ececee] p-3">
                        <div className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden border border-[#ececee] bg-white">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name || "User"}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center font-bold text-xs text-[#09090b]">
                                    {user?.name?.[0] || 'U'}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="truncate text-xs font-semibold text-[#09090b]">
                                {user?.name || "Pengurus"}
                            </p>
                            <p className="truncate text-[11px] text-[#71717a]">
                                {user?.department || (user?.role === 'admin' ? 'Administrator' : 'Anggota')}
                            </p>
                        </div>
                    </div>

                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 transition-all duration-300 md:ml-64 p-5 sm:p-8 lg:p-10">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
