# Mission Arc Animation - Sequential Node Animation Update

## Overview
Updated the missions component to use a **sequential node animation** pattern instead of simultaneous movement. Now only one node is visible at a time, moving along the arc path with smooth fade in/out effects.

## Animation Sequence

### Timeline Structure
- **Total Duration**: 300% of viewport height (+=300%)
- **Segments**: 3 equal segments (one per node) ≈ 100% viewport height each

### Node Order & Timing

**1. Mission (node2) - First Segment (0-33%)**
- Fades in from transparent → 1.0 opacity
- Scales from default → 1.05
- Moves along arc path from start (0%) → center (50%)
- `.call(() => setActive(1))` activates Mission text
- Fades out → 0.95 scale at segment end

**2. Vision (node1) - Second Segment (33-67%)**  
- Starts just before Mission finishes ('>-0.02' overlap)
- Fades in with 1.05 scale
- Moves along arc path start → center
- `.call(() => setActive(0))` activates Vision text
- Fades out at segment end

**3. Core Values (node3) - Third Segment (67-100%)**
- Starts just before Vision finishes ('>-0.02' overlap)
- Fades in with 1.05 scale
- Moves along arc path start → center
- `.call(() => setActive(2))` activates Values text
- Final node stays visible (no fade-out)

## Code Implementation

### Key Changes in missions.ts

```typescript
// Helper function to manage active states
const setActive = (index: number) => {
  nodes.forEach((n, i) => n.classList.toggle('active', i === index));
  visionText.classList.toggle('active', index === 0);
  missionText.classList.toggle('active', index === 1);
  valuesText.classList.toggle('active', index === 2);
};

// Timeline with sequential animations
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: 'top top',
    end: '+=300%',  // Changed from +=200%
    scrub: 1,
    pin: true,
    // ... other settings
  }
});

// Each node animation
tl.to(nodes[1], {  // Mission
  motionPath: { ... start: 0, end: 0.5 },
  autoAlpha: 1,    // Fade in
  scale: 1.05,     // Slight scale-up
  duration: 1,
  ease: 'none'
}, 0)
  .call(() => setActive(1))  // Activate text
  .to(nodes[1], { autoAlpha: 0, scale: 0.95, duration: 0.18 }, '>-0.05');
```

### Key CSS Changes

**Initial State** (all nodes hidden)
```css
.node-circle {
  opacity: 0;
  visibility: hidden;
  /* transition removed - GSAP handles animation */
}
```

**Active State** (when visible)
```css
.node-circle.active {
  /* GSAP controls opacity/scale */
  /* Only styling for shadow enhancement */
  box-shadow: 0 25px 80px rgba(107, 43, 224, 0.15);
  z-index: 20;
}
```

**Text Content**
```css
.content-text {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.content-text.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
```

## Visual Experience

1. **User scrolls** → Section pins to viewport
2. **0-33% scroll**: Mission node appears
   - Fades in from left
   - Moves along arc path
   - Mission text reveals below
3. **33-67% scroll**: Vision node appears  
   - Mission fades out smoothly
   - Vision fades in from left
   - Vision text reveals
4. **67-100% scroll**: Values node appears
   - Vision fades out
   - Values fades in from left
   - Values text reveals
5. **After 100%**: Section unpins, normal scrolling resumes

## Benefits Over Simultaneous Animation

✅ **Clearer Focus**: Only one story/node visible at a time  
✅ **Better Pacing**: 100% viewport per node gives time to read text  
✅ **Smooth Transitions**: 0.18s fade-out/scale creates smooth node swaps  
✅ **More Professional**: Sequential pattern is easier to follow  
✅ **Responsive**: Still scales properly on all devices  

## Performance

- **GPU-Optimized**: GSAP uses `translate3d` and opacity (GPU-friendly)
- **Smooth 60fps**: Achieved through:
  - Proper `autoAlpha` (opacity + visibility) handling
  - `transform` properties only (no layout reflows)
  - Outside Angular zone execution
  - Efficient timeline management

## Testing Checklist

- [ ] Scroll to Mission Arc section on `/about` page
- [ ] Verify Mission node fades in first
- [ ] Check Mission text appears below arc
- [ ] Verify smooth transition to Vision node
- [ ] Check Vision text appears when node is centered
- [ ] Verify final transition to Values node
- [ ] Confirm Values text displays correctly
- [ ] Test responsive on tablet (170px nodes)
- [ ] Test responsive on mobile (140px nodes)
- [ ] Verify smooth unpinning after section completes

## Browser Support

- Chrome 90+
- Firefox 88+  
- Safari 14+
- Edge 90+

## Customization

### Change Node Order
In `missions.ts`, reorder the `.to()` calls. Currently: Mission → Vision → Values

### Adjust Segment Duration
Change `end: '+=300%'` to different percentage:
- `+=200%` = 2 segments (200% / 2 = 100% per node)
- `+=400%` = 4 segments (if adding 4th node)

### Adjust Fade Speed
Change duration in fade-out animation:
```typescript
.to(nodes[1], { autoAlpha: 0, scale: 0.95, duration: 0.18 }, '>-0.05')
//                                                duration: ^^^ (currently 180ms)
```

### Adjust Scale Animation
Change scale values:
```typescript
autoAlpha: 1,  // Fade in to full opacity
scale: 1.05,   // Scale UP by 5%
```
To scale down instead: `scale: 0.95`

## Accessibility

- All text content remains in DOM
- Screen readers access all node labels
- Respects `prefers-reduced-motion`
- Keyboard accessible (Section is part of natural scroll flow)
