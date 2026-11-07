'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

const baseLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil', href: '/profile' },
  { name: 'Blog', href: '/blog' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  const navLinks = session ? [...baseLinks, { name: 'Dashboard', href: '/dashboard' }] : baseLinks;
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setIsOpen(false);
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
    <motion.header
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-[#ececee] shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(0,0,0,0.08)]'
          : 'bg-[#f4f4f5]/70 backdrop-blur-md border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Java Al-'Alim, beranda">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#ececee] bg-white flex-shrink-0 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105">
            <Image src="/logo.png" alt="Logo Java UGM" width={36} height={36} className="w-full h-full object-contain" priority />
          </div>
          <div className="leading-tight">
            <span className="block font-semibold text-[15px] tracking-tight text-[#09090b]">Java Al-&apos;Alim</span>
            <span className="hidden sm:block text-[11px] text-[#71717a]">Jama&apos;ah Vokasi UGM</span>
          </div>
        </Link>

        {/* Desktop links with sliding indicator */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[14px] font-medium rounded-full transition-colors duration-200 ${
                  active ? 'text-[#09090b]' : 'text-[#52525b] hover:text-[#09090b]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-[#09090b]/[0.06]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              {session.user?.image && (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#ececee]">
                  <Image src={session.user.image} alt={session.user.name || 'User'} width={32} height={32} className="w-full h-full object-cover" />
                </div>
              )}
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-[#52525b] hover:text-[#09090b] rounded-full border border-[#ececee] bg-white hover:border-[#d4d4d8] transition-colors"
              >
                <LogOut size={14} />
                Keluar
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="group btn-dark-primary rounded-full px-5 py-2.5 text-[13px] font-medium gap-1.5"
            >
              <span>Login Pengurus</span>
              <ArrowUpRight size={14} className="opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full text-[#18181b] hover:bg-[#09090b]/5 transition-colors"
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? 'x' : 'm'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Scroll progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-[#ff5a00] transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mobile panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="md:hidden overflow-hidden bg-white border-t border-[#ececee]"
          >
            <div className="px-4 sm:px-6 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-[#f4f4f5] text-[#09090b]'
                        : 'text-[#52525b] hover:bg-[#fafafa] hover:text-[#09090b]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00]" />}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 mt-2 border-t border-[#ececee]">
                {session ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-[#52525b] hover:text-[#09090b] font-medium rounded-full border border-[#ececee]"
                  >
                    <LogOut size={15} />
                    Keluar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signIn('google');
                    }}
                    className="btn-dark-primary w-full py-3 text-[14px] font-medium gap-1.5 rounded-full"
                  >
                    <span>Login Pengurus</span>
                    <ArrowUpRight size={15} className="opacity-70" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
