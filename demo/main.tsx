import React, { useState } from "react";
import { createRoot } from "react-dom/client";

// Two ways to use loader-pack:
// 1) Convenience wrapper with `variant` prop
import { LoaderPack } from "../src/index";
// 2) Direct standalone imports (tree-shakeable)
import {
  ClassicLoader,
  TerminalLoader,
  MinimalLoader,
  SpotlightLoader,
  GlitchLoader,
} from "../src/index";
import type { LoaderVariant, LoaderProps } from "../src/types";

const VARIANT_NAMES: LoaderVariant[] = ["classic", "terminal", "minimal", "spotlight", "glitch"];

const STANDALONE: Record<LoaderVariant, React.ComponentType<LoaderProps>> = {
  classic: ClassicLoader,
  terminal: TerminalLoader,
  minimal: MinimalLoader,
  spotlight: SpotlightLoader,
  glitch: GlitchLoader,
};

type Mode = "variant-prop" | "standalone";

/* ── Fake website content (what users see after the loader) ── */
const FakeWebsite = () => (
  <div style={{ fontFamily: "system-ui, sans-serif", color: "#fff", background: "#0a0a0a", minHeight: "100vh" }}>
    {/* Nav */}
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "20px 40px", borderBottom: "1px solid #222",
    }}>
      <span style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.05em" }}>Bhavya Pratap</span>
      <div style={{ display: "flex", gap: "28px", fontSize: "0.85rem", opacity: 0.7 }}>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Work</a>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>About</a>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
      </div>
    </nav>

    {/* Hero */}
    <section style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "120px 24px 80px",
    }}>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", fontWeight: 600, lineHeight: 1.1, marginBottom: "1rem" }}>
        Creative Developer<br />&amp; Designer
      </h1>
      <p style={{ maxWidth: "520px", opacity: 0.5, fontSize: "1rem", lineHeight: 1.6 }}>
        Building beautiful, performant web experiences with a focus on animation and interaction design.
      </p>
    </section>

    {/* Project grid */}
    <section style={{ padding: "0 40px 80px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
      }}>
        {["Project Alpha", "Project Beta", "Project Gamma"].map((title) => (
          <div key={title} style={{
            background: "#151515", borderRadius: "12px", padding: "48px 28px",
            border: "1px solid #222", textAlign: "center",
          }}>
            <div style={{ fontSize: "0.75rem", opacity: 0.4, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
              Featured
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 500 }}>{title}</h3>
          </div>
        ))}
      </div>
    </section>
  </div>
);

/* ── Dev toolbar (floating, always on top) ── */
function DevToolbar({
  variant,
  mode,
  onSwitch,
  onToggleMode,
  currentTheme,
  onToggleTheme,
}: {
  variant: LoaderVariant;
  mode: Mode;
  currentTheme: "dark" | "light";
  onSwitch: (v: LoaderVariant) => void;
  onToggleMode: () => void;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", top: 12, right: 12, zIndex: 100000,
          padding: "6px 14px", fontSize: "0.7rem", letterSpacing: "0.1em",
          border: "1px solid #444", borderRadius: "6px",
          background: "rgba(0,0,0,0.8)", color: "#aaa", cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}
      >
        DEV
      </button>
    );
  }

  return (
    <div style={{
      position: "fixed", top: 12, right: 12, zIndex: 100000,
      background: "rgba(10,10,10,0.92)", border: "1px solid #333", borderRadius: "10px",
      padding: "14px 18px", backdropFilter: "blur(10px)",
      display: "flex", flexDirection: "column", gap: "10px", minWidth: "200px",
      fontFamily: "system-ui, sans-serif", fontSize: "0.75rem", color: "#ccc",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.65rem", opacity: 0.5 }}>
          Dev Toolbar
        </span>
        <button onClick={() => setOpen(false)} style={{
          background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1rem", lineHeight: 1,
        }}>×</button>
      </div>

      {/* Variant picker */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {VARIANT_NAMES.map((v) => (
          <button
            key={v}
            onClick={() => onSwitch(v)}
            style={{
              padding: "4px 12px",
              border: v === variant ? "1px solid #fff" : "1px solid #444",
              background: v === variant ? "#fff" : "transparent",
              color: v === variant ? "#000" : "#aaa",
              borderRadius: "4px", cursor: "pointer",
              fontSize: "0.7rem", letterSpacing: "0.05em", textTransform: "uppercase",
            }}
          >{v}</button>
        ))}
      </div>

      {/* Mode toggle */}
      <button
        onClick={onToggleMode}
        style={{
          padding: "5px 0", background: "none", border: "1px solid #333",
          borderRadius: "4px", color: "#888", cursor: "pointer",
          fontSize: "0.65rem", letterSpacing: "0.08em",
        }}
      >
        mode: {mode === "variant-prop" ? "variant prop" : "standalone"}
      </button>

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        style={{
          padding: "5px 0", background: "none", border: "1px solid #333",
          borderRadius: "4px", color: "#888", cursor: "pointer",
          fontSize: "0.65rem", letterSpacing: "0.08em",
        }}
      >
        theme: {currentTheme}
      </button>
    </div>
  );
}

/* ── App ── */
function App() {
  const [variant, setVariant] = useState<LoaderVariant>("classic");
  const [mode, setMode] = useState<Mode>("variant-prop");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [key, setKey] = useState(0);

  const switchVariant = (v: LoaderVariant) => {
    setVariant(v);
    setKey((k) => k + 1);
  };

  const toggleMode = () => {
    setMode((m) => (m === "variant-prop" ? "standalone" : "variant-prop"));
    setKey((k) => k + 1);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    setKey((k) => k + 1);
  };

  const loaderContent = <FakeWebsite />;

  // Standalone direct import
  if (mode === "standalone") {
    const Loader = STANDALONE[variant];
    return (
      <>
        <Loader key={key} name="Bhavya Pratap" theme={theme}>
          {loaderContent}
        </Loader>
        <DevToolbar variant={variant} mode={mode} currentTheme={theme} onSwitch={switchVariant} onToggleMode={toggleMode} onToggleTheme={toggleTheme} />
      </>
    );
  }

  // Convenience variant prop
  return (
    <>
      <LoaderPack key={key} name="Bhavya Pratap" theme={theme} variant={variant}>
        {loaderContent}
      </LoaderPack>
      <DevToolbar variant={variant} mode={mode} currentTheme={theme} onSwitch={switchVariant} onToggleMode={toggleMode} onToggleTheme={toggleTheme} />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
