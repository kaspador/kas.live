# Background Images

## To use your custom Kasplex background:

1. Save your Kasplex background image as `kasplex-bg.jpg` in this directory
2. Update the CSS in `src/components/KaspaCountdown.module.css` to use it:

```css
.countdownContainer {
  background: 
    linear-gradient(135deg, rgba(35, 31, 32, 0.8) 0%, rgba(26, 23, 24, 0.8) 50%, rgba(35, 31, 32, 0.8) 100%),
    url('/images/kasplex-bg.jpg') center/cover no-repeat,
    /* fallback gradients below */
}
```

## Current Setup

Currently using a beautiful CSS-generated background with:
- Kaspa-colored subtle patterns
- Textured appearance similar to the Kasplex branding
- Responsive and lightweight 