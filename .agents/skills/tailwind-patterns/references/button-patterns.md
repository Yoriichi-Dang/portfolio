# Button Patterns

Complete button styling guide for Tailwind CSS projects.

---

## Button Variants

### Primary Button

```tsx
<button className="hover:bg-primary/90 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors">
  Primary
</button>
```

### Secondary Button

```tsx
<button className="hover:bg-secondary/80 rounded-md bg-secondary px-4 py-2 text-secondary-foreground transition-colors">
  Secondary
</button>
```

### Outline Button

```tsx
<button className="rounded-md border border-border bg-transparent px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground">
  Outline
</button>
```

### Ghost Button

```tsx
<button className="rounded-md bg-transparent px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground">
  Ghost
</button>
```

### Destructive Button

```tsx
<button className="hover:bg-destructive/90 rounded-md bg-destructive px-4 py-2 text-destructive-foreground transition-colors">
  Delete
</button>
```

### Link Button

```tsx
<button className="text-primary underline-offset-4 hover:underline">Link</button>
```

---

## Button Sizes

### Small

```tsx
<button className="hover:bg-primary/90 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">
  Small
</button>
```

### Default

```tsx
<button className="hover:bg-primary/90 rounded-md bg-primary px-4 py-2 text-primary-foreground">
  Default
</button>
```

### Large

```tsx
<button className="hover:bg-primary/90 rounded-md bg-primary px-6 py-3 text-lg text-primary-foreground">
  Large
</button>
```

---

## Button States

### Disabled

```tsx
<button
  disabled
  className="cursor-not-allowed rounded-md bg-primary px-4 py-2 text-primary-foreground opacity-50"
>
  Disabled
</button>
```

### Loading

```tsx
<button
  disabled
  className="flex cursor-wait items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground opacity-75"
>
  <svg className="h-4 w-4 animate-spin">⟳</svg>
  Loading...
</button>
```

### Success

```tsx
<button className="bg-success text-success-foreground hover:bg-success/90 flex items-center gap-2 rounded-md px-4 py-2">
  <svg className="h-4 w-4">✓</svg>
  Success
</button>
```

---

## Button with Icons

### Icon Left

```tsx
<button className="hover:bg-primary/90 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground">
  <svg className="h-4 w-4">📥</svg>
  Download
</button>
```

### Icon Right

```tsx
<button className="hover:bg-primary/90 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground">
  Continue
  <svg className="h-4 w-4">→</svg>
</button>
```

### Icon Only

```tsx
<button
  className="hover:bg-primary/90 flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground"
  aria-label="Settings"
>
  <svg className="h-5 w-5">⚙️</svg>
</button>
```

---

## Button Groups

### Horizontal Group

```tsx
<div className="inline-flex rounded-md shadow-sm">
  <button className="hover:bg-primary/90 rounded-l-md bg-primary px-4 py-2 text-primary-foreground">
    Left
  </button>
  <button className="border-primary-foreground/20 hover:bg-primary/90 border-l bg-primary px-4 py-2 text-primary-foreground">
    Middle
  </button>
  <button className="border-primary-foreground/20 hover:bg-primary/90 rounded-r-md border-l bg-primary px-4 py-2 text-primary-foreground">
    Right
  </button>
</div>
```

### Segmented Control

```tsx
<div className="inline-flex gap-1 rounded-lg bg-muted p-1">
  <button className="rounded-md bg-background px-4 py-2 text-sm font-medium shadow">Active</button>
  <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
    Inactive
  </button>
  <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
    Inactive
  </button>
</div>
```

---

## Full Width Buttons

```tsx
<button className="hover:bg-primary/90 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground">
  Full Width Button
</button>
```

---

## Floating Action Button (FAB)

```tsx
<button className="hover:bg-primary/90 fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:shadow-xl">
  <svg className="h-6 w-6">+</svg>
</button>
```

---

## Best Practices

### ✅ Do

- Use semantic color tokens
- Add `transition-colors` for smooth hover effects
- Include `disabled:` variants for disabled states
- Use `flex items-center gap-2` for icon + text
- Set min-width for consistent sizing
- Add appropriate `aria-label` for icon-only buttons

### ❌ Don't

- Use raw colors like `bg-blue-500`
- Skip hover states
- Make buttons too small (<44px touch target)
- Use `<div>` for clickable buttons
- Forget disabled state styling
- Remove focus ring without replacement

---

**Related**: See `form-patterns.md` for submit buttons, `navigation-patterns.md` for CTA placement.
