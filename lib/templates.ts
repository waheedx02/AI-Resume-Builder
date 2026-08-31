export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'template-1',
    name: 'Minimalist Clean',
    description: 'A sleek, single-column design suited for software engineers and tech professionals.',
    badge: 'Popular',
  },
  {
    id: 'template-2',
    name: 'Modern Executive',
    description: 'A elegant, bold header style designed for managers, marketers, and lead roles.',
    badge: 'New',
  },
];