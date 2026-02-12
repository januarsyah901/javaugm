
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { data: users, error } = await supabaseAdmin
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Validate
        if (!body.email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if user exists (by email)
        const { data: existing } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('email', body.email)
            .single();

        if (existing) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const newUser = {
            email: body.email,
            name: body.name || '',
            role: body.role || 'user',
            department: body.department || 'Anggota',
            // Image optional
        };

        const { data, error } = await supabaseAdmin
            .from('users')
            .insert([newUser])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
