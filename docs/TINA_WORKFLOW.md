# 📝 TinaCMS Workflow - How to Add New Blog Post

## 🎯 Complete Guide: Thêm Bài Blog Mới

### 📋 Prerequisites

- ✅ TinaCMS đã setup (follow `CMS_GUIDE.md`)
- ✅ Dev server đang chạy hoặc site đã deploy
- ✅ Có account Tina Cloud

---

## 🚀 Method 1: Local Development

### Step 1: Start Dev Server

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:4321`

### Step 2: Mở Admin Panel

```
http://localhost:4321/admin
```

**Visual:**

```
┌─────────────────────────────────────────────────────┐
│  🎨 TinaCMS Admin Panel                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [Login with Tina Cloud]                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 3: Login

- Click "Login with Tina Cloud"
- Authenticate với Tina Cloud account
- Bạn sẽ thấy dashboard

### Step 4: Create New Post

**Visual:**

```
┌─────────────────────────────────────────────────────┐
│  📚 Blog Posts                                      │
├─────────────────────────────────────────────────────┤
│  [+ Create New]                           [Search]  │
│                                                     │
│  📄 First Post              Dec 25, 2024           │
│  📄 Second Post             Dec 24, 2024           │
│  📄 Third Post              Dec 23, 2024           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Action:** Click **[+ Create New]**

### Step 5: Fill in Post Details

```
┌─────────────────────────────────────────────────────┐
│  ✏️ New Blog Post                                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Title *                                            │
│  [How to Build a Portfolio with Astro        ]    │
│                                                     │
│  Description *                                      │
│  [Learn how to create an amazing portfolio...  ]   │
│                                                     │
│  Publication Date *                                 │
│  [📅 Jan 15, 2024  ⏰ 10:00 AM]                   │
│                                                     │
│  Hero Image                                         │
│  [📁 Upload] or [🔗 Choose from library]          │
│                                                     │
│  Tags                                               │
│  [+ Add tag]                                       │
│  [Astro] [React] [Portfolio]                       │
│                                                     │
│  Draft                                              │
│  [ ] Keep as draft (won't be published)           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 6: Write Content

````
┌─────────────────────────────────────────────────────┐
│  Content                                            │
├─────────────────────────────────────────────────────┤
│  [B] [I] [H1] [H2] [🔗] [🖼️] [</>] [+]           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  # Introduction                                     │
│                                                     │
│  In this tutorial, we'll learn how to build a      │
│  modern portfolio website using **Astro** and      │
│  **React**.                                         │
│                                                     │
│  ## Getting Started                                 │
│                                                     │
│  First, install the dependencies:                   │
│                                                     │
│  ```bash                                           │
│  npm install astro                                 │
│  ```                                               │
│                                                     │
│  [+ Insert Component ▼]                            │
│                                                     │
└─────────────────────────────────────────────────────┘
````

**Writing Tips:**

- Type naturally, format với toolbar
- Use keyboard shortcuts:
  - `Cmd/Ctrl + B` = Bold
  - `Cmd/Ctrl + I` = Italic
  - `Cmd/Ctrl + K` = Link
- Drag & drop images
- Insert custom components từ [+] menu

### Step 7: Preview (Optional)

```
[👁️ Preview]
```

Click để xem post như người dùng sẽ thấy.

### Step 8: Save Post

```
[💾 Save]  [🗑️ Delete]
```

**What Happens:**

1. TinaCMS tạo file markdown mới trong `src/content/blog/`
2. File được commit to git repository
3. Changes pushed to GitHub (nếu configured)

**File Created:**

```
src/content/blog/how-to-build-portfolio.md
```

**Content:**

````markdown
---
title: How to Build a Portfolio with Astro
description: Learn how to create an amazing portfolio...
pubDate: 2024-01-15T10:00:00.000Z
heroImage: ./hero.jpg
tags:
  - Astro
  - React
  - Portfolio
draft: false
---

# Introduction

In this tutorial, we'll learn how to build a modern portfolio website using **Astro** and **React**.

## Getting Started

First, install the dependencies:

```bash
npm install astro
```
````

```

### Step 9: Check Your Site
Visit: `http://localhost:4321/blog`

Your new post xuất hiện! ✨

---

## 🌐 Method 2: Production (After Deploy)

### Step 1: Visit Admin
```

https://yoursite.com/admin

```

### Step 2: Login
Same as local - login with Tina Cloud

### Step 3-8: Same Process
Follow steps 4-8 above

### Step 9: Automatic Deploy
- Changes committed to git
- CI/CD (Vercel/Netlify) detects changes
- Site rebuilds automatically
- New post goes live in ~2-3 minutes

---

## 📱 Full Workflow Visualization

```

┌─────────────────────────────────────────────────────┐
│ YOU │
└────────────┬────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────┐
│ 1. Open http://localhost:4321/admin │
└────────────┬────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────┐
│ 2. Login with Tina Cloud │
└────────────┬────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────┐
│ 3. Click [+ Create New] │
└────────────┬────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────┐
│ 4. Fill form: │
│ - Title │
│ - Description │
│ - Date │
│ - Hero image │
│ - Tags │
└────────────┬────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────┐
│ 5. Write content in markdown editor │
│ - Use toolbar for formatting │
│ - Insert images │
│ - Add custom components │
└────────────┬────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────┐
│ 6. Click [Save] │
└────────────┬────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────┐
│ TinaCMS Actions: │
│ ✅ Create markdown file │
│ ✅ Commit to git │
│ ✅ Push to GitHub │
└────────────┬────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────┐
│ CI/CD (Vercel/Netlify): │
│ ✅ Detect changes │
│ ✅ Rebuild site │
│ ✅ Deploy │
└────────────┬────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────┐
│ ✨ New post LIVE on your site! │
└─────────────────────────────────────────────────────┘

```

---

## ✏️ Edit Existing Post

### Method 1: From Dashboard
```

1. Go to /admin
2. Click on post trong list
3. Edit
4. Save

```

### Method 2: From Live Site (Visual Editing)
```

1. Đang xem post tại /blog/post-slug
2. Click "Edit with TinaCMS" button (nếu enabled)
3. Edit trực tiếp trên page
4. Save

```

---

## 🗑️ Delete Post

```

1. Go to /admin
2. Click on post
3. Click [🗑️ Delete]
4. Confirm
5. Done - file deleted from git

```

---

## 📸 Upload Images

### During Post Creation/Edit:

**Method 1: Drag & Drop**
```

1. Drag image from computer
2. Drop vào editor
3. Image uploaded & inserted

```

**Method 2: Upload Button**
```

1. Click [📁 Upload] trong Hero Image field
2. Select image
3. Image uploaded to `src/assets/`

```

**Method 3: Media Library**
```

1. Click [🔗 Choose from library]
2. Browse existing images
3. Select & insert

```

---

## 🎨 Insert Custom Components (MDX)

```

1. Position cursor trong editor
2. Click [+ Insert Component]
3. Select component type:
   - 📦 Code Block
   - 💡 Callout Box
   - 🎬 YouTube Video
   - 🖼️ Image Gallery
4. Fill component fields
5. Component inserted visually

```

**Example:**
```

[+ Insert Component]
└─> Select "Callout Box"
└─> Type: Info
└─> Content: "Remember to commit!"
└─> [Insert]

```

**Result in Editor:**
```

┌───────────────────────────────────────────┐
│ ℹ️ INFO CALLOUT │
│ ─────────────────────────────────────────│
│ Remember to commit! │
│ [Edit] [Delete] │
└───────────────────────────────────────────┘

````

**Saved as MDX:**
```mdx
<Callout type="info">
  Remember to commit!
</Callout>
````

---

## 💾 Auto-Save & Drafts

### Draft Mode

```
[ ] Draft
```

- ✅ Checked = Post không xuất hiện trên site
- ❌ Unchecked = Post published

### Auto-Save

TinaCMS **tự động save** khi bạn edit:

- Every 30 seconds
- When you stop typing
- When you switch fields

---

## 🔄 Git Workflow

### What Happens Behind the Scenes:

```bash
# When you click Save:
git add src/content/blog/new-post.md
git commit -m "Create new post: Title"
git push origin main
```

### View History

```
1. Go to GitHub repository
2. Check commits
3. See all changes với timestamps
```

---

## 📱 Mobile Editing

TinaCMS admin works trên mobile! (responsive)

```
1. Open yoursite.com/admin trên phone
2. Login
3. Create/edit posts
4. Full markdown editor
5. Save
```

---

## 🎯 Quick Reference

### Keyboard Shortcuts

| Action | Shortcut       |
| ------ | -------------- |
| Bold   | `Cmd/Ctrl + B` |
| Italic | `Cmd/Ctrl + I` |
| Link   | `Cmd/Ctrl + K` |
| Code   | `Cmd/Ctrl + E` |
| Save   | `Cmd/Ctrl + S` |

### Common Tasks

| Task             | Steps                            |
| ---------------- | -------------------------------- |
| New Post         | Admin → Create New → Fill → Save |
| Edit Post        | Admin → Click post → Edit → Save |
| Delete Post      | Admin → Click post → Delete      |
| Upload Image     | Drag & drop vào editor           |
| Insert Component | Click [+] → Select → Configure   |
| Preview          | Click [👁️ Preview]               |

---

## ✅ Checklist: Creating New Post

- [ ] Open admin panel
- [ ] Login (if needed)
- [ ] Click [+ Create New]
- [ ] Fill title (required)
- [ ] Fill description (required)
- [ ] Set publication date
- [ ] Upload hero image (optional)
- [ ] Add tags
- [ ] Write content trong markdown editor
- [ ] Format text with toolbar
- [ ] Insert images if needed
- [ ] Add custom components if needed
- [ ] Preview post (optional)
- [ ] Uncheck "Draft" để publish
- [ ] Click [Save]
- [ ] Wait for commit & deploy
- [ ] Check live site!

---

## 🚀 Pro Tips

### 1. **Use Templates**

Create templates cho common post structures.

### 2. **Batch Editing**

Edit multiple posts at once trong dashboard.

### 3. **Schedule Posts**

Set future publication dates.

### 4. **SEO Optimization**

Fill description & tags cho better SEO.

### 5. **Image Optimization**

TinaCMS có thể auto-optimize images.

### 6. **Version Control**

All changes tracked in git - easy rollback.

### 7. **Collaboration**

Multiple admins có thể edit simultaneously.

---

## 🆘 Troubleshooting

### Issue: Can't access /admin

**Solution:** Ensure TinaCMS configured properly in `tina/config.ts`

### Issue: Changes not showing

**Solution:**

1. Check if post is draft
2. Clear browser cache
3. Rebuild site

### Issue: Images not loading

**Solution:**

1. Check image path
2. Ensure images uploaded to correct folder
3. Check media config

### Issue: Can't save

**Solution:**

1. Check internet connection
2. Check Tina Cloud credentials
3. Check git credentials

---

## 🎓 Next Steps

1. ✅ Follow `CMS_GUIDE.md` to setup TinaCMS
2. ✅ Create first test post
3. ✅ Customize fields in `tina/config.ts`
4. ✅ Add custom MDX components
5. ✅ Deploy to production
6. ✅ Share admin link with team

---

**That's it! No more editing code files! 🎉**

Workflow: Open admin → Write → Save → Done! ✨
