import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-zinc-900 text-zinc-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Logo & Identity */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            JAVA Fathul Afaq
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Jama’ah Vokasi Al-‘Alim (JAVA) - Sekolah Vokasi UGM.<br />
                            Kabinet Fathul Afaq (1447/1448 H).<br />
                            "Membuka Cakrawala, Menebar Manfaat."
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg">Menu Utama</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:text-primary transition-colors">Profil Organisasi</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors">Blog & Dakwah</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg">Hubungi Kami</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>Sekolah Vokasi, Universitas Gadjah Mada,<br />Yogyakarta, Indonesia.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📧</span>
                                <a href="mailto:java.sv@ugm.ac.id" className="hover:text-primary transition-colors">java.sv@ugm.ac.id</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📱</span>
                                <span className="hover:text-primary transition-colors">@java.ugm (Instagram)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-sm text-zinc-500">
                    &copy; {new Date().getFullYear()} Jama’ah Vokasi Al-‘Alim (JAVA) UGM. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
