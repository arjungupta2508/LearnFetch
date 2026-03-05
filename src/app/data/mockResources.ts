import { Resource, ResourceCategory, Topic } from '../types/resource';

export const mockTopics: Topic[] = [
  { topic_id: 1, topic_name: 'Programming',  description: 'Software development and coding' },
  { topic_id: 2, topic_name: 'Design',       description: 'UI/UX and visual design' },
  { topic_id: 3, topic_name: 'Business',     description: 'Entrepreneurship and management' },
  { topic_id: 4, topic_name: 'Science',      description: 'Natural and applied sciences' },
  { topic_id: 5, topic_name: 'Mathematics',  description: 'Pure and applied mathematics' },
];

export const mockResourceDatabase: Resource[] = [
  {
    id: '1',
    title: 'Complete React Tutorial for Beginners',
    description: 'Learn React from scratch with this comprehensive tutorial covering hooks, state management, and modern best practices.',
    type: 'video', category: 'Programming', source: 'TechEdu',
    url: 'https://example.com/react-tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    author: 'Sarah Johnson', duration: '2h 45m', publishedDate: '2026-01-15',
    tags: ['react', 'javascript', 'web development', 'frontend'],
    rating: 4.8, views: 125000, topic_id: 1,
  },
  {
    id: '2',
    title: 'Python Data Science Masterclass',
    description: 'Master data science with Python, including NumPy, Pandas, and machine learning fundamentals.',
    type: 'video', category: 'Programming', source: 'DataCamp',
    url: 'https://example.com/python-ds',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    author: 'Dr. Michael Chen', duration: '4h 20m', publishedDate: '2026-02-01',
    tags: ['python', 'data science', 'machine learning', 'pandas'],
    rating: 4.9, views: 89000, topic_id: 1,
  },
  {
    id: '3',
    title: 'Modern JavaScript Development Guide',
    description: 'A comprehensive guide to modern JavaScript development practices, ES6+, and advanced patterns.',
    type: 'pdf', category: 'Programming', source: 'DevDocs',
    url: 'https://example.com/js-guide.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
    author: 'Alex Rivera', pages: 245, publishedDate: '2025-11-20',
    tags: ['javascript', 'es6', 'programming', 'guide'],
    rating: 4.7, views: 45000, topic_id: 1,
  },
  {
    id: '4',
    title: 'Database Design Principles',
    description: 'Learn fundamental principles of database design, normalization, and optimization strategies.',
    type: 'pdf', category: 'Programming', source: 'TechPapers',
    url: 'https://example.com/db-design.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    author: 'Dr. Emily Watson', pages: 180, publishedDate: '2025-12-10',
    tags: ['database', 'sql', 'design', 'architecture'],
    rating: 4.6, views: 32000, topic_id: 1,
  },
  {
    id: '5',
    title: 'Understanding React Server Components',
    description: 'Deep dive into React Server Components, their benefits, and how to implement them in your applications.',
    type: 'article', category: 'Programming', source: 'CodeBlog',
    url: 'https://example.com/rsc-guide',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    author: 'James Martinez', readTime: '12 min', publishedDate: '2026-02-10',
    tags: ['react', 'server components', 'next.js', 'web'],
    rating: 4.5, views: 28000, topic_id: 1,
  },
  {
    id: '6',
    title: 'Introduction to TypeScript Generics',
    description: 'Master TypeScript generics with practical examples and real-world use cases.',
    type: 'article', category: 'Programming', source: 'TypeScript Weekly',
    url: 'https://example.com/ts-generics',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    author: 'Lisa Anderson', readTime: '8 min', publishedDate: '2026-02-05',
    tags: ['typescript', 'generics', 'programming', 'types'],
    rating: 4.7, views: 19000, topic_id: 1,
  },
  {
    id: '7',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the core principles of user interface and user experience design for modern applications.',
    type: 'video', category: 'Design', source: 'DesignSchool',
    url: 'https://example.com/uiux-fundamentals',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    author: 'Emma Wilson', duration: '3h 15m', publishedDate: '2026-01-25',
    tags: ['ui', 'ux', 'design', 'figma'],
    rating: 4.9, views: 67000, topic_id: 2,
  },
  {
    id: '8',
    title: 'Color Theory for Designers',
    description: 'Comprehensive guide to color theory, palettes, and psychology in design.',
    type: 'pdf', category: 'Design', source: 'DesignDocs',
    url: 'https://example.com/color-theory.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800',
    author: 'Carlos Rodriguez', pages: 95, publishedDate: '2025-10-15',
    tags: ['color', 'design', 'theory', 'visual'],
    rating: 4.8, views: 41000, topic_id: 2,
  },
  {
    id: '9',
    title: 'Designing Accessible Web Experiences',
    description: 'Best practices for creating inclusive and accessible web designs that work for everyone.',
    type: 'article', category: 'Design', source: 'A11y Blog',
    url: 'https://example.com/accessible-design',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
    author: 'Rachel Kim', readTime: '10 min', publishedDate: '2026-02-08',
    tags: ['accessibility', 'a11y', 'design', 'web'],
    rating: 4.6, views: 15000, topic_id: 2,
  },
  {
    id: '10',
    title: 'Digital Marketing Strategy 2026',
    description: 'Learn the latest digital marketing strategies and tactics for growing your business online.',
    type: 'video', category: 'Business', source: 'BusinessHub',
    url: 'https://example.com/marketing-2026',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    author: 'David Thompson', duration: '2h 30m', publishedDate: '2026-01-05',
    tags: ['marketing', 'business', 'digital', 'strategy'],
    rating: 4.4, views: 52000, topic_id: 3,
  },
  {
    id: '11',
    title: 'Startup Financial Planning Guide',
    description: 'Essential financial planning strategies for startup founders and entrepreneurs.',
    type: 'pdf', category: 'Business', source: 'StartupDocs',
    url: 'https://example.com/startup-finance.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    author: 'Jennifer Lee', pages: 120, publishedDate: '2025-11-30',
    tags: ['startup', 'finance', 'business', 'planning'],
    rating: 4.7, views: 38000, topic_id: 3,
  },
  {
    id: '12',
    title: 'Building Effective Remote Teams',
    description: 'Strategies and tools for managing and scaling remote teams in the modern workplace.',
    type: 'article', category: 'Business', source: 'Remote Work Magazine',
    url: 'https://example.com/remote-teams',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    author: 'Mark Stevens', readTime: '15 min', publishedDate: '2026-02-12',
    tags: ['remote work', 'management', 'teams', 'business'],
    rating: 4.5, views: 22000, topic_id: 3,
  },
  {
    id: '13',
    title: 'Introduction to Quantum Computing',
    description: 'Explore the fundamentals of quantum computing and its potential applications.',
    type: 'video', category: 'Science', source: 'ScienceEdu',
    url: 'https://example.com/quantum-computing',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    author: 'Dr. Alan Foster', duration: '1h 50m', publishedDate: '2026-01-20',
    tags: ['quantum', 'computing', 'physics', 'science'],
    rating: 4.8, views: 44000, topic_id: 4,
  },
  {
    id: '14',
    title: 'Climate Change: Current Research',
    description: 'Latest findings and research papers on climate change and environmental science.',
    type: 'pdf', category: 'Science', source: 'Nature Journal',
    url: 'https://example.com/climate-research.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800',
    author: 'Dr. Maria Garcia', pages: 210, publishedDate: '2025-12-15',
    tags: ['climate', 'environment', 'research', 'science'],
    rating: 4.9, views: 56000, topic_id: 4,
  },
  {
    id: '15',
    title: 'Linear Algebra for Machine Learning',
    description: 'Essential linear algebra concepts for understanding machine learning algorithms.',
    type: 'video', category: 'Mathematics', source: 'MathAcademy',
    url: 'https://example.com/linear-algebra-ml',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800',
    author: 'Prof. Robert Brown', duration: '3h 40m', publishedDate: '2026-01-10',
    tags: ['linear algebra', 'mathematics', 'machine learning', 'math'],
    rating: 4.7, views: 71000, topic_id: 5,
  },
  {
    id: '16',
    title: 'Calculus Problem Solving Techniques',
    description: 'Advanced techniques for solving complex calculus problems with step-by-step examples.',
    type: 'pdf', category: 'Mathematics', source: 'MathLibrary',
    url: 'https://example.com/calculus-techniques.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=800',
    author: 'Dr. Susan Taylor', pages: 165, publishedDate: '2025-11-05',
    tags: ['calculus', 'mathematics', 'problem solving', 'education'],
    rating: 4.6, views: 33000, topic_id: 5,
  },
];

export function aggregateResources(query: string, filters?: {
  type?: string;
  category?: string;
  sortBy?: string;
  topicId?: number;
}): Resource[] {
  let results = [...mockResourceDatabase];

  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      resource.category.toLowerCase().includes(searchTerm)
    );
  }

  if (filters?.type && filters.type !== 'all') {
    results = results.filter(resource => resource.type === filters.type);
  }

  if (filters?.category && filters.category !== 'all') {
    results = results.filter(resource => resource.category === filters.category);
  }

  if (filters?.topicId) {
    results = results.filter(resource => resource.topic_id === filters.topicId);
  }

  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'recent':
        results.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        break;
      case 'popular':
        results.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  return results;
}

export function getResourceById(id: string): Resource | undefined {
  return mockResourceDatabase.find(resource => resource.id === id);
}

export const categories: ResourceCategory[] = [
  'Programming', 'Design', 'Business', 'Science',
  'Mathematics', 'Languages', 'Arts', 'Health',
];