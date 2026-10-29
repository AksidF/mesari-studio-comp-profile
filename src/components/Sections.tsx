import Image from "next/image";
import Aperture from "./Aperture";
import Carousel from "./Carousel";
import Icon from "./Icons";
import { commitments, events, faqs, hero, included, packages, portfolio, steps, waLink } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="hero">
      <Aperture />
      <div className="container hero__grid">
        <div>
          <p className="muted">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="lead">{hero.text}</p>
          <div className="row">
            <a className="btn" href={waLink()} target="_blank" rel="noopener noreferrer">{hero.primaryCta}</a>
            <a className="btn btn--ghost" href="#paket">{hero.secondaryCta}</a>
          </div>
        </div>
        {/* The photo strip: the signature visual of the site */}
        <ol className="strip" aria-label="Contoh strip foto">
          {hero.strip.map((c, i) => (
            <li key={c} className="strip__frame" style={{ "--i": i } as React.CSSProperties}>
              <span>{c}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Marquee() {
  // The list is rendered twice so the loop is seamless (the copy is hidden from screen readers).
  return (
    <div className="marquee" aria-label="Jenis acara">
      <div className="marquee__track">
        {[0, 1].map((n) => events.map((e) => <span key={`${n}-${e}`} aria-hidden={n === 1}>{e}</span>))}
      </div>
    </div>
  );
}

export function Commitments() {
  return (
    <section id="keunggulan" className="section tx-lattice">
      <div className="container">
        <h2 data-aos="fade-up">Lebih dari sekadar foto</h2>
        <div className="grid grid--3">
          {commitments.map((c, i) => (
            <article key={c.title} data-aos="fade-up" data-aos-delay={(i % 3) * 120}><span className="icon-badge"><Icon name={c.icon} /></span><h3>{c.title}</h3><p>{c.text}</p></article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <section className="section section--deep tx-film">
      <div className="container">
        <h2 data-aos="fade-up">Dari chat sampai pesta</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} data-aos="zoom-in" data-aos-delay={i * 120}><span className="icon-badge"><Icon name={s.icon} /></span><h3>{s.title}</h3><p>{s.text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Portfolio() {
  return (
    <section id="portofolio" className="section tx-dots">
      <div className="container"><h2 data-aos="fade-up">Acara yang pernah kami hadiri</h2></div>
      <Carousel label="Portofolio acara">
        {portfolio.map((p) => (
          <figure key={p.title} className="work">
            {p.image
              ? <Image src={p.image} alt={`Photobooth ${p.type} ${p.title}`} width={600} height={800} sizes="(max-width: 700px) 70vw, 340px" />
              : <div className="work__placeholder" aria-hidden />}
            <figcaption><strong>{p.title}</strong><span>{p.type}</span></figcaption>
          </figure>
        ))}
      </Carousel>
    </section>
  );
}

export function Packages() {
  return (
    <section id="paket" className="section section--deep tx-lines">
      <div className="container">
        <h2 data-aos="fade-up">Paket</h2>
        <div className="grid grid--3">
          {packages.map((p, i) => (
            <article key={p.name} data-aos="zoom-in-up" data-aos-delay={i * 150} className={`card${p.featured ? " card--featured" : ""}`}>
              <h3>{p.name}</h3>
              <p className="muted">{p.note}</p>
              <p className="price">{p.price}</p>
              <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a className="btn btn--ghost" href={waLink(`Halo Mesari Studio Bali, saya tertarik paket ${p.name}.`)} target="_blank" rel="noopener noreferrer">Pilih paket</a>
            </article>
          ))}
        </div>
        <h3 className="included__title" data-aos="fade-up">Semua paket termasuk</h3>
        <ul className="included" data-aos="fade-up">{included.map((i) => <li key={i}>{i}</li>)}</ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section tx-dots">
      <div className="container container--narrow">
        <h2 data-aos="fade-up">Pertanyaan umum</h2>
        {faqs.map((f, i) => (
          <details key={f.q} data-aos="fade-up" data-aos-delay={i * 80}><summary>{f.q}</summary><p>{f.a}</p></details>
        ))}
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="section cta tx-rings">
      <div className="container">
        <h2 data-aos="fade-up">Amankan tanggal acara Anda</h2>
        <p className="lead" data-aos="fade-up" data-aos-delay="150">Tanggal favorit cepat penuh. Kirim detail acara, kami balas secepatnya.</p>
        <a className="btn" data-aos="zoom-in" data-aos-delay="300" href={waLink()} target="_blank" rel="noopener noreferrer">Booking via WhatsApp</a>
      </div>
    </section>
  );
}
