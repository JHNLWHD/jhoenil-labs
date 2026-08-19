/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const metadata: {
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    readingTime: string;
    aiAssisted: boolean;
    sources: { label: string; url: string }[];
  };

  const Content: ComponentType;
  export default Content;
}
