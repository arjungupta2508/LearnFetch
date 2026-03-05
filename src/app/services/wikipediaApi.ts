import { Resource } from '../types/resource';

export async function searchWikipedia(query: string, limit = 6): Promise<Resource[]> {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=${limit}`;
    const res = await fetch(url);
    const data = await res.json();

    return (data.query?.search ?? []).map((item: any) => ({
      id: `wiki-${item.pageid}`,
      title: item.title,
      description: item.snippet.replace(/<[^>]+>/g, ''),
      type: 'article',
      category: 'Encyclopedia',
      source: 'Wikipedia',
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/300px-Wikipedia-logo-v2.svg.png',
      author: 'Wikipedia Contributors',
      readTime: `${Math.ceil(item.wordcount / 200)} min read`,
      publishedDate: item.timestamp?.split('T')[0] ?? new Date().toISOString(),
      tags: ['wikipedia', 'encyclopedia', query.toLowerCase()],
      rating: 4.2,
      views: item.size ?? 0,
    }));
  } catch (err) {
    console.error('Wikipedia error:', err);
    return [];
  }
}