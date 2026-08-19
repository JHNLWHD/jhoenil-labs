import type { ComponentType } from 'react';
import ClientProjectGovernance, { metadata as clientProjectGovernance } from '@/content/articles/client-project-governance.mdx';

type Article = typeof clientProjectGovernance & { Content: ComponentType };

export const articles: Article[] = [
  { ...clientProjectGovernance, Content: ClientProjectGovernance },
];
