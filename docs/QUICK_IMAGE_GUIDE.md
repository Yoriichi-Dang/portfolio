# 🖼️ Quick Image Upload Guide

## 🎯 3 Ways to Add Images

### ✅ Method 1: Manual Upload (Works Now!)

**Fastest way để test:**

#### Step 1: Add image to folder

```bash
# Copy your image
cp ~/Downloads/my-image.jpg public/uploads/
```

Or drag & drop file vào `public/uploads/` trong Finder/Explorer.

#### Step 2: Use trong TinaCMS

**Hero Image:**

```
Type: /uploads/my-image.jpg
```

**In Content:**
Click image button trong editor toolbar, paste URL:

```
/uploads/my-image.jpg
```

Or type manually trong markdown:

```markdown
![Alt text](/uploads/my-image.jpg)
```

#### Step 3: Done!

Image sẽ hiện trong blog post.

---

### ✅ Method 2: Cloudinary (15 mins setup)

**For production - best option!**

#### Quick Setup:

```bash
# 1. Sign up
https://cloudinary.com

# 2. Install
npm install next-tinacms-cloudinary

# 3. Get credentials from dashboard

# 4. Add to .env
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# 5. Update tina/config.ts (see MEDIA_SOLUTIONS.md)

# 6. Restart server
npm run dev
```

#### Then:

- Click upload trong TinaCMS
- Select image
- Auto uploaded to Cloudinary CDN
- Fast delivery worldwide!

---

### ✅ Method 3: Astro Assets (Current Project)

**Use existing images trong src/assets/**

#### Current images:

```bash
ls src/assets/
# blog-placeholder-1.jpg
# blog-placeholder-2.jpg
# blog-placeholder-3.jpg
# etc.
```

#### Reference trong markdown:

```markdown
---
heroImage: ../../assets/blog-placeholder-1.jpg
---
```

---

## 📋 Image Best Practices

### 1. **Naming**

```bash
# ✅ Good
hero-image.jpg
blog-post-thumbnail.png
project-screenshot-1.jpg

# ❌ Bad
IMG_1234.jpg
Screen Shot 2024.png
image (1).jpg
```

### 2. **Size**

- Hero images: max 1920x1080px
- Thumbnails: max 800x600px
- Compress before upload

### 3. **Format**

- Photos: `.jpg` (smaller size)
- Graphics: `.png` (transparent)
- Modern: `.webp` (best compression)

### 4. **Alt Text**

Always add alt text cho accessibility:

```markdown
![Developer working on code](/uploads/hero.jpg)
```

---

## 🎯 Current Structure

```
public/
└── uploads/              ← Put images here
    ├── hero-1.jpg       ← Your uploaded images
    ├── hero-2.jpg
    └── thumbnail.png

src/
└── assets/              ← Astro optimized images
    ├── blog-placeholder-1.jpg
    └── ...
```

**URLs:**

- Public: `/uploads/hero-1.jpg`
- Assets: `../../assets/blog-placeholder-1.jpg`

---

## 🚀 Test Now

### 1. Add test image:

```bash
# Download any image or use existing
cp src/assets/blog-placeholder-1.jpg public/uploads/test.jpg
```

### 2. Create post trong TinaCMS:

```
http://localhost:4323/admin/index.html
```

### 3. Set hero image:

```
Hero Image: /uploads/test.jpg
```

### 4. Save & check!

---

## 📚 Learn More

- **`MEDIA_SOLUTIONS.md`** - All upload solutions
- **`IMAGE_UPLOAD_FIX.md`** - Detailed troubleshooting

---

**Quick fix: Just add images to `public/uploads/` và reference `/uploads/filename.jpg`! ✨**
