
#  Project Specification: Java Web Portal (Kabinet Fathul Afaq)

## 1. Project Identity & Context

* **Organization Name:** Jama’ah Vokasi Al-‘Alim (Java) - Sekolah Vokasi UGM.
* **Cabinet Name:** Fathul Afaq (1447/1448 H).
* **Philosophy:** "Fathul Afaq" (Pembuka Cakrawala). Merepresentasikan semangat perluasan wawasan dan kebermanfaatan nilai Islam di bidang vokasi.
* **Primary Goal:** Website Profil Organisasi & Media Dakwah Digital (Blog System).

## 2. Visual & Design Guidelines (UI/UX)

AI Agent harus menggunakan palet warna berikut dalam styling (Tailwind/CSS):

* **Primary:** Emerald Green (`#2E7D32`) - Identitas Islam & Pertumbuhan.
* **Secondary/Accent:** Gold (`#D4AF37`) - Kemuliaan & Cahaya Cakrawala.
* **Neutral:** White (`#FFFFFF`) & Slate/Dark Grey (`#1E293B`) - Kebersihan & Profesionalisme.
* **Theme:** Modern-Islamic, Clean, & Responsive (Mobile First).

---

## 3. Database Schema (PostgreSQL/Supabase Dialect)

Gunakan skema ini sebagai *ground truth* untuk model data:

```dbml
// 1. PROFILES (Authors)
Table user {
  id uuid [pk]
  full_name varchar
  role enum [note: "admin, author"]
  created_at timestamp [default: `now()`]
}

// 2. CATEGORIES (Enum based)
// Categories: 'Dakwah', 'Vokasi', 'Internal', 'Opini', 'Informasi'
Table categories {
  id uuid [pk, default: `gen_random_uuid()`]
  name enum [note: "dakwah, kajian,pengunguman, kegiatan, vokasi"]
}

// 3. POSTS
Table posts {
  id uuid [pk, default: `gen_random_uuid()`]
  title varchar [not null]
  slug varchar [unique, not null]
  content text
  is_published boolean [default: false]
  featured_image varchar [note: "URL thumbnail"]
  author_id uuid [ref: > user.id]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

// 4. POST IMAGES (Gallery/Body Content Images)
Table post_images {
  id uuid [pk, default: `gen_random_uuid()`]
  post_id uuid [ref: > posts.id]
  image_url varchar [not null]
  created_at timestamp [default: `now()`]
}

Table posts_categories {
  post_id uuid [ref: > posts.id]
  category_id uuid [ref: > categories.id]
  
  Indexes {
    (post_id, category_id) [pk]
  }
}
---

## 4. Feature Requirement & Functional Logic

### A. Public Pages (Frontend)

1. **Homepage:**
* **Hero Section:** Menampilkan nama kabinet "Fathul Afaq" dengan elemen visual cakrawala/emas.
* **Visi Misi:** Penjabaran visi (Intelektual muslim beradab, solutif, berdaya guna) dan 5 poin misi yang sudah diberikan.
* **Latest Posts:** Menampilkan 3 artikel terbaru dengan *query* `is_published: true`.


2. **Profile Page:** Detail filosofi Fathul Afaq dan struktur organisasi Java.
3. **Blog Page:** List artikel dengan pagination dan filter berdasarkan **Category Enum**.
4. **Blog Detail:** Menggunakan *dynamic routing* berdasarkan `slug`. Harus mendukung rendering gambar dari `post_images`.

### B. Admin Area (CRUD Blog)

AI Agent harus mengimplementasikan fungsi berikut:

1. **Authentication:** Login khusus pengurus (Admin/Author).
2. **Post Management (CRUD):**
* **Create:** Auto-generate `slug` dari `title`. Upload `featured_image` ke storage. Multi-select `categories`.
* **Read:** Daftar artikel dalam bentuk tabel/list dengan status *Published/Draft*.
* **Update:** Mengubah isi konten, mengganti gambar, atau mengubah status publikasi.
* **Delete:** Menghapus data post beserta relasinya di `posts_categories` dan `post_images` (Cascade/Manual).


3. **Rich Text Editor:** Implementasikan editor (seperti TipTap atau Quill) agar konten `text` di database bisa menyimpan format HTML/Markdown.

---

## 5. Technical Stack Recommendation (For the Agent)

* **Framework:** Next.js (App Router).
* **Database & Auth:** Supabase (PostgreSQL).
* **ORM:** Prisma (untuk handle skema di atas).
* **Styling:** Tailwind CSS + ShadcnUI (untuk komponen admin yang cepat).
* **State Management:** TanStack Query (React Query) untuk fetching data blog.

---

## 6. Key Content to Hardcode (Organization Info)

* **Vision:** "Mewujudkan Java sebagai ruang untuk menumbuhkan intelektual muslim yang beradab, solutif, dan berdaya guna..." (Copy-paste dari input user).
* **Missions:** (5 Poin Misi A sampai E).
* **Footer:** Informasi kontak, lokasi Sekolah Vokasi UGM, dan link sosial media.

