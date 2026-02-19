import { useEffect, useRef, useState } from "react";
import type { LoaderProps, VariantProps } from "./types";
import "./shared.css";
import defaultAmbient from "./assets/ambient.wav";
import defaultClick from "./assets/click.wav";

const DEFAULT_MARQUEE = `Hello • नमस्ते • Bonjour • Hola • こんにちは • 안녕하세요 • 你好 • مرحبا • שלום • Ciao • Olá • Привет • Hallo • Selam • Ahoj • Hej • console.log("Hello World"); • printf("Hello World"); • System.out.println("Hello World"); • echo "Hello World"; • fmt.Println("Hello World"); • cout << "Hello World"; • println!("Hello World"); • write("Hello World"); •`;

/**
 * Wraps a variant's intro-screen component into a full standalone loader.
 * Handles: sound effects, started/children gating, content reveal animation.
 */
export function withLoader(
  Inner: React.ComponentType<VariantProps>,
  displayName: string,
) {
  function WrappedLoader({
    name,
    children,
    theme = "dark",
    sound = false,
    ambientSoundSrc = defaultAmbient,
    clickSoundSrc = defaultClick,
    marqueeText = DEFAULT_MARQUEE,
  }: LoaderProps) {
    const [started, setStarted] = useState(false);
    const ambientRef = useRef<HTMLAudioElement | null>(null);

    // Pre-load audio but do NOT play — browsers block auto-play
    useEffect(() => {
      if (!sound) return;
      const audio = new Audio(ambientSoundSrc);
      audio.volume = 0.4;
      audio.preload = "auto";
      ambientRef.current = audio;
      return () => {
        audio.pause();
        ambientRef.current = null;
      };
    }, [sound, ambientSoundSrc]);

    const handleStart = () => {
      if (sound) {
        // Ambient starts on user gesture (guaranteed to work)
        ambientRef.current?.play().catch(() => {});
        const click = new Audio(clickSoundSrc);
        click.volume = 0.9;
        click.play().catch(() => {});
      }
      setStarted(true);
    };

    return (
      <>
        {!started && (
          <Inner
            name={name}
            theme={theme}
            marqueeText={marqueeText}
            onStart={handleStart}
          />
        )}
        {started && (
          <div className="lp-main reveal">{children}</div>
        )}
      </>
    );
  }

  WrappedLoader.displayName = displayName;
  return WrappedLoader;
}
