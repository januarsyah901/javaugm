
"use client"
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors font-medium text-sm"
        >
            <LogOut size={16} />
            Keluar
        </button>
    );
}
