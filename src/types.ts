export type LoaderPackProps = {
  /** The name displayed in the center of the intro screen */
  name: string;
  /** Your main app content — rendered after the user clicks Start */
  children: React.ReactNode;
  /** Color theme: "dark" (black bg) or "light" (white bg). Default: "dark" */
  theme?: "dark" | "light";
  /** Play click/ambient sound effects. Default: false */
  sound?: boolean;
  /** Path to the ambient sound file played on mount. Uses bundled audio by default. */
  ambientSoundSrc?: string;
  /** Path to the click sound file played on Start. Uses bundled audio by default. */
  clickSoundSrc?: string;
  /** Custom marquee text. Has a built-in multilingual default. */
  marqueeText?: string;
};