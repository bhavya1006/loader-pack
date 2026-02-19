/**
 * Standalone loader components — each one is a fully self-contained loader
 * with sound, children-gating, and content-reveal built in.
 *
 * Import directly for tree-shaking:
 * ```tsx
 * import { TerminalLoader } from "loader-pack";
 *
 * <TerminalLoader name="Bhavya" theme="dark">
 *   <App />
 * </TerminalLoader>
 * ```
 */

import { withLoader } from "./withLoader";

import ClassicInner from "./loaders/ClassicLoader";
import TerminalInner from "./loaders/TerminalLoader";
import MinimalInner from "./loaders/MinimalLoader";
import SpotlightInner from "./loaders/SpotlightLoader";
import GlitchInner from "./loaders/GlitchLoader";

export const ClassicLoader = withLoader(ClassicInner, "ClassicLoader");
export const TerminalLoader = withLoader(TerminalInner, "TerminalLoader");
export const MinimalLoader = withLoader(MinimalInner, "MinimalLoader");
export const SpotlightLoader = withLoader(SpotlightInner, "SpotlightLoader");
export const GlitchLoader = withLoader(GlitchInner, "GlitchLoader");
