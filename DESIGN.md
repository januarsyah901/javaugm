# Design Direction: Java UGM (Kabinet Fathul Afaq)

## 1. Identitas & Karakter
- **Organisasi**: Jama'ah Vokasi Al-'Alim (Java), Sekolah Vokasi UGM.
- **Kabinet**: Fathul Afaq (1447/1448 H) - "Pembuka Cakrawala".
- **Karakter Visual**: Akademis, bernafaskan nilai Islam, teduh, lugas, dan fungsional. Menghindari kesan tech-startup generik atau template AI.

## 2. Dial Anti-Slop
- **ENERGY**: 2 / 5 (Tenang, terstruktur, berwibawa).
- **RHYTHM**: 3 / 5 (Struktur hierarki jelas, asimetri terukur, tidak serba kartu bento seragam).
- **MOTION**: 1 / 5 (Transisi mikro esensial untuk keterbacaan, tanpa scale berlebih atau animasi dekoratif).

## 3. Sistem Warna
- **Primary**: Emerald Green (`#1b5e20` untuk teks di latar putih agar kontras WCAG AA lolos, `#2e7d32` untuk permukaan).
- **Accent**: Gold (`#b8860b` / `#996515` untuk teks agar lolos kontras WCAG AA, `#d4af37` untuk border/garis aksen).
- **Netral Terang**: `#ffffff` (surface), `#f8fafc` (subtle background).
- **Netral Gelap**: `#0f172a` (teks utama), `#334155` (teks sekunder/keterangan).
- **Batasan**: Larangan penggunaan palet 8 warna berbeda di komponen departemen. Seluruh elemen berpijak pada nuansa emerald, slate, dan aksen emas.

## 4. Tipografi & Tata Letak
- Font Sans yang bersih dan mudah dibaca (Inter/Geist tanpa tracking berlebihan).
- Hindari label kapital dengan `tracking-[0.3em]` yang klise.
- Radius sudut konsisten: `rounded-lg` atau `rounded-xl`, bukan serba `rounded-full` kapsul.
- Bayangan halus (`shadow-sm`, batas garis `border-slate-200`), bukan bayangan gelap tebal atau glow neon.
