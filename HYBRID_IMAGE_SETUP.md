# 🖼️ Hybrid Image Setup - Optimized & Flexible

## 🎯 Overview

Setup này support **cả 2 loại images**:

- ✅ **Optimized images** từ `src/assets/` (auto WebP, responsive)
- ✅ **Public images** từ `public/uploads/` (no processing, direct serve)

---

## 🏗️ Architecture

### Content Collection Schema

```typescript
// src/content.config.ts
const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // Union type: string OR ImageMetadata
      heroImage: z.union([z.string(), image()]).optional(),
    }),
});
```

**Union type cho phép:**

```markdown
# Option 1: Public folder (string)

heroImage: /uploads/hero.jpg

# Option 2: Src assets (imported)

heroImage: ../../assets/hero.jpg
```

---

## 🎨 Component Implementation

### BlogPost Layout

```astro
---
import { Image } from 'astro:assets';

const { heroImage, title } = Astro.props;

// Check image type
const isPublicImage = typeof heroImage === 'string';
---

<div class="hero-image">
  {heroImage && (
    isPublicImage ? (
      <!-- Public folder: Plain img tag -->
      <img src={heroImage} alt={title} />
    ) : (
      <!-- Src assets: Optimized Image component -->
      <Image src={heroImage} alt={title} width={1020} height={510} />
    )
  )}
</div>
```

### Blog Index Page

```astro
---
import { Image } from 'astro:assets';
const posts = await getCollection('blog');
---

{posts.map((post) => {
  const isPublicImage = typeof post.data.heroImage === 'string';
  return (
    <li>
      {post.data.heroImage && (
        isPublicImage ? (
          <img src={post.data.heroImage} alt={post.data.title} />
        ) : (
          <Image src={post.data.heroImage} alt={post.data.title} width={720} height={360} />
        )
      )}
    </li>
  );
})}
```

---

## 📊 Comparison

| Feature             | Public Folder        | Src Assets               |
| ------------------- | -------------------- | ------------------------ |
| **Path**            | `/uploads/image.jpg` | `../../assets/image.jpg` |
| **Component**       | `<img>`              | `<Image />`              |
| **Optimization**    | ❌ None              | ✅ Auto                  |
| **WebP conversion** | ❌ No                | ✅ Yes                   |
| **Responsive**      | ❌ Manual            | ✅ Auto                  |
| **Lazy loading**    | ⚠️ Manual            | ✅ Auto                  |
| **TinaCMS upload**  | ✅ Easy              | ⚠️ Complex               |
| **Build time**      | ⚡ Fast              | ⏱️ Slower                |
| **Bundle size**     | 📦 Larger            | 📦 Smaller               |

---

## 🚀 Usage Examples

### Example 1: TinaCMS Upload (Public Folder)

**Create post via TinaCMS:**

```
1. Open: http://localhost:4325/admin/index.html
2. Click [+ Create New]
3. Upload image via TinaCMS
4. Image saved to: public/uploads/image.jpg
```

**Markdown:**

```markdown
---
title: My Post
heroImage: /uploads/image.jpg # Absolute path
---
```

**Result:**

- ✅ Fast upload
- ✅ Works immediately
- ❌ No optimization

---

### Example 2: Manual Add (Src Assets)

**Add image manually:**

```bash
# 1. Copy image to src/assets/
cp ~/Downloads/hero.jpg src/assets/blog/hero.jpg
```

**Markdown:**

```markdown
---
title: My Optimized Post
heroImage: ../../assets/blog/hero.jpg # Relative path
---
```

**Result:**

- ✅ Auto optimization
- ✅ WebP conversion
- ✅ Responsive images
- ⏱️ Slower build

---

## 🎯 When to Use Which?

### Use Public Folder (`/uploads/`) When:

- ✅ Uploading via TinaCMS
- ✅ Need fast iteration
- ✅ Image already optimized
- ✅ Temporary/draft content

### Use Src Assets (`../../assets/`) When:

- ✅ Production content
- ✅ Performance critical
- ✅ Need responsive images
- ✅ Want auto WebP

---

## 🔧 How It Works

### Type Detection

```typescript
const isPublicImage = typeof heroImage === "string";

// If string → /uploads/image.jpg (public)
// If object → ImageMetadata (src/assets/)
```

### Conditional Rendering

```astro
{isPublicImage ? (
  <!-- No processing -->
  <img src={heroImage} alt={title} />
) : (
  <!-- Auto optimize -->
  <Image src={heroImage} alt={title} width={1020} height={510} />
)}
```

---

## 📝 Migration Guide

### Move from Public to Assets

**Before:**

```markdown
---
heroImage: /uploads/hero.jpg
---
```

**Steps:**

```bash
# 1. Move file
mv public/uploads/hero.jpg src/assets/blog/hero.jpg

# 2. Update frontmatter
heroImage: ../../assets/blog/hero.jpg
```

**After:**

- ✅ Image now optimized
- ✅ Auto WebP conversion
- ✅ Responsive srcset

---

### Move from Assets to Public

**Before:**

```markdown
---
heroImage: ../../assets/blog/hero.jpg
---
```

**Steps:**

```bash
# 1. Move file
mv src/assets/blog/hero.jpg public/uploads/hero.jpg

# 2. Update frontmatter
heroImage: /uploads/hero.jpg
```

**After:**

- ✅ Faster TinaCMS workflow
- ✅ No build-time processing
- ❌ No optimization

---

## 🎨 Best Practices

### 1. Naming Convention

```
public/uploads/
  ├── blog-post-hero.jpg       # Descriptive name
  ├── 2024-01-15-cover.jpg     # Date-based
  └── project-screenshot.png   # Purpose-based

src/assets/blog/
  ├── optimized-hero.jpg       # Indicate optimized
  ├── high-res-cover.jpg       # Quality indicator
  └── responsive-banner.jpg    # Feature indicator
```

### 2. File Organization

```
# Public (CMS uploads, quick iteration)
public/uploads/
  ├── drafts/          # Work in progress
  ├── temp/            # Temporary images
  └── [year]/          # Archived by year

# Assets (production, optimized)
src/assets/
  ├── blog/            # Blog images
  ├── projects/        # Project screenshots
  └── shared/          # Reused images
```

### 3. Image Optimization Workflow

**Development:**

```
1. Upload via TinaCMS → public/uploads/
2. Test content
3. Review in browser
```

**Production:**

```
1. Move to src/assets/
2. Update path in frontmatter
3. Rebuild (auto optimization)
4. Deploy
```

---

## 🐛 Troubleshooting

### Issue: "ImageNotFound" error

**Cause:** Using `<Image />` with public folder path

**Fix:** Check path type

```astro
<!-- ✅ Correct -->
{isPublicImage ? <img /> : <Image />}

<!-- ❌ Wrong -->
<Image src="/uploads/image.jpg" />
```

---

### Issue: Images not optimized

**Cause:** Using string path (public folder)

**Fix:** Move to `src/assets/` and update path

```markdown
# Change from:

heroImage: /uploads/image.jpg

# To:

heroImage: ../../assets/blog/image.jpg
```

---

### Issue: Type error in schema

**Cause:** Schema doesn't support union type

**Fix:** Update schema

```typescript
// ❌ Wrong
heroImage: image().optional();

// ✅ Correct
heroImage: z.union([z.string(), image()]).optional();
```

---

## 📚 Summary

**Current Setup:**

```
✅ Hybrid approach
✅ TinaCMS uploads → public/uploads/
✅ Manual adds → src/assets/
✅ Conditional rendering based on type
✅ Best of both worlds
```

**Key Benefits:**

- 🚀 Fast TinaCMS workflow
- ⚡ Optimized when needed
- 🎯 Flexible for different use cases
- 📦 Smaller bundles for production

---

**Perfect setup for portfolio + blog! 🎉**
