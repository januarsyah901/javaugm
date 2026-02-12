
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserList from "@/components/dashboard/UserList";

export default async function UsersPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        redirect("/dashboard");
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Kelola Pengguna</h1>
                    <p className="text-slate-500 dark:text-slate-400">Atur hak akses dan departemen anggota.</p>
                </div>
            </div>

            <UserList />
        </div>
    );
}
