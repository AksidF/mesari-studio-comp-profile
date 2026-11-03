"use client";
// Live search for /galeri: updates the results as you type, without reloading the page.
// It changes the URL (?q=...) so results stay shareable; the server does the actual filtering.
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export default function SearchBox({ initial }: { initial: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [pending, start] = useTransition();
  const first = useRef(true);

  const go = (text: string) => {
    const q = text.trim();
    start(() => router.replace(q ? `/galeri?q=${encodeURIComponent(q)}` : "/galeri", { scroll: false }));
  };

  // search shortly after the person stops typing
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const t = setTimeout(() => go(value), 350);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <form className="gsearch" action="/galeri" role="search" data-pending={pending} onSubmit={(e) => { e.preventDefault(); go(value); }}>
      <div className="gsearch__field">
        <input type="search" name="q" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Cari nama atau jenis acara…" aria-label="Cari galeri" autoComplete="off" />
        {value && <button type="button" className="gsearch__clear" aria-label="Hapus pencarian" onClick={() => setValue("")}>×</button>}
      </div>
      <button className="btn btn--small" type="submit">Cari</button>
    </form>
  );
}
