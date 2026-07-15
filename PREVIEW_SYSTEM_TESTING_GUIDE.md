# High-Resolution Template Preview System - Testing Guide

## Overview
The new high-resolution template preview system uses `html2canvas` to capture actual rendered React components, ensuring pixel-perfect 1:1 visual copies of all templates.

## Architecture

### Components Involved
1. **HighResolutionPreview** - Main React component that manages preview generation
2. **TemplateRenderer** - Renders actual templates with theme + layout
3. **generateHighResPreviewImage** - html2canvas wrapper function

### Data Flow

```
HighResolutionPreview Component
  ↓
  TemplateRenderer (with sampleCV data)
    ↓
    [Hidden off-screen rendering at 1240×1754px]
    ↓
  html2canvas (2x scale rendering)
    ↓
  Canvas → PNG conversion
    ↓
  Display preview & offer download
```

## How It Works

### 1. Template Rendering
```typescript
<TemplateRenderer template={template} data={sampleCV} scale={1} />
```
- Renders the actual React component for the selected layout + theme
- Uses `sampleCV` (professional CV data) for content
- Positioned off-screen so it doesn't affect UI

### 2. Hidden Rendering Container
```typescript
<div 
  style={{
    position: 'fixed',
    left: '-9999px',     // Off-screen left
    top: '-9999px',      // Off-screen top
    width: '1240px',     // A4 width
    height: '1754px',    // A4 height
    backgroundColor: '#ffffff',
    zIndex: -1,
  }}
>
```
- Positioned far off-screen so user can't see it
- Sized exactly to A4 proportions (210mm × 297mm)
- White background for clean captures

### 3. Canvas Capture
```typescript
const canvas = await html2canvas(element, {
  scale: 2,                    // 2x rendering = sharp output
  useCORS: true,               // Handle cross-origin images
  logging: false,              // No console logs
  backgroundColor: '#ffffff',  // White background
  allowTaint: true,            // Allow external resources
  imageTimeout: 10000,         // 10s timeout for images
});
```
- html2canvas renders DOM to canvas at 2x scale
- Results in sharp, print-ready output
- Handles all CSS effects (gradients, shadows, etc.)

### 4. Image Export
```typescript
const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
const dataUrl = canvas.toDataURL(mimeType, 0.95);
```
- Converts canvas to PNG or JPEG
- 95% quality maintains visual fidelity while optimizing file size

## Testing Procedures

### Test 1: Basic Preview Generation
1. Navigate to `/preview-demo` page
2. Select any layout and theme
3. **Expected**: Preview should load with spinner, then display template
4. **Time**: Should complete within 2-3 seconds

### Test 2: All Layouts Support
1. In preview-demo, iterate through all 20 layouts:
   - Single Column ATS
   - Sidebar Left
   - Sidebar Right
   - Two Column Split
   - Timeline
   - Bento Grid
   - Dashboard
   - Portfolio Hybrid
   - Magazine
   - Luxury Minimal
   - Glassmorphism
   - Gradient Accent
   - Compact ATS
   - Creative Designer
   - Executive
   - Modern Card
   - Centered
   - Editorial
   - Startup Style
   - Premium Dark

2. **Expected**: All layouts render correctly in preview
3. **Verify**: Each layout maintains exact visual fidelity

### Test 3: Theme Variations
1. For each layout, cycle through all 10 themes:
   - Modern Blue
   - Luxury Purple
   - Startup Green
   - Dark Executive
   - Creative Orange
   - Rose Red
   - Cyan Tech
   - Minimal Neutral
   - Glass Gradient
   - Gold Luxury

2. **Expected**: Colors, fonts, and styling match the selected theme
3. **Verify**: No visual artifacts or rendering issues

### Test 4: Download Functionality
1. Click "Download Preview" button on any preview
2. **Expected**: PNG file downloads with filename like `template-name-preview.png`
3. **Verify**: File opens in image viewer and shows correct preview

### Test 5: Error Handling
1. Try refreshing page during preview generation
2. Click "Retry" button when preview fails
3. **Expected**: Error state shown, retry button functional
4. **Verify**: Error gracefully handled, user can try again

### Test 6: Image Quality
1. Download preview PNG
2. Open in image editor (Photoshop, GIMP, Paint, etc.)
3. **Expected**: Image dimensions should be appropriate
4. **Verify**: 
   - Text is sharp and readable
   - Colors match exactly
   - No pixelation or artifacts
   - Spacing and layout match HTML exactly

### Test 7: Performance
1. Generate multiple previews in quick succession
2. Monitor browser memory and CPU
3. **Expected**: No significant slowdown or memory leaks
4. **Verify**: Application remains responsive

### Test 8: Cross-Browser Testing
Test preview generation in:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Quality Checklist

### Visual Accuracy
- [ ] Typography matches theme fonts exactly
- [ ] Font sizes match original templates
- [ ] Font weights correct (bold, regular, etc.)
- [ ] Line heights maintained
- [ ] Colors match theme colors exactly
- [ ] Spacing and margins preserved
- [ ] Borders and dividers rendered correctly
- [ ] Gradients displayed properly
- [ ] Shadows (if any) visible
- [ ] Icons display correctly
- [ ] Images/avatars rendered

### Layout Integrity
- [ ] Content flows correctly
- [ ] Section order matches original
- [ ] Column widths correct
- [ ] Sidebar (if present) correct width
- [ ] Text wrapping appropriate
- [ ] No content overflow
- [ ] Alignment matches (left, center, right)
- [ ] Vertical spacing correct

### File Quality
- [ ] PNG downloads without errors
- [ ] File sizes reasonable (~500KB-2MB typical)
- [ ] Image dimensions correct
- [ ] No corruption on download
- [ ] Opens in standard image viewers
- [ ] Print-ready quality

## Troubleshooting

### Issue: Preview takes longer than expected
**Solution**: 800ms render timeout may need adjustment
- If templates have complex animations, increase timeout
- Check browser performance (heavy extensions?)

### Issue: Downloaded image shows cutoff content
**Solution**: Container size may be incorrect
- Verify hidden container dimensions: 1240×1754px
- Check z-index and positioning isn't affecting layout

### Issue: Colors appear different in preview
**Solution**: 
- Verify theme colors in data/themes.ts
- Check if CSS variables are being used (html2canvas may not capture them)
- Test in different browsers

### Issue: Text appears blurry
**Solution**: 
- Scale is set to 2x, which should be sharp
- Try adjusting scale value in generateHighResPreviewImage
- Check if system font rendering is affecting output

### Issue: html2canvas errors
**Solution**:
- Check browser console for specific error messages
- Verify CORS settings if external images are used
- Try reducing complexity (remove external images temporarily)

## Performance Optimization Tips

1. **Lazy Loading**: Only generate preview when visible (use Intersection Observer)
2. **Caching**: Cache generated previews to avoid regeneration
3. **Worker Thread**: Move html2canvas to Web Worker for non-blocking rendering
4. **Progressive Loading**: Show low-res preview first, high-res second

## Debugging Commands

### Browser Console
```javascript
// Check html2canvas version
console.log(await import('html2canvas'));

// Manually trigger preview generation
const preview = document.querySelector('[ref="templateRef"]');
if (preview) console.log('Template element found');
```

### Check File Sizes
```bash
# After downloading preview
ls -lh *.png
```

## Success Criteria

✅ All 20 layouts render in previews
✅ All 10 themes apply correctly
✅ Preview quality is pixel-perfect
✅ Download functionality works reliably
✅ No TypeScript or build errors
✅ Error states handled gracefully
✅ Performance acceptable on target devices

## Next Steps After Testing

1. **Validation Complete** → Deploy to production
2. **Issues Found** → Document in issues.md, schedule fixes
3. **Performance Concerns** → Implement optimization suggestions
4. **User Feedback** → Collect feedback from testers

## Reference Files

- Implementation: `lib/highResolutionPreviewGenerator.ts`
- Component: `components/HighResolutionPreview.tsx`
- Test Page: `app/preview-demo/page.tsx`
- Themes: `data/themes.ts`
- Templates: `lib/generateTemplates.ts`
