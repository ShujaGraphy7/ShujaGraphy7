# Terminal Fonts Integration

This project now includes 5 popular terminal fonts that have been downloaded and integrated locally:

## Available Fonts

### 1. **JetBrains Mono** (Default)
- **File**: `src/assets/fonts/JetBrainsMono-Regular.ttf`
- **CSS Class**: `.font-jetbrains`
- **CSS Variable**: `var(--font-jetbrains)`
- **Usage**: Applied by default to the entire application

### 2. **Fira Code**
- **File**: `src/assets/fonts/FiraCode-Regular.ttf`
- **CSS Class**: `.font-fira`
- **CSS Variable**: `var(--font-fira)`
- **Usage**: Applied to code elements by default

### 3. **Source Code Pro**
- **File**: `src/assets/fonts/SourceCodePro-Regular.ttf`
- **CSS Class**: `.font-source`
- **CSS Variable**: `var(--font-source)`

### 4. **Cascadia Code**
- **File**: `src/assets/fonts/CascadiaCode-Regular.ttf`
- **CSS Class**: `.font-cascadia`
- **CSS Variable**: `var(--font-cascadia)`

### 5. **Hack**
- **File**: `src/assets/fonts/Hack-Regular.ttf`
- **CSS Class**: `.font-hack`
- **CSS Variable**: `var(--font-hack)`

## How to Use

### CSS Classes
```css
.font-jetbrains { font-family: var(--font-jetbrains); }
.font-fira { font-family: var(--font-fira); }
.font-source { font-family: var(--font-source); }
.font-cascadia { font-family: var(--font-cascadia); }
.font-hack { font-family: var(--font-hack); }
```

### CSS Variables
```css
:root {
  --font-jetbrains: 'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Cascadia Code', 'Hack', monospace;
  --font-fira: 'Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Cascadia Code', 'Hack', monospace;
  --font-source: 'Source Code Pro', 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Hack', monospace;
  --font-cascadia: 'Cascadia Code', 'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Hack', monospace;
  --font-hack: 'Hack', 'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Cascadia Code', monospace;
}
```

### In React Components
```jsx
// Using CSS classes
<div className="font-jetbrains">This text uses JetBrains Mono</div>
<div className="font-fira">This text uses Fira Code</div>

// Using inline styles
<div style={{ fontFamily: 'var(--font-source)' }}>This text uses Source Code Pro</div>
```

## Font Features

- **Monospace**: All fonts are monospace, perfect for code and terminal-like interfaces
- **Fallbacks**: Each font has multiple fallbacks for better compatibility
- **Performance**: Fonts are loaded locally, no external requests needed
- **Font Display**: Uses `font-display: swap` for better loading performance

## Font Showcase

The project includes a dedicated section showcasing all 5 fonts with:
- Uppercase and lowercase letters
- Numbers
- Code examples
- Syntax highlighting

## File Structure

```
src/
├── assets/
│   ├── fonts/
│   │   ├── JetBrainsMono-Regular.ttf
│   │   ├── FiraCode-Regular.ttf
│   │   ├── SourceCodePro-Regular.ttf
│   │   ├── CascadiaCode-Regular.ttf
│   │   └── Hack-Regular.ttf
│   └── fonts.css
```

## Integration

The fonts are automatically loaded through:
1. `src/assets/fonts.css` - Font definitions and CSS variables
2. `src/main.jsx` - Imports the fonts CSS
3. `src/index.css` - Uses the fonts as defaults

## Benefits

- **No External Dependencies**: All fonts are local
- **Fast Loading**: No network requests for fonts
- **Consistent Experience**: Same fonts across all devices
- **Professional Look**: High-quality terminal fonts for code interfaces
- **Easy Customization**: Simple CSS classes and variables to switch fonts
