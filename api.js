/* ========================================================
   API JS - PUBLIC API BERITA DENGAN POP-UP MODAL DETAIL
   Memerlukan koneksi internet agar data bisa dimuat.
   ======================================================== */

// Simpan data berita yang berhasil dimuat agar bisa ditampilkan di pop-up modal
let daftarBeritaAktif = [];

document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("newsContainer");
    const btnRefresh = document.getElementById("btnRefresh");

    async function muatDataBerita() {
        if (!newsContainer) return;

        // Tampilkan status loading
        newsContainer.innerHTML = "<p class='status-info'>⏳ Sedang mengambil data berita publik dari internet...</p>";

        try {
            // URL Public News API resmi (bebas CORS, tanpa token/key, update live)
            const apiUrl = "https://api.spaceflightnewsapi.net/v4/articles/?limit=6";
            
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Server berita merespon dengan status: " + response.status);
            }

            const data = await response.json();
            daftarBeritaAktif = data.results || []; // Simpan data ke variabel global

            // Bersihkan teks loading
            newsContainer.innerHTML = "";

            if (daftarBeritaAktif.length === 0) {
                newsContainer.innerHTML = "<p class='status-info'>Tidak ada berita yang ditemukan.</p>";
                return;
            }

            // Tampilkan masing-masing berita dalam kartu
            daftarBeritaAktif.forEach((item, index) => {
                const card = document.createElement("div");
                card.className = "news-card";

                // Format tanggal berita
                const tanggal = new Date(item.published_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

                // Potong ringkasan berita untuk kartu depan
                const ringkasan = item.summary
                    ? (item.summary.length > 85 ? item.summary.substring(0, 85) + "..." : item.summary)
                    : "Klik tombol detail untuk membaca ringkasan berita.";

                card.innerHTML = `
                    <img 
                        src="${item.image_url}" 
                        alt="Foto Berita" 
                        class="news-thumbnail"
                        loading="lazy"
                        onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&auto=format&fit=crop&q=60'"
                    >
                    <div class="news-body">
                        <span class="news-date">📅 ${tanggal} &bull; ${item.news_site || 'Warta'}</span>
                        <h4 class="news-title">${item.title}</h4>
                        <p class="news-desc">${ringkasan}</p>
                        <!-- Tombol Detail yang memunculkan pop-up modal -->
                        <button type="button" class="btn-detail" onclick="bukaModal(${index})">
                            Lihat Detail
                        </button>
                    </div>
                `;

                newsContainer.appendChild(card);
            });

        } catch (error) {
            console.error("Kesalahan koneksi / API:", error);

            // Tampilan saat offline (tidak ada internet) atau API gagal
            newsContainer.innerHTML = `
                <div class="error-box">
                    <p class="error-title">⚠️ Tidak Dapat Memuat Berita!</p>
                    <p class="error-desc">
                        Data berita ini diambil langsung dari <strong>Public API</strong> eksternal.<br>
                        Pastikan Anda terhubung ke <strong>koneksi internet yang stabil</strong> lalu coba muat ulang.
                    </p>
                    <button type="button" class="btn-retry" id="btnRetry">Coba Lagi</button>
                </div>
            `;

            const btnRetry = document.getElementById("btnRetry");
            if (btnRetry) {
                btnRetry.addEventListener("click", muatDataBerita);
            }
        }
    }

    // Panggil fungsi saat halaman selesai dimuat
    muatDataBerita();

    // Event saat tombol 'Muat Ulang' diklik
    if (btnRefresh) {
        btnRefresh.addEventListener("click", muatDataBerita);
    }
});

// ==========================================
// FUNGSI POP-UP MODAL (DETAIL BERITA)
// ==========================================

// Fungsi untuk membuka pop-up dan mengisi datanya
function bukaModal(index) {
    const berita = daftarBeritaAktif[index];
    if (!berita) return;

    const modal = document.getElementById("newsModal");
    const modalImg = document.getElementById("modalImg");
    const modalDate = document.getElementById("modalDate");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");

    // Format tanggal
    const tanggal = new Date(berita.published_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Masukkan data berita ke elemen pop-up
    modalImg.src = berita.image_url;
    modalDate.textContent = `📅 ${tanggal} • Sumber: ${berita.news_site || 'Portal Berita'}`;
    modalTitle.textContent = berita.title;
    modalDesc.textContent = berita.summary || "Tidak ada ringkasan detail untuk berita ini.";

    // Munculkan modal (hapus class hidden)
    modal.classList.remove("hidden");
}

// Fungsi untuk menutup pop-up modal
function tutupModal() {
    const modal = document.getElementById("newsModal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

// Tutup modal jika user mengklik area gelap di luar kotak modal
window.addEventListener("click", (event) => {
    const modal = document.getElementById("newsModal");
    if (event.target === modal) {
        tutupModal();
    }
});
