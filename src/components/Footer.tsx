import Image from "next/image";
import Icon from "./Icons";
import { site, waLink } from "@/content/site";

export default function Footer() {
  const socials = [["Instagram", site.instagram], ["TikTok", site.tiktok]].filter(([, url]) => url);
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Image src="/logo.png" alt={site.name} width={200} height={111} />
        <p><Icon name="pin" />{site.area}</p>
        <p><Icon name="phone" /><a href={waLink()}>WhatsApp {site.phone}</a></p>
        <p><Icon name="mail" /><a href={`mailto:${site.email}`}>{site.email}</a></p>
        {socials.length > 0 && (
          <p>{socials.map(([label, url]) => <a key={label} href={url} rel="noopener noreferrer" target="_blank">{label} </a>)}</p>
        )}
        <small>© {new Date().getFullYear()} {site.name}</small>
      </div>
    </footer>
  );
}
