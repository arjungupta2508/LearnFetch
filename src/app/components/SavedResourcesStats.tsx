import { SavedResource } from '../types/resource';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Video, FileText, BookOpen, Layers } from 'lucide-react';

interface SavedResourcesStatsProps {
  resources: SavedResource[];
}

export function SavedResourcesStats({ resources }: SavedResourcesStatsProps) {
  const stats = {
    total: resources.length,
    videos: resources.filter(r => r.type === 'video').length,
    pdfs: resources.filter(r => r.type === 'pdf').length,
    articles: resources.filter(r => r.type === 'article').length,
  };

  const categoryBreakdown = resources.reduce((acc, resource) => {
    acc[resource.category] = (acc[resource.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="border-2 border-indigo-200 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-indigo-700">Total Saved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded-lg">
              <Layers className="size-5" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stats.total}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-red-200 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-red-50 to-pink-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-red-700">Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white p-2 rounded-lg">
              <Video className="size-5" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{stats.videos}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-blue-700">PDFs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-2 rounded-lg">
              <FileText className="size-5" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{stats.pdfs}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-emerald-200 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-emerald-700">Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-2 rounded-lg">
              <BookOpen className="size-5" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{stats.articles}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}