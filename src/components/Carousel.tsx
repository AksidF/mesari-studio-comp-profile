"use client";
// Swipe / drag / autoplay carousel. Native scroll-snap does the sliding; the dots are just indicators.
// Autoplay pauses on hover and touch, only runs while visible, and is off for reduced motion.
import { Children, useEffect, useRef, useState } from "react";

export default function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, left: 0 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const count = Children.count(children);

  const goTo = (i: number) => {
    const el = track.current;
    const slide = el?.children[(i + count) % count] as HTMLElement | undefined;
    if (el && slide) el.scrollTo({ left: slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0, dist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft + (c as HTMLElement).clientWidth / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    setActive(best);
  };

  // mouse drag (touch already scrolls natively)
  const endDrag = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    track.current?.classList.remove("is-dragging");
    goTo(active);
  };

  useEffect(() => {
    setReady(true);
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    Array.from(track.current?.children ?? []).forEach((c, i) => c.classList.toggle("is-active", i === active));
  }, [active, ready]);

  useEffect(() => {
    if (paused || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => goTo(active + 1), 4000);
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
        {children}
      </div>
      <div className="carousel__nav">
        <div className="carousel__dots">
          {Array.from({ length: count }, (_, i) => (
            <button key={i} aria-label={`Slide ${i + 1}`} aria-current={i === active} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
