import type { CollectionEntry } from 'astro:content';

// Type from Astro Content Collection
export type BlogCollectionEntry = CollectionEntry<'blog'>;

// Formatted type for UI display
export interface BlogPostDisplay {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  date: Date;
  updatedDate?: Date;
  category?: string;
  tags?: string[];
  draft?: boolean;
}

// Helper function to convert CollectionEntry to BlogPostDisplay
export function toBlogPostDisplay(entry: BlogCollectionEntry): BlogPostDisplay {
  return {
    id: entry.id,
    slug: entry.id,
    title: entry.data.title,
    description: entry.data.description,
    image: typeof entry.data.heroImage === 'string' ? entry.data.heroImage : undefined,
    date: entry.data.pubDate,
    updatedDate: entry.data.updatedDate,
    tags: entry.data.tags,
    draft: entry.data.draft,
  };
}
