/* ========================================================
   DASHBOARD JS - PENGELOLA SESI PENGGUNA & LOGOUT
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Ambil data sesi login dari sessionStorage
    const activeUser = sessionStorage.getItem("activeUser");

    // Jika belum login, cegah akses dan arahkan kembali ke login.html
    if (!activeUser) {
        alert("Akses ditolak! Silakan login terlebih dahulu.");
        window.location.replace("login.html");
        return;
    }

    // 2. Tampilkan nama user di halaman dashboard
    try {
        const user = JSON.parse(activeUser);
        const namaPengguna = document.getElementById("namaPengguna");
        if (namaPengguna) {
            namaPengguna.textContent = user.nama || "Pengguna";
        }
    } catch (e) {
        sessionStorage.removeItem("activeUser");
        window.location.replace("login.html");
        return;
    }

    // 3. Logika Tombol Logout
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            const konfirmasi = confirm("Apakah Anda yakin ingin keluar?");
            if (konfirmasi) {
                sessionStorage.removeItem("activeUser");
                window.location.replace("login.html");
            }
        });
    }
});
