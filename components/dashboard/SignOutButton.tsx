"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-semibold text-[#e11d48] bg-white hover:bg-rose-50 border border-[#ececee] hover:border-rose-200 rounded-full transition-all"
        >
            <LogOut size={14} />
            <span>Keluar Sesi</span>
        </button>
    );
}
