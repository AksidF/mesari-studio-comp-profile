import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { nav, waLink } from "@/content/site";

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="brand" aria-label="Mesari Studio Bali, ke atas">
          <Image src="/logo-icon.png" alt="" width={44} height={40} priority />
          <span>Mesari Studio Bali</span>
        </a>
        <nav aria-label="Menu utama" className="nav">
          {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="header__actions">
          <a className="btn btn--small" href={waLink()} target="_blank" rel="noopener noreferrer">Booking</a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
