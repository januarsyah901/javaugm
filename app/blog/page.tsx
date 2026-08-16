
import { supabase } from "@/lib/supabase";
import BlogList from "@/components/blog/BlogList";

// Revalidate data every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60;

export default async function BlogPage() {
    // Fetch data from Supabase
    const { data: posts, error } = await supabase
        .from('posts') // Make sure this table exists
        .select('*')
        .eq('is_published', true) // Only show published posts
        .order('created_at', { ascending: false });

    if (error) {
        return (
            <div className="bg-slate-50 pt-25 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog</h1>
                    </div>
                    <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
                        <p className="font-semibold text-red-800">Artikel gagal dimuat.</p>
                        <p className="mt-2 text-sm text-red-700">Coba muat ulang halaman.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 pt-25 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog</h1>
                    <p className="text-lg text-slate-600">
                        Kumpulan tulisan inspiratif dan informasi terkini seputar dakwah dan vokasi.
                    </p>
                </div>

                <BlogList initialPosts={posts || []} />

            </div>
        </div>
    );
}
