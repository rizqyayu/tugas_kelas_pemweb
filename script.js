/* ========================================================
   SCRIPT JS - SISTEM LOGIN & REGISTER SEDERHANA
   Menggunakan LocalStorage bawaan browser untuk simpan akun.
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. LOGIKA REGISTRASI (register.html)
    // ==========================================
    const registerForm = document.getElementById("registerForm");
    const registerMessage = document.getElementById("registerMessage");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Mencegah form reload halaman

            const nama = document.getElementById("regNama").value.trim();
            const email = document.getElementById("regEmail").value.trim().toLowerCase();
            const password = document.getElementById("regPassword").value;
            const confirmPassword = document.getElementById("regConfirmPassword").value;

            // Validasi: Email harus mengandung karakter '@'
            if (!email.includes("@")) {
                tampilkanPesan(registerMessage, "Format email salah! Harus mengandung karakter '@'", "error");
                return;
            }

            // Validasi 1: Panjang password minimal 6 karakter
            if (password.length < 6) {
                tampilkanPesan(registerMessage, "Password minimal 6 karakter!", "error");
                return;
            }

            // Validasi 2: Kesesuaian konfirmasi password
            if (password !== confirmPassword) {
                tampilkanPesan(registerMessage, "Konfirmasi password tidak cocok!", "error");
                return;
            }

            // Ambil data akun yang tersimpan di LocalStorage (jika ada)
            const daftarUser = JSON.parse(localStorage.getItem("app_users")) || [];

            // Validasi 3: Cek apakah email sudah pernah didaftarkan
            const emailSudahAda = daftarUser.some(user => user.email.toLowerCase() === email);
            if (emailSudahAda) {
                tampilkanPesan(registerMessage, "Email sudah terdaftar, silakan langsung login!", "error");
                return;
            }

            // Simpan akun baru ke daftar
            daftarUser.push({
                nama: nama,
                email: email,
                password: password
            });

            localStorage.setItem("app_users", JSON.stringify(daftarUser));

            tampilkanPesan(registerMessage, "Pendaftaran berhasil! Mengalihkan ke halaman login...", "success");
            registerForm.reset();

            // Pindah otomatis ke login.html setelah 1.5 detik
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // ==========================================
    // 2. LOGIKA LOGIN (login.html)
    // ==========================================
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Mencegah reload halaman

            const email = document.getElementById("loginEmail").value.trim().toLowerCase();
            const password = document.getElementById("loginPassword").value;

            // Validasi: Email harus mengandung karakter '@'
            if (!email.includes("@")) {
                tampilkanPesan(loginMessage, "Format email salah! Harus menyertakan karakter '@'", "error");
                return;
            }

            // Ambil daftar akun dari LocalStorage
            const daftarUser = JSON.parse(localStorage.getItem("app_users")) || [];

            // Cari user yang cocok email dan password-nya
            const userDitemukan = daftarUser.find(
                user => user.email.toLowerCase() === email && user.password === password
            );

            if (userDitemukan) {
                // Simpan status sesi aktif ke sessionStorage
                sessionStorage.setItem("activeUser", JSON.stringify({
                    nama: userDitemukan.nama,
                    email: userDitemukan.email
                }));

                tampilkanPesan(loginMessage, `Login berhasil! Selamat datang, ${userDitemukan.nama}. Mengalihkan ke dashboard...`, "success");

                // Pindah otomatis ke dashboard.html setelah 1 detik
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);
            } else {
                tampilkanPesan(loginMessage, "Email atau password salah!", "error");
            }
        });
    }

    // ==========================================
    // 3. FUNGSI MENAMPILKAN PESAN NOTIFIKASI
    // ==========================================
    function tampilkanPesan(elemenPesan, teks, tipe) {
        if (!elemenPesan) return;

        elemenPesan.textContent = teks;
        elemenPesan.className = `alert-message ${tipe}`;
        elemenPesan.style.display = "block";
    }

});
