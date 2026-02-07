# 🔗 Blog Routing Guide

## 🎯 How Blog Routing Works

### Current Setup (Perfect!)

```
File: src/content/blog/first-post.md
  ↓
Route: /blog/first-post
  ↓
Page: src/pages/blog/[slug].astro
```

## 📐 Architecture

```
┌─────────────────────────────────────────────────────┐
│  Content Files (Markdown)                           │
├─────────────────────────────────────────────────────┤
│  src/content/blog/                                  │
│  ├── first-post.md          → /blog/first-post     │
│  ├── second-post.md         → /blog/second-post    │
│  ├── my-awesome-post.md     → /blog/my-awesome-post│
│  └── another-post.md        → /blog/another-post   │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│  Dynamic Route                                       │
├─────────────────────────────────────────────────────┤
│  src/pages/blog/[slug].astro                        │
│                                                      │
│  • Matches: /blog/*                                 │
│  • Gets: slug parameter                             │
│  • Loads: corresponding markdown file               │
│  • Renders: content với layout                      │
└─────────────────────────────────────────────────────┘
```

## 🔍 How It Works

### Step 1: File = ID

**File name trong `src/content/blog/` = Blog ID**

```
src/content/blog/
├── first-post.md        → ID: "first-post"
├── hello-world.md       → ID: "hello-world"
└── my-story.md          → ID: "my-story"
```

### Step 2: Route Generation

`getStaticPaths()` tự động generate routes:

```typescript
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: { slug: post.id }, // post.id = file name
    props: post, // Pass entire post as props
  }));
}
```

**Result:**

```
first-post.md   → /blog/first-post
hello-world.md  → /blog/hello-world
my-story.md     → /blog/my-story
```

### Step 3: Load Content

```typescript
const post = Astro.props; // Get post from props
const { Content } = await render(post); // Render markdown
```

### Step 4: Display

```astro
<BlogPost {...post.data}>
  <Content />
</BlogPost>
```

## 📝 Example Flow

### Creating "my-new-post.md"

**1. Create file:**

```markdown
---
title: My New Post
description: This is my new post
pubDate: Jan 15 2024
---

# Hello World

This is my content.
```

**2. File location:**

```
src/content/blog/my-new-post.md
```

**3. Auto route:**

```
http://localhost:4323/blog/my-new-post
```

**4. How it loads:**

```
User visits: /blog/my-new-post
     ↓
Astro matches: [slug].astro with slug = "my-new-post"
     ↓
getStaticPaths returns: { params: { slug: "my-new-post" }, props: post }
     ↓
Page renders with post data
     ↓
Content displayed!
```

## 🎨 Clean Implementation

### Current File: `src/pages/blog/[slug].astro`

```astro
---
import { type CollectionEntry, getCollection, render } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

// Generate static paths for all blog posts
export async function getStaticPaths() {
  const posts = await getCollection('blog');

  return posts.map((post) => ({
    params: { slug: post.id },     // File name = slug
    props: post,                    // Pass post data
  }));
}

type Props = CollectionEntry<'blog'>;

const post = Astro.props;
const { Content } = await render(post);
---

<BlogPost {...post.data}>
  <Content />
</BlogPost>
```

**What this does:**

1. ✅ Gets all blog posts from `content/blog/`
2. ✅ Creates route for each post
3. ✅ File name = URL slug
4. ✅ Loads markdown content
5. ✅ Renders with layout

## 🔢 File Name = Blog ID

### Rules:

```
File Name           →  Blog ID        →  URL
────────────────────────────────────────────────────
first-post.md       →  "first-post"  →  /blog/first-post
hello-world.md      →  "hello-world" →  /blog/hello-world
2024-01-15-news.md  →  "2024-01-15-news" → /blog/2024-01-15-news
```

### Best Practices:

**✅ Good File Names:**

```
how-to-use-astro.md
my-first-blog-post.md
react-vs-vue-2024.md
```

**❌ Bad File Names:**

```
Post 1.md           # Spaces không tốt
my_post.md          # Underscore OK nhưng kebab-case better
ViệtNam.md          # Special chars có thể gây issues
```

## 🚀 Add New Blog Post

### Method 1: TinaCMS (Recommended)

```
1. Open: http://localhost:4323/admin/index.html
2. Click [+ Create New]
3. Fill form
4. Save
5. Auto creates file với slug từ title
```

**Example:**

```
Title: "How to Build Portfolio"
   ↓
File created: how-to-build-portfolio.md
   ↓
Route: /blog/how-to-build-portfolio
```

### Method 2: Manual

```bash
# Create file
touch src/content/blog/my-post.md
```

```markdown
---
title: My Post
description: Description here
pubDate: 2024-01-15
---

# Content here
```

**Route:** `/blog/my-post`

## 🔍 Access Post Data

### In the page:

```typescript
const post = Astro.props;

// Access metadata
post.id; // "first-post"
post.data.title; // "First Post"
post.data.description; // "..."
post.data.pubDate; // Date object
post.data.heroImage; // Image path
post.data.tags; // ["tag1", "tag2"]

// Render content
const { Content } = await render(post);
```

### Example Usage:

```astro
---
const post = Astro.props;
const { Content } = await render(post);
---

<h1>{post.data.title}</h1>
<time>{post.data.pubDate}</time>

{post.data.heroImage && (
  <img src={post.data.heroImage} alt={post.data.title} />
)}

<Content />
```

## 🎯 Complete Example

### 1. Create File

```
src/content/blog/awesome-post.md
```

### 2. Content

```markdown
---
title: Awesome Post
description: This is awesome
pubDate: 2024-01-15
heroImage: /uploads/hero.jpg
tags:
  - Astro
  - Blog
---

# Hello World

This is my **awesome** post!

- Feature 1
- Feature 2
```

### 3. Auto Route

```
http://localhost:4323/blog/awesome-post
```

### 4. Data Available

```typescript
{
  id: "awesome-post",
  data: {
    title: "Awesome Post",
    description: "This is awesome",
    pubDate: Date(2024-01-15),
    heroImage: "/uploads/hero.jpg",
    tags: ["Astro", "Blog"]
  }
}
```

## 📊 Routing Examples

```
File Name                    →  URL
────────────────────────────────────────────────────
first-post.md                →  /blog/first-post
getting-started-with-astro.md →  /blog/getting-started-with-astro
2024-recap.md                →  /blog/2024-recap
```

## ✅ Verify Routes

### Check generated routes:

```bash
npm run build
```

Look for output:

```
▶ /blog/first-post
▶ /blog/second-post
▶ /blog/third-post
```

### Test locally:

```
http://localhost:4323/blog/first-post
http://localhost:4323/blog/second-post
http://localhost:4323/blog/third-post
```

## 🎨 Custom Slugs (Advanced)

If you want custom slugs different from file names:

```markdown
---
title: My Post
slug: custom-url-here
---
```

Then update `[slug].astro`:

```typescript
export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: {
      slug: post.data.slug || post.id, // Use custom slug or fallback to ID
    },
    props: post,
  }));
}
```

## 📚 Summary

**Current Setup:**

```
✅ File name = Blog ID
✅ Dynamic routing via [slug].astro
✅ /blog/<filename> loads markdown
✅ Auto-generated routes
✅ Type-safe with Content Collections
```

**Workflow:**

```
1. Create: src/content/blog/my-post.md
   ↓
2. Access: /blog/my-post
   ↓
3. Astro loads & renders markdown
   ↓
4. Done! ✨
```

---

**Your setup is already correct! Just create markdown files and they auto-generate routes! 🚀**
