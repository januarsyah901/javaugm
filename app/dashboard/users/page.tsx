
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
            <UserList />

    );
}
