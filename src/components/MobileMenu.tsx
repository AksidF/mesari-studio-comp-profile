"use client";
// Phone menu: full-screen overlay. The only other client-side JavaScript besides the carousel.
import { useEffect, useState } from "react";
import Icon from "./Icons";

type Props = { links: { label: string; href: string }[]; phone: string; email: string; whatsapp: string };

export default function MobileMenu({ links, phone, email, whatsapp }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav id="mobile-nav" className={`mnav${open ? " mnav--open" : ""}`} aria-label="Menu mobile">
        <div className="mnav__links">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small><span>{l.label}</span><Icon name="arrow-right" />
            </a>
          ))}
        </div>
        <div className="mnav__contact">
          <p>Siap booking tanggal acara Anda?</p>
          <a className="btn" href={whatsapp} target="_blank" rel="noopener noreferrer">Chat via WhatsApp</a>
          <div className="mnav__meta">
            <span><Icon name="phone" />{phone}</span>
            <span><Icon name="mail" />{email}</span>
          </div>
        </div>
      </nav>
    </>
  );
}
