export interface BlogPost {
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  slug: string;
  tags?: string[];
  author?: string;
  authorAvatar?: string;
  readTime?: string;
}
