import { Resource } from '../types/resource';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function searchYouTube(query: string, maxResults = 12): Promise<Resource[]> {
  if (!API_KEY) {
    console.error('Missing VITE_YOUTUBE_API_KEY in .env');
    return [];
  }

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    part: 'snippet',
    type: 'video',
    maxResults: String(maxResults),
    relevanceLanguage: 'en',
    videoEmbeddable: 'true',
  });

  const res = await fetch(`${BASE_URL}/search?${params}`);
  if (!res.ok) {
    console.error('YouTube API error:', res.status, await res.text());
    return [];
  }

  const data = await res.json();

  // Fetch video durations separately
  const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
  const detailParams = new URLSearchParams({
    key: API_KEY,
    id: videoIds,
    part: 'contentDetails,statistics',
  });

  const detailRes = await fetch(`${BASE_URL}/videos?${detailParams}`);
  const detailData = detailRes.ok ? await detailRes.json() : { items: [] };

  const detailMap: Record<string, any> = {};
  for (const item of detailData.items) {
    detailMap[item.id] = item;
  }

  return data.items.map((item: any): Resource => {
    const videoId = item.id.videoId;
    const snippet = item.snippet;
    const detail = detailMap[videoId];
    const duration = detail ? parseDuration(detail.contentDetails.duration) : undefined;
    const views = detail ? Number(detail.statistics.viewCount) : 0;

    return {
      id: videoId,
      title: snippet.title,
      description: snippet.description || 'No description available.',
      type: 'video',
      category: inferCategory(snippet.title + ' ' + snippet.description),
      source: 'YouTube',
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
      author: snippet.channelTitle,
      duration,
      publishedDate: snippet.publishedAt?.split('T')[0] ?? '',
      tags: extractTags(snippet.title),
      rating: 0,
      views,
    };
  });
}

// ISO 8601 duration → "1h 23m"
function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const h = match[1] ? `${match[1]}h ` : '';
  const m = match[2] ? `${match[2]}m` : '';
  return (h + m).trim() || '< 1m';
}

// Guess category from title/description
function inferCategory(text: string): string {
  const t = text.toLowerCase();
  if (/python|javascript|typescript|react|node|css|html|programming|coding|developer|software|algorithm|data structure/.test(t)) return 'Programming';
  if (/design|figma|ui|ux|graphic|illustration|typography|color/.test(t)) return 'Design';
  if (/business|marketing|startup|entrepreneur|finance|investment|management/.test(t)) return 'Business';
  if (/science|physics|chemistry|biology|research|experiment/.test(t)) return 'Science';
  if (/math|calculus|algebra|statistics|geometry|probability/.test(t)) return 'Mathematics';
  if (/language|english|spanish|french|japanese|chinese|learning|grammar/.test(t)) return 'Languages';
  if (/art|painting|drawing|music|photography|creative/.test(t)) return 'Arts';
  if (/health|fitness|nutrition|workout|mental|yoga|meditation/.test(t)) return 'Health';
  return 'Programming'; // default
}

// Extract keywords from title as tags
function extractTags(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .filter(w => w.length > 3)
    .slice(0, 6);
}