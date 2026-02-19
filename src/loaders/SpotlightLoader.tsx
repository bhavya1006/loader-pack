import { useEffect, useState } from "react";
import type { VariantProps } from "../types";
import "./spotlight.css";

export default function SpotlightLoader({ name, theme, onStart }: VariantProps) {
  const [revealed, setRevealed] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 600);
    const t2 = setTimeout(() => setShowBtn(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleStart = () => {
    setAnimateOut(true);
    setTimeout(() => onStart(), 800);
  };

  return (
    <div className={`lp-spot lp-spot-${theme} ${animateOut ? "lp-spot-out" : ""}`}>
      {/* Spotlight beam + rays (::before and ::after) */}
      <div className={`lp-spot-glow ${revealed ? "lp-spot-on" : ""}`} />

      {/* Ambient floor glow */}
      <div className="lp-spot-ambient" />

      <div className="lp-spot-center">
        <h1 className={`lp-spot-name ${revealed ? "lp-spot-visible" : ""}`}>{name}</h1>
        {showBtn && (
          <button className="lp-spot-btn" onClick={handleStart}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
