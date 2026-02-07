# Card Patterns

Production-ready card component patterns for Tailwind CSS.

---

## Base Card Pattern

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
  {/* Card content */}
</div>
```

**Breakdown**:

- `bg-card` - Semantic background color
- `text-card-foreground` - Text color optimized for card background
- `rounded-lg` - Rounded corners (8px)
- `border border-border` - Subtle border
- `p-6` - Internal padding (24px)

---

## Card Variants

### Basic Content Card

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
  <h3 className="mb-2 text-lg font-semibold">Card Title</h3>
  <p className="text-sm text-muted-foreground">Card description or supporting text goes here.</p>
</div>
```

### Card with Header and Footer

```tsx
<div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
  {/* Header */}
  <div className="border-b border-border px-6 py-4">
    <h3 className="text-lg font-semibold">Card Title</h3>
  </div>

  {/* Body */}
  <div className="p-6">
    <p className="text-muted-foreground">Card content goes here.</p>
  </div>

  {/* Footer */}
  <div className="border-t border-border bg-muted px-6 py-4">
    <button className="text-sm text-primary hover:underline">Learn More</button>
  </div>
</div>
```

### Card with Image

```tsx
<div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
  <img src="/image.jpg" alt="Card image" className="h-48 w-full object-cover" />
  <div className="p-6">
    <h3 className="mb-2 text-lg font-semibold">Card Title</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>
</div>
```

---

## Feature Cards

### Icon Feature Card

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground transition-shadow hover:shadow-lg">
  {/* Icon container */}
  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
    <svg className="h-6 w-6 text-primary" /* icon path */>{/* Icon SVG */}</svg>
  </div>

  <h3 className="mb-2 text-lg font-semibold">Feature Title</h3>
  <p className="text-sm text-muted-foreground">Feature description explaining the benefit.</p>
</div>
```

### Numbered Feature Card

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
  {/* Number badge */}
  <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
    1
  </div>

  <h3 className="mb-2 text-lg font-semibold">Step One</h3>
  <p className="text-sm text-muted-foreground">Description of the first step in the process.</p>
</div>
```

### Gradient Feature Card

```tsx
<div className="from-primary/20 to-accent/20 relative overflow-hidden rounded-lg border border-border bg-gradient-to-br p-6">
  {/* Background decoration */}
  <div className="bg-primary/10 absolute -right-4 -top-4 h-24 w-24 rounded-full blur-2xl" />

  <div className="relative">
    <h3 className="mb-2 text-lg font-semibold">Premium Feature</h3>
    <p className="text-sm text-muted-foreground">Standout feature with gradient background.</p>
  </div>
</div>
```

---

## Stat Cards

### Simple Stat Card

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
  <div className="mb-1 text-sm text-muted-foreground">Total Users</div>
  <div className="text-3xl font-bold">12,345</div>
  <div className="text-success mt-2 flex items-center text-sm">
    <svg className="mr-1 h-4 w-4">↑</svg>
    <span>12% from last month</span>
  </div>
</div>
```

### Stat Card with Icon

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
  <div className="mb-4 flex items-center justify-between">
    <div className="text-sm text-muted-foreground">Revenue</div>
    <div className="bg-success/10 flex h-10 w-10 items-center justify-center rounded-full">
      <svg className="text-success h-5 w-5">💰</svg>
    </div>
  </div>
  <div className="text-2xl font-bold">$45,231</div>
  <div className="mt-1 text-sm text-muted-foreground">+20.1% from last month</div>
</div>
```

---

## Pricing Cards

### Basic Pricing Card

```tsx
<div className="rounded-lg border border-border bg-card p-8 text-card-foreground">
  {/* Plan name */}
  <div className="mb-2 text-sm font-semibold text-primary">Starter</div>

  {/* Price */}
  <div className="mb-6">
    <span className="text-4xl font-bold">$19</span>
    <span className="text-muted-foreground">/month</span>
  </div>

  {/* Description */}
  <p className="mb-6 text-sm text-muted-foreground">Perfect for small teams getting started.</p>

  {/* CTA */}
  <button className="hover:bg-primary/90 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors">
    Get Started
  </button>

  {/* Features */}
  <ul className="mt-6 space-y-3">
    <li className="flex items-start text-sm">
      <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary">✓</svg>
      <span>Up to 10 users</span>
    </li>
    <li className="flex items-start text-sm">
      <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary">✓</svg>
      <span>5GB storage</span>
    </li>
    <li className="flex items-start text-sm">
      <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary">✓</svg>
      <span>Email support</span>
    </li>
  </ul>
</div>
```

### Featured Pricing Card (Recommended)

```tsx
<div className="relative rounded-lg border-2 border-primary bg-card p-8 text-card-foreground shadow-lg">
  {/* Popular badge */}
  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
      Most Popular
    </span>
  </div>

  {/* Plan name */}
  <div className="mb-2 text-sm font-semibold text-primary">Pro</div>

  {/* Price */}
  <div className="mb-6">
    <span className="text-4xl font-bold">$49</span>
    <span className="text-muted-foreground">/month</span>
  </div>

  {/* Description */}
  <p className="mb-6 text-sm text-muted-foreground">For growing teams that need more power.</p>

  {/* CTA */}
  <button className="hover:bg-primary/90 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors">
    Get Started
  </button>

  {/* Features */}
  <ul className="mt-6 space-y-3">
    <li className="flex items-start text-sm">
      <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary">✓</svg>
      <span>Unlimited users</span>
    </li>
    <li className="flex items-start text-sm">
      <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary">✓</svg>
      <span>50GB storage</span>
    </li>
    <li className="flex items-start text-sm">
      <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary">✓</svg>
      <span>Priority support</span>
    </li>
    <li className="flex items-start text-sm">
      <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary">✓</svg>
      <span>Advanced analytics</span>
    </li>
  </ul>
</div>
```

---

## Testimonial Cards

### Simple Testimonial

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
  <p className="mb-4 text-muted-foreground">
    "This product has completely transformed how we work. Highly recommended!"
  </p>
  <div className="flex items-center">
    <img src="/avatar.jpg" alt="Sarah Johnson" className="mr-3 h-10 w-10 rounded-full" />
    <div>
      <div className="text-sm font-semibold">Sarah Johnson</div>
      <div className="text-xs text-muted-foreground">CEO, TechCorp</div>
    </div>
  </div>
</div>
```

### Testimonial with Rating

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
  {/* Star rating */}
  <div className="mb-4 flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="h-5 w-5 fill-current text-yellow-400">
        ⭐
      </svg>
    ))}
  </div>

  <p className="mb-4 text-muted-foreground">
    "Exceptional quality and outstanding support. Worth every penny."
  </p>

  <div className="flex items-center">
    <img src="/avatar.jpg" alt="John Smith" className="mr-3 h-10 w-10 rounded-full" />
    <div>
      <div className="text-sm font-semibold">John Smith</div>
      <div className="text-xs text-muted-foreground">Founder, StartupCo</div>
    </div>
  </div>
</div>
```

---

## Product Cards

### E-commerce Product Card

```tsx
<div className="group overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
  {/* Image */}
  <div className="relative aspect-square overflow-hidden bg-muted">
    <img
      src="/product.jpg"
      alt="Product name"
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    {/* Badge */}
    <div className="absolute right-2 top-2">
      <span className="rounded bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">
        -20%
      </span>
    </div>
  </div>

  {/* Content */}
  <div className="p-4">
    <h3 className="mb-1 font-semibold">Product Name</h3>
    <p className="mb-3 text-sm text-muted-foreground">Short description</p>

    {/* Price */}
    <div className="flex items-center justify-between">
      <div>
        <span className="text-lg font-bold">$79</span>
        <span className="ml-2 text-sm text-muted-foreground line-through">$99</span>
      </div>
      <button className="hover:bg-primary/90 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
        Add to Cart
      </button>
    </div>
  </div>
</div>
```

---

## Blog Post Cards

### Horizontal Blog Card

```tsx
<div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground md:flex-row">
  {/* Image */}
  <div className="md:w-1/3">
    <img src="/blog-post.jpg" alt="Post title" className="h-48 w-full object-cover md:h-full" />
  </div>

  {/* Content */}
  <div className="p-6 md:w-2/3">
    {/* Category */}
    <div className="mb-2 text-xs font-semibold text-primary">Technology</div>

    {/* Title */}
    <h3 className="mb-2 text-xl font-bold">10 Tips for Better Web Development</h3>

    {/* Excerpt */}
    <p className="mb-4 text-sm text-muted-foreground">
      Learn the essential techniques that will make you a more effective developer...
    </p>

    {/* Meta */}
    <div className="flex items-center text-sm text-muted-foreground">
      <span>By John Doe</span>
      <span className="mx-2">•</span>
      <span>5 min read</span>
      <span className="mx-2">•</span>
      <span>Jan 14, 2026</span>
    </div>
  </div>
</div>
```

### Vertical Blog Card

```tsx
<div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
  {/* Image */}
  <img src="/blog-post.jpg" alt="Post title" className="h-48 w-full object-cover" />

  {/* Content */}
  <div className="p-6">
    {/* Category */}
    <div className="mb-2 text-xs font-semibold text-primary">Design</div>

    {/* Title */}
    <h3 className="mb-2 text-lg font-bold">Mastering Modern UI Design</h3>

    {/* Excerpt */}
    <p className="mb-4 text-sm text-muted-foreground">
      Explore the principles of creating beautiful, functional interfaces...
    </p>

    {/* Meta */}
    <div className="flex items-center text-sm text-muted-foreground">
      <img src="/author.jpg" alt="Author" className="mr-2 h-6 w-6 rounded-full" />
      <span>Jane Smith</span>
      <span className="mx-2">•</span>
      <span>8 min read</span>
    </div>
  </div>
</div>
```

---

## Interactive States

### Hover Lift Effect

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground transition-transform hover:scale-105">
  {/* Card content */}
</div>
```

### Hover Shadow

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground transition-shadow hover:shadow-lg">
  {/* Card content */}
</div>
```

### Hover Border Color

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground transition-colors hover:border-primary">
  {/* Card content */}
</div>
```

### Combined Hover Effects

```tsx
<div className="rounded-lg border border-border bg-card p-6 text-card-foreground transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
  {/* Card content */}
</div>
```

### Active/Selected State

```tsx
<div className="ring-primary/20 rounded-lg border-2 border-primary bg-card p-6 text-card-foreground shadow-lg ring-2">
  {/* Selected card content */}
</div>
```

---

## Loading States

### Skeleton Card

```tsx
<div className="animate-pulse rounded-lg border border-border bg-card p-6 text-card-foreground">
  <div className="mb-4 h-12 w-12 rounded-lg bg-muted" />
  <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
  <div className="mb-1 h-3 w-full rounded bg-muted" />
  <div className="h-3 w-5/6 rounded bg-muted" />
</div>
```

---

## Responsive Card Grids

```tsx
{
  /* 1 column mobile, 2 tablet, 3 desktop */
}
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {cards.map((card) => (
    <Card key={card.id} {...card} />
  ))}
</div>;

{
  /* 2 columns mobile, 3 tablet, 4 desktop */
}
<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
  {cards.map((card) => (
    <Card key={card.id} {...card} />
  ))}
</div>;
```

---

## Card Best Practices

### ✅ Do

- Use semantic colors (`bg-card`, `text-card-foreground`)
- Add subtle transitions on interactive cards
- Maintain consistent padding (p-6 standard)
- Use `overflow-hidden` when images touch edges
- Include hover states for clickable cards
- Keep card content hierarchy clear

### ❌ Don't

- Use raw colors like `bg-white` or `bg-gray-100`
- Add excessive shadows (subtle is better)
- Make non-clickable cards look interactive
- Overflow content without truncation
- Mix border and shadow styles randomly
- Forget responsive image sizing

---

**Related**: See `layout-patterns.md` for card grid layouts, `typography-patterns.md` for card text hierarchy.
