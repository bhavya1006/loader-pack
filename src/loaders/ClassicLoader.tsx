import { useEffect, useState } from "react";
import type { VariantProps } from "../types";
import "./classic.css";

export default function ClassicLoader({
  name,
  theme,
  marqueeText,
  onStart,
}: VariantProps) {
  const [showButton, setShowButton] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const btnTimer = setTimeout(() => setShowButton(true), 1400);
    const clock = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearTimeout(btnTimer);
      clearInterval(clock);
    };
  }, []);

  const handleStart = () => {
    setAnimateOut(true);
    setTimeout(() => onStart(), 800);
  };

  const formattedTime = time.toLocaleTimeString(undefined, {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });

  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div className={`lp-classic lp-classic-${theme} ${animateOut ? "lp-classic-zoom" : ""}`}>
      <div className="lp-classic-marquee">
        <div className="lp-classic-track">
          {Array(2).fill(marqueeText).map((text, i) => (
            <span key={i} className="lp-classic-mtext">{text}</span>
          ))}
        </div>
      </div>

      <div className="lp-classic-center">
        <h1 className="lp-classic-name">{name}</h1>
        <div className="lp-classic-btnwrap">
          {showButton && (
            <button className="lp-classic-btn" onClick={handleStart}>
              Start <span className="lp-classic-arrow">→</span>
            </button>
          )}
        </div>
      </div>

      <div className="lp-classic-date">{formattedDate}</div>
      <div className="lp-classic-time">{formattedTime}</div>
    </div>
  );
}
