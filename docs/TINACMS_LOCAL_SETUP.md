# 🚀 TinaCMS Local Setup (No Auth Required)

## ✅ Setup Complete!

TinaCMS đã được cài đặt với **Local Mode** - không cần authentication!

## 📁 Files Created

```
✅ tina/config.ts          # TinaCMS configuration
✅ public/admin/index.html # Admin panel entry
✅ .env.example            # Environment variables example
✅ package.json            # Updated scripts
```

## 🎯 How to Use

### 1. Start Dev Server

```bash
npm run dev
```

Hoặc nếu có vấn đề:

```bash
npm run dev:astro
```

### 2. Open Admin Panel

```
http://localhost:4321/admin
```

### 3. Edit Content

```
┌─────────────────────────────────────────┐
│  TinaCMS Admin (Local Mode)            │
├─────────────────────────────────────────┤
│  📚 Blog Posts                          │
│  ───────────────────────────────────────│
│  [+ Create New]          [Search]       │
│                                         │
│  📄 First Post                          │
│  📄 Second Post                         │
│  📄 Third Post                          │
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Features Enabled

### ✅ Local Mode

- ✅ No authentication required
- ✅ Edit files directly
- ✅ No cloud service needed
- ✅ Perfect for development

### ✅ Markdown Editor

- ✅ WYSIWYG rich text editor
- ✅ Live preview
- ✅ Image upload
- ✅ Syntax highlighting

### ✅ Content Management

- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Draft mode

## 📝 Create Your First Post

### Step 1: Start server

```bash
npm run dev
```

### Step 2: Open admin

```
http://localhost:4321/admin
```

### Step 3: Click [+ Create New]

### Step 4: Fill form

```
Title: My First TinaCMS Post
Description: Testing TinaCMS locally
Date: Today
Tags: TinaCMS, Astro, Test
```

### Step 5: Write content

```markdown
# My First Post

This is **bold** and _italic_ text.

- Feature 1
- Feature 2
- Feature 3
```

### Step 6: Save

File created: `src/content/blog/my-first-tinacms-post.md`

## 🔧 Configuration

### Current Setup (tina/config.ts)

```typescript
{
  // Local mode - no auth
  clientId: null,
  token: null,

  // Blog collection
  collections: [
    {
      name: 'blog',
      path: 'src/content/blog',
      format: 'md',

      fields: [
        'title',
        'description',
        'pubDate',
        'heroImage',
        'tags',
        'draft',
        'body (rich-text)',
      ]
    }
  ]
}
```

### Customize

Edit `tina/config.ts` để:

- Add more collections (projects, pages, etc.)
- Add more fields
- Change editor settings
- Add custom components

## 🎯 Workflow Example

### Creating a Blog Post

```
1. npm run dev
   ↓
2. Visit http://localhost:4321/admin
   ↓
3. Click [+ Create New]
   ↓
4. Fill form:
   - Title: "How to use TinaCMS"
   - Description: "Complete guide"
   - Date: Today
   - Tags: CMS, Tutorial
   ↓
5. Write content in editor
   ↓
6. Click [Save]
   ↓
7. File saved to src/content/blog/
   ↓
8. Visit http://localhost:4321/blog to see it
```

### Editing a Post

```
1. Open admin
   ↓
2. Click on post in list
   ↓
3. Edit content
   ↓
4. Click [Save]
   ↓
5. Changes saved immediately
```

## 🖼️ Upload Images

### Method 1: Drag & Drop

```
1. Open post in editor
2. Drag image into content area
3. Image uploaded to src/assets/
4. Auto-inserted in content
```

### Method 2: Upload Button

```
1. Click "Hero Image" field
2. Click [Upload]
3. Select image
4. Image saved
```

## 📊 What You Can Do

### ✅ Supported

- ✅ Create/Edit/Delete posts
- ✅ Rich text editing
- ✅ Markdown support
- ✅ Image uploads
- ✅ Draft mode
- ✅ Tags
- ✅ Dates
- ✅ Live preview

### ❌ Not Included (Local Mode)

- ❌ User authentication
- ❌ Team collaboration
- ❌ Git commits (manual)
- ❌ Cloud backup
- ❌ Version history (use git manually)

## 🎓 Next Steps

### For Production

If you want auth and cloud features:

1. **Sign up for Tina Cloud**

   ```
   https://app.tina.io
   ```

2. **Get credentials**

   ```
   TINA_CLIENT_ID=xxx
   TINA_TOKEN=xxx
   ```

3. **Add to .env**

   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Update tina/config.ts**

   ```typescript
   export default defineConfig({
     clientId: process.env.TINA_CLIENT_ID,
     token: process.env.TINA_TOKEN,
     // ... rest of config
   });
   ```

5. **Deploy**
   - Push to GitHub
   - Deploy to Vercel/Netlify
   - Admin accessible at yoursite.com/admin

## 🐛 Troubleshooting

### Issue: Admin page not loading

**Solution 1:**

```bash
# Clear cache and restart
rm -rf .astro node_modules/.vite
npm run dev
```

**Solution 2:**

```bash
# Try direct Astro dev
npm run dev:astro
```

### Issue: Can't create new post

**Solution:**
Check `src/content/blog/` directory exists:

```bash
ls -la src/content/blog/
```

### Issue: Images not uploading

**Solution:**
Check `src/assets/` directory exists:

```bash
mkdir -p src/assets
```

## 💡 Pro Tips

### 1. Use Draft Mode

- Toggle "Draft" to hide posts from public
- Perfect for work-in-progress

### 2. Tags for Organization

- Add tags to categorize posts
- Filter by tags later

### 3. Hero Images

- Upload featured image
- Displays at top of post

### 4. Markdown Shortcuts

- `Cmd/Ctrl + B` = Bold
- `Cmd/Ctrl + I` = Italic
- `Cmd/Ctrl + K` = Link

### 5. Live Preview

- See changes real-time
- Switch between edit/preview modes

## 📚 Learn More

- [TinaCMS Docs](https://tina.io/docs/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Markdown Guide](https://www.markdownguide.org/)

---

## 🎉 You're Ready!

Start creating content:

```bash
npm run dev
```

Then visit: **http://localhost:4321/admin**

Happy blogging! ✨
