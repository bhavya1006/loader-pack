import { useEffect, useState, useRef } from "react";
import type { VariantProps } from "../types";
import "./terminal.css";

const BOOT_LINES = [
  "Initializing system...",
  "Loading kernel modules... OK",
  "Mounting filesystems... OK",
  "Starting network services... OK",
  "Checking dependencies... OK",
  "Compiling assets...",
  "Establishing secure connection...",
  "System ready.",
];

export default function TerminalLoader({ name, theme, onStart }: VariantProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowPrompt(true), 400);
      }
    }, 320);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, showPrompt]);

  const handleStart = () => {
    setAnimateOut(true);
    setTimeout(() => onStart(), 800);
  };

  return (
    <div className={`lp-terminal lp-terminal-${theme} ${animateOut ? "lp-terminal-out" : ""}`}>
      <div className="lp-terminal-header">
        <span className="lp-terminal-dot lp-dot-red" />
        <span className="lp-terminal-dot lp-dot-yellow" />
        <span className="lp-terminal-dot lp-dot-green" />
        <span className="lp-terminal-title">{name} — bash</span>
      </div>
      <div className="lp-terminal-body">
        {lines.map((line, i) => (
          <div key={i} className="lp-terminal-line">
            <span className="lp-terminal-prompt">$</span> {line}
          </div>
        ))}
        {showPrompt && (
          <div className="lp-terminal-line lp-terminal-action">
            <span className="lp-terminal-prompt">$</span>{" "}
            <button className="lp-terminal-btn" onClick={handleStart}>
              ./start.sh<span className="lp-terminal-cursor">█</span>
            </button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
