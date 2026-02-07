# 📝 CMS Guide - Admin Blog Management

Guide để setup CMS cho phép admin đăng nhập và viết blog bằng Markdown trực tiếp trên web.

## 🎯 Yêu cầu

- ✅ Admin authentication
- ✅ Markdown editor trên web
- ✅ Preview real-time
- ✅ Save posts to git repository
- ✅ Không cần vào code để edit

## 🚀 Solutions Overview

| Solution | Pros | Cons | Best For |
|----------|------|------|----------|
| **Tina CMS** | Git-based, Visual editor, Free | Requires git workflow | Static sites, Astro |
| **Decap CMS** | Open source, Free, Simple | Basic UI | Simple blogs |
| **Payload CMS** | Powerful, Self-hosted | Complex setup | Advanced needs |
| **Sanity** | Real-time, Cloud-hosted | Paid plans | Professional |
| **Custom CMS** | Full control | Time-consuming | Specific needs |

## ⭐ Recommended: Tina CMS

**Why Tina CMS?**
- ✅ Perfect for Astro + Markdown
- ✅ Git-based (commits to your repo)
- ✅ Visual markdown editor with live preview
- ✅ Authentication built-in
- ✅ Free tier generous
- ✅ Works với Content Collections
- ✅ Can self-host or use Tina Cloud

---

## 🎨 Option 1: Tina CMS (Recommended)

### Features
- Git-based workflow (commits changes to repo)
- Real-time visual editor
- Markdown support với live preview
- Media management
- Authentication via Tina Cloud
- Works seamlessly với Astro Content Collections

### Setup Tina CMS

#### 1. Install Dependencies
```bash
npm install tinacms @tinacms/cli
```

#### 2. Initialize Tina
```bash
npx @tinacms/cli init
```

#### 3. Configure Tina

**File: `tina/config.ts`**
```typescript
import { defineConfig } from 'tinacms';

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  
  media: {
    tina: {
      mediaRoot: 'src/assets',
      publicFolder: 'public',
    },
  },
  
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'datetime',
            name: 'pubDate',
            label: 'Publication Date',
            required: true,
          },
          {
            type: 'datetime',
            name: 'updatedDate',
            label: 'Updated Date',
          },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Hero Image',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Content',
            isBody: true,
          },
        ],
      },
    ],
  },
});
```

#### 4. Add Scripts to package.json
```json
{
  "scripts": {
    "dev": "tinacms dev -c \"astro dev\"",
    "build": "tinacms build && astro build",
    "tina": "tinacms dev"
  }
}
```

#### 5. Create Tina Cloud Account
1. Go to https://app.tina.io
2. Sign up (free)
3. Create new project
4. Get `TINA_CLIENT_ID` and `TINA_TOKEN`

#### 6. Add to .env
```bash
TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

#### 7. Access Admin Panel
```
http://localhost:4321/admin
```

### Usage Flow
1. Run `npm run dev`
2. Navigate to `http://localhost:4321/admin`
3. Login với Tina Cloud account
4. Edit/Create blog posts
5. Save → Auto commit to git
6. Deploy → Changes go live

---

## 🎨 Option 2: Decap CMS (Netlify CMS)

### Features
- Open source, completely free
- Git-based
- Simple setup
- Works với GitHub, GitLab, Bitbucket
- No external service required

### Setup Decap CMS

#### 1. Install
```bash
npm install netlify-cms-app
```

#### 2. Create Admin Page

**File: `public/admin/index.html`**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

#### 3. Configuration

**File: `public/admin/config.yml`**
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "src/assets"
public_folder: "/assets"

collections:
  - name: "blog"
    label: "Blog Posts"
    folder: "src/content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Description", name: "description", widget: "string" }
      - { label: "Publish Date", name: "pubDate", widget: "datetime" }
      - { label: "Updated Date", name: "updatedDate", widget: "datetime", required: false }
      - { label: "Hero Image", name: "heroImage", widget: "image", required: false }
      - { label: "Tags", name: "tags", widget: "list", default: [] }
      - { label: "Draft", name: "draft", widget: "boolean", default: false }
      - { label: "Body", name: "body", widget: "markdown" }
```

#### 4. Enable Git Gateway on Netlify
1. Deploy to Netlify
2. Go to Site Settings → Identity
3. Enable Identity service
4. Enable Git Gateway
5. Add yourself as user

#### 5. Access
```
https://your-site.netlify.app/admin
```

---

## 🎨 Option 3: Custom CMS với Astro DB + Auth

### Features
- Full control
- Custom workflow
- No external dependencies
- Self-hosted

### Architecture
```
┌─────────────────────────────────────┐
│  Frontend (Astro)                   │
│  ├── Admin Dashboard (/admin)      │
│  └── Blog Pages (/blog)            │
└─────────────────────────────────────┘
           ↕️
┌─────────────────────────────────────┐
│  API Routes (Astro API)             │
│  ├── POST /api/posts/create        │
│  ├── PUT /api/posts/update         │
│  └── DELETE /api/posts/delete      │
└─────────────────────────────────────┘
           ↕️
┌─────────────────────────────────────┐
│  Database (Astro DB / Supabase)    │
│  ├── Posts Table                   │
│  └── Users Table                   │
└─────────────────────────────────────┘
```

### Tech Stack
- **Database:** Astro DB or Supabase
- **Auth:** Auth.js (NextAuth) or Supabase Auth
- **Editor:** TipTap or Monaco Editor
- **File Storage:** Cloudinary or S3

### Implementation (High-level)

#### 1. Setup Auth

**File: `src/pages/api/auth/[...auth].ts`**
```typescript
import { Auth } from '@auth/core';
import GitHub from '@auth/core/providers/github';

export const { GET, POST } = Auth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});
```

#### 2. Create Admin Dashboard

**File: `src/pages/admin/index.astro`**
```astro
---
import { getSession } from '@auth/core';

const session = await getSession(Astro.request);

if (!session) {
  return Astro.redirect('/api/auth/signin');
}
---

<html>
  <head>
    <title>Admin Dashboard</title>
  </head>
  <body>
    <h1>Blog Admin</h1>
    <div id="editor-root"></div>
    <script type="module" src="/admin/editor.tsx"></script>
  </body>
</html>
```

#### 3. Markdown Editor Component

**File: `public/admin/editor.tsx`**
```tsx
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  
  const handleSave = async () => {
    await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content: markdown }),
    });
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          rows={20}
        />
        <button onClick={handleSave}>Save Post</button>
      </div>
      <div>
        <h3>Preview</h3>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
```

---

## 📊 Comparison Table

| Feature | Tina CMS | Decap CMS | Custom CMS |
|---------|----------|-----------|------------|
| **Setup Time** | 1 hour | 2 hours | 2-4 weeks |
| **Cost** | Free tier | Free | Free (hosting cost) |
| **Maintenance** | Low | Low | High |
| **Customization** | Medium | Low | High |
| **Auth Built-in** | ✅ Yes | ✅ Yes | ❌ DIY |
| **Git Integration** | ✅ Yes | ✅ Yes | Optional |
| **Visual Editor** | ✅ Yes | ❌ No | Custom |
| **Media Management** | ✅ Yes | ✅ Yes | Custom |
| **Self-hosted** | Optional | ✅ Yes | ✅ Yes |

---

## 🎯 My Recommendation

### For Your Portfolio: **Tina CMS**

**Why?**
1. ✅ **Quick Setup** - 1 hour và ready to use
2. ✅ **Git-based** - All changes committed to repo
3. ✅ **Visual Editor** - Best writing experience
4. ✅ **Free** - Generous free tier
5. ✅ **Astro Integration** - Works perfectly với Content Collections
6. ✅ **No Backend** - No server/database needed

**Workflow:**
```
1. Write post in Tina admin (/admin)
   ↓
2. Save → Auto commit to git
   ↓
3. Push to GitHub
   ↓
4. Vercel/Netlify auto deploy
   ↓
5. Post live on site
```

---

## 🚀 Quick Start với Tina CMS

### Step 1: Install
```bash
npm install tinacms @tinacms/cli
npx @tinacms/cli init
```

### Step 2: Sign up Tina Cloud
- Go to https://app.tina.io
- Sign up (free)
- Create project
- Get credentials

### Step 3: Configure
Add to `.env`:
```bash
TINA_CLIENT_ID=your_id
TINA_TOKEN=your_token
```

### Step 4: Update package.json
```json
{
  "scripts": {
    "dev": "tinacms dev -c \"astro dev\"",
    "build": "tinacms build && astro build"
  }
}
```

### Step 5: Run
```bash
npm run dev
```

### Step 6: Access Admin
```
http://localhost:4321/admin
```

---

## 📚 Additional Features

### Image Upload
Tina CMS hỗ trợ upload images trực tiếp trong editor.

### Media Library
Browse và reuse images từ media library.

### Draft Posts
Toggle draft status để publish/unpublish posts.

### Preview
Live preview khi đang edit.

### Version History
Git history shows all changes.

---

## 🔒 Security Best Practices

1. **Never commit credentials** to git
2. Use **environment variables** for secrets
3. Enable **2FA** on Tina Cloud account
4. Use **GitHub protected branches**
5. Review commits before merging

---

## 📖 Resources

- [Tina CMS Docs](https://tina.io/docs/)
- [Tina + Astro Guide](https://tina.io/docs/frameworks/astro/)
- [Decap CMS Docs](https://decapcms.org/docs/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

---

**Ready to setup? Let's go with Tina CMS! 🚀**
