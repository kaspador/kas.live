# 🚀 Kaspa BlockDAG - Live Visualization

A modern, real-time animated visualization of the Kaspa blockchain's blockDAG structure built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![Kaspa BlockDAG Preview](https://via.placeholder.com/800x400/1e1e2e/7c3aed?text=Kaspa+BlockDAG+Live+Visualization)

## ✨ Features

- 🎯 **Left-to-Right Timeline Flow** - Fixed the layout to show blocks flowing chronologically
- 🎨 **Beautiful 3D Blocks** - Gradient-filled blocks with shadows, borders, and hover effects
- ⚡ **Smooth Animations** - Framer Motion powered animations with spring physics
- 🌐 **Live Data Integration** - Fetches real-time block data from Kaspa network
- 🎮 **Demo Mode** - Automatic fallback with simulated block creation
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎛️ **Interactive Controls** - Adjust speed, intervals, and visualization settings
- 💫 **Particle Effects** - Hover effects, glow animations, and 3D transforms
- 📊 **Real-time Stats** - Live block count, height, and DAA score updates
- 🎨 **Modern UI** - Glassmorphism panels with backdrop blur effects

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Railway (ready)

## 🏃‍♂️ Quick Start

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd kaspa-blockdag

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🚀 Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

### One-Click Deployment

1. Click the Railway button above
2. Connect your GitHub repository
3. Railway will automatically detect the Next.js app and deploy it
4. Your app will be live with a custom Railway domain!

### Manual Deployment

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Deploy the project:
   ```bash
   railway new
   railway up
   ```

The `railway.toml` configuration file is already included for optimized deployment.

## 🎮 Features Showcase

### 🎯 Left-to-Right Timeline
Unlike the original implementation that scrolled bottom-to-top, our version properly flows **left-to-right** like a traditional blockchain timeline:
- Older blocks on the left
- Newer blocks appear on the right
- Natural time progression visualization

### 🎨 3D Block Design
Each block features:
- **Gradient backgrounds** based on block type (blue/red/gray)
- **3D depth effects** with shadows and highlights
- **Hover animations** with scale and rotation
- **Selection indicators** with pulsing borders
- **Block IDs** displayed on larger blocks

### ⚡ Smooth Animations
- **Spring-based animations** for natural movement
- **Staggered entry** animations for new blocks
- **Smooth camera** panning and zooming
- **Particle effects** on hover and selection

### 🎛️ Interactive Controls
- **Height Difference**: Control how many recent blocks to show
- **Update Interval**: Adjust real-time data fetching frequency
- **Animation Speed**: Speed up or slow down animations
- **Toggle Options**: Show/hide edges, enable auto-scroll, demo mode

## 📊 Data Integration

### Live Data Source
```
Primary: https://kgi.kaspad.net:3147/head?heightDifference=X
Fallback: Intelligent demo mode with realistic data
```

### Data Processing
- **Real-time fetching** every 2 seconds (configurable)
- **Automatic fallback** to demo mode on API errors
- **CORS handling** with graceful degradation
- **Block layout calculation** with proper positioning

## 🎨 Visual Design

### Color Scheme
- **Blue Blocks**: Regular consensus blocks
- **Red Blocks**: Conflicting or orphaned blocks  
- **Gray Blocks**: Pending or uncertain blocks
- **Green Blocks**: Main chain (virtual selected parent chain)

### UI Components
- **Glassmorphism panels** with backdrop blur
- **Custom sliders** with purple accent colors
- **Floating legends** with smooth animations
- **Status indicators** with connection states

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```bash
# Optional: Custom API endpoint
NEXT_PUBLIC_KASPA_API_URL=https://kgi.kaspad.net:3147

# Optional: Default settings
NEXT_PUBLIC_DEFAULT_HEIGHT_DIFF=15
NEXT_PUBLIC_DEFAULT_UPDATE_INTERVAL=2000
```

### Customization Options

#### Layout Settings
```typescript
const settings = {
  blockSize: 32,              // Size of each block
  horizontalSpacing: 120,     // Space between height groups (left-right)
  verticalSpacing: 80,        // Space between blocks in same height
  showEdges: true,            // Show connection lines
  autoScroll: true,           // Follow latest blocks
}
```

#### Animation Settings
```typescript
const animation = {
  animationSpeed: 1,          // Global animation speed multiplier
  springStiffness: 300,       // Spring animation stiffness
  springDamping: 20,          // Spring animation damping
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Blocks not appearing**
   - Enable demo mode if API is blocked
   - Check network connectivity
   - Verify CORS settings

2. **Performance issues**
   - Reduce height difference to show fewer blocks
   - Disable edges for better performance
   - Lower animation speed

3. **Build errors**
   - Clear `.next` directory
   - Delete `node_modules` and reinstall
   - Check TypeScript errors

### Debug Mode
Open browser DevTools to see:
- API request logs
- Block processing information
- Performance metrics
- Connection status

## 🎯 Future Enhancements

- [ ] **WebSocket connection** for real-time updates
- [ ] **Block search** and filtering
- [ ] **Export functionality** (PNG/SVG)
- [ ] **Multiple chain support**
- [ ] **3D visualization mode**
- [ ] **Transaction flow visualization**
- [ ] **Historical data playback**
- [ ] **Mobile gestures** for navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🔗 Links

- **Live Demo**: [Deploy your own](https://railway.app/new)
- **Kaspa Official**: [kaspa.org](https://kaspa.org)
- **Original Inspiration**: [kgi.kaspad.net](https://kgi.kaspad.net)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)

---

Built with ❤️ for the Kaspa community
