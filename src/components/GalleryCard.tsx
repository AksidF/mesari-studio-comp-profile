import Icon from "./Icons";
import type { Gallery } from "@/lib/drive";

export default function GalleryCard({ g, i = 0 }: { g: Gallery; i?: number }) {
  return (
    <a className="gcard" href={g.url} target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay={(i % 4) * 100}>
      <div className="gcard__img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {g.cover && <img src={g.cover} alt={`Foto acara ${g.title}`} width={640} height={480} loading="lazy" decoding="async" referrerPolicy="no-referrer" />}
      </div>
      <div className="gcard__body">
        <strong>{g.title}</strong>
        <span>{[g.type, g.date].filter(Boolean).join(" · ")}</span>
        <span className="gcard__cta">Lihat foto <Icon name="arrow-right" /></span>
      </div>
    </a>
  );
}
