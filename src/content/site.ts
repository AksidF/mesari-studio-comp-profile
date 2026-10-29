// ✏️ EDIT HERE: all text, prices, links and photos live in this one file.

export const site = {
  name: "Mesari Studio Bali",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mesaristudiobali.com",
  title: "Mesari Studio Bali — Sewa Photobooth Premium di Bali",
  description:
    "Sewa photobooth premium untuk pernikahan, ulang tahun, dan acara perusahaan di Bali. Cetak instan, galeri digital, GIF, dan desain template custom.",
  keywords: ["sewa photobooth Bali", "photobooth pernikahan Bali", "photobooth Denpasar", "mesari studio bali", "cetak foto instan"],
  area: "Bali, Indonesia",
  whatsapp: "628213344487", // format 62..., tanpa 0 di depan
  phone: "0821-3344-487",
  email: "mesaristudiobali@gmail.com",
  instagram: "", // isi link Instagram, kosongkan jika belum ada,
  tiktok: "", // isi link TikTok,
};

export const waLink = (text = "Halo Mesari Studio Bali, saya ingin booking photobooth.\n\nTanggal acara:\nLokasi:\nJenis acara:") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Paket", href: "#paket" },
  { label: "FAQ", href: "#faq" },
];

export const events = ["Wedding", "Mepandes", "Birthday", "Corporate", "Gathering", "Engagement", "Graduation"];

export const hero = {
  eyebrow: "Photobooth premium · Bali",
  title: "Setiap momen layak jadi kenangan.",
  text: "Cetak instan, galeri digital, dan GIF untuk pernikahan, ulang tahun, dan acara perusahaan Anda.",
  primaryCta: "Cek ketersediaan tanggal",
  secondaryCta: "Lihat paket",
  strip: ["Tawa pertama", "Pose konyol", "Pelukan", "Foto terakhir"],
};

export const commitments = [
  { icon: "clock", title: "Tim profesional & tepat waktu", text: "Operator tiba minimal 1 jam sebelum sesi dimulai." },
  { icon: "lens", title: "Hasil foto tajam", text: "Kamera mirrorless, lighting studio, kertas dan tinta original." },
  { icon: "palette", title: "Desain bisa request", text: "Template dan watermark disesuaikan dengan tema acara Anda." },
  { icon: "qr", title: "Galeri digital instan", text: "Foto dan GIF bisa diunduh lewat QR code dalam hitungan jam." },
  { icon: "refresh", title: "Foto ulang sepuasnya", text: "Kurang puas? Kami ulang dan cetak kembali." },
  { icon: "shield", title: "Garansi uang kembali", text: "Jika kami tidak hadir sesuai jadwal, dana dikembalikan 100%." },
];

export const steps = [
  { icon: "chat", title: "Konsultasi", text: "Chat via WhatsApp dan pilih paket yang cocok." },
  { icon: "calendar", title: "Perencanaan", text: "Tentukan paket, bayar DP, dan pilih desain." },
  { icon: "sparkle", title: "Setup", text: "Kami menyiapkan semuanya sebelum tamu datang." },
  { icon: "smile", title: "Sesi foto", text: "Tamu berfoto sepuasnya." },
  { icon: "gift", title: "Pengiriman", text: "Terima cetakan dan galeri digital." },
];

// Photos: put files in /public/gallery and set image: "/gallery/nama-file.jpg". Leave empty to show a placeholder.
export const portfolio = [
  { title: "Putu & Ayu", type: "Wedding reception", image: "" },
  { title: "Keluarga Wirawan", type: "Mepandes", image: "" },
  { title: "Ulang tahun Kadek", type: "Birthday", image: "" },
  { title: "Annual Gathering", type: "Corporate", image: "" },
];

// Prices are placeholders — replace with your real pricing.
export const packages = [
  { name: "File Only", note: "Galeri digital & softcopy", price: "Rp 0", features: ["Foto & GIF digital", "QR code untuk tamu"] },
  { name: "Limited Print", note: "Cetak terbatas", price: "Rp 0", features: ["Semua fitur File Only", "Jumlah cetak sesuai paket"], featured: true },
  { name: "Unlimited Print", note: "Cetak sepuasnya", price: "Rp 0", features: ["Semua fitur File Only", "Cetak tanpa batas", "Flashdisk semua file"] },
];

export const included = [
  "Crew operator profesional",
  "Monitor 24 inci untuk live preview",
  "Kamera mirrorless",
  "Lighting studio 400 watt + LED 100 watt",
  "Template & watermark custom",
  "Properti foto lucu",
];

export const faqs = [
  { q: "Berapa lama durasi sewa?", a: "Durasi mengikuti paket yang dipilih. Hubungi kami untuk durasi tambahan." },
  { q: "Apakah sudah termasuk backdrop?", a: "Belum. Paket tidak termasuk backdrop atau dekorasi." },
  { q: "Apakah ada biaya transport?", a: "Transport gratis untuk area tertentu sesuai radius layanan kami." },
  { q: "Bagaimana cara booking?", a: "Chat WhatsApp, cek tanggal, lalu bayar DP untuk mengunci jadwal." },
];
