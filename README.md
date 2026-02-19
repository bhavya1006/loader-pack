# loader-pack

A beautiful, cinematic intro/loader screen for React apps. Drop it in and give your portfolio, SPA, or landing page a stunning animated entry.

![npm](https://img.shields.io/npm/v/loader-pack)
![license](https://img.shields.io/npm/l/loader-pack)

## Features

- Scrolling multilingual marquee (Hello in 12+ languages + code snippets)
- Animated name reveal with scale + stroke effect
- Smooth zoom-out transition into your app content
- Dark & light themes
- Optional ambient & click sound effects
- Fully customizable marquee text
- Zero runtime dependencies (only React as a peer dep)

## Installation

```bash
npm install loader-pack
```

## Quick Start

```tsx
import { LoaderPack } from "loader-pack";
import "loader-pack/styles";

function App() {
  return (
    <LoaderPack name="Your Name" theme="dark">
      <div>
        <h1>Welcome to my site!</h1>
        <p>Your main content goes here.</p>
      </div>
    </LoaderPack>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | *required* | Large centered display name |
| `children` | `ReactNode` | *required* | Content shown after clicking Start |
| `theme` | `"dark" \| "light"` | `"dark"` | Color scheme |
| `sound` | `boolean` | `false` | Enable ambient & click sounds |
| `ambientSoundSrc` | `string` | `"/loader-sound.mp3"` | Path to ambient sound file |
| `clickSoundSrc` | `string` | `"/click.mp3"` | Path to click sound file |
| `marqueeText` | `string` | multilingual default | Custom scrolling marquee text |

## Examples

### Dark theme (default)

```tsx
<LoaderPack name="Jane Doe">
  <YourApp />
</LoaderPack>
```

### Light theme with sound

```tsx
<LoaderPack name="Jane Doe" theme="light" sound>
  <YourApp />
</LoaderPack>
```

### Custom marquee

```tsx
<LoaderPack
  name="Studio X"
  marqueeText="Design • Code • Ship • Repeat • "
>
  <YourApp />
</LoaderPack>
```

## How It Works

1. The loader screen appears full-screen with a marquee, your name, date/time, and a Start button
2. User clicks **Start →**
3. The screen zooms out with a smooth opacity transition
4. Your `children` content fades in

## License

MIT
