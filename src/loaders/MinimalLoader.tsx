import { useEffect, useState } from "react";
import type { VariantProps } from "../types";
import "./minimal.css";

export default function MinimalLoader({ name, theme, onStart }: VariantProps) {
  const [showName, setShowName] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowName(true), 300);
    const t2 = setTimeout(() => setShowBtn(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleStart = () => {
    setAnimateOut(true);
    setTimeout(() => onStart(), 700);
  };

  return (
    <div className={`lp-minimal lp-minimal-${theme} ${animateOut ? "lp-minimal-out" : ""}`}>
      <div className="lp-minimal-center">
        {showName && <h1 className="lp-minimal-name">{name}</h1>}
        {showBtn && (
          <button className="lp-minimal-btn" onClick={handleStart}>
            Enter
          </button>
        )}
      </div>
    </div>
  );
}
