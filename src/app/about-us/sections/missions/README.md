# Mission Arc Scroll Animation Component

## Overview
This component recreates the exact scroll-based arc animation with moving circular nodes (Vision, Mission, Core Values) as shown in the Enspirit design reference. The effect uses GSAP ScrollTrigger and MotionPathPlugin to create smooth, GPU-accelerated animations that respond to page scroll.

## Features
- **SVG Arc Path**: Purple stroked arc with light purple filled area beneath
- **Three Circular Nodes**: White glossy nodes with shadows that move along the arc path
- **Scroll-Triggered Animation**: Nodes animate smoothly as user scrolls through the section
- **Text Reveal**: Corresponding paragraph text fades in when each node is centered
- **Responsive Design**: Scales appropriately for desktop, tablet, and mobile devices
- **Accessibility**: Respects `prefers-reduced-motion` and includes proper ARIA attributes

## Technology Stack
- **Angular 21**: Standalone component architecture
- **GSAP 3**: Animation library with ScrollTrigger and MotionPathPlugin
- **TypeScript**: Type-safe implementation
- **Vanilla CSS**: GPU-optimized transforms and gradients

## Component Structure

### Files
```
missions/
├── missions.ts         # Component logic with GSAP animations
├── missions.html       # Template with SVG arc and nodes
├── missions.css        # Styling with responsive breakpoints
└── README.md          # This documentation
```

### Dependencies
The component requires the following GSAP plugins (already included in package.json):
- `gsap` (v3.14.2+)
- `ScrollTrigger` plugin
- `MotionPathPlugin` plugin

## Customization Guide

### Changing Text Content

Edit the text content in `missions.html`:

```html
<!-- Vision Text -->
<div #visionText class="content-text" data-content="vision">
  <p>Your custom vision statement here...</p>
</div>

<!-- Mission Text -->
<div #missionText class="content-text" data-content="mission">
  <p>Your custom mission statement here...</p>
</div>

<!-- Core Values Text -->
<div #valuesText class="content-text" data-content="values">
  <p>Your custom values statement here...</p>
</div>
```

### Adjusting Colors

Edit the CSS variables in `missions.css`:

```css
/* Arc Stroke Color */
.arc-stroke {
  stroke: #6B2BE0; /* Change this hex value */
}

/* Filled Area Gradient */
<linearGradient id="arcFillGradient">
  <stop offset="0%" style="stop-color:#E8DCFF" /> <!-- Top color -->
  <stop offset="100%" style="stop-color:#F5F0FF" /> <!-- Bottom color -->
</linearGradient>

/* Node Background */
.node-circle {
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
}

/* Text Color */
.content-text p {
  color: #4a5568; /* Change this hex value */
}
```

### Adjusting Node Sizes

Edit the node dimensions in `missions.css`:

```css
/* Desktop */
.node-circle {
  width: 200px;  /* Adjust width */
  height: 200px; /* Adjust height */
}

/* Large Desktop */
@media (min-width: 1440px) {
  .node-circle {
    width: 220px;  /* Adjust for larger screens */
    height: 220px;
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .node-circle {
    width: 170px;  /* Adjust for tablets */
    height: 170px;
  }
}
```

### Adjusting Arc Path

The arc path is defined in the SVG. To modify the curve:

```html
<!-- In missions.html -->
<path 
  id="motionPath"
  d="M 0,500 Q 360,250 720,260 Q 1080,270 1440,500"
  <!-- Adjust control points: -->
  <!-- M x,y = Start point -->
  <!-- Q cx,cy x,y = Quadratic curve (control point, end point) -->
/>
```

Use an SVG editor or tools like [SVG Path Editor](https://yqnn.github.io/svg-path-editor/) to visualize and adjust the path.

### Adjusting Scroll Duration

Edit the scroll spacer height in `missions.css`:

```css
.mission-arc-section {
  min-height: 300vh; /* Increase/decrease for longer/shorter scroll */
}

.scroll-spacer {
  height: 200vh; /* Adjust spacer height */
}
```

### Adjusting Animation Timing

Edit the GSAP timeline in `missions.ts`:

```typescript
scrollTrigger: {
  trigger: section,
  start: 'top top',      // When to start (trigger hits viewport top)
  end: 'bottom bottom',  // When to end
  scrub: 1,             // Smoothness (0-3, higher = smoother/slower)
  pin: false,           // Set to true to pin the section
}
```

### Changing Active Node Thresholds

Edit the progress thresholds in `missions.ts`:

```typescript
private updateActiveNode(progress: number, ...) {
  let activeIndex = 0;
  
  if (progress < 0.33) {      // Vision active until 33% scroll
    activeIndex = 0;
  } else if (progress < 0.66) { // Mission active 33%-66%
    activeIndex = 1;
  } else {                     // Values active after 66%
    activeIndex = 2;
  }
}
```

## Responsive Breakpoints

The component includes four breakpoints:

1. **Desktop Large** (`min-width: 1440px`): Largest node sizes
2. **Desktop** (default): Standard node sizes
3. **Tablet** (`max-width: 1024px`): Medium node sizes
4. **Mobile** (`max-width: 768px`): Smaller nodes, reduced arc
5. **Small Mobile** (`max-width: 480px`): Minimal sizes

## Accessibility Features

- **Reduced Motion**: Automatically disables animations when `prefers-reduced-motion` is set
- **Semantic HTML**: Uses `<section>` with proper ARIA labels
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Text content remains in DOM for screen readers

## Performance Optimization

The component uses several performance techniques:

1. **GPU Acceleration**: CSS transforms (`translate3d`, `rotate`) instead of layout properties
2. **Outside Angular Zone**: GSAP runs outside Angular's change detection for smooth 60fps
3. **Context Cleanup**: Proper cleanup on component destroy to prevent memory leaks
4. **RequestAnimationFrame**: GSAP uses RAF for optimal frame timing
5. **Will-Change**: Applied to animated elements via transforms

## Troubleshooting

### Animations Not Working
- Verify GSAP and plugins are installed: `npm list gsap`
- Check browser console for errors
- Ensure `ScrollTrigger` and `MotionPathPlugin` are registered

### Nodes Not Following Path
- Check that `#motionPath` ID matches in HTML and TS
- Verify SVG viewBox coordinates match your path data
- Ensure nodes have proper initial positioning

### Text Not Appearing
- Check that ViewChild references match template refs
- Verify CSS opacity transitions are not being overridden
- Check z-index stacking context

### Performance Issues
- Reduce `scrub` value in ScrollTrigger config
- Simplify SVG path complexity
- Reduce shadow blur radius in CSS

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SVG Support**: Required for arc rendering
- **GSAP Compatibility**: Works with all GSAP 3.x supported browsers

## Credits

Based on the Enspirit design reference showing Vision/Mission/Values scroll animation.

## License

Part of the UniqueHire Angular application.
