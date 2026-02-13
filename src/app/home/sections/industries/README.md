# Industries We Serve - Carousel Component

A modern, interactive Industries section that replicates the Bilvantis homepage carousel design with enhanced functionality and accessibility.

## Features

### Visual Design
- **Center Hero Panel**: Large centered image panel (60% width, 500px height) with 24px border radius
- **Vertical Side Strips**: Translucent vertical navigation strips with glassmorphism effect (desktop only)
- **Integrated Glass Overlay**: Bottom content bar integrated into hero (NOT a floating card)
- **Glassmorphism**: Backdrop blur effects, subtle shadows, and premium visual styling
- **Smooth Transitions**: 300ms cubic-bezier transitions throughout

### Interactions

#### Desktop
- **Hover Navigation**: Hovering over vertical strips changes the center hero (no click required)
- **Click to Preview**: Clicking center hero opens full-screen modal
- **Keyboard Support**:
  - `ArrowLeft` / `ArrowRight` - Navigate slides
  - `Tab` - Focus on strips
  - `Enter` / `Space` - Activate focused strip
  - `Esc` - Close modal

#### Mobile (< 768px)
- Vertical strips hidden
- Horizontal scrollable pill strip below hero
- Tap pill to update hero
- Tap hero to open modal

### Accessibility
- All interactive elements are proper `<button>` elements
- ARIA labels and roles throughout
- Focus management and keyboard navigation
- Screen reader friendly
- Respects `prefers-reduced-motion` setting

### Performance
- First image: `loading="eager"` for immediate display
- Other images: Lazy loaded from CDN
- Efficient DOM updates
- CSS transitions with hardware acceleration
- ResizeObserver for responsive behavior

## Structure

```
industries/
├── data/
│   └── industries.ts          # Industry data interface and array
├── industries.component.ts    # Component logic with hover/keyboard/modal
├── industries.html           # Template with 3-column layout and modal
├── industries.css            # Complete styling with glassmorphism
└── README.md                 # This file
```

## Data Structure

```typescript
export interface Industry {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: 1,
    title: 'Technology & Software',
    description: 'Product engineering, AI integration, and delivery velocity...',
    image: 'https://images.pexels.com/photos/...'
  },
  // ... more industries
];
```

## Usage

### Basic Integration

The component is standalone and can be used directly:

```typescript
import { Industry } from './home/sections/industries/industries.component';

@Component({
  imports: [Industry],
  // ...
})
```

```html
<app-industries></app-industries>
```

### Customizing Data

To use custom industry data, update the `data/industries.ts` file with your own industries:

```typescript
export const INDUSTRIES: Industry[] = [
  {
    id: 1,
    title: 'Your Industry',
    description: 'Your description here.',
    image: 'https://your-image-url.jpg'
  }
];
```

### Icon Library

The component uses Lucide icons. Add the CDN link to your `index.html`:

```html
<link href="https://cdn.jsdelivr.net/npm/lucide-static/font/lucide.css" rel="stylesheet">
```

Icons used:
- `icon-circle-plus` - Vertical strip decorative icon
- `icon-chevron-left` - Previous navigation
- `icon-chevron-right` - Next navigation  
- `icon-x` - Modal close button

## Key Design Details

### Colors (CSS Variables)
- `--industries-ink`: `#0b1220` - Primary text
- `--industries-accent`: `#6d28d9` - Purple accent
- `--industries-accent2`: `#ff7f50` - Coral accent
- `--industries-glass-bg`: `rgba(255,255,255,0.10)` - Glass background
- `--industries-glass-border`: `rgba(255,255,255,0.16)` - Glass border

### Typography
- Font: Poppins (300, 400, 600, 800)
- Uppercase headlines with large letter-spacing
- Smooth antialiasing

### Layout
- Desktop: CSS Grid - `auto 1fr auto` (left strips | hero | right strips)
- Mobile: Single column with horizontal scroll strip

## Important Differences from Bilvantis

✅ **Removed**: Small floating white card inside hero (as requested)  
✅ **Enhanced**: Full keyboard navigation  
✅ **Added**: Full-screen modal preview  
✅ **Improved**: Proper ARIA labels and accessibility  
✅ **Changed**: Hover interaction instead of click for navigation (desktop)

## Browser Support

- Modern browsers with ES2020+ support
- CSS Grid, Flexbox, and backdrop-filter support required
- ResizeObserver API for responsive behavior

## Customization

### Changing Transition Speed

Edit CSS variables in `industries.css`:

```css
:root {
  --industries-transition: 500ms; /* Default: 300ms */
  --industries-easing: cubic-bezier(0.25, 0.1, 0.25, 1); /* Custom easing */
}
```

### Adjusting Hero Height

```css
.hero-panel {
  height: 600px; /* Default: 500px */
}
```

### Modifying Colors

Update CSS variables or individual color values to match your brand.

## Notes

- Images are loaded from Pexels CDN with proper attribution
- Component handles window resize automatically
- Modal prevents body scroll when open
- No external UI libraries required
- Clean, production-ready code
