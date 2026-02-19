# loader-pack

Drop-in animated intro screens for React. One line of code, five gorgeous styles.

![npm](https://img.shields.io/npm/v/loader-pack)
![license](https://img.shields.io/npm/l/loader-pack)
![bundle size](https://img.shields.io/bundlephobia/minzip/loader-pack)

```bash
npm install loader-pack
```

---

## What does it do?

Wraps your app in a full-screen animated intro. The user sees a beautiful loading screen, taps to enter, and your content smoothly fades in. That's it — no config needed.

```tsx
import { LoaderPack } from "loader-pack";
import "loader-pack/styles";

export default function App() {
  return (
    <LoaderPack name="Your Name">
      <YourApp />
    </LoaderPack>
  );
}
```

Three lines. Done.

---

## Pick a style

| Variant | Vibe |
|---------|------|
| **classic** | Scrolling multilingual marquee, animated name, date & time |
| **terminal** | Fake CLI boot sequence with macOS-style window |
| **minimal** | Clean fade-in — just name + enter button |
| **spotlight** | Dramatic light beam sweeping from the corner |
| **glitch** | Neon text with RGB split, scanlines & a sleeping pixel cat |

Just pass the `variant` prop:

```tsx
<LoaderPack variant="glitch" name="Your Name">
  <YourApp />
</LoaderPack>
```

---

## All props

| Prop | Type | Default | What it does |
|------|------|---------|--------------|
| `name` | `string` | — | **Required.** The name shown on screen |
| `children` | `ReactNode` | — | **Required.** Your app (shown after intro) |
| `variant` | `"classic"` `"terminal"` `"minimal"` `"spotlight"` `"glitch"` | `"classic"` | Loader style |
| `theme` | `"dark"` `"light"` | `"dark"` | Color scheme |
| `sound` | `boolean` | `false` | Ambient + click sounds |
| `ambientSoundSrc` | `string` | built-in | Your own ambient audio file |
| `clickSoundSrc` | `string` | built-in | Your own click audio file |
| `marqueeText` | `string` | built-in | Custom scrolling text (classic only) |

---

## Want a smaller bundle?

Import just the variant you need — unused ones get tree-shaken out:

```tsx
import { GlitchLoader } from "loader-pack";
import "loader-pack/styles";

<GlitchLoader name="Your Name" theme="dark">
  <YourApp />
</GlitchLoader>
```

Available: `ClassicLoader` · `TerminalLoader` · `MinimalLoader` · `SpotlightLoader` · `GlitchLoader`

---

## More examples

**Light theme:**
```tsx
<LoaderPack variant="spotlight" name="Jane" theme="light">
  <App />
</LoaderPack>
```

**With sound:**
```tsx
<LoaderPack variant="classic" name="Jane" sound>
  <App />
</LoaderPack>
```

**Custom marquee (classic):**
```tsx
<LoaderPack variant="classic" name="Jane" marqueeText="React • Next.js • TypeScript •">
  <App />
</LoaderPack>
```

**Custom audio:**
```tsx
<LoaderPack variant="minimal" name="Jane" sound ambientSoundSrc="/my-bg.wav" clickSoundSrc="/my-click.wav">
  <App />
</LoaderPack>
```

---

## TypeScript

Fully typed. Import what you need:

```tsx
import type { LoaderPackProps, LoaderProps, LoaderVariant } from "loader-pack";
```

---

## How it works

1. Loader renders full-screen
2. Intro animation plays
3. User taps the start action (button, cat, etc.)
4. Smooth fade-out → your app appears

Your `children` don't mount until the user clicks — so nothing runs before the intro finishes.

---

## Requirements

- React 18+
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Zero runtime dependencies

---

## License

MIT
