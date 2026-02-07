# 🎨 Portfolio Homepage - Architecture & Usage Guide

## 🏗️ Architecture Overview

Portfolio homepage được xây dựng với **hybrid approach**:

- **React components** (client-side): Interactive elements với animations
- **Astro components** (server-side): Static content, SEO-optimized

---

## 📐 Component Structure

```
src/pages/index.astro (Main Page)
├── HeroSection.tsx          [React - Client] ✨ Animations
├── AboutSection.astro       [Astro - Static] 📄
├── SkillsSection.astro      [Astro - Static] 📄
├── ProjectsSection.tsx      [React - Client] ✨ Hover effects
├── RecentPostsSection.astro [Astro - Static] 📄
└── ContactSection.astro     [Astro - Static] 📄
```

---

## 🎯 Sections Breakdown

### 1. Hero Section (`HeroSection.tsx`)

**Type:** React Client Component  
**Features:**

- ✅ Framer Motion animations
- ✅ Gradient text effect
- ✅ Smooth entrance animations
- ✅ Social links
- ✅ Scroll indicator
- ✅ CTA buttons

**Technologies:**

- Framer Motion
- Tailwind CSS gradients
- Responsive design

**Customization:**

```tsx
// Update in src/components/home/HeroSection.tsx
<h1>Hi, I'm [Your Name]</h1>
<p>[Your Title/Role]</p>

// Update social links
href="https://github.com/your-username"
href="https://linkedin.com/in/your-username"
```

---

### 2. About Section (`AboutSection.astro`)

**Type:** Astro Static Component  
**Features:**

- ✅ Profile image
- ✅ Biography
- ✅ Location & status
- ✅ Two-column layout (image + text)

**Customization:**

```astro
<!-- Update profile image -->
<img src="your-image-url" alt="Profile" />

<!-- Update bio text -->
<p>Your introduction here...</p>
```

---

### 3. Skills Section (`SkillsSection.astro`)

**Type:** Astro Static Component  
**Features:**

- ✅ 3-column grid layout
- ✅ Category-based grouping
- ✅ Tech stack icons
- ✅ Checkmark icons

**Customization:**

```astro
const skills = [
  {
    category: 'Your Category',
    items: ['Skill 1', 'Skill 2', 'Skill 3']
  },
  // Add more categories
];
```

---

### 4. Projects Section (`ProjectsSection.tsx`)

**Type:** React Client Component  
**Features:**

- ✅ Project cards with hover effects
- ✅ Framer Motion scroll animations
- ✅ Image zoom on hover
- ✅ Tags display
- ✅ GitHub & Demo links
- ✅ Responsive grid (3 columns → 2 → 1)

**Project Card Props:**

```typescript
{
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;  // Optional
  demo?: string;    // Optional
}
```

**Customization:**

```tsx
// Update in src/components/home/ProjectsSection.tsx
const projects = [
  {
    title: "Your Project",
    description: "Project description",
    tags: ["React", "TypeScript"],
    image: "image-url",
    github: "github-link",
    demo: "demo-link",
  },
  // Add more projects
];
```

---

### 5. Recent Posts Section (`RecentPostsSection.astro`)

**Type:** Astro Static Component  
**Features:**

- ✅ Auto-fetch latest 3 posts
- ✅ Support both public & optimized images
- ✅ Date display
- ✅ Hover effects
- ✅ Link to full blog

**Data Source:**

- Automatically fetches from `src/content/blog/`
- Sorted by `pubDate` (newest first)
- Displays 3 most recent posts

**No customization needed** - Auto-updates when you add new blog posts!

---

### 6. Contact Section (`ContactSection.astro`)

**Type:** Astro Static Component  
**Features:**

- ✅ Gradient background (blue → purple)
- ✅ Email CTA
- ✅ Blog link
- ✅ Social links

**Customization:**

```astro
<!-- Update email -->
href="mailto:your.email@example.com"

<!-- Update social links -->
href="https://github.com/your-username"
href="https://linkedin.com/in/your-username"
href="https://twitter.com/your-username"
```

---

## 🎨 Design System

### Colors

**Light Mode:**

```css
Background:  white, gray-50, gray-100
Text:        gray-700, gray-900
Accent:      blue-600, purple-600
```

**Dark Mode:**

```css
Background:  gray-900, gray-800
Text:        gray-300, white
Accent:      blue-400, purple-400
```

### Typography

```css
Hero Title:    text-5xl md:text-7xl font-bold
Section Title: text-4xl md:text-5xl font-bold
Body:          text-lg text-gray-700 dark:text-gray-300
```

### Spacing

```css
Section Padding: py-20
Container:       max-w-4xl, max-w-6xl
Gap:             gap-4, gap-6, gap-8, gap-12
```

---

## 🚀 Client Directives

### `client:load`

Used for interactive React components:

```astro
<HeroSection client:load />
<ProjectsSection client:load />
```

**Benefits:**

- ✅ Framer Motion animations work
- ✅ Interactive hover states
- ✅ Client-side state management

**Trade-offs:**

- ⚠️ JavaScript bundle size increases
- ⚠️ Hydration on page load

### Static Components

Astro components render at build time:

```astro
<AboutSection />
<SkillsSection />
<RecentPostsSection />
<ContactSection />
```

**Benefits:**

- ✅ Zero JavaScript
- ✅ Faster page load
- ✅ Better SEO

---

## 📱 Responsive Behavior

### Breakpoints

| Screen              | Grid Columns | Font Size |
| ------------------- | ------------ | --------- |
| Mobile (`< 768px`)  | 1 column     | text-4xl  |
| Tablet (`768px+`)   | 2 columns    | text-5xl  |
| Desktop (`1024px+`) | 3 columns    | text-7xl  |

### Components Responsiveness

**Hero:**

- Mobile: Stack vertically, smaller text
- Desktop: Centered, larger text

**About:**

- Mobile: Image stacked above text
- Desktop: Side-by-side (2 columns)

**Skills:**

- Mobile: 1 column
- Desktop: 3 columns

**Projects:**

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

## ⚡ Performance

### Optimizations Applied

1. **Static Site Generation (SSG)**

   - Most content pre-rendered at build time
   - Fast initial page load

2. **Selective Hydration**

   - Only Hero & Projects use `client:load`
   - Other sections are static HTML

3. **Image Optimization**

   - Hybrid image setup (public + assets)
   - Lazy loading for below-the-fold images

4. **Code Splitting**

   - React components loaded only when needed
   - Framer Motion tree-shaken

5. **Scroll Smooth**
   - CSS `scroll-behavior: smooth`
   - No JavaScript scroll libraries

---

## 🎯 Customization Checklist

### Essential Updates

- [ ] **Hero Section**

  - [ ] Update name
  - [ ] Update title/role
  - [ ] Update GitHub URL
  - [ ] Update LinkedIn URL
  - [ ] Update Twitter URL

- [ ] **About Section**

  - [ ] Change profile image
  - [ ] Write your bio
  - [ ] Update location
  - [ ] Update availability status

- [ ] **Skills Section**

  - [ ] List your tech skills
  - [ ] Update tech stack icons
  - [ ] Group by categories

- [ ] **Projects Section**

  - [ ] Add your projects
  - [ ] Use real project images
  - [ ] Add GitHub links
  - [ ] Add live demo links

- [ ] **Contact Section**
  - [ ] Update email address
  - [ ] Update social links

---

## 🐛 Troubleshooting

### Issue: Animations not working

**Cause:** React component not hydrated  
**Fix:** Ensure `client:load` directive is present

```astro
<HeroSection client:load />
```

---

### Issue: Dark mode not working

**Cause:** Tailwind dark mode not configured  
**Fix:** Check `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: "class", // or 'media'
  // ...
};
```

---

### Issue: Images not displaying

**Cause:** Incorrect image path or format  
**Fix:**

- Public images: Use `/uploads/image.jpg`
- Asset images: Use `../../assets/image.jpg`

---

### Issue: Framer Motion errors

**Cause:** Version mismatch or missing package  
**Fix:**

```bash
npm install framer-motion@latest
```

---

## 📊 File Structure

```
src/
├── pages/
│   └── index.astro              # Main homepage
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx      # React - Animated hero
│   │   ├── AboutSection.astro   # Static about
│   │   ├── SkillsSection.astro  # Static skills
│   │   ├── ProjectsSection.tsx  # React - Projects grid
│   │   ├── ProjectCard.tsx      # React - Project card
│   │   ├── RecentPostsSection.astro # Static blog posts
│   │   └── ContactSection.astro # Static contact CTA
│   ├── Header.astro
│   ├── Footer.astro
│   └── BaseHead.astro
└── content/
    └── blog/                    # Blog posts (auto-loaded)
```

---

## 🎨 Color Customization

### Change Accent Color

**Current:** Blue & Purple gradient  
**To customize:**

```tsx
// HeroSection.tsx
bg-gradient-to-r from-blue-600 to-purple-600
// Change to your colors:
bg-gradient-to-r from-emerald-600 to-cyan-600
```

```astro
<!-- ContactSection.astro -->
bg-gradient-to-br from-blue-600 to-purple-600
<!-- Change to: -->
bg-gradient-to-br from-emerald-600 to-cyan-600
```

---

## 🚀 Deployment

Homepage is ready to deploy!

**Build:**

```bash
npm run build
```

**Preview:**

```bash
npm run preview
```

**Deploy to Vercel/Netlify:**

- Auto-detects Astro
- Zero config needed
- Just connect Git repo

---

## 📝 Summary

**Your Portfolio Homepage Features:**

✅ Modern, professional design  
✅ Smooth animations (Framer Motion)  
✅ Fully responsive  
✅ Dark mode ready  
✅ SEO optimized  
✅ Fast loading (static + selective hydration)  
✅ Auto-updates blog section  
✅ Easy to customize  
✅ Production ready

**Perfect for showcasing your work! 🎉**
