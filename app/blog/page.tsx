
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
        console.error("Error fetching posts:", error);
        // Handle error gracefully, maybe return empty list or error UI
    }

    // Map Supabase data to match component interface if needed, 
    // but the SQL schema matches nicely with keys mostly.

    // Type assertion or data transformation
    const displayPosts: any[] = posts || [];

    return (
        <div className="bg-slate-50 pt-25 dark:bg-black min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Blog</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Kumpulan tulisan inspiratif dan informasi terkini seputar dakwah dan vokasi.
                    </p>
                </div>

                {/* Client Component for Filtering & List */}
                <BlogList initialPosts={displayPosts} />

            </div>
        </div>
    );
}
