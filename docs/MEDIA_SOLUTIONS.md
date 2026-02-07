# 📸 Media Upload Solutions cho TinaCMS

## ⚠️ Problem

TinaCMS **Local Mode** (without auth) có giới hạn về media upload.

## 🎯 Solutions

### ✅ Option 1: Manual Upload (Simplest)

**For local testing - no TinaCMS upload needed**

#### How it works:

1. Manually add images to `public/uploads/`
2. Reference trong markdown với `/uploads/filename.jpg`

#### Steps:

**1. Add image to public folder:**

```bash
cp ~/Downloads/my-image.jpg public/uploads/
```

**2. Use trong TinaCMS:**

```
Hero Image field:
Type: /uploads/my-image.jpg
```

Or trong content:

```markdown
![My Image](/uploads/my-image.jpg)
```

**Pros:**

- ✅ Works immediately
- ✅ No setup needed
- ✅ Perfect for testing

**Cons:**

- ❌ Not automated
- ❌ Manual process

---

### ✅ Option 2: Cloudinary (Recommended)

**Free tier: 25GB storage + CDN**

#### Setup Steps:

**1. Sign up Cloudinary (Free):**

```
https://cloudinary.com/users/register/free
```

**2. Get credentials:**

```
Dashboard → Account Details
Cloud Name: xxxxxxx
API Key: xxxxxxx
API Secret: xxxxxxx
```

**3. Install package:**

```bash
npm install next-tinacms-cloudinary
```

**4. Update tina/config.ts:**

```typescript
import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: 'main',
  clientId: null,
  token: null,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  // Cloudinary media
  media: {
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-cloudinary');
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },

  schema: {
    // ... collections config
  },
});
```

**5. Create .env file:**

```bash
# .env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**6. Restart server:**

```bash
npm run dev
```

**7. Upload works!**

- Click upload trong TinaCMS
- Select image
- Auto uploaded to Cloudinary
- URL auto-inserted

**Pros:**

- ✅ Automated upload
- ✅ CDN delivery (fast)
- ✅ Auto optimization
- ✅ Free tier generous
- ✅ Works local & production

**Cons:**

- ❌ Need account
- ❌ External dependency

---

### ✅ Option 3: Tina Cloud Media (Best Integration)

**Free tier: 1GB storage**

#### Setup:

**1. Sign up Tina Cloud:**

```
https://app.tina.io/register
```

**2. Create project**

**3. Get credentials:**

```
TINA_CLIENT_ID=xxx
TINA_TOKEN=xxx
```

**4. Update tina/config.ts:**

```typescript
export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
});
```

**5. Add to .env:**

```bash
TINA_CLIENT_ID=your_id
TINA_TOKEN=your_token
```

**6. Restart & test**

**Pros:**

- ✅ Native integration
- ✅ Git-based
- ✅ Media library
- ✅ Version control
- ✅ Authentication included

**Cons:**

- ❌ Need account
- ❌ Requires auth

---

## 🎯 Quick Comparison

| Solution       | Setup Time | Cost      | Local Work | Auth Required |
| -------------- | ---------- | --------- | ---------- | ------------- |
| **Manual**     | 0 min      | Free      | ✅ Yes     | ❌ No         |
| **Cloudinary** | 15 min     | Free tier | ✅ Yes     | ❌ No         |
| **Tina Cloud** | 10 min     | Free tier | ✅ Yes     | ✅ Yes        |

---

## 🚀 Quick Fix: Manual Upload for Testing

**Right now, để test:**

### Step 1: Add image manually

```bash
# Copy image to public/uploads/
cp ~/Downloads/hero.jpg public/uploads/
```

### Step 2: Use trong TinaCMS

**Hero Image field:**

```
Type: /uploads/hero.jpg
```

**Or trong content markdown:**

```markdown
![Hero](/uploads/hero.jpg)
```

### Step 3: Check result

Visit blog post to see image!

---

## 💡 My Recommendation

### For Now (Testing):

✅ **Manual Upload**

- Add images to `public/uploads/`
- Reference `/uploads/filename.jpg`

### For Production:

✅ **Cloudinary**

- Free tier (25GB)
- Auto optimization
- CDN fast delivery
- Easy setup

---

## 📋 Setup Cloudinary (Detailed)

Want me to setup Cloudinary for you? It only takes 15 minutes:

1. Sign up Cloudinary (free)
2. Get credentials
3. Install package
4. Update config
5. Test upload

---

**Bạn muốn:**

1. ✅ Dùng manual upload tạm (quick fix)
2. ✅ Setup Cloudinary ngay (15 mins)
3. ✅ Setup Tina Cloud (10 mins, requires auth)

Let me know! 🚀
