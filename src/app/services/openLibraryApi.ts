import { Resource } from '../types/resource';

export async function searchOpenLibrary(query: string, limit = 6): Promise<Resource[]> {
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
    const res = await fetch(url);
    const data = await res.json();

    return (data.docs ?? [])
      .filter((item: any) => item.title)
      .map((item: any) => ({
        id: `ol-${item.key?.replace('/works/', '')}`,
        title: item.title,
        description: item.first_sentence?.[0] ?? `A book about ${query} published by Open Library.`,
        type: 'pdf',
        category: 'Books',
        source: 'Open Library',
        url: item.ia?.[0]
          ? `https://archive.org/download/${item.ia[0]}/${item.ia[0]}.pdf`
          : `https://openlibrary.org${item.key}`,
        thumbnail: item.cover_i
          ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
          : 'https://openlibrary.org/static/images/openlibrary-logo-tighter.svg',
        author: item.author_name?.[0] ?? 'Unknown Author',
        pages: item.number_of_pages_median,
        publishedDate: item.first_publish_year
          ? `${item.first_publish_year}-01-01`
          : new Date().toISOString(),
        tags: (item.subject ?? []).slice(0, 5),
        rating: 3.8,
        views: item.readinglog_count ?? 0,
      }));
  } catch (err) {
    console.error('OpenLibrary error:', err);
    return [];
  }
}