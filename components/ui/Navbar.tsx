'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil', href: '/profile' },
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isOpen]);

  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6 lg:px-8"
    >
      <div
        className={`max-w-[1200px] mx-auto bg-white/95 backdrop-blur-md border border-[#ececee] rounded-full px-5 sm:px-7 py-2.5 transition-shadow ${
          scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.04)]' : 'shadow-none'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#ececee] flex-shrink-0 bg-white">
              <Image
                src="/logo.png"
                alt="Logo Java UGM"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-[#09090b]">
              Java Al-'Alim
            </span>
          </Link>

          {/* Desktop Nav Links with Underline for active state */}
          <nav className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1.5 px-3 text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'text-[#09090b]'
                      : 'text-[#52525b] hover:text-[#09090b]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-3 right-3 h-[2px] bg-[#09090b] rounded-full animate-in fade-in duration-200" />
                  )}
                </Link>
              );
            })}

            {session && (
              <Link
                href="/dashboard"
                className={`relative py-1.5 px-3 text-[14px] font-medium transition-colors ${
                  pathname?.startsWith('/dashboard')
                    ? 'text-[#09090b]'
                    : 'text-[#52525b] hover:text-[#09090b]'
                }`}
              >
                <span>Dashboard</span>
                {pathname?.startsWith('/dashboard') && (
                  <span className="absolute -bottom-1 left-3 right-3 h-[2px] bg-[#09090b] rounded-full animate-in fade-in duration-200" />
                )}
              </Link>
            )}
          </nav>

          {/* Right Actions - Full Rounded Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-2.5">
                {session.user?.image && (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-[#ececee]">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <button
                  onClick={() => signOut()}
                  className="px-4 py-1.5 text-xs font-medium text-[#71717a] hover:text-[#09090b] rounded-full border border-[#ececee] hover:border-[#d4d4d8] transition-all"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="btn-dark-primary rounded-full px-5 py-2 text-[13px] font-medium flex items-center gap-1.5"
              >
                <span>Login Pengurus</span>
                <ArrowUpRight size={14} className="opacity-70" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-[#18181b] hover:bg-[#f4f4f5] rounded-full transition-colors"
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 max-w-[1200px] mx-auto bg-white border border-[#ececee] rounded-[28px] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-full text-[14px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#f4f4f5] text-[#09090b] font-semibold'
                      : 'text-[#52525b] hover:text-[#09090b] hover:bg-[#fafafa]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#09090b]" />
                  )}
                </Link>
              );
            })}

            {session && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-full text-[14px] font-medium text-[#52525b] hover:text-[#09090b] hover:bg-[#fafafa]"
              >
                <span>Dashboard</span>
                {pathname?.startsWith('/dashboard') && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#09090b]" />
                )}
              </Link>
            )}

            <div className="pt-3 mt-2 border-t border-[#ececee]">
              {session ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  className="w-full text-center px-4 py-2 text-sm text-[#71717a] hover:text-[#09090b] font-medium rounded-full"
                >
                  Keluar
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signIn('google');
                  }}
                  className="btn-dark-primary w-full py-2.5 text-[14px] font-medium flex items-center justify-center gap-1.5 rounded-full"
                >
                  <User size={15} />
                  <span>Login Pengurus</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
