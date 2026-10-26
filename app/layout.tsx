import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Providers } from "./Providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Java Al-'Alim — Jama'ah Vokasi UGM",
  description: "Lembaga Dakwah Fakultas Vokasi Universitas Gadjah Mada (Kabinet Fathul Afaq 1447/1448 H)",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={dmSans.variable}>
      <body className="antialiased bg-[#f4f4f5] text-[#18181b] selection:bg-[#ff5a00]/15 selection:text-[#09090b]">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
