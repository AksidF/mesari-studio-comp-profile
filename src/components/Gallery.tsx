import GalleryCard from "./GalleryCard";
import { getGalleryPage } from "@/lib/drive";

const SHOWN = 4; // newest galleries on the home page; the rest live on /galeri

export default async function Gallery() {
  const { items, total } = await getGalleryPage({ perPage: SHOWN });
  if (items.length === 0) return null;
  return (
    <section id="galeri" className="section tx-lattice">
      <div className="container">
        <h2 data-aos="fade-up">Galeri foto pelanggan</h2>
        <p className="lead gallery__lead" data-aos="fade-up">Pernah berfoto bersama kami? Temukan dan unduh foto acara Anda di sini.</p>
        <div className="galleries">
          {items.map((g, i) => <GalleryCard key={g.id} g={g} i={i} />)}
        </div>
        {total > SHOWN && (
          <div className="gallery__more" data-aos="zoom-in">
            <a className="btn btn--ghost" href="/galeri">Lihat semua galeri</a>
          </div>
        )}
        <p className="gallery__note">Foto ditampilkan atas izin pelanggan.</p>
      </div>
    </section>
  );
}
