
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id?: string;
            role?: string;
            department?: string;
        } & DefaultSession["user"];
    }

    interface User {
        id?: string; // Add id if available
        role?: string;
        department?: string;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        role?: string;
        department?: string;
    }
}
