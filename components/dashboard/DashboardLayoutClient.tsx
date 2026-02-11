
"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FileText, Settings, X, Menu, LayoutDashboard } from "lucide-react";
import SignOutButton from "@/components/dashboard/SignOutButton";

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
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
        {
            href: "/dashboard/settings",
            label: "Pengaturan",
            icon: Settings
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black">
            {/* Mobile Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 dark:bg-zinc-900/80 dark:border-zinc-800 md:hidden">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white">Java Al-'Alim</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg"
                >
                    <Menu size={24} />
                </button>
            </header>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-slate-200 bg-white/95 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95 transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo Section */}
                <div className="flex h-16 items-center justify-between px-6 md:h-20">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="relative w-9 h-9 flex-shrink-0 rounded-full shadow-sm overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Logo JAVA UGM"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
                            Java Al-'Alim
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 md:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 space-y-1.5 px-4 py-4 overflow-y-auto">
                    <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                        Main Menu
                    </div>

                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-primary/5 text-primary dark:bg-primary/10'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                                    }`}
                            >
                                <item.icon size={18} className={`transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span>{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile Section */}
                <div className="border-t border-slate-100 p-4 dark:border-zinc-800">
                    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-zinc-800/50">
                        <div className="relative h-10 w-10 flex-shrink-0">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt="User"
                                    className="h-full w-full rounded-xl object-cover ring-2 ring-white dark:ring-zinc-700"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                                    {user?.name?.[0] || 'A'}
                                </div>
                            )}
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                {user?.name || "Pengguna"}
                            </p>
                            <p className="truncate text-[11px] text-slate-500 dark:text-zinc-400">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 md:ml-64 p-4 md:p-8`}>
                {children}
            </main>
        </div>
    );
}
