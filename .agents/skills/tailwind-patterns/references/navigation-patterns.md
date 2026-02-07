# Navigation Patterns

Header, footer, menu, and navigation component patterns for Tailwind CSS.

---

## Header Patterns

### Basic Header with Logo and Nav

```tsx
<header className="border-b border-border bg-background">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      {/* Logo */}
      <a href="/" className="text-xl font-bold">
        Brand
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden gap-6 md:flex">
        <a href="#features" className="text-sm transition-colors hover:text-primary">
          Features
        </a>
        <a href="#pricing" className="text-sm transition-colors hover:text-primary">
          Pricing
        </a>
        <a href="#about" className="text-sm transition-colors hover:text-primary">
          About
        </a>
      </nav>

      {/* CTA Button */}
      <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
        Sign Up
      </button>
    </div>
  </div>
</header>
```

### Sticky Header with Backdrop Blur

```tsx
<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border backdrop-blur">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">{/* Header content */}</div>
  </div>
</header>
```

**Key classes**:

- `sticky top-0` - Stays at top when scrolling
- `z-50` - Above other content
- `bg-background/95` - Semi-transparent background
- `backdrop-blur` - Blur effect behind header

### Header with Search

```tsx
<header className="border-b border-border bg-background">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between gap-4">
      {/* Logo */}
      <a href="/" className="flex-shrink-0 text-xl font-bold">
        Brand
      </a>

      {/* Search Bar */}
      <div className="max-w-md flex-1">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md border border-border bg-muted px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground">
            {/* Search icon */}
          </svg>
        </div>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        <button className="text-sm">Sign In</button>
        <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</header>
```

---

## Mobile Menu Patterns

### Hamburger Menu Button

```tsx
'use client';

import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-xl font-bold">
              Brand
            </a>

            {/* Desktop Nav (hidden on mobile) */}
            <nav className="hidden gap-6 md:flex">
              <a href="#features" className="text-sm hover:text-primary">
                Features
              </a>
              <a href="#pricing" className="text-sm hover:text-primary">
                Pricing
              </a>
              <a href="#about" className="text-sm hover:text-primary">
                About
              </a>
            </nav>

            {/* Mobile Menu Button (hidden on desktop) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6">✕</svg>
              ) : (
                <svg className="h-6 w-6">☰</svg>
              )}
            </button>

            {/* Desktop CTA (hidden on mobile) */}
            <button className="hidden rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground md:block">
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border md:hidden">
            <nav className="space-y-4 px-4 py-6">
              <a href="#features" className="block text-sm hover:text-primary">
                Features
              </a>
              <a href="#pricing" className="block text-sm hover:text-primary">
                Pricing
              </a>
              <a href="#about" className="block text-sm hover:text-primary">
                About
              </a>
              <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                Sign Up
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
```

### Slide-In Mobile Menu

```tsx
{
  /* Overlay */
}
{
  mobileMenuOpen && (
    <div
      className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm md:hidden"
      onClick={() => setMobileMenuOpen(false)}
    />
  );
}

{
  /* Slide-in menu */
}
<div
  className={`fixed right-0 top-0 z-50 h-full w-64 transform border-l border-border bg-card transition-transform md:hidden ${
    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
>
  <div className="p-6">
    {/* Close button */}
    <button onClick={() => setMobileMenuOpen(false)} className="mb-8 p-2">
      <svg className="h-6 w-6">✕</svg>
    </button>

    {/* Navigation links */}
    <nav className="space-y-4">
      <a href="#features" className="block text-sm hover:text-primary">
        Features
      </a>
      <a href="#pricing" className="block text-sm hover:text-primary">
        Pricing
      </a>
      <a href="#about" className="block text-sm hover:text-primary">
        About
      </a>
    </nav>
  </div>
</div>;
```

---

## Dropdown Menu

### Desktop Dropdown

```tsx
'use client';

import { useState } from 'react';

export function NavItem({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <button className="flex items-center gap-1 text-sm hover:text-primary">
        {label}
        <svg className="h-4 w-4">▼</svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-border bg-card py-2 shadow-lg">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="block px-4 py-2 text-sm hover:bg-muted">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Breadcrumbs

### Standard Breadcrumbs

```tsx
<nav aria-label="Breadcrumb" className="mb-8">
  <ol className="flex items-center gap-2 text-sm text-muted-foreground">
    <li>
      <a href="/" className="hover:text-primary">
        Home
      </a>
    </li>
    <li>
      <svg className="h-4 w-4">›</svg>
    </li>
    <li>
      <a href="/blog" className="hover:text-primary">
        Blog
      </a>
    </li>
    <li>
      <svg className="h-4 w-4">›</svg>
    </li>
    <li aria-current="page" className="font-medium text-foreground">
      Article Title
    </li>
  </ol>
</nav>
```

### Breadcrumbs with Truncation

```tsx
<nav aria-label="Breadcrumb" className="mb-8">
  <ol className="flex items-center gap-2 text-sm text-muted-foreground">
    <li>
      <a href="/" className="hover:text-primary">
        Home
      </a>
    </li>
    <li>
      <svg className="h-4 w-4">›</svg>
    </li>
    <li>
      <button className="hover:text-primary">...</button>
    </li>
    <li>
      <svg className="h-4 w-4">›</svg>
    </li>
    <li>
      <a href="/category" className="max-w-[200px] truncate hover:text-primary">
        Long Category Name
      </a>
    </li>
    <li>
      <svg className="h-4 w-4">›</svg>
    </li>
    <li aria-current="page" className="max-w-[200px] truncate font-medium text-foreground">
      Current Page Title
    </li>
  </ol>
</nav>
```

---

## Sidebar Navigation

### Vertical Sidebar

```tsx
<aside className="w-64 border-r border-border bg-card p-6">
  <nav className="space-y-1">
    <a
      href="/dashboard"
      className="flex items-center gap-3 rounded-md bg-primary px-3 py-2 text-primary-foreground"
    >
      <svg className="h-5 w-5">📊</svg>
      <span className="text-sm font-medium">Dashboard</span>
    </a>

    <a href="/projects" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted">
      <svg className="h-5 w-5">📁</svg>
      <span className="text-sm">Projects</span>
    </a>

    <a href="/settings" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted">
      <svg className="h-5 w-5">⚙️</svg>
      <span className="text-sm">Settings</span>
    </a>
  </nav>
</aside>
```

### Collapsible Sidebar Groups

```tsx
<aside className="w-64 border-r border-border bg-card p-6">
  <nav className="space-y-6">
    {/* Group 1 */}
    <div>
      <div className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">Main</div>
      <div className="space-y-1">
        <a
          href="/dashboard"
          className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
        >
          <svg className="h-5 w-5">📊</svg>
          <span className="text-sm">Dashboard</span>
        </a>
        <a href="/projects" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted">
          <svg className="h-5 w-5">📁</svg>
          <span className="text-sm">Projects</span>
        </a>
      </div>
    </div>

    {/* Group 2 */}
    <div>
      <div className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
        Settings
      </div>
      <div className="space-y-1">
        <a href="/profile" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted">
          <svg className="h-5 w-5">👤</svg>
          <span className="text-sm">Profile</span>
        </a>
        <a href="/settings" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted">
          <svg className="h-5 w-5">⚙️</svg>
          <span className="text-sm">Settings</span>
        </a>
      </div>
    </div>
  </nav>
</aside>
```

---

## Footer Patterns

### Simple Footer

```tsx
<footer className="bg-muted/50 mt-auto border-t border-border">
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      {/* Copyright */}
      <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>

      {/* Links */}
      <nav className="flex gap-6">
        <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
          Privacy
        </a>
        <a href="/terms" className="text-sm text-muted-foreground hover:text-primary">
          Terms
        </a>
        <a href="/contact" className="text-sm text-muted-foreground hover:text-primary">
          Contact
        </a>
      </nav>
    </div>
  </div>
</footer>
```

### Multi-Column Footer

```tsx
<footer className="bg-muted/50 border-t border-border">
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {/* Column 1 */}
      <div>
        <h4 className="mb-4 font-semibold">Product</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <a href="#" className="hover:text-primary">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary">
              Roadmap
            </a>
          </li>
        </ul>
      </div>

      {/* Column 2 */}
      <div>
        <h4 className="mb-4 font-semibold">Company</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <a href="#" className="hover:text-primary">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary">
              Careers
            </a>
          </li>
        </ul>
      </div>

      {/* Column 3 */}
      <div>
        <h4 className="mb-4 font-semibold">Resources</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <a href="#" className="hover:text-primary">
              Documentation
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary">
              Support
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary">
              API
            </a>
          </li>
        </ul>
      </div>

      {/* Column 4 */}
      <div>
        <h4 className="mb-4 font-semibold">Legal</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary">
              Security
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
      <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="#" className="text-muted-foreground hover:text-primary">
          <svg className="h-5 w-5">𝕏</svg>
        </a>
        <a href="#" className="text-muted-foreground hover:text-primary">
          <svg className="h-5 w-5">in</svg>
        </a>
        <a href="#" className="text-muted-foreground hover:text-primary">
          <svg className="h-5 w-5">GitHub</svg>
        </a>
      </div>
    </div>
  </div>
</footer>
```

### Footer with Newsletter

```tsx
<footer className="bg-muted/50 border-t border-border">
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    {/* Newsletter section */}
    <div className="mb-12 rounded-lg border border-border bg-card p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="mb-2 text-2xl font-bold">Stay updated</h3>
        <p className="mb-6 text-muted-foreground">
          Get the latest news and updates delivered to your inbox.
        </p>
        <form className="mx-auto flex max-w-md gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="hover:bg-primary/90 rounded-md bg-primary px-6 py-2 text-primary-foreground">
            Subscribe
          </button>
        </form>
      </div>
    </div>

    {/* Footer columns */}
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">{/* Columns... */}</div>
  </div>
</footer>
```

---

## Tabs Navigation

### Horizontal Tabs

```tsx
<div className="border-b border-border">
  <nav className="-mb-px flex gap-8">
    <a href="#overview" className="border-b-2 border-primary py-4 text-sm font-medium">
      Overview
    </a>
    <a
      href="#details"
      className="border-b-2 border-transparent py-4 text-sm text-muted-foreground hover:text-foreground"
    >
      Details
    </a>
    <a
      href="#reviews"
      className="border-b-2 border-transparent py-4 text-sm text-muted-foreground hover:text-foreground"
    >
      Reviews
    </a>
  </nav>
</div>
```

### Pill Tabs

```tsx
<nav className="inline-flex gap-2 rounded-lg bg-muted p-1">
  <button className="rounded-md bg-background px-4 py-2 text-sm font-medium shadow">
    Overview
  </button>
  <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Details</button>
  <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Reviews</button>
</nav>
```

---

## Pagination

### Basic Pagination

```tsx
<nav className="flex items-center justify-center gap-2" aria-label="Pagination">
  <button
    className="rounded-md border border-border px-3 py-2 hover:bg-muted disabled:opacity-50"
    disabled
  >
    Previous
  </button>

  <button className="rounded-md bg-primary px-3 py-2 text-primary-foreground">1</button>
  <button className="rounded-md border border-border px-3 py-2 hover:bg-muted">2</button>
  <button className="rounded-md border border-border px-3 py-2 hover:bg-muted">3</button>

  <span className="px-3 py-2">...</span>

  <button className="rounded-md border border-border px-3 py-2 hover:bg-muted">10</button>

  <button className="rounded-md border border-border px-3 py-2 hover:bg-muted">Next</button>
</nav>
```

---

## Best Practices

### ✅ Do

- Make clickable areas large enough (min 44x44px for touch)
- Show active/current state clearly
- Use consistent spacing in navigation
- Provide mobile menu for small screens
- Add keyboard navigation support
- Use semantic HTML (`<nav>`, `<a>`, etc.)

### ❌ Don't

- Hide mobile menu without hamburger icon
- Use non-semantic elements for links
- Forget active state styling
- Make dropdowns keyboard-inaccessible
- Overlap navigation with content
- Use inconsistent hover states

---

**Related**: See `layout-patterns.md` for header/footer positioning, `button-patterns.md` for CTA button styling.
