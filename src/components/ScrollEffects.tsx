"use client";
// Starts AOS (Animate On Scroll) and drives the thin gold scroll-progress bar.
// Animations are set in the markup, e.g. data-aos="fade-up" data-aos-delay="120". See https://michalsnik.github.io/aos
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ScrollEffects() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    const bar = document.querySelector<HTMLElement>(".progress");
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return null;
}
