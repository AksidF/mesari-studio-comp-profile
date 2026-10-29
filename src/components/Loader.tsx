import Image from "next/image";

// Splash screen shown on page load. Pure CSS (no JavaScript): its length is --hold in globals.css.
export default function Loader() {
  return (
    <div className="loader" aria-hidden>
      <div className="loader__mark">
        <Image src="/logo-icon.png" alt="" width={84} height={76} priority />
      </div>
      <p className="loader__name">MESARI STUDIO BALI</p>
      <div className="loader__bar"><span /></div>
    </div>
  );
}
