# Hextractor - Figma Color Extraction Plugin

<img width="1104" height="685" alt="Screenshot 2025-11-08 at 11 27 06 PM" src="https://github.com/user-attachments/assets/ef1ce1a0-e21b-4654-9658-1dcb8c1ce300" />

> **Transform any image into a professional color palette with delightful visual feedback and accessibility insights.**

Hextractor is a Figma plugin that uses k-means clustering and particle animations to extract colors from images, generate perceptually uniform color scales, and save them as reusable Figma styles.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
  - [For Users](#for-users)
  - [For Developers](#for-developers)
- [Usage](#usage)
- [How It Works](#how-it-works)
  - [Color Extraction Algorithm](#color-extraction-algorithm)
  - [Particle Clustering Visualization](#particle-clustering-visualization)
  - [OKLCH Color Scale Generation](#oklch-color-scale-generation)
  - [WCAG Accessibility Checking](#wcag-accessibility-checking)
- [Technical Details](#technical-details)
- [Project Structure](#project-structure)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Smart Color Extraction
- **K-means clustering** algorithm to identify the most representative colors from any image
- **Mesmerizing particle animation** - Watch hundreds of pixels fly to their cluster corners
- Extract **2-20 colors** with adjustable precision
- Supports PNG, JPG, and WEBP formats

### OKLCH Color Scales
- **Auto-generate perceptually uniform scales** (50-950) for every extracted color
- Click "View Scale" on any color to see 11 professionally-crafted variants
- Uses **OKLCH color space** for consistent brightness across all hues
- **One-click copy** - Click any swatch to copy its hex code instantly
- Perfect for building design systems

### WCAG Accessibility
- **Automatic text pairing suggestions** - see if white or black text works best
- Based on **WCAG AA contrast requirements** (4.5:1 ratio)
- Color-coded badges showing contrast ratios
- Build accessible designs from the start

### Delightful Interactions
- **Particle clustering animation** - Pixels visually fly to their assigned color groups
- **Color corner pulses** - Each cluster corner pulses as particles arrive
- **Sparkle effects** when extraction completes
- **Large color preview tooltip** on hover (120px)
- **Smooth transitions** and micro-interactions throughout

### Smart Color Management
- **Automatic color naming** based on hue analysis (Red, Blue, Green, etc.)
- **Fully editable names** for each color
- **Custom naming pattern** field (e.g., "Brand/Primary") to organize styles into folders
- **Select/deselect** individual colors before saving
- **Updates existing styles** instead of creating duplicates

### Intuitive Interface
- **Split panel design** - controls on left, visualization on right
- **No scrolling** needed for controls
- **Large, easy-to-read** color swatches with checkboxes
- **Click anywhere** on a color row to toggle selection

---

## Demo

### Visual Features in Action

1. **Upload Image** → Drag & drop or click to browse
2. **Particle Animation** → Watch pixels cluster to corner boxes
3. **Color Extraction** → See your palette with WCAG recommendations
4. **Scale Generation** → Explore 11 variants of each color
5. **Save to Figma** → One-click export to local styles

---

## Installation

### For Users

#### Option 1: Import to Figma Desktop App (Recommended)

1. Download or clone this repository
2. Open **Figma Desktop App** (browser version doesn't support plugins)
3. Go to **Plugins → Development → Import plugin from manifest...**
4. Navigate to the `hextractor` folder and select `manifest.json`
5. The plugin will appear in **Plugins → Development → Hextractor**

#### Option 2: Manual Setup

1. Open **Figma Desktop App**
2. Go to **Plugins → Development → New Plugin...**
3. Choose **Figma Plugin** and click **Next**
4. Name it "Hextractor"
5. Replace the generated files with:
   - `manifest.json`
   - `code.js`
   - `ui.html`

### For Developers

```bash
# Clone the repository
git clone https://github.com/yourusername/hextractor.git
cd hextractor

# Open in your code editor
code .

# Follow "Option 1" above to import into Figma for testing
```

**Requirements:**
- Figma Desktop App (Mac, Windows, or Linux)
- No build process required - pure HTML/CSS/JavaScript

---

## Usage

### Quick Start

1. **Launch the plugin**
   `Plugins → Development → Hextractor`

2. **Upload an image**
   - Drag and drop into the upload area, OR
   - Click the upload area to browse
   - Supports PNG, JPG, WEBP

3. **Configure extraction** (optional)
   - **Colors to extract**: 2-20 (default: 8)
   - **Naming pattern**: e.g., "Brand/Primary" creates organized folders

4. **Extract colors**
   Click **Extract** and watch the particle animation!

5. **Review results**
   - See WCAG text recommendations (white/black)
   - Click **View Scale (50-950)** to explore color variants
   - Edit color names as needed

6. **Select colors**
   - Click any color row to toggle selection
   - Use **Select All / Deselect All** for bulk actions

7. **Save to Figma**
   Click **Save as Figma Styles**

8. **Use your styles**
   Find them in **Local styles** panel, organized by your naming pattern

### Advanced Features

#### Viewing Color Scales
- Click **View Scale (50-950)** on any color
- See 11 perceptually uniform variants
- The extracted color is marked with a blue indicator
- Click any swatch to:
  - **Update the main color** to that variant
  - **Copy hex to clipboard**
  - See updated WCAG recommendations

#### Custom Naming Patterns
Use `/` to create folder hierarchies:
- `Brand/Primary` → Creates "Brand" folder with "Primary" subfolder
- `UI/Buttons` → Organizes under "UI" folder

#### Understanding WCAG Badges
- **White badge** = Use white text (better contrast)
- **Black badge** = Use black text (better contrast)
- **Ratio number** = Contrast ratio (e.g., 4.5:1)
- **AA** = Meets WCAG AA standard (4.5:1+)
- **AAA** = Meets WCAG AAA standard (7:1+)

---

## How It Works

### Color Extraction Algorithm

**K-means clustering** with weighted Euclidean distance:

1. **Image preprocessing**
   - Scale image to max 200px for performance
   - Extract all pixels (RGBA)
   - Filter out transparent pixels (alpha < 128)

2. **Color clustering**
   - Initialize centroids from most common colors
   - Iterate 10 times:
     - Assign each color to nearest centroid
     - Recalculate centroids as weighted average
   - Use perceptual weighting: `R:G:B = 2:4:3`

3. **Result**
   - N most representative colors
   - Sorted by visual prominence

### Particle Clustering Visualization

A stunning visual representation of the clustering process:

1. **Sample pixels** from the image (every 3rd pixel)
2. **Assign each particle** to its nearest color cluster
3. **Calculate corner positions** based on color count:
   - 2-4 colors: Four corners
   - 5-6 colors: Top and bottom rows
   - 7+ colors: Grid layout
4. **Animate particles** flying from original position to cluster corner
   - 3-second animation with staggered delays
   - Particles shrink and fade as they arrive
5. **Pulse corners** as particles converge
6. **Sparkle burst** when complete

**Performance optimizations:**
- Images scaled to max 150px for particle generation
- Every 3rd pixel sampled (60fps smooth animation)
- Staggered animation (0.5ms delays) for wave effect

### OKLCH Color Scale Generation

**OKLCH** = Lightness, Chroma, Hue (perceptually uniform)

**Why OKLCH?**
- Traditional HSL: Yellow at 50% lightness looks brighter than blue at 50%
- OKLCH: All colors at 50% lightness appear equally bright to human eye
- Result: Professional, consistent color scales

**Scale generation process:**

1. Convert base color from **RGB → OKLCH**
2. Generate 11 variants (50, 100, 200, ..., 950):
   - **Lighter variants (50-400)**: Increase lightness, reduce chroma
   - **Base (500)**: Original color
   - **Darker variants (600-950)**: Decrease lightness, maintain chroma
3. Convert back to **OKLCH → RGB** with gamut clamping

**Scale weights:**
```
50  → 97% lightness, 15% chroma (soft pastel)
100 → 95% lightness, 25% chroma
200 → 90% lightness, 40% chroma
300 → 82% lightness, 60% chroma
400 → 72% lightness, 80% chroma
500 → Base color (100% chroma)
600 → 85% base lightness, 96% chroma
700 → 70% base lightness, 92% chroma
800 → 55% base lightness, 88% chroma
900 → 42% base lightness, 84% chroma
950 → 32% base lightness, 80% chroma (rich dark)
```

### WCAG Accessibility Checking

**Automatic text color recommendations:**

1. Calculate **relative luminance** of the color
   ```
   L = 0.2126 * R + 0.7152 * G + 0.0722 * B
   ```

2. Calculate **contrast ratio** with white (255, 255, 255)
   ```
   ratio = (brightest + 0.05) / (darkest + 0.05)
   ```

3. Calculate **contrast ratio** with black (0, 0, 0)

4. **Recommend** whichever has higher contrast

**WCAG Standards:**
- **AA (normal text)**: 4.5:1 minimum
- **AAA (normal text)**: 7:1 minimum
- All recommendations meet or exceed AA

---

## Technical Details

### Algorithm Specifications
- **Clustering**: K-means with 10 iterations
- **Distance metric**: Weighted Euclidean (R:G:B = 2:4:3)
- **Convergence**: Fixed iterations (no early stopping)
- **Initial centroids**: Most common colors in image

### Performance Optimizations
- **Color extraction**: Max 200px image scaling
- **Particle animation**: Max 150px scaling
- **Sampling rate**: Every 3rd pixel
- **Animation**: 3s duration, 0.5ms stagger
- **Target framerate**: 60 FPS

### Color Space Conversions
- **RGB ↔ OKLCH**: Custom implementation
- **RGB ↔ HSL**: Standard formulas
- **Gamut clamping**: Linear RGB clamped to [0, 1]
- **sRGB gamma**: Standard 2.4 gamma correction

### Browser Compatibility
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Figma Desktop App** required (not browser plugin)
- **Canvas API** for image processing
- **CSS animations** for particle effects
- **No external dependencies**

---

## Project Structure

```
hextractor/
├── manifest.json      # Figma plugin configuration
│   ├── name           # Plugin name
│   ├── id             # Unique plugin ID
│   ├── api            # Figma API version (1.0.0)
│   ├── main           # Backend entry point (code.js)
│   └── ui             # Frontend entry point (ui.html)
│
├── code.js            # Backend logic (Figma API)
│   ├── figma.showUI() # Display plugin UI
│   ├── onmessage      # Handle messages from UI
│   ├── save-colors    # Create/update Figma paint styles
│   └── hexToRgb()     # Color conversion helper
│
├── ui.html            # Frontend interface (single-file SPA)
│   ├── <style>        # Embedded CSS (~600 lines)
│   │   ├── Layout     # Split panel, responsive design
│   │   ├── Animations # Particles, pulses, sparkles
│   │   ├── Components # Swatches, scales, tooltips
│   │   └── Themes     # Figma-style design system
│   │
│   ├── <body>         # HTML structure
│   │   ├── Header     # Plugin title
│   │   ├── Left Panel # Controls (upload, settings)
│   │   ├── Right Panel# Visualization & color list
│   │   └── Tooltip    # Preview tooltip (120px)
│   │
│   └── <script>       # Application logic (~850 lines)
│       ├── Image handling          # Upload, preview, drag-drop
│       ├── Color extraction        # K-means clustering
│       ├── Particle animation      # Canvas rendering
│       ├── OKLCH conversion        # Color scale generation
│       ├── WCAG calculation        # Accessibility checking
│       ├── UI interactions         # Selection, editing, saving
│       └── Figma communication     # PostMessage API
│
└── README.md          # This documentation
```

---

## Development

### Local Development Setup

1. **Clone and open project**
   ```bash
   git clone https://github.com/yourusername/hextractor.git
   cd hextractor
   code .
   ```

2. **Import to Figma**
   - Open Figma Desktop App
   - `Plugins → Development → Import plugin from manifest...`
   - Select `manifest.json`

3. **Make changes**
   - Edit `code.js` (backend) or `ui.html` (frontend)
   - Save files

4. **Reload plugin**
   - In Figma: `Plugins → Development → Hextractor`
   - Or close and reopen the plugin

5. **Debug**
   - Right-click plugin UI → **Inspect Element**
   - Use Chrome DevTools console

### Code Organization

**Backend (code.js):**
- Minimal Figma API wrapper
- Receives messages from UI
- Creates/updates paint styles
- ~70 lines of code

**Frontend (ui.html):**
- Single-file application (HTML + CSS + JS)
- No build process or dependencies
- ~1500 lines total
- Vanilla JavaScript (ES6+)

### Key Functions to Understand

```javascript
// Color extraction
extractColorsQuick(img, numColors)      // K-means clustering

// Particle animation
animateParticlesToCorners(img, colors, container)

// Color conversion
rgbToOKLCH(r, g, b)                     // RGB → OKLCH
oklchToRGB(l, c, h)                     // OKLCH → RGB

// Scale generation
generateOKLCHScale(hex)                 // 50-950 scale

// Accessibility
getWCAGTextColor(hex)                   // White/black recommendation
getContrastRatio(rgb1, rgb2)            // WCAG contrast ratio

// Color naming
getColorName(color)                     // Red, Blue, Gray, etc.
```

### Testing Checklist

- [ ] Upload various image formats (PNG, JPG, WEBP)
- [ ] Extract different color counts (2, 8, 20)
- [ ] Test particle animation performance
- [ ] Verify OKLCH scales are perceptually uniform
- [ ] Check WCAG contrast calculations
- [ ] Test color selection/deselection
- [ ] Verify naming patterns create proper folders
- [ ] Confirm styles are created in Figma
- [ ] Test style updates (not duplicates)
- [ ] Check tooltip follows cursor correctly

---

## Troubleshooting

### Plugin doesn't appear
- **Issue**: Can't find Hextractor in plugins menu
- **Solution**: Make sure you're using **Figma Desktop App**, not browser version
- **Check**: `Plugins → Development → Hextractor`

### Image won't upload
- **Issue**: Upload fails or shows error
- **Solution**: Ensure image is PNG, JPG, or WEBP format
- **Check**: File size should be reasonable (< 10MB)

### Particles move too fast
- **Issue**: Animation completes instantly
- **Solution**: This is normal for small color counts (2-4 colors)
- **Note**: Animation is optimized for smoothness over duration

### Colors look different in Figma
- **Issue**: Extracted colors don't match exactly
- **Solution**: This is expected - Figma uses RGB, slight variations occur
- **Note**: OKLCH → RGB conversion includes gamut clamping

### Animation is laggy
- **Issue**: Particle animation stutters
- **Solution**: Large images are automatically downscaled
- **Note**: Every 3rd pixel sampled for 60 FPS performance
- **Tip**: Close other applications for better performance

### Styles not saving
- **Issue**: "Save as Figma Styles" doesn't work
- **Solution**: Ensure at least one color is selected
- **Check**: Checkboxes next to colors should be checked

### Duplicate styles created
- **Issue**: Multiple styles with same name
- **Solution**: Plugin should update existing styles automatically
- **Report**: If this persists, it's a bug - please report

### Scale colors look wrong
- **Issue**: OKLCH scale variants seem incorrect
- **Solution**: OKLCH aims for perceptual uniformity, not mathematical
- **Note**: Colors may look different than HSL-based scales
- **Expected**: This is intentional for consistent brightness

---

## Roadmap

### Planned Features

#### Export & Integration
- [ ] **JSON Token Export** - Download palette + scales as JSON
- [ ] **CSS Variables** - Export as `--color-primary-500: #...`
- [ ] **SCSS Variables** - Export as `$color-primary-500: #...`
- [ ] **Tailwind Config** - Export as `tailwind.config.js`
- [ ] **Style Dictionary** - Export as design tokens

#### Color Intelligence
- [ ] **Semantic Naming** - Tag colors as "primary", "accent", "success"
- [ ] **Color Harmony** - Generate complementary, analogous, triadic
- [ ] **Smart Grouping** - Auto-detect warm/cool, light/dark
- [ ] **Duplicate Detection** - Warn about similar colors

#### Accessibility Enhancements
- [ ] **Contrast Matrix** - All color pair combinations with WCAG scores
- [ ] **AAA Level Support** - Show AAA compliance (7:1 ratio)
- [ ] **Large Text Mode** - Different thresholds for large text (3:1)
- [ ] **Color Blindness Sim** - Preview palette with different types

#### Advanced Clustering
- [ ] **Custom Clustering** - Adjust k-means iterations, distance metric
- [ ] **Edge Detection** - Prioritize colors from focal areas
- [ ] **Color Locking** - Pin specific colors, cluster around them
- [ ] **Historical Palettes** - Save and reload previous extractions

#### UI/UX Improvements
- [ ] **Keyboard Shortcuts** - Space to extract, Enter to save, etc.
- [ ] **Drag to Reorder** - Rearrange colors before saving
- [ ] **Batch Processing** - Extract from multiple images
- [ ] **Color Picker** - Manually add custom colors

### Community Requests

Want to see a feature? **[Open an issue](https://github.com/yourusername/hextractor/issues/new)** or contribute!

---

## Contributing

Contributions are welcome! Here's how to get started:

### Reporting Bugs

1. Check [existing issues](https://github.com/yourusername/hextractor/issues)
2. If not found, [create a new issue](https://github.com/yourusername/hextractor/issues/new)
3. Include:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Figma version and OS

### Suggesting Features

1. [Open a new issue](https://github.com/yourusername/hextractor/issues/new)
2. Prefix with `[Feature Request]`
3. Describe:
   - What problem it solves
   - Proposed solution
   - Alternative approaches
   - Examples from other tools

### Submitting Pull Requests

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Make changes**:
   - Follow existing code style
   - Test thoroughly in Figma
   - Update README if needed
4. **Commit**: `git commit -m "Add: your feature description"`
5. **Push**: `git push origin feature/your-feature-name`
6. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots/GIFs of new behavior
   - Link to related issue (if any)

### Code Style Guidelines

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS strings
- **Naming**: camelCase for variables/functions
- **Comments**: Explain "why", not "what"
- **Functions**: Keep small and focused

---

## License

**MIT License**

Copyright (c) 2025 Hextractor Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.**

---

## Acknowledgments

- **K-means clustering** algorithm for color quantization
- **OKLCH color space** research by Björn Ottosson
- **WCAG 2.1** accessibility guidelines
- **Figma Plugin API** for making this possible
- All contributors and users who provide feedback

---

## Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/hextractor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/hextractor/discussions)
- **Documentation**: This README

---

**Made with ❤️ for designers who care about color**
