import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Fab from "@/components/Fab";
import Footer from "@/components/Footer";
import GalleryCard from "@/components/GalleryCard";
import Header from "@/components/Header";
import Icon from "@/components/Icons";
import ScrollEffects from "@/components/ScrollEffects";
import SearchBox from "@/components/SearchBox";
import { galleryEnabled, getGalleryPage } from "@/lib/drive";

const PER_PAGE = 12; // galleries per page

type Props = { searchParams: Promise<{ q?: string; page?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: "Galeri Foto Pelanggan",
    description: "Temukan dan unduh foto acara Anda dari photobooth Mesari Studio Bali.",
    alternates: { canonical: "/galeri" },
    robots: q ? { index: false, follow: true } : undefined, // search results are not indexed
  };
}

const href = (page: number, q: string) => {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (page > 1) p.set("page", String(page));
  return p.size ? `/galeri?${p}` : "/galeri";
};

// 1 … 4 5 6 … 20
function pageNumbers(current: number, pages: number) {
  const nums = [...new Set([1, pages, current - 1, current, current + 1])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  nums.forEach((n, i) => { if (i && n - nums[i - 1] > 1) out.push("gap"); out.push(n); });
  return out;
}

export default async function GalleryPage({ searchParams }: Props) {
  if (!galleryEnabled) notFound();
  const { q = "", page = "1" } = await searchParams;
  const { items, total, pages, page: current } = await getGalleryPage({ q, page: parseInt(page, 10) || 1, perPage: PER_PAGE });

  return (
    <>
      <Header />
      <main>
        <section className="section tx-lattice gallery-page">
          <div className="container">
            <Link className="back" href="/#galeri"><Icon name="arrow-left" />Kembali ke beranda</Link>
            <h1 className="page-title">Galeri foto pelanggan</h1>
            <p className="lead page-lead">Cari nama atau jenis acara Anda, lalu buka folder untuk melihat dan mengunduh foto.</p>

            <SearchBox initial={q} />
            <p className="gallery__count">
              {q ? <>{total} hasil untuk “{q}”</> : <>{total} galeri</>}
            </p>

            {items.length > 0 ? (
              <div className="galleries">{items.map((g, i) => <GalleryCard key={g.id} g={g} i={i} />)}</div>
            ) : (
              <p className="gallery__empty">Tidak ada galeri yang cocok. Coba kata lain.</p>
            )}

            {pages > 1 && (
              <nav className="pager" aria-label="Halaman galeri">
                {current > 1
                  ? <Link href={href(current - 1, q)} aria-label="Halaman sebelumnya"><Icon name="arrow-left" /></Link>
                  : <span className="is-off" aria-hidden><Icon name="arrow-left" /></span>}
                {pageNumbers(current, pages).map((n, i) =>
                  n === "gap"
                    ? <span key={`gap${i}`} className="pager__gap">…</span>
                    : <Link key={n} href={href(n, q)} aria-current={n === current ? "page" : undefined}>{n}</Link>,
                )}
                {current < pages
                  ? <Link href={href(current + 1, q)} aria-label="Halaman berikutnya"><Icon name="arrow-right" /></Link>
                  : <span className="is-off" aria-hidden><Icon name="arrow-right" /></span>}
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <Fab />
      <ScrollEffects />
      <div className="progress" aria-hidden />
    </>
  );
}
