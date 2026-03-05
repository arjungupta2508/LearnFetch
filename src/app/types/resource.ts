export type ResourceType = 'video' | 'pdf' | 'article';

export type ResourceCategory =
  | 'Programming'
  | 'Design'
  | 'Business'
  | 'Science'
  | 'Mathematics'
  | 'Languages'
  | 'Arts'
  | 'Health'
  | 'Research'
  | 'Encyclopedia'
  | 'Books';

// ─── Topic ───────────────────────────────────────────────────────────────────

export interface Topic {
  topic_id: number;
  topic_name: string;
  description?: string;
}

// ─── Resource ────────────────────────────────────────────────────────────────

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: ResourceCategory;
  source: string;
  url: string;
  thumbnail: string;
  author: string;
  duration?: string;
  pages?: number;
  readTime?: string;
  publishedDate: string;
  tags: string[];
  rating: number;
  views: number;
  topic_id?: number;   // FK → topics.topic_id
  topic?: Topic;       // optional joined topic object
}

// ─── Saved Resource ──────────────────────────────────────────────────────────

export interface SavedResource extends Resource {
  save_id: number;     // PK from saved_resources table
  savedAt: string;     // maps to saved_date column in DB
  notes?: string;
}

// ─── Search History ──────────────────────────────────────────────────────────

export interface SearchHistory {
  search_id: number;
  user_id: string;     // FK → auth.users
  topic_id: number;    // FK → topics
  search_date: string;
}