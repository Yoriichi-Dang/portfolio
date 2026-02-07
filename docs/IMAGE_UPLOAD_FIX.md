# 🖼️ TinaCMS Image Upload Fix

## ⚠️ Issue

TinaCMS local mode không support upload ảnh với default config.

## ✅ Solutions

### Option 1: Public Folder (Local Dev) - IMPLEMENTED ✅

**Config updated:**
```typescript
media: {
  tina: {
    mediaRoot: "uploads",    // Images saved to public/uploads/
    publicFolder: "public",
  },
}
```

**How it works:**
```
1. Upload image trong TinaCMS editor
   ↓
2. Image saved to: public/uploads/image.jpg
   ↓
3. Image URL: /uploads/image.jpg
   ↓
4. Accessible at: http://localhost:4323/uploads/image.jpg
```

**Restart server để apply changes:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### Option 2: Cloudinary (Recommended for Production)

**Benefits:**
- ✅ Free tier (25GB storage)
- ✅ Auto image optimization
- ✅ CDN delivery
- ✅ No git bloat

**Setup:**

#### 1. Sign up Cloudinary
```
https://cloudinary.com
```

#### 2. Get credentials
```
Cloud name: your-cloud-name
API Key: your-key
API Secret: your-secret
```

#### 3. Install
```bash
npm install next-tinacms-cloudinary
```

#### 4. Update tina/config.ts
```typescript
import { defineConfig } from "tinacms";

export default defineConfig({
  // ...
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
});
```

#### 5. Add to .env
```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

---

### Option 3: Tina Cloud (Auth Required)

**Benefits:**
- ✅ Built-in media management
- ✅ Free tier (1GB storage)
- ✅ Git-based
- ✅ Version control

**Setup:**

#### 1. Sign up
```
https://app.tina.io
```

#### 2. Create project

#### 3. Get credentials
```
TINA_CLIENT_ID=xxx
TINA_TOKEN=xxx
```

#### 4. Update tina/config.ts
```typescript
export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
});
```

#### 5. Add to .env
```bash
TINA_CLIENT_ID=your_id
TINA_TOKEN=your_token
```

---

## 🔧 Current Setup (After Fix)

### Images Location
```
public/
└── uploads/           # Images uploaded here
    ├── image1.jpg
    ├── image2.png
    └── ...
```

### Image URLs
```
/uploads/image1.jpg
/uploads/image2.png
```

### In Markdown
```markdown
---
heroImage: /uploads/hero.jpg
---

![My Image](/uploads/image1.jpg)
```

---

## 🎯 Test Upload

### Step 1: Restart server
```bash
npm run dev
```

### Step 2: Open admin
```
http://localhost:4323/admin/index.html
```

### Step 3: Create/Edit post

### Step 4: Upload image

**Method 1: Hero Image Field**
```
Hero Image: [📁 Upload]
→ Click Upload
→ Select image
→ Image uploaded to public/uploads/
```

**Method 2: In Content**
```
Click image button in toolbar
→ Upload image
→ Image inserted in content
```

### Step 5: Check result
```bash
ls -la public/uploads/
# Should see your uploaded images
```

---

## 🐛 Troubleshooting

### Still can't upload?

#### Check 1: Folder exists
```bash
ls -la public/uploads/
```

If not:
```bash
mkdir -p public/uploads
```

#### Check 2: Restart server
```bash
npm run dev
```

#### Check 3: Check browser console
```
F12 → Console tab
Look for errors
```

#### Check 4: Try Cloudinary
If local upload still doesn't work, use Cloudinary (free tier).

---

## 💡 Recommendation

### For Development:
✅ **Use public/uploads/** (current setup)
- Simple
- Works locally
- No external service

### For Production:
✅ **Use Cloudinary**
- Free tier generous
- Auto optimization
- CDN delivery
- No git bloat

---

## 🚀 Next Steps

1. **Restart server:**
   ```bash
   npm run dev
   ```

2. **Try upload again:**
   - Open /admin/index.html
   - Create/edit post
   - Click upload image
   - Should work now! ✨

3. **If still issues:**
   - Check browser console for errors
   - Try Cloudinary setup
   - Check file permissions

---

**After restart, upload should work! 🎉**
