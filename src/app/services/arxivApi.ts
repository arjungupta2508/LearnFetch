import { Resource } from '../types/resource';

export async function searchArxiv(query: string, max = 6): Promise<Resource[]> {
  try {
    const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=${max}`;
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const entries = Array.from(xml.querySelectorAll('entry'));

    return entries.map((e) => {
      const id = e.querySelector('id')?.textContent ?? '';
      const pdfUrl = id.replace('abs', 'pdf');
      const tags = Array.from(e.querySelectorAll('category'))
        .map((c) => c.getAttribute('term') ?? '')
        .filter(Boolean);

      return {
        id: `arxiv-${id.split('/').pop()}`,
        title: e.querySelector('title')?.textContent?.trim() ?? 'Untitled',
        description: e.querySelector('summary')?.textContent?.trim() ?? '',
        type: 'pdf',
        category: 'Research',
        source: 'arXiv',
        url: pdfUrl,
        thumbnail: 'https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-fb.png',
        author: e.querySelector('author name')?.textContent ?? 'Unknown',
        pages: undefined,
        publishedDate: e.querySelector('published')?.textContent?.split('T')[0] ?? new Date().toISOString(),
        tags: tags.slice(0, 5),
        rating: 4.0,
        views: 0,
      };
    });
  } catch (err) {
    console.error('arXiv error:', err);
    return [];
  }
}