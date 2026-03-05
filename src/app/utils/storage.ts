import { supabase } from '../../lib/supabaseClient';
import { Resource, SavedResource } from '../types/resource';

// ─── Save a resource ─────────────────────────────────────────────────────────

export async function saveResource(resource: Resource): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('resources').upsert({
    id: resource.id,
    title: resource.title,
    description: resource.description,
    type: resource.type,
    category: resource.category,
    source: resource.source,
    url: resource.url,
    thumbnail: resource.thumbnail,
    author: resource.author,
    duration: resource.duration ?? null,
    pages: resource.pages ?? null,
    read_time: resource.readTime ?? null,
    published_date: resource.publishedDate,
    tags: resource.tags,
    rating: resource.rating,
    views: resource.views,
    topic_id: resource.topic_id ?? null,
  });

  await supabase.from('saved_resources').upsert({
    user_id: user.id,
    resource_id: resource.id,
    saved_date: new Date().toISOString(),
  });
}

// ─── Remove a saved resource ─────────────────────────────────────────────────

export async function removeResource(resourceId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from('saved_resources')
    .delete()
    .eq('user_id', user.id)
    .eq('resource_id', resourceId);
}

// ─── Get all saved resources ─────────────────────────────────────────────────

export async function getSavedResources(): Promise<SavedResource[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('saved_resources')
    .select('id, saved_date, resources(*)')
    .eq('user_id', user.id)
    .order('saved_date', { ascending: false });

  if (!data) return [];

  return data.map((b: any) => ({
    ...b.resources,
    save_id: b.id,
    readTime: b.resources.read_time,
    publishedDate: b.resources.published_date,
    topic_id: b.resources.topic_id ?? undefined,
    savedAt: b.saved_date,
  }));
}

// ─── Check if a resource is saved ────────────────────────────────────────────

export async function isResourceSaved(resourceId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('saved_resources')
    .select('id')
    .eq('user_id', user.id)
    .eq('resource_id', resourceId)
    .single();

  return !!data;
}

// ─── Log search history ──────────────────────────────────────────────────────

export async function logSearchHistory(topicId: number): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('search_history').insert({
    user_id: user.id,
    topic_id: topicId,
    search_date: new Date().toISOString(),
  });
}

// ─── Get search history for current user ─────────────────────────────────────

export async function getSearchHistory() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('search_history')
    .select('*, topics(topic_name, description)')
    .eq('user_id', user.id)
    .order('search_date', { ascending: false });

  return data ?? [];
}