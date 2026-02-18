// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mermaid from 'astro-mermaid';
import expressiveCode from 'astro-expressive-code';
import { getLanguageLabel } from './src/shared/lib/utils/code-language-labels';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-dark',
        dark: 'github-light',
      },
    },
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex],
  },
  integrations: [
    expressiveCode({
      plugins: [
        {
          name: 'ShowLanguageTitle',
          hooks: {
            preprocessCode: ({ codeBlock }) => {
              if (codeBlock.props.title || codeBlock.props.frame === 'none') return;
              codeBlock.props.title = getLanguageLabel(codeBlock.language);
            },
          },
        },
      ],
    }),
    mdx(),
    sitemap(),
    react(),
    partytown(),
    mermaid({
      theme: 'dark',
      autoTheme: true,
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg?react',
      }),
    ],
  },
});
