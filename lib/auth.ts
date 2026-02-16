import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    hd: "mail.ugm.ac.id",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                const email = profile?.email;
                if (!email) return false;

                // 1. Validate Email Domain
                if (!email.endsWith("@mail.ugm.ac.id")) {
                    return false;
                }

                // 2. Check if email is registered in the database
                try {
                    const { data: existingUser } = await supabaseAdmin
                        .from('users')
                        .select('id')
                        .eq('email', email)
                        .single();

                    return !!existingUser;
                } catch (error) {
                    console.error("Error checking user registration:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                // Initial sign in
                const email = user.email;
                if (!email) return token;

                // Sync with database
                try {
                    // Check if user exists
                    const { data: existingUser } = await supabaseAdmin
                        .from('users') // Assumes 'users' table exists 
                        .select('id, role, department')
                        .eq('email', email)
                        .single();

                    if (existingUser) {
                        // User exists, just update role/department in token
                        token.id = existingUser.id;
                        token.role = existingUser.role;
                        token.department = existingUser.department;

                        // Optionally update name/image if changed
                        if (user.name !== undefined || user.image !== undefined) {
                            await supabaseAdmin
                                .from('users')
                                .update({
                                    name: user.name,
                                    image: user.image,
                                    // Update last login or similar here if desired
                                })
                                .eq('email', email);
                        }

                    }
                    // Do not create new users automatically
                } catch (error) {
                    console.error("Error syncing user:", error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = token.id;
                session.user.role = token.role as string;
                session.user.department = token.department as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
