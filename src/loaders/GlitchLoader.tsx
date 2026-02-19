import { useEffect, useState, useRef, useCallback } from "react";
import type { VariantProps } from "../types";
import "./glitch.css";

/* ── Error log lines that cascade in ── */
const ERROR_LINES = [
  "01100011 01101000 01100101 01100011 01101011",
  "AN_EXCEPTION_HAS_OCCURRED",
  "REALITY.EXE_HAS_STOPPED_RESPONDING",
  "WOULD_YOU_LIKE_TO_CONTINUE?",
  "DATABASE_CORRUPTED",
  "PROGRAM_RESTARTED_SUCCESSFULLY",
  "HELLO_WORLD",
  "HELLO?",
  "?",
  "?????????????????????????",
  "SIGNAL_LOST... RECONNECTING...",
  "01110100 01110010 01111001 01101001 01101110 01100111",
];

/* ── Pixel cat as inline SVG ── */
function PixelCat() {
  return (
    <svg
      viewBox="0 0 32 24"
      className="lp-gli-cat-svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Ears */}
      <rect x="5" y="2" width="2" height="2" fill="currentColor" />
      <rect x="7" y="0" width="2" height="2" fill="currentColor" />
      <rect x="7" y="2" width="2" height="2" fill="currentColor" />
      <rect x="19" y="0" width="2" height="2" fill="currentColor" />
      <rect x="19" y="2" width="2" height="2" fill="currentColor" />
      <rect x="21" y="2" width="2" height="2" fill="currentColor" />

      {/* Head top */}
      <rect x="9" y="0" width="10" height="2" fill="currentColor" />

      {/* Head sides */}
      <rect x="5" y="4" width="2" height="6" fill="currentColor" />
      <rect x="21" y="4" width="2" height="6" fill="currentColor" />

      {/* Head fill */}
      <rect x="7" y="4" width="14" height="6" fill="currentColor" opacity="0.15" />

      {/* Eyes (closed — sleeping dashes) */}
      <rect x="9" y="6" width="3" height="1" fill="currentColor" />
      <rect x="16" y="6" width="3" height="1" fill="currentColor" />

      {/* Nose */}
      <rect x="13" y="8" width="2" height="1" fill="currentColor" opacity="0.6" />

      {/* Body outline */}
      <rect x="3" y="10" width="2" height="2" fill="currentColor" />
      <rect x="23" y="10" width="2" height="2" fill="currentColor" />
      <rect x="3" y="12" width="22" height="2" fill="currentColor" opacity="0.15" />
      <rect x="1" y="12" width="2" height="6" fill="currentColor" />
      <rect x="25" y="12" width="2" height="6" fill="currentColor" />

      {/* Bottom */}
      <rect x="3" y="14" width="22" height="2" fill="currentColor" opacity="0.1" />
      <rect x="3" y="16" width="2" height="2" fill="currentColor" />
      <rect x="5" y="18" width="20" height="2" fill="currentColor" />
      <rect x="23" y="16" width="2" height="2" fill="currentColor" />

      {/* Tail */}
      <rect x="25" y="10" width="2" height="2" fill="currentColor" />
      <rect x="27" y="8" width="2" height="2" fill="currentColor" />
      <rect x="29" y="6" width="2" height="2" fill="currentColor" />
      <rect x="29" y="8" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

export default function GlitchLoader({ name, theme, onStart }: VariantProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [showName, setShowName] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  /* ── cascade error lines ── */
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < ERROR_LINES.length) {
        setLines((prev) => [...prev, ERROR_LINES[i]]);
        i++;
      } else {
        clearInterval(iv);
        setTimeout(() => setShowName(true), 400);
        setTimeout(() => setShowCat(true), 1800);
      }
    }, 180);
    return () => clearInterval(iv);
  }, []);

  /* auto-scroll log */
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  /* ── random glitch flicker on the name ── */
  const nameRef = useRef<HTMLHeadingElement>(null);
  const glitchTimer = useRef<ReturnType<typeof setInterval>>(undefined);

  const startGlitch = useCallback(() => {
    glitchTimer.current = setInterval(() => {
      const el = nameRef.current;
      if (!el) return;
      el.classList.add("lp-gli-flicker");
      setTimeout(() => el.classList.remove("lp-gli-flicker"), 150);
    }, 2500 + Math.random() * 3000);
  }, []);

  useEffect(() => {
    if (showName) startGlitch();
    return () => clearInterval(glitchTimer.current);
  }, [showName, startGlitch]);

  const handleStart = () => {
    setAnimateOut(true);
    setTimeout(() => onStart(), 900);
  };

  return (
    <div className={`lp-gli lp-gli-${theme} ${animateOut ? "lp-gli-out" : ""}`}>
      {/* Scanlines overlay */}
      <div className="lp-gli-scanlines" />

      {/* Noise grain */}
      <div className="lp-gli-noise" />

      {/* Error log */}
      <div className="lp-gli-log" ref={logRef}>
        {lines.map((line, i) => (
          <div key={i} className="lp-gli-line">{line}</div>
        ))}
      </div>

      {/* Big glitch name */}
      {showName && (
        <h1
          ref={nameRef}
          className="lp-gli-name"
          data-text={name}
        >
          {name}
        </h1>
      )}

      {/* Pixel cat — tap to start */}
      {showCat && (
        <div className="lp-gli-cat" onClick={handleStart} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleStart(); }}>
          <div className="lp-gli-cat-glow" />
          <PixelCat />
          {/* Floating Zzz */}
          <span className="lp-gli-z lp-gli-z1">z</span>
          <span className="lp-gli-z lp-gli-z2">z</span>
          <span className="lp-gli-z lp-gli-z3">z</span>
        </div>
      )}
    </div>
  );
}
