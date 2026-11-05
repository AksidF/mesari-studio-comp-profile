// Rotating "stamp" badge next to the photo strip. Pure SVG; change the text below to anything you like (keep it ~32 characters).
export default function Stamp() {
  return (
    <svg className="stamp" viewBox="0 0 120 120" aria-hidden focusable="false">
      <defs><path id="stamp-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" /></defs>
      <circle cx="60" cy="60" r="57" fill="rgba(7,18,42,.88)" stroke="currentColor" strokeOpacity=".5" />
      <text fontSize="9.5" fontWeight="700" fill="currentColor">
        <textPath href="#stamp-circle" textLength="270" lengthAdjust="spacing">CETAK INSTAN • GALERI DIGITAL • </textPath>
      </text>
      <path d="M60 44l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" fill="currentColor" />
    </svg>
  );
}
