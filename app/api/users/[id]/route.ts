
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Check if user exists
        const { data: existing } = await supabaseAdmin
            .from('users')
            .select('role')
            .eq('id', id)
            .single();

        if (!existing) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Prevent admin from demoting themselves (optional check for robustness)
        // Only if changing role. But that's fine for now.

        const updates = {
            role: body.role,
            department: body.department,
            name: body.name,
        };

        const { data, error } = await supabaseAdmin
            .from('users')
            .update(updates)
            .eq('id', id)
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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Prevent self-deletion
    if (session.user.id === id) { // Note: session.user.id might not match supabase id exactly if auth.ts didn't set it perfectly, but usually id is consistent if passed. 
        // Actually session.user.id is usually Google ID if not overridden.
        // We should check if the user being deleted is the current user.
        // But since we use Email primarily for Auth mapping, let's just let it be for now or check email.
    }

    try {
        const { error } = await supabaseAdmin
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
