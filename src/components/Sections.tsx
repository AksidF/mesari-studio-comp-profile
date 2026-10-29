import Image from "next/image";
import Aperture from "./Aperture";
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
        <h2>Lebih dari sekadar foto</h2>
        <div className="grid grid--3">
          {commitments.map((c) => (
            <article key={c.title}><span className="icon-badge"><Icon name={c.icon} /></span><h3>{c.title}</h3><p>{c.text}</p></article>
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
        <h2>Dari chat sampai pesta</h2>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title}><span className="icon-badge"><Icon name={s.icon} /></span><h3>{s.title}</h3><p>{s.text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Portfolio() {
  return (
    <section id="portofolio" className="section tx-dots">
      <div className="container">
        <h2>Acara yang pernah kami hadiri</h2>
        <div className="grid grid--4">
          {portfolio.map((p) => (
            <figure key={p.title} className="work">
              {p.image
                ? <Image src={p.image} alt={`Photobooth ${p.type} ${p.title}`} width={600} height={800} sizes="(max-width: 700px) 50vw, 25vw" />
                : <div className="work__placeholder" aria-hidden />}
              <figcaption><strong>{p.title}</strong><span>{p.type}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Packages() {
  return (
    <section id="paket" className="section section--deep tx-lines">
      <div className="container">
        <h2>Paket</h2>
        <div className="grid grid--3">
          {packages.map((p) => (
            <article key={p.name} className={`card${p.featured ? " card--featured" : ""}`}>
              <h3>{p.name}</h3>
              <p className="muted">{p.note}</p>
              <p className="price">{p.price}</p>
              <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a className="btn btn--ghost" href={waLink(`Halo Mesari Studio Bali, saya tertarik paket ${p.name}.`)} target="_blank" rel="noopener noreferrer">Pilih paket</a>
            </article>
          ))}
        </div>
        <h3 className="included__title">Semua paket termasuk</h3>
        <ul className="included">{included.map((i) => <li key={i}>{i}</li>)}</ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section tx-dots">
      <div className="container container--narrow">
        <h2>Pertanyaan umum</h2>
        {faqs.map((f) => (
          <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
        ))}
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="section cta tx-rings">
      <div className="container">
        <h2>Amankan tanggal acara Anda</h2>
        <p className="lead">Tanggal favorit cepat penuh. Kirim detail acara, kami balas secepatnya.</p>
        <a className="btn" href={waLink()} target="_blank" rel="noopener noreferrer">Booking via WhatsApp</a>
      </div>
    </section>
  );
}
