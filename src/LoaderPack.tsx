import type { LoaderPackProps, LoaderProps } from "./types";
import {
  ClassicLoader,
  TerminalLoader,
  MinimalLoader,
  SpotlightLoader,
  GlitchLoader,
} from "./standalone";

const VARIANTS: Record<string, React.ComponentType<LoaderProps>> = {
  classic: ClassicLoader,
  terminal: TerminalLoader,
  minimal: MinimalLoader,
  spotlight: SpotlightLoader,
  glitch: GlitchLoader,
};

/**
 * Convenience component — picks the right loader via the `variant` prop.
 *
 * ```tsx
 * <LoaderPack variant="terminal" name="Bhavya" theme="dark">
 *   <App />
 * </LoaderPack>
 * ```
 *
 * For tree-shaking, import the variant directly instead:
 * ```tsx
 * import { TerminalLoader } from "loader-pack";
 * ```
 */
export default function LoaderPack({
  variant = "classic",
  ...rest
}: LoaderPackProps) {
  const Variant = VARIANTS[variant] ?? ClassicLoader;
  return <Variant {...rest} />;
}