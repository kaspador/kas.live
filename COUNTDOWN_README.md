# $KAS Smart Contracts Countdown Timer

A beautiful countdown timer built with Next.js, featuring Kaspa's official branding colors and fonts from their [media kit](https://kaspa.org/media-kit/).

## 🎯 Features

- **Real-time countdown** to smart contracts deployment
- **Kaspa official branding** with authentic colors and fonts
- **Fun rotating facts** that change every 5 seconds
- **Mobile optimized** responsive design
- **Celebration effects** with confetti and sound when timer reaches zero
- **Smooth animations** and glassmorphism design

## 🎨 Kaspa Brand Colors Used

- **Primary Teal**: `#70C7BA` - Main countdown numbers and branding
- **Secondary Teal**: `#49EACB` - Highlights and "Kasplex" text
- **Dark**: `#231F20` - Background
- **Gray**: `#B6B6B6` - Secondary text

## 🎮 Fun Facts

The app displays rotating fun facts like:
- "X nights of dreams until smart contracts arrive!"
- "X work days remaining!"
- "X meals until the future begins!"
- And more creative countdown variations!

## ⚙️ Customization

### Change the Target Date

Edit `src/components/KaspaCountdown.tsx` and modify this line:

```typescript
const targetDate = new Date('2025-06-01T00:00:00Z').getTime();
```

Replace with your desired deployment date in ISO format.

### Add More Fun Facts

In the same file, add to the `funFacts` array:

```typescript
const funFacts = [
  // ... existing facts
  (time: TimeLeft) => `Your custom fun fact with ${time.days} days!`,
];
```

### Modify Colors

Edit `src/components/KaspaCountdown.module.css` and change the color values:

```css
.mainTitle {
  color: #70C7BA; /* Change this to your preferred color */
}
```

## 🎉 Celebration Features

When the countdown reaches zero:
- 🎊 **Confetti burst** with Kaspa colors
- 🔊 **Success sound** plays automatically
- 💫 **Animated celebration message**

## 📱 Mobile Optimization

The design automatically adapts for mobile devices:
- Grid layout changes to 2x2 on small screens
- Separators hidden on mobile
- Responsive font sizes with `clamp()`
- Touch-friendly spacing

## 🚀 Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```

## 📁 Backup

Your original BlockDAG visualization has been safely backed up to `/backup-blockdag-app/` and can be restored anytime.

## 🔧 Technical Details

- **Framework**: Next.js 15 with React 19
- **Styling**: CSS Modules
- **Fonts**: Rubik, Oswald, Lato (Google Fonts)
- **Animations**: CSS animations + canvas-confetti
- **TypeScript**: Fully typed
- **Mobile-first**: Responsive design

---

Built with ❤️ for the Kaspa community 