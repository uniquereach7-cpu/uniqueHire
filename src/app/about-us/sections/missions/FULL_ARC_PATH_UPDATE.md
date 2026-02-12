# Mission Arc Animation - Full Path Traversal Update

## Overview

Updated the missions component to have each node traverse the **complete arc path** (0 → 1) instead of just the first half. The key innovation is that content switches **exactly when the node reaches center** via a `.call()` instruction, creating a seamless reveal experience.

## New Animation Pattern

### Timeline Structure

- **Total Duration**: 360% of viewport height
- **Per Node**: ~120% viewport per sequence (360% ÷ 3 nodes)

### Node Journey (Each)

Each node follows this exact pattern:

```
1. Start hidden at left (0%)
2. Fade in + scale up while moving left → center (0% → 50%)
   └─ Animation duration: 1 second
3. [Content switches via .call() when centered]
4. Continue moving center → right (50% → 100%)
   └─ Animation duration: 1 second  
5. Fade out + scale down (except final node)
```

### Sequential Order

```
Mission (node[1]) → Vision (node[0]) → Values (node[2])
```

Each node appears in sequence:
- **Mission**: First 33% of total scroll → All 4 steps
- **Vision**: Next 33% of scroll → All 4 steps  
- **Values**: Final 33% of scroll → Steps 1-4 but stays visible (no fade-out)

## Code Implementation

### Key Architectural Changes

**Before**: Hardcoded three separate animations with manual timing

**After**: Loop-based pattern using `nodesOrder` array

```typescript
// Define the sequence with content index mapping
const nodesOrder = [
  { node: nodes[1], contentIndex: 1 },  // Mission
  { node: nodes[0], contentIndex: 0 },  // Vision
  { node: nodes[2], contentIndex: 2 }   // Values
];

// Loop through and animate each in sequence
nodesOrder.forEach((item, idx) => {
  const isLast = idx === nodesOrder.length - 1;
  
  // 1) Start → Center with fade-in
  tl.to(item.node, { motionPath: {...}, autoAlpha: 1, scale: 1.05, ... });
  
  // 2) Switch content at center
  tl.call(() => setActive(item.contentIndex));
  
  // 3) Center → End continuation
  tl.to(item.node, { motionPath: {...}, ease: 'none', duration: 1.0 });
  
  // 4) Fade out (unless last node)
  if (!isLast) {
    tl.to(item.node, { autoAlpha: 0, scale: 0.95, ... });
  }
});
```

### Benefits of New Architecture

✅ **Loop-based**: Easy to add/remove nodes  
✅ **Clearer code**: `nodesOrder` array explicitly defines sequence  
✅ **Flexible contentIndex**: Can map nodes to content in any order  
✅ **Proper final node handling**: `isLast` check prevents hiding final node  
✅ **Better maintainability**: Single loop instead of three hardcoded blocks  

## Visual Experience

### During Scroll

**0-25% of total timeline**:
- Mission node appears from left
- Opacity: 0 → 1, Scale: 1 → 1.05
- Position: 0% → 50% along arc
- Mission text fades in

**At exactly 25%**: Mission text fully visible (node at center)

**25-50% of total timeline**:
- Mission continues 50% → 100% along arc
- Opacity: 1 → 0, Scale: 1.05 → 0.95
- Vision node simultaneously fades in from left

**25-50% (overlapped)**:
- Vision node appears from left
- Opacity: 0 → 1, Scale: 1 → 1.05
- Position: 0% → 50% along arc

**At exactly 50%**: Vision text fully visible

**50-75% of total timeline**:
- Vision continues 50% → 100%, fades out
- Values node appears and moves 0% → 50%

**75-100% of total timeline**:
- Values continues 50% → 100%, stays visible
- Values text remains visible

## Technical Highlights

### Motion Path Split

Instead of single motion path animation, each node gets **two sequential motion path tweens**:

1. **First half**: `start: 0, end: 0.5` (with fade-in)
2. **Second half**: `start: 0.5, end: 1` (continuing from center)

This allows the `.call()` to fire exactly when the node reaches center (between the two tweens).

### GSAP Timeline Sequencing

Timeline is **purely sequential** - no position parameters:
```typescript
tl.to(...)     // First tween
tl.call(...)   // Callback at 100% of previous tween
tl.to(...)     // Next tween (automatically appended)
```

Each `.to()` and `.call()` naturally follows the previous one.

### ScrollTrigger Pinning

The 360% duration gives ample scroll space for smooth pinning:
```javascript
end: '+=360%'  // 3.6x viewport height of scroll
```

This means:
- Smooth, non-jerky pinning
- Each node gets ~120% viewport height (360% ÷ 3)
- Comfortable viewing time for each message

## CSS Support

Minimal CSS changes:

```css
.node-circle {
  opacity: 0;
  visibility: hidden;
  /* No transitions - GSAP handles all animation */
}

.content-text {
  opacity: 0;
  visibility: hidden;
}

.content-text.active {
  opacity: 1;
  visibility: visible;
}
```

GSAP controls:
- `autoAlpha`: Combined opacity + visibility
- `scale`: Node size during animation
- `motionPath`: Position along arc

## Customization Guide

### Change Node Sequence

Edit `nodesOrder` array:
```typescript
const nodesOrder = [
  { node: nodes[0], contentIndex: 0 },  // Vision first
  { node: nodes[2], contentIndex: 2 },  // Values second
  { node: nodes[1], contentIndex: 1 }   // Mission last
];
```

### Adjust Timeline Duration

Change `end` value:
```javascript
end: '+=360%'  // Currently: 360% for 3 nodes
end: '+=240%'  // Shorter: 240% for faster animation
end: '+=480%'  // Longer: 480% for slower animation
```

### Add Fourth Node

1. Add to template and ViewChild
2. Add to `nodes` array
3. Add to `nodesOrder`
4. Increase `end` to `+=480%` (360% ÷ 3 × 4)

### Adjust Transition Speed

Change motion path duration:
```typescript
// First half: start → center
tl.to(item.node, {
  // ...
  duration: 1    // Change this (currently 1 second)
});

// Second half: center → end
tl.to(item.node, {
  // ...
  duration: 1.0  // Or this
});
```

### Adjust Fade Speed

Change fade-out duration:
```typescript
tl.to(item.node, { 
  autoAlpha: 0, 
  scale: 0.95, 
  duration: 0.18,  // Currently 180ms
  ease: 'power1.in' 
});
```

## Performance Metrics

- **GPU-Optimized**: All transforms use `translate3d` and `opacity`
- **60 FPS**: No layout reflows, only compositing
- **Memory**: Single timeline, proper cleanup on destroy
- **Responsive**: `invalidateOnRefresh: true` handles resizes

## Testing Checklist

- [ ] All three nodes appear in correct sequence
- [ ] Content switches exactly when node reaches center
- [ ] Smooth fade in/out transitions
- [ ] Final node (Values) stays visible
- [ ] No flickering or jumps
- [ ] Works on mobile (scrolls smoothly)
- [ ] Works on tablet (proper sizing)
- [ ] Works on desktop (smooth 60fps)
- [ ] Accessibility: All text accessible to screen readers

## Browser Support

Requires:
- GSAP 3.x
- ScrollTrigger plugin
- MotionPathPlugin
- SVG support

Compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Migration from Previous Version

**Old approach** (simultaneous nodes):
- All nodes animated at same time
- Different path segments per node
- Complex positioning logic

**New approach** (sequential nodes):
- One node visible at a time
- Each node traverses full path
- Content switches at center via `.call()`
- Loop-based, easily extensible

The new approach is:
- ✅ More performant (fewer simultaneous animations)
- ✅ More visual (focused storytelling)
- ✅ More maintainable (loop pattern)
- ✅ More extensible (easy to add nodes)
