
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import PostEditor from "@/components/dashboard/PostEditor";

interface EditPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPageProps) {
    const { id } = await params;

    const { data: post, error } = await supabaseAdmin
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

    // Cast Supabase response to expected props format
    const initialData = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content || '',
        category: post.category,
        image_url: post.image_url || '',
        is_published: post.is_published || false
    };

    return <PostEditor initialData={initialData} pageTitle="Edit Artikel" />;
}
