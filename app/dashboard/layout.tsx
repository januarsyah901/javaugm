
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";
import SignOutButton from "@/components/dashboard/SignOutButton";
import Image from "next/image";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-black">
            {/* Sidebar */}
            <aside className="fixed hidden h-full w-64 flex-col border-r border-slate-200 bg-white/80 backdrop-blur-md z-40 dark:border-zinc-800 dark:bg-zinc-900/80 md:flex">
                {/* Logo Section */}
                <div className="flex h-20 items-center px-6">
                    <Link href="/" className="group flex items-center gap-2.5">
                        <div className="relative flex-shrink-0 rounded-full shadow-sm overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Logo JAVA UGM"
                                width={40}   // Setara w-10 (40px)
                                height={40}  // Setara h-10 (40px)
                                className="object-cover w-10 h-10" // Tetap beri class size untuk memastikan responsivitas
                                priority     // Tambahkan ini agar logo dimuat duluan (mencegah flickering)
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                            Java Al-'Alim<span className="text-primary">.</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 space-y-1.5 px-4 py-4 overflow-y-auto">
                    <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                        Main Menu
                    </div>

                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 bg-primary/5 text-primary dark:bg-primary/10"
                    /* Tips: Gunakan library 'clsx' atau 'tailwind-merge' untuk mengatur class active secara dinamis */
                    >
                        <FileText size={18} className="transition-transform group-hover:scale-110" />
                        <span>Kelola Artikel</span>
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" /> {/* Active indicator */}
                    </Link>

                    <Link
                        href="/dashboard/settings"
                        className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                        <Settings size={18} className="transition-transform group-hover:rotate-45" />
                        <span>Pengaturan</span>
                    </Link>
                </nav>

                {/* User Profile Section */}
                <div className="border-t border-slate-100 p-4 dark:border-zinc-800">
                    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-zinc-800/50">
                        <div className="relative h-10 w-10 flex-shrink-0">
                            {session.user?.image ? (
                                <img
                                    src={session.user.image}
                                    alt="User"
                                    className="h-full w-full rounded-xl object-cover ring-2 ring-white dark:ring-zinc-700"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                                    {session.user?.name?.[0] || 'A'}
                                </div>
                            )}
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                {session.user?.name}
                            </p>
                            <p className="truncate text-[11px] text-slate-500 dark:text-zinc-400">
                                {session.user?.email}
                            </p>
                        </div>
                    </div>

                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
