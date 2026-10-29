"use client";
// The only client-side JavaScript on the site: opens/closes the phone menu.
import { useState } from "react";
import { nav } from "@/content/site";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav id="mobile-nav" className={`mnav${open ? " mnav--open" : ""}`} aria-label="Menu mobile">
        {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
      </nav>
    </>
  );
}
