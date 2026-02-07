import type { ImageMetadata } from 'astro';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string | ImageMetadata;
  tags?: string[];
};
