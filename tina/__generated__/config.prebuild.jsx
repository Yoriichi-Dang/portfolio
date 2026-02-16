// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "feat/implement-projects",
  clientId: "59dace28-4c42-4aa8-b07c-d7f053ac0363",
  token: "121820824c75191335950e45b196668861001f94",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  // Media management - use public folder for local dev
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  // Content schema
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "md",
        // or 'mdx'
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publication Date",
            required: true
          },
          {
            type: "datetime",
            name: "updatedDate",
            label: "Updated Date"
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image"
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            description: "Hide from public"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
