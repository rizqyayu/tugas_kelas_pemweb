# Tugas Pemrograman Web: Login, Register & Dashboard Berita (Public API)

Tugas ini menggunakan tema warna **Pink**, dibuat dengan struktur modular sederhana menggunakan **HTML5, CSS3, dan JavaScript (Vanilla)**:

---

### 📁 Struktur Berkas

```
tugas kelas/
├── login.html        # Halaman form login
├── register.html     # Halaman form pendaftaran akun
├── dashboard.html    # Halaman dashboard setelah berhasil login
├── style.css         # Styling tema pink untuk semua halaman
├── script.js         # Logika validasi form login & register (LocalStorage)
├── dashboard.js      # Logika pengecekan sesi login & tombol logout
└── api.js            # Mengambil data berita dari Public API eksternal
```

---

### 🌐 Fitur Public API Berita
- Menggunakan endpoint Public API Antara News: `https://api-berita-indonesia.vercel.app/antara/terbaru`.
- Menggunakan `fetch()` JavaScript standar.
- **Ketergantungan Internet**: Karena data diambil dari server API publik, jika tidak ada koneksi internet (offline), sistem akan menampilkan pesan peringatan error bahwa koneksi internet diperlukan.

---

### 🚀 Alur Pengujian:
1. Buka file **`register.html`** di browser untuk mendaftar.
2. Masuk ke **`login.html`** dengan akun yang didaftarkan.
3. Setelah login sukses, Anda akan otomatis dialihkan ke **`dashboard.html`**.
4. Halaman dashboard akan langsung menampilkan 6 berita terbaru secara live dari internet.
5. Klik **Logout** untuk keluar dan mengunci kembali sesi.
