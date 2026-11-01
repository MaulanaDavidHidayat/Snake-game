# 🐍 Snake Game — MauviDev

Game Snake sederhana berbasis **HTML, CSS, dan JavaScript** yang dapat dimainkan melalui browser. Proyek ini dibuat sebagai latihan pengembangan web tanpa framework tambahan.

## ✨ Fitur utama

- 🎮 Gameplay Snake klasik menggunakan Canvas.
- 🍎 Kumpulkan makanan untuk menambah skor.
- 🏆 Rekor tertinggi disimpan menggunakan `localStorage`.
- ⏸️ Jeda dan lanjutkan permainan.
- 🔄 Mulai ulang permainan kapan saja.
- ⌨️ Kontrol menggunakan tombol panah atau `W`, `A`, `S`, `D`.
- 📱 Tombol kontrol layar untuk perangkat mobile.
- 📐 Tampilan responsif untuk desktop dan mobile.
- ⚡ Kecepatan ular meningkat seiring bertambahnya skor.

## 🛠️ Teknologi

- **HTML5** — struktur halaman.
- **CSS3** — tampilan dan layout responsif.
- **JavaScript** — logika permainan.
- **Canvas API** — menggambar papan permainan.
- **localStorage** — menyimpan rekor tertinggi di browser.

## 🚀 Cara Menjalankan

1. Clone repository:

   ```bash
   git clone https://github.com/MaulanaDavidHidayat/Snake-game.git
   ```

2. Masuk ke folder proyek:

   ```bash
   cd Snake-game
   ```

3. Buka file `index.html` melalui browser.

Game dapat dijalankan secara lokal tanpa menginstal dependency tambahan.

## 🎯 Kontrol Permainan

| Aksi | Kontrol |
|---|---|
| Bergerak ke atas | `↑` atau `W` |
| Bergerak ke bawah | `↓` atau `S` |
| Bergerak ke kiri | `←` atau `A` |
| Bergerak ke kanan | `→` atau `D` |
| Jeda / lanjutkan | `Space` atau tombol Jeda |
| Mulai / main lagi | Tombol pada layar |

Pada perangkat mobile, gunakan tombol arah yang tersedia di bawah papan permainan.

## 📁 Struktur Proyek

```text
Snake-game/
├── index.html
├── style.css
├── script.js
└── README.md
```

- `index.html` — struktur halaman game.
- `style.css` — styling dan layout responsif.
- `script.js` — logika permainan Snake.
- `README.md` — dokumentasi proyek.

## 💾 Penyimpanan Rekor

Rekor tertinggi disimpan menggunakan `localStorage` dengan key `mauvidev-snake-best`. Data ini tersimpan pada browser dan perangkat yang digunakan, bukan pada server.

## 👨‍💻 Pengembang

Dibuat oleh **MauviDev** sebagai proyek latihan untuk mempelajari dasar-dasar pengembangan web.

- GitHub: [@MaulanaDavidHidayat](https://github.com/MaulanaDavidHidayat)

---

Jika kamu punya saran atau menemukan masalah, silakan buka **Issue** di repository ini.
