# Mission Arc Animation - ScrollTrigger Update

## Overview
Updated the missions component to use a pinned ScrollTrigger with proper scrubbed timeline control. This creates a more stable, locked-viewport animation experience.

## Changes Made

### missions.ts
**Key Update**: Replaced the previous scroll-based animation system with a pinned ScrollTrigger approach.

#### Before
- Used `onUpdate` callback on ScrollTrigger to manually update node positions
- Timeline duration per node: 1 second each
- Pin set to `false`

#### After
```javascript
// New ScrollTrigger configuration
scrollTrigger: {
  trigger: section,
  start: 'top top',
  end: '+=200%',        // 200% of viewport height
  scrub: 1,             // Smooth scrub value
  pin: true,            // PINS section to viewport while animating
  anticipatePin: 1,     // Reduces layout jumping
  pinSpacing: true,     // Automatically adds scroll spacing
  invalidateOnRefresh: true
}
```

#### Node Motion Path Updates
Each node now animates over different portions of the path:
- **Node 0 (Vision)**: Starts at 0%, ends at 50% of path
- **Node 1 (Mission)**: Starts at 25%, ends at 75% of path  
- **Node 2 (Values)**: Starts at 50%, ends at 100% of path

This ensures **all three nodes are always visible and moving simultaneously** as the user scrolls, with smooth overlap and progression.

#### Text Reveal Logic
Separate ScrollTrigger updates text visibility based on progress:
```javascript
ScrollTrigger.create({
  onUpdate: (self) => {
    const p = self.progress; // 0 -> 1
    const index = Math.floor(p * 3); // Divides scroll into 3 sections
    // Toggle active class on appropriate text element
  }
});
```

### missions.css
**Key Updates**: Adjusted layout for pinned ScrollTrigger behavior.

#### Removed
- `min-height: 300vh` - ScrollTrigger handles scroll spacing automatically
- Sticky positioning logic - Replaced with relative positioning

#### Updated
```css
.mission-arc-section {
  /* Removed min-height: 300vh */
  overflow: visible;  /* Allow overflow during pinning */
}

.arc-container {
  position: relative;  /* Not sticky, GSAP pin handles it */
  height: 100vh;       /* Full viewport height */
}

.scroll-spacer {
  height: 0;           /* ScrollTrigger creates spacing via pinSpacing */
}
```

## How It Works Now

1. **User scrolls** → ScrollTrigger activates at section top
2. **Section pins** to viewport (locked in place)
3. **Timeline runs** for 200% of viewport scroll distance
4. **All nodes move** simultaneously along the arc path:
   - Vision visible at scroll start → moves from left to center → exits right
   - Mission visible in middle → moves from left-center to right-center
   - Values visible at end → moves from center to far right
5. **Text swaps** based on which node is closest to center of screen
6. **Section unpins** when scroll completes

## Benefits

✅ **Smoother Performance**: Pin mechanism is more GPU-efficient  
✅ **Better Control**: Scrub value (1) provides precise scroll-to-animation mapping  
✅ **Visual Coherence**: All nodes visible and moving together creates better pacing  
✅ **Predictable Behavior**: ScrollTrigger automatic spacing prevents layout jumps  
✅ **Responsive**: `invalidateOnRefresh` ensures proper behavior on resize  

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

All modern browsers with GSAP 3.x support.

## Performance Notes

- GPU transforms (`translate3d`) automatically applied by MotionPathPlugin
- Outside Angular zone to prevent change detection overhead
- RequestAnimationFrame handled by GSAP internally
- Proper cleanup on component destroy prevents memory leaks

## Testing

To verify the update:

1. Navigate to `/about` page
2. Scroll down to Mission Arc section
3. Observe:
   - Page scrolls normally initially
   - Section "locks" when you reach the mission arc area
   - Three white nodes move continuously along the arc
   - Text updates as you scroll (Vision → Mission → Values)
   - Page resumes scrolling after section completes
   - Smooth 60fps animation throughout
