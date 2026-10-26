import { supabase } from "@/lib/supabase";
import BlogList from "@/components/blog/BlogList";

// Revalidate data every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60;

export default async function BlogPage() {
    // Fetch data from Supabase
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    if (error) {
        return (
            <div className="bg-[#f4f4f5] min-h-screen py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[12px] bg-[#ff5a00] text-white text-xs font-semibold mb-6">
                            Pemberitahuan
                        </div>
                        <h1 className="text-3xl md:text-4xl font-semibold text-[#09090b] tracking-tight mb-4">
                            Wawasan & Tulisan
                        </h1>
                        <div className="bg-white rounded-[36px] border border-[#ececee] p-8 md:p-12 text-center mt-6">
                            <p className="text-base font-medium text-[#18181b]">Artikel gagal dimuat saat ini.</p>
                            <p className="mt-2 text-sm text-[#71717a]">Silakan muat ulang halaman atau coba beberapa saat lagi.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f4f4f5] min-h-screen py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-3xl mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[12px] bg-[#ff5a00] text-white text-xs font-semibold tracking-wide uppercase mb-4">
                        Wawasan & Artikel
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#09090b] tracking-tight leading-[1.14]">
                        Jurnal Dakwah & Intelektual Vokasi.
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-[#52525b] leading-relaxed">
                        Kumpulan catatan pemikiran, dokumentasi kegiatan, dan gagasan keislaman dari mahasiswa Sekolah Vokasi UGM.
                    </p>
                </div>

                {/* Blog List with interactive filter, search, grid and pagination */}
                <BlogList initialPosts={posts || []} />
            </div>
        </div>
    );
}
