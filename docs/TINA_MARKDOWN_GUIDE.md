# 📝 TinaCMS Markdown Complete Guide

## ✅ TinaCMS Markdown Support Overview

TinaCMS có **3 cách làm việc với Markdown:**

### 1. 🎨 Rich Text Editor (Visual) - **RECOMMENDED**

- WYSIWYG editing như Notion/Medium
- Live preview
- Lưu dưới dạng Markdown
- Hỗ trợ MDX components

### 2. 📄 Raw Markdown Editor

- Code editor với syntax highlighting
- Direct markdown editing
- Cho advanced users

### 3. 🧩 MDX với Custom Components

- Embed React components vào markdown
- Interactive content
- Full customization

---

## 🎨 Rich Text Editor (Visual Mode)

### UI Preview

````
┌─────────────────────────────────────────────────────┐
│  [Bold] [Italic] [H1] [H2] [Link] [Image] [Code]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  # My Blog Post                                     │
│                                                     │
│  This is **bold** and *italic* text.              │
│                                                     │
│  - List item 1                                     │
│  - List item 2                                     │
│                                                     │
│  ```javascript                                      │
│  const hello = "world";                            │
│  ```                                               │
│                                                     │
│  [Insert Component ▼]                              │
│                                                     │
└─────────────────────────────────────────────────────┘
````

### What You Type

```
Toolbar: Bold button
```

### What Gets Saved

```markdown
**bold text**
```

### Features Supported

#### ✅ Text Formatting

- **Bold** → `**text**`
- _Italic_ → `*text*`
- ~~Strikethrough~~ → `~~text~~`
- `Inline code` → `` `code` ``

#### ✅ Headings

- H1 → `# Heading 1`
- H2 → `## Heading 2`
- H3 → `### Heading 3`
- H4-H6 → Supported

#### ✅ Lists

- Bullet list → `- item`
- Numbered list → `1. item`
- Nested lists → Supported

#### ✅ Links & Images

- Link → `[text](url)`
- Image → `![alt](url)`
- Upload images directly

#### ✅ Code Blocks

````markdown
```javascript
const code = "here";
```
````

````

#### ✅ Quotes
```markdown
> This is a quote
````

#### ✅ Tables

```markdown
| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```

---

## 📄 Raw Markdown Mode

### Configuration

```typescript
{
  type: 'string',
  name: 'content',
  label: 'Content (Raw Markdown)',
  ui: {
    component: 'markdown',
  },
}
```

### UI Preview

````
┌─────────────────────────────────────────────────────┐
│  RAW MARKDOWN MODE                                  │
├─────────────────────────────────────────────────────┤
│  # My Blog Post                                     │
│                                                     │
│  This is **bold** and *italic* text.              │
│                                                     │
│  - Item 1                                          │
│  - Item 2                                          │
│                                                     │
│  ```js                                             │
│  const hello = "world";                            │
│  ```                                               │
└─────────────────────────────────────────────────────┘
````

**When to use:**

- Prefer raw markdown over visual editor
- Need precise control
- Advanced markdown features
- Copy/paste from other sources

---

## 🧩 MDX Support (Markdown + Components)

### What is MDX?

MDX = **Markdown + JSX/React Components**

Example:

```mdx
# My Blog Post

Regular markdown text here.

<Callout type="info">This is a custom component inside markdown!</Callout>

More markdown...

<CodeBlock language="javascript">const hello = "world";</CodeBlock>
```

### TinaCMS MDX Configuration

```typescript
{
  type: 'rich-text',
  name: 'body',
  label: 'Content',
  isBody: true,

  // Define custom components
  templates: [
    {
      name: 'Callout',
      label: 'Callout Box',
      fields: [
        {
          name: 'type',
          type: 'string',
          options: ['info', 'warning', 'success'],
        },
        {
          name: 'content',
          type: 'string',
          ui: { component: 'textarea' },
        },
      ],
    },
  ],
}
```

### In TinaCMS Editor

```
┌─────────────────────────────────────────────────────┐
│  Regular markdown text...                           │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ 💡 CALLOUT (Info)                             │ │
│  │ ─────────────────────────────────────────────│ │
│  │ This is important information                │ │
│  │ [Edit] [Delete]                              │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  More markdown text...                              │
│                                                     │
│  [+ Insert Component ▼]                             │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Real-World Example

### TinaCMS Config

```typescript
// tina/config.ts
{
  collections: [
    {
      name: 'blog',
      path: 'src/content/blog',
      format: 'mdx',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'rich-text',
          name: 'body',
          label: 'Content',
          isBody: true,
          templates: [
            // Alert Box
            {
              name: 'Alert',
              label: 'Alert Box',
              fields: [
                { name: 'type', type: 'string', options: ['info', 'warning', 'success', 'error'] },
                { name: 'message', type: 'string' },
              ],
            },
            // Code Block
            {
              name: 'CodeBlock',
              label: 'Code Block',
              fields: [
                { name: 'code', type: 'string', ui: { component: 'textarea' } },
                { name: 'language', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
```

### What Editor Looks Like

```
┌─────────────────────────────────────────────────────┐
│  BLOG POST EDITOR                                   │
├─────────────────────────────────────────────────────┤
│  Title: [How to Use TinaCMS                ]       │
│                                                     │
│  Content:                                           │
│  ┌───────────────────────────────────────────────┐ │
│  │ # Introduction                               │ │
│  │                                               │ │
│  │ TinaCMS is a **Git-based CMS** for modern    │ │
│  │ web frameworks.                               │ │
│  │                                               │ │
│  │ ┌─────────────────────────────────────────┐  │ │
│  │ │ ℹ️ INFO ALERT                           │  │ │
│  │ │ Remember to commit your changes!        │  │ │
│  │ └─────────────────────────────────────────┘  │ │
│  │                                               │ │
│  │ ## Features                                   │ │
│  │                                               │ │
│  │ - Visual editing                              │ │
│  │ - Markdown support                            │ │
│  │ - MDX components                              │ │
│  │                                               │ │
│  │ [+ Add Component ▼]                          │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  [Save Draft]  [Publish]                           │
└─────────────────────────────────────────────────────┘
```

### Resulting Markdown File

```mdx
---
title: How to Use TinaCMS
---

# Introduction

TinaCMS is a **Git-based CMS** for modern web frameworks.

<Alert type="info">Remember to commit your changes!</Alert>

## Features

- Visual editing
- Markdown support
- MDX components
```

---

## 💡 Workflow Example

### 1. Start Dev Server

```bash
npm run dev
```

### 2. Open Admin

```
http://localhost:4321/admin
```

### 3. Login with Tina Cloud

### 4. Create New Post

- Click "Create New"
- Fill in title, metadata
- Write content in rich text editor

### 5. Use Toolbar

```
[B] Bold text
[I] Italic text
[H1] Heading 1
[🔗] Add link
[🖼️] Insert image
[</>] Code block
[+] Insert component
```

### 6. Insert Custom Components

- Click [+ Add Component]
- Select component (Alert, CodeBlock, etc.)
- Fill in component fields
- Component inserted visually

### 7. Preview

- Real-time preview in editor
- Or click "Preview" to see full page

### 8. Save

- Click "Save" → Commits to git
- Changes pushed to repo
- Auto-deploy updates site

---

## 🎯 Best Practices

### ✅ DO

1. **Use Rich Text Editor** for most content

   - Easier for non-technical users
   - Visual feedback
   - Less error-prone

2. **Define Custom Components** for repeated patterns

   - Callout boxes
   - Code blocks
   - Embedded media
   - Custom layouts

3. **Enable Image Upload**

   - Direct image upload in editor
   - Auto-optimize images
   - Manage in media library

4. **Use MDX for Interactive Content**
   - Charts, graphs
   - Interactive demos
   - Custom UI elements

### ❌ DON'T

1. **Don't mix raw and visual editing**

   - Pick one mode per post
   - Visual mode is safer

2. **Don't manually edit saved files**

   - Always edit through TinaCMS
   - Prevents format issues

3. **Don't overcomplicate components**
   - Keep components simple
   - Too many options confuse users

---

## 📊 Feature Comparison

| Feature               | Rich Text  | Raw Markdown | MDX         |
| --------------------- | ---------- | ------------ | ----------- |
| **Ease of Use**       | ⭐⭐⭐⭐⭐ | ⭐⭐⭐       | ⭐⭐⭐⭐    |
| **Visual Feedback**   | ✅ Yes     | ❌ No        | ✅ Yes      |
| **Component Support** | ✅ Yes     | ❌ No        | ✅ Yes      |
| **Learning Curve**    | Low        | Medium       | Low         |
| **Flexibility**       | Medium     | High         | High        |
| **Best For**          | Most users | Developers   | Interactive |

---

## 🚀 Quick Setup Checklist

- [ ] Install TinaCMS: `npm install tinacms @tinacms/cli`
- [ ] Run init: `npx @tinacms/cli init`
- [ ] Configure `tina/config.ts` with markdown fields
- [ ] Add `rich-text` field for content
- [ ] Define custom MDX templates (optional)
- [ ] Start dev: `npm run dev`
- [ ] Open admin: `http://localhost:4321/admin`
- [ ] Login with Tina Cloud
- [ ] Create first post with markdown!

---

## 🎓 Learning Resources

- [TinaCMS Docs - Rich Text](https://tina.io/docs/editing/markdown/)
- [TinaCMS MDX Guide](https://tina.io/docs/editing/mdx/)
- [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)
- [MDX Documentation](https://mdxjs.com/)

---

**TinaCMS + Markdown = Perfect Combo! ✨**
