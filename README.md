# loader-pack

Beautiful, animated intro/loader screens for React apps. Pick from 5 design variants (or import just the one you need) and give your portfolio, SPA, or landing page a stunning entry.

![npm](https://img.shields.io/npm/v/loader-pack)
![license](https://img.shields.io/npm/l/loader-pack)
![bundle size](https://img.shields.io/bundlephobia/minzip/loader-pack)

---

## Variants

| Variant | Style | Preview |
|---------|-------|---------|
| `classic` | Animated name reveal, multilingual marquee, date/time | Clean & cinematic |
| `terminal` | CLI boot sequence, macOS-style title bar | Developer vibes |
| `minimal` | Ultra-clean fade-in with bordered button | Less is more |
| `spotlight` | Volumetric light beam with rays from corner | Dramatic & elegant |
| `glitch` | RGB channel-split text, pixel cat, scanlines | Cyberpunk energy |

---

## Installation

```bash
npm install loader-pack
```

> **Peer dependencies:** `react >=18.0.0` and `react-dom >=18.0.0`

Don't forget to import the styles:

```tsx
import "loader-pack/styles";
```

---

## Quick Start

### Option 1: Single component with `variant` prop

The simplest way — one import, pick your variant:

```tsx
import { LoaderPack } from "loader-pack";
import "loader-pack/styles";

function App() {
  return (
    <LoaderPack variant="glitch" name="Your Name" theme="dark">
      {/* Your app content goes here — shown after the loader */}
      <main>
        <h1>Welcome to my site</h1>
      </main>
    </LoaderPack>
  );
}
```

### Option 2: Direct import (tree-shakeable)

Import only the variant you need — smaller bundle:

```tsx
import { GlitchLoader } from "loader-pack";
import "loader-pack/styles";

function App() {
  return (
    <GlitchLoader name="Your Name" theme="dark">
      <main>
        <h1>Welcome to my site</h1>
      </main>
    </GlitchLoader>
  );
}
```

Available standalone imports: `ClassicLoader`, `TerminalLoader`, `MinimalLoader`, `SpotlightLoader`, `GlitchLoader`

---

## Props

### `<LoaderPack>` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"classic" \| "terminal" \| "minimal" \| "spotlight" \| "glitch"` | `"classic"` | Which loader design to use |
| `name` | `string` | **required** | The name displayed in the loader |
| `children` | `ReactNode` | **required** | Your app content (revealed after start) |
| `theme` | `"dark" \| "light"` | `"dark"` | Color theme |
| `sound` | `boolean` | `false` | Enable ambient & click sound effects |
| `ambientSoundSrc` | `string` | built-in | Custom ambient sound file path |
| `clickSoundSrc` | `string` | built-in | Custom click sound file path |
| `marqueeText` | `string` | built-in | Custom scrolling marquee text (classic variant) |

All standalone loaders (`ClassicLoader`, etc.) accept the same props except `variant`.

---

## Customization Examples

### Dark theme (default)
```tsx
<LoaderPack variant="spotlight" name="Jane Doe" theme="dark">
  <App />
</LoaderPack>
```

### Light theme
```tsx
<LoaderPack variant="terminal" name="Jane Doe" theme="light">
  <App />
</LoaderPack>
```

### With sound effects
```tsx
<LoaderPack variant="classic" name="Jane Doe" sound>
  <App />
</LoaderPack>
```

### Custom sounds
```tsx
<LoaderPack
  variant="minimal"
  name="Jane Doe"
  ambientSoundSrc="/audio/my-ambient.wav"
  clickSoundSrc="/audio/my-click.wav"
  sound
>
  <App />
</LoaderPack>
```

### Custom marquee text (classic variant)
```tsx
<LoaderPack
  variant="classic"
  name="Jane Doe"
  marqueeText="React • TypeScript • Node.js • Next.js • GraphQL •"
>
  <App />
</LoaderPack>
```

---

## How it works

1. The loader renders full-screen over your app
2. It plays the intro animation for the chosen variant
3. User clicks/taps the start action (button, pixel cat, etc.)
4. The loader smoothly transitions out, revealing your `children`

The `children` content is only mounted after the user clicks start, so your app code doesn't run until the intro is complete.

---

## TypeScript

All types are exported:

```tsx
import type { LoaderPackProps, LoaderProps, LoaderVariant } from "loader-pack";
```

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Uses CSS custom properties and standard React 18+ APIs.

---

## License

MIT
