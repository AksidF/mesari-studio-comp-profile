"use client";
// Endless swipe / drag / autoplay carousel.
// How the loop works: the slides are rendered 5 times in a row. After scrolling stops we silently jump back to the
// identical slide in the middle copy, so there is never an "end". Autoplay pauses on hover/touch, runs only while visible,
// and is off for reduced motion.
import { Children, useEffect, useRef, useState } from "react";
import Icon from "./Icons";

const SETS = 5;
const MID = 2;

export default function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const items = Children.toArray(children);
  const count = items.length;
  const loop = count > 1;
  const base = loop ? MID * count : 0;

  const track = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const drag = useRef({ on: false, x: 0, left: 0 });
  const curRef = useRef(base);
  const [cur, setCur] = useState(base); // absolute index of the centered slide
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  const slides = () => Array.from(track.current?.querySelectorAll<HTMLElement>(":scope > .carousel__set > *") ?? []);
  const centerOf = (s: HTMLElement) => s.offsetLeft - (track.current!.clientWidth - s.clientWidth) / 2;

  const goTo = (i: number) => {
    const s = slides()[i];
    if (s && track.current) track.current.scrollTo({ left: centerOf(s), behavior: "smooth" });
  };

  const recenter = () => {
    const el = track.current;
    const s = slides();
    if (!el || !loop || s.length < count * 2) return;
    const set = Math.floor(curRef.current / count);
    if (set === MID) return;
    const width = s[count].offsetLeft - s[0].offsetLeft; // width of one full set
    el.scrollLeft += (MID - set) * width;
    curRef.current += (MID - set) * count;
    setCur(curRef.current);
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0, dist = Infinity;
    slides().forEach((s, i) => {
      const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    curRef.current = best;
    setCur(best);
    clearTimeout(timer.current);
    timer.current = setTimeout(recenter, 140);
  };

  const endDrag = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    track.current?.classList.remove("is-dragging");
    goTo(curRef.current);
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const first = slides()[base];
    if (first) el.scrollLeft = centerOf(first);
    setReady(true);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    const onResize = () => { const t = slides()[curRef.current]; if (t) el.scrollLeft = centerOf(t); };
    window.addEventListener("resize", onResize);
    return () => { io.disconnect(); window.removeEventListener("resize", onResize); clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    slides().forEach((s, i) => s.classList.toggle("is-active", i === cur));
  }, [cur, ready]);

  useEffect(() => {
    if (!loop || paused || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => goTo(curRef.current + 1), 4000);
    return () => clearInterval(t);
  });

  return (
    <div className={`carousel${ready ? " carousel--ready" : ""}`} role="region" aria-roledescription="carousel" aria-label={label} data-aos="fade-up"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); endDrag(); }}
      onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
      <div className="carousel__track" ref={track} onScroll={onScroll}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { on: true, x: e.clientX, left: track.current.scrollLeft };
          track.current.classList.add("is-dragging");
        }}
        onPointerMove={(e) => { if (drag.current.on && track.current) track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x); }}
        onPointerUp={endDrag} onPointerCancel={endDrag}>
        {Array.from({ length: loop ? SETS : 1 }, (_, n) => (
          <div className="carousel__set" key={n} aria-hidden={loop && n !== MID}>{items}</div>
        ))}
      </div>
      <div className="carousel__nav">
        {loop && <button aria-label="Sebelumnya" onClick={() => goTo(curRef.current - 1)}><Icon name="arrow-left" /></button>}
        <div className="carousel__dots">
          {items.map((_, i) => (
            <button key={i} aria-label={`Slide ${i + 1}`} aria-current={i === cur % count} onClick={() => goTo(base + i)} />
          ))}
        </div>
        {loop && <button aria-label="Berikutnya" onClick={() => goTo(curRef.current + 1)}><Icon name="arrow-right" /></button>}
      </div>
    </div>
  );
}
