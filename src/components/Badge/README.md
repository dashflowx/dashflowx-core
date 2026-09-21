# Badge Component

A flexible and fully functional badge component that supports both React and Next.js environments. The component uses the Typography component for proper element rendering and path handling.

## ✅ **Features**

- ✅ **Variants work correctly** (default, secondary, outline, destructive)
- ✅ **Sizes work correctly** (sm, md, lg)
- ✅ **Typography component integration** for proper element rendering
- ✅ **Automatic path handling** (href for Next.js, to for React Router)
- ✅ **Interactive badges** with proper element types
- ✅ **Clean, maintainable architecture**

## 🚀 **Usage**

### Basic Badge
```tsx
import { Badge } from '@dashflowx/core';

export default function MyPage() {
  return (
    <Badge 
      variant="default"
      textContent="Success"
      size="md"
    />
  );
}
```

### With Different Variants
```tsx
<Badge variant="default" textContent="Primary" />
<Badge variant="secondary" textContent="Secondary" />
<Badge variant="outline" textContent="Outline" />
<Badge variant="destructive" textContent="Error" />
```

### With Different Sizes
```tsx
<Badge variant="default" size="sm" textContent="Small" />
<Badge variant="default" size="md" textContent="Medium" />
<Badge variant="default" size="lg" textContent="Large" />
```

### With Icons
```tsx
import { CheckIcon } from 'lucide-react';

<Badge 
  variant="default"
  textContent="Completed"
  icon={<CheckIcon className="w-4 h-4" />}
  size="lg"
/>
```

### Interactive Badges with Typography
```tsx
// Button badge
<Badge 
  variant="outline"
  textContent="Click Me"
  type="button"
  className="cursor-pointer hover:bg-gray-50"
/>

// Link badge
<Badge 
  variant="default"
  textContent="Go to Docs"
  type="a"
  path="/docs"
  className="hover:bg-blue-700"
/>
```

### Next.js Usage
```tsx
<Badge 
  library="next"
  variant="default"
  textContent="Next.js Badge"
  type="a"
  path="/about"
/>
```

## 🔧 **Props Reference**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'outline' \| 'destructive'` | `'outline'` | Badge appearance variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `textContent` | `string \| JSX.Element` | - | **Required** - Text or content to display |
| `icon` | `JSX.Element` | - | Optional icon to display before text |
| `type` | `'button' \| 'a'` | - | Element type for interactive badges (uses Typography component) |
| `path` | `string` | - | URL path for link badges |
| `library` | `'react' \| 'next'` | `'react'` | Library type for proper path handling |
| `className` | `string` | - | Additional CSS classes |
| `iconClassName` | `string` | - | CSS classes for the icon |
| `textClassName` | `string` | - | CSS classes for the text |

## 🎨 **Variants**

### Default
```tsx
<Badge variant="default" textContent="Primary" />
```
- Blue background with white text
- Hover effects included

### Secondary
```tsx
<Badge variant="secondary" textContent="Secondary" />
```
- Gray background with dark text
- Subtle appearance

### Outline
```tsx
<Badge variant="outline" textContent="Outline" />
```
- White background with border
- Clean, minimal look

### Destructive
```tsx
<Badge variant="destructive" textContent="Error" />
```
- Red background with white text
- Use for errors or warnings

## 📏 **Sizes**

### Small
```tsx
<Badge size="sm" textContent="Small" />
```

### Medium (Default)
```tsx
<Badge size="md" textContent="Medium" />
```

### Large
```tsx
<Badge size="lg" textContent="Large" />
```

## 🔗 **Path Handling with Typography**

The Badge component automatically handles paths correctly using the Typography component:

### Next.js (library="next")
```tsx
<Badge 
  library="next"
  type="a"
  path="/about"  // ✅ Renders as <a href="/about">
  textContent="About"
/>
```

### React Router (library="react")
```tsx
<Badge 
  library="react"
  type="a"
  path="/about"  // ✅ Renders as <Link to="/about">
  textContent="About"
/>
```

## 🚫 **Common Mistakes to Avoid**

1. **❌ Forgetting required props**
   ```tsx
   // Missing textContent will cause errors
   <Badge variant="default" />
   ```

2. **❌ Using invalid variants or sizes**
   ```tsx
   // These will not work
   <Badge variant="invalid" size="xl" />
   ```

3. **❌ Not providing path for link badges**
   ```tsx
   // Missing path for link type
   <Badge type="a" textContent="Link" />
   ```

4. **❌ Mixing library types**
   ```tsx
   // Wrong - mixing library types
   <Badge library="next" type="a" to="/path" />
   
   // Correct - use path prop
   <Badge library="next" type="a" path="/path" />
   ```

## ✅ **Best Practices**

1. **Always provide `textContent`** - it's required
2. **Use semantic variants** for accessibility
3. **The Typography component ensures proper element rendering**
4. **Test interactive badges** with proper event handling
5. **Use appropriate sizes** for your design context
6. **Provide meaningful paths** for link badges

## 🔍 **Troubleshooting**

### Badge not rendering?
- Ensure `textContent` is provided
- Check that variant and size are valid values
- Verify className is a string

### Variants not working?
- The component now uses a centralized variant system
- All variants (default, secondary, outline, destructive) should work
- Check that BadgeComp is properly imported

### Sizes not working?
- The component now uses a centralized size system
- All sizes (sm, md, lg) should work
- Verify that BadgeComp receives size prop correctly

### Interactive features not working?
- Ensure `type` and `path` props are set correctly
- Check that the Typography component is rendering properly
- Verify routing is configured in your app

### Typography component issues?
- The component automatically imports and uses Typography
- No need to manually import TypographyComp
- Path handling is automatic based on library prop

## 🏗️ **Architecture**

The Badge component uses a clean, simplified architecture:

```
Badge (index.tsx)
├── BadgeComp (BadgeComp.tsx) - Handles variants and sizes
├── Typography component - Handles interactive elements
└── Direct rendering for non-interactive badges
```

This approach:
- Uses Typography component for proper element rendering
- Centralizes styling logic in BadgeComp
- Provides consistent behavior across all variants
- Makes maintenance and debugging easier
- Supports both React and Next.js environments seamlessly
