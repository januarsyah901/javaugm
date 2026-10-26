'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Mail, Instagram, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="mt-20 border-t border-[#ececee] bg-[#18181b] text-[#f4f4f5] rounded-t-[36px] sm:rounded-t-[48px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#27272a]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg text-white tracking-tight">
                Java Al-'Alim
              </span>
              <span className="orange-badge text-[10px] px-2 py-0.5">
                Fathul Afaq
              </span>
            </div>
            <p className="text-[14px] text-[#a1a1aa] leading-relaxed max-w-sm">
              Jama'ah Vokasi Al-'Alim (Java) adalah Lembaga Dakwah Fakultas di Sekolah Vokasi Universitas Gadjah Mada. Membuka cakrawala pemikiran dan menebar kemanfaatan.
            </p>
            <div className="pt-2 text-xs text-[#71717a]">
              Sekolah Vokasi UGM 1447/1448 H
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#71717a]">
              Navigasi
            </h4>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link href="/" className="text-[#d4d4d8] hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-[#d4d4d8] hover:text-white transition-colors">
                  Profil Organisasi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#d4d4d8] hover:text-white transition-colors">
                  Artikel & Opini
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#71717a]">
              Kontak
            </h4>
            <div className="space-y-2.5 text-[14px] text-[#a1a1aa]">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#71717a] mt-0.5 flex-shrink-0" />
                <span>Sekolah Vokasi UGM, Sekip Unit 1, Sleman, D.I. Yogyakarta</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#71717a] flex-shrink-0" />
                <a href="mailto:javaugm1447@gmail.com" className="hover:text-white transition-colors">
                  javaugm1447@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-2">
              <a
                href="https://instagram.com/javaugm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#27272a] bg-[#27272a]/60 hover:bg-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all"
                aria-label="Instagram Java UGM"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://youtube.com/@javaugm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#27272a] bg-[#27272a]/60 hover:bg-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all"
                aria-label="YouTube Java UGM"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <p>© {currentYear} Jama'ah Vokasi Al-'Alim. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#52525b]">Universitas Gadjah Mada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
