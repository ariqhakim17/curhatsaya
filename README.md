# Gemini Chat

Aplikasi web chat AI modern berbasis Gemini (Google) dengan UI responsif mirip Gemini Google, mendukung web & mobile.

## Deskripsi
Gemini Chat adalah aplikasi chat AI yang memanfaatkan model Gemini dari Google. Dirancang dengan tampilan modern, responsif, dan pengalaman pengguna yang nyaman baik di desktop maupun mobile. Cocok untuk konsultasi, tanya jawab, atau sekadar ngobrol dengan AI.

## Fitur
- Chat AI berbasis Gemini (Google)
- UI modern, clean, dan responsif (web & mobile)
- Bubble chat user & bot, tombol salin & feedback
- Input bar fixed di bawah, UX nyaman
- Deploy siap di Vercel

## Cara Install & Jalankan (Lokal)
1. **Clone repo:**
   ```bash
   git clone https://github.com/ariqhakim17/curhatsaya.git
   cd curhatsaya
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Jalankan lokal (Vercel CLI):**
   ```bash
   vercel dev
   ```
   atau (jika ingin pakai node):
   ```bash
   npm run dev
   ```
4. **Akses di browser:**
   Buka [http://localhost:3000](http://localhost:3000) atau port sesuai output.

## Cara Deploy ke Vercel
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```
2. **Login Vercel:**
   ```bash
   vercel login
   ```
3. **Deploy:**
   ```bash
   vercel --prod
   ```

## Cara Pakai
- Ketik pesan di input bawah, tekan Enter/Kirim.
- Balasan AI akan muncul di bubble kiri.
- Gunakan tombol salin untuk menyalin balasan, dan feedback 👍/👎 untuk memberi penilaian.

## Saran Pengembangan Kedepan
- Integrasi login user (Google, email, dsb)
- History chat per user
- Fitur upload gambar/file
- Mode dark/light
- Customisasi prompt AI (role, gaya bahasa, dsb)
- Notifikasi push/mobile
- Analitik penggunaan
- Multi-bahasa
- Peningkatan keamanan (rate limit, validasi input, dsb)

---

> Dibuat dengan ❤️ oleh ariqhakim17 & contributors 