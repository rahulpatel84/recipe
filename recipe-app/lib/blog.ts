import blogPostsData from '@/data/blog.json';
import blogCategoriesData from '@/data/blog-categories.json';

export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface BlogContentBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'statistic' | 'image' | 'list' | 'chart';
  text?: string;
  level?: number;
  value?: string;
  label?: string;
  author?: string;
  src?: string;
  alt?: string;
  items?: string[];
  // Chart properties
  chartType?: 'bar' | 'pie' | 'horizontal-bar' | 'line';
  chartData?: ChartDataPoint[];
  title?: string;
  subtitle?: string;
  valueLabel?: string;
  showPercentage?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  image: string;
  tags: string[];
  content: BlogContentBlock[];
  relatedPosts: string[];
}

export interface BlogCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

export const blogPosts: BlogPost[] = blogPostsData as BlogPost[];
export const blogCategories: BlogCategory[] = blogCategoriesData as BlogCategory[];

// Get all blog posts
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Get posts by category
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts.filter(post => post.category === categorySlug);
}

// Get related posts
export function getRelatedPosts(post: BlogPost, limit: number = 3): BlogPost[] {
  const relatedIds = post.relatedPosts || [];
  const relatedByIds = blogPosts.filter(p => relatedIds.includes(p.id));

  if (relatedByIds.length >= limit) {
    return relatedByIds.slice(0, limit);
  }

  // Fill with posts from same category
  const sameCategoryPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id && !relatedIds.includes(p.id))
    .slice(0, limit - relatedByIds.length);

  return [...relatedByIds, ...sameCategoryPosts].slice(0, limit);
}

// Get all categories
export function getAllCategories(): BlogCategory[] {
  return blogCategories;
}

// Get category by slug
export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find(cat => cat.slug === slug);
}

// Get post count by category
export function getPostCountByCategory(categorySlug: string): number {
  return blogPosts.filter(post => post.category === categorySlug).length;
}

// Get all tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Generate blog post schema for SEO
export function generateBlogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      '@type': 'Organization',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Relish Realm',
      logo: {
        '@type': 'ImageObject',
        url: 'https://relishrealm.com/icon.png'
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://relishrealm.com/blog/${post.slug}`
    }
  };
}
