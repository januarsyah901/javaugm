
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";
import SignOutButton from "@/components/dashboard/SignOutButton";

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
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 hidden md:flex flex-col fixed h-full z-40">
                <div className="p-6 border-b border-slate-100 dark:border-zinc-800">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-white">
                        JAVA <span className="text-primary">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-xl transition-colors font-medium"
                    >
                        <FileText size={20} />
                        Kelola Artikel
                    </Link>
                    {/* Future menus */}
                    {/* <Link href="/dashboard/settings" ...>Settings</Link> */}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs overflow-hidden">
                            {session.user?.image ? (
                                <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                session.user?.name?.[0] || 'A'
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                {session.user?.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
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
