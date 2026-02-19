import { useEffect, useState } from "react";
import type { LoaderPackProps } from "./types";
import "./loader-pack.css";
import defaultAmbient from "./assets/ambient.wav";
import defaultClick from "./assets/click.wav";

const DEFAULT_MARQUEE = `Hello • नमस्ते • Bonjour • Hola • こんにちは • 안녕하세요 • 你好 • مرحبا • שלום • Ciao • Olá • Привет • Hallo • Selam • Ahoj • Hej • console.log("Hello World"); • printf("Hello World"); • System.out.println("Hello World"); • echo "Hello World"; • fmt.Println("Hello World"); • cout << "Hello World"; • println!("Hello World"); • write("Hello World"); •`;

export default function LoaderPack({
  name,
  children,
  theme = "dark",
  sound = false,
  ambientSoundSrc = defaultAmbient,
  clickSoundSrc = defaultClick,
  marqueeText = DEFAULT_MARQUEE,
}: LoaderPackProps) {
  const [started, setStarted] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const btnTimer = setTimeout(() => setShowButton(true), 1400);
    const clock = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearTimeout(btnTimer);
      clearInterval(clock);
    };
  }, []);

  useEffect(() => {
    if (!sound) return;
    const audio = new Audio(ambientSoundSrc);
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, [sound, ambientSoundSrc]);

  const handleStart = () => {
    if (sound) {
      const click = new Audio(clickSoundSrc);
      click.volume = 0.9;
      click.play().catch(() => {});
    }
    setAnimateOut(true);
    setTimeout(() => setStarted(true), 800);
  };

  const formattedTime = time.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      {!started && (
        <div className={`lp-container lp-${theme} ${animateOut ? "lp-zoom" : ""}`}>
          <div className="lp-marquee">
            <div className="lp-track">
              {Array(2)
                .fill(marqueeText)
                .map((text, i) => (
                  <span key={i} className="lp-text">{text}</span>
                ))}
            </div>
          </div>

          <div className="lp-center">
            <h1 className="lp-name">{name}</h1>
            <div className="lp-button-wrapper">
              {showButton && (
                <button className="lp-button" onClick={handleStart}>
                  Start <span className="lp-arrow">→</span>
                </button>
              )}
            </div>
          </div>

          <div className="lp-date">{formattedDate}</div>
          <div className="lp-time">{formattedTime}</div>
        </div>
      )}

      {started && (
        <div className="lp-main reveal">{children}</div>
      )}
    </>
  );
}