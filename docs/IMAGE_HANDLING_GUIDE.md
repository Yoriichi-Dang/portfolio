# 🖼️ Image Handling Guide - Astro + TinaCMS

## 🚨 The Problem

Astro's `Image` component từ `astro:assets` **KHÔNG hỗ trợ** images trong `public/` folder!

```astro
<!-- ❌ KHÔNG WORK -->
<Image src="/uploads/image.jpg" />

<!-- ✅ WORKS -->
<img src="/uploads/image.jpg" />
```

## 📐 How Astro Handles Images

### Method 1: Public Folder (Current Setup)

```
public/
  uploads/
    3x4.jpg
    hero.jpg
```

**Use with plain `<img>` tag:**

```astro
<img src="/uploads/3x4.jpg" alt="Hero" />
```

**Pros:**

- ✅ Simple
- ✅ Works with TinaCMS file upload
- ✅ Direct path reference

**Cons:**

- ❌ No optimization
- ❌ No lazy loading
- ❌ No responsive images
- ❌ Larger bundle size

### Method 2: Src Assets (Recommended)

```
src/
  assets/
    images/
      hero.jpg
```

**Use with `Image` component:**

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.jpg';
---

<Image src={heroImage} alt="Hero" />
```

**Pros:**

- ✅ Auto optimization
- ✅ Responsive images
- ✅ Lazy loading
- ✅ WebP conversion
- ✅ Smaller bundle

**Cons:**

- ❌ Requires import
- ❌ More complex setup

## 🔧 Current Fix Applied

Changed `BlogPost.astro` to use `<img>` tag:

```astro
<!-- Before (BROKEN) -->
{heroImage && <Image width={1020} height={510} src={heroImage} alt="" />}

<!-- After (WORKS) -->
{heroImage && <img src={heroImage} alt={title} />}
```

**Now images từ `public/uploads/` work correctly!**

## 🎯 Proper Solution: Move to Src Assets

### Step 1: Create Assets Folder

```bash
mkdir -p src/assets/images/blog
```

### Step 2: Update TinaCMS Config

```typescript
// tina/config.ts
export default defineConfig({
  // ... other config
  media: {
    tina: {
      mediaRoot: "assets/images/blog", // Change from "uploads"
      publicFolder: "src", // Change from "public"
    },
  },
  // ...
});
```

### Step 3: Update Content Collection Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { image } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(), // Use image() helper
  }),
});

export const collections = { blog };
```

### Step 4: Update BlogPost Layout

```astro
---
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
// ... other imports

type Props = CollectionEntry<'blog'>['data'];
const { title, description, pubDate, updatedDate, heroImage } = Astro.props;
---

<div class="hero-image">
  {heroImage && (
    <Image
      src={heroImage}
      alt={title}
      width={1020}
      height={510}
      loading="lazy"
      format="webp"
    />
  )}
</div>
```

### Step 5: Update Markdown Files

```markdown
---
title: My Post
heroImage: ../../assets/images/blog/hero.jpg # Relative path
---
```

## 📊 Comparison

| Feature          | Public Folder | Src Assets       |
| ---------------- | ------------- | ---------------- |
| **Ease of use**  | ✅ Simple     | ⚠️ Complex       |
| **Optimization** | ❌ None       | ✅ Auto          |
| **Responsive**   | ❌ Manual     | ✅ Auto          |
| **WebP**         | ❌ No         | ✅ Yes           |
| **Lazy loading** | ⚠️ Manual     | ✅ Auto          |
| **TinaCMS**      | ✅ Easy       | ⚠️ Config needed |
| **Bundle size**  | ❌ Larger     | ✅ Smaller       |

## 🚀 Quick Reference

### Current Setup (Public Folder)

**File location:**

```
public/uploads/3x4.jpg
```

**In markdown:**

```markdown
---
heroImage: /uploads/3x4.jpg
---
```

**In component:**

```astro
<img src={heroImage} alt={title} />
```

### Recommended Setup (Src Assets)

**File location:**

```
src/assets/images/blog/hero.jpg
```

**In markdown:**

```markdown
---
heroImage: ../../assets/images/blog/hero.jpg
---
```

**In component:**

```astro
import { Image } from 'astro:assets';
<Image src={heroImage} alt={title} />
```

## 🎨 Advanced: Responsive Images

```astro
---
import { Image, Picture } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- Single optimized image -->
<Image
  src={heroImage}
  alt="Hero"
  width={1200}
  quality={80}
  format="webp"
/>

<!-- Responsive with multiple formats -->
<Picture
  src={heroImage}
  alt="Hero"
  widths={[400, 800, 1200]}
  sizes="(max-width: 800px) 100vw, 800px"
  formats={['avif', 'webp', 'jpeg']}
/>
```

## ✅ Current Status

**✅ FIXED:** Blog posts now display images correctly!

**Path:** `/uploads/3x4.jpg` → Works with `<img>` tag

**Test:**

```
http://localhost:4324/blog/first-post
```

## 🔍 Troubleshooting

### Issue: "Could not find requested image"

**Cause:** Using `Image` component with `public/` folder path

**Fix:** Use `<img>` tag instead:

```astro
<!-- Change this -->
<Image src="/uploads/image.jpg" />

<!-- To this -->
<img src="/uploads/image.jpg" />
```

### Issue: Images not optimized

**Cause:** Images in `public/` folder aren't processed

**Fix:** Move to `src/assets/` and use `Image` component

### Issue: TinaCMS upload không work

**Cause:** Media config pointing to wrong folder

**Fix:** Update `tina/config.ts`:

```typescript
media: {
  tina: {
    mediaRoot: "uploads",
    publicFolder: "public",  // For public folder
    // OR
    mediaRoot: "assets/images",
    publicFolder: "src",     // For src assets
  },
}
```

## 📚 Resources

- [Astro Images Guide](https://docs.astro.build/en/guides/images/)
- [Image Component API](https://docs.astro.build/en/reference/api-reference/#image-)
- [TinaCMS Media Config](https://tina.io/docs/reference/media/)

---

**Recommendation:** Stick with current setup (public folder + `<img>`) for simplicity, or migrate to `src/assets/` for better optimization! 🚀
