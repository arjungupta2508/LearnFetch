import { useParams, Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getResourceById, mockTopics } from '../data/mockResources';
import { Resource } from '../types/resource';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import {
  FileText, Video, BookOpen, ExternalLink, Bookmark, BookmarkCheck,
  ArrowLeft, Clock, Eye, Star, Calendar, User, Building2, Tag,
} from 'lucide-react';
import { isResourceSaved, saveResource, removeResource } from '../utils/storage';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<Resource | null>(null);
  const [saved, setSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const foundResource = getResourceById(id);
      if (foundResource) {
        const topic = foundResource.topic_id
          ? mockTopics.find(t => t.topic_id === foundResource.topic_id)
          : undefined;
        setResource({ ...foundResource, topic });
        isResourceSaved(id).then(setSaved);
      }
    }
  }, [id]);

  if (!resource) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">Resource not found</p>
        <Button asChild className="mt-4"><Link to="/">Back to Search</Link></Button>
      </div>
    );
  }

  const getTypeIcon = () => {
    switch (resource.type) {
      case 'video':   return <Video className="size-5" />;
      case 'pdf':     return <FileText className="size-5" />;
      case 'article': return <BookOpen className="size-5" />;
    }
  };

  const getTypeColor = () => {
    switch (resource.type) {
      case 'video':   return 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0';
      case 'pdf':     return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0';
      case 'article': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0';
    }
  };

  const getDurationInfo = () => {
    if (resource.duration) return resource.duration;
    if (resource.pages)    return `${resource.pages} pages`;
    if (resource.readTime) return resource.readTime;
    return '—';
  };

  const handleSaveToggle = async () => {
    setSaveLoading(true);
    try {
      if (saved) {
        await removeResource(resource.id);
        setSaved(false);
        toast.success('Resource Removed', { description: `"${resource.title}" removed from your collection.` });
      } else {
        await saveResource(resource);
        setSaved(true);
        toast.success('Resource Saved', { description: `"${resource.title}" saved to your collection.` });
      }
    } catch (err) {
      toast.error('Something went wrong', { description: 'Please try again.' });
    } finally {
      setSaveLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="size-4 mr-2" />Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <ImageWithFallback src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className={getTypeColor()}>
                <span className="mr-1">{getTypeIcon()}</span>
                {resource.type.toUpperCase()}
              </Badge>
              <Badge variant="secondary">{resource.category}</Badge>
              {resource.topic && (
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  <Tag className="size-3 mr-1" />{resource.topic.topic_name}
                </Badge>
              )}
              <Badge variant="outline" className="text-muted-foreground">{resource.source}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{resource.title}</h1>
            <p className="text-lg text-muted-foreground">{resource.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <div><p className="text-xs text-muted-foreground">Duration</p><p className="font-medium">{getDurationInfo()}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="size-4 text-muted-foreground" />
              <div><p className="text-xs text-muted-foreground">Views</p><p className="font-medium">{resource.views > 0 ? `${(resource.views / 1000).toFixed(1)}k` : '—'}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="size-4 text-yellow-400 fill-yellow-400" />
              <div><p className="text-xs text-muted-foreground">Rating</p><p className="font-medium">{resource.rating} / 5</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <div><p className="text-xs text-muted-foreground">Published</p><p className="font-medium">{formatDate(resource.publishedDate)}</p></div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="size-5 text-muted-foreground" />
              <div><p className="text-sm text-muted-foreground">Author</p><p className="font-medium">{resource.author}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="size-5 text-muted-foreground" />
              <div><p className="text-sm text-muted-foreground">Source</p><p className="font-medium">{resource.source}</p></div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
            </div>
          </div>

          {resource.type === 'pdf' && resource.url && (
            <div className="space-y-3">
              <h3 className="font-semibold">Preview</h3>
              <div className="rounded-xl overflow-hidden border shadow-sm">
                <iframe src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(resource.url)}`} className="w-full" style={{ height: 600 }} title={resource.title} />
              </div>
            </div>
          )}

          {resource.type === 'article' && resource.source === 'Wikipedia' && (
            <div className="space-y-3">
              <h3 className="font-semibold">Article Preview</h3>
              <div className="rounded-xl overflow-hidden border shadow-sm">
                <iframe src={resource.url} className="w-full" style={{ height: 600 }} title={resource.title} />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4 mr-2" />Open Resource
                </a>
              </Button>
              <Button variant="outline" className="w-full" size="lg" onClick={handleSaveToggle} disabled={saveLoading}>
                {saveLoading ? 'Saving…' : saved
                  ? <><BookmarkCheck className="size-4 mr-2" />Saved</>
                  : <><Bookmark className="size-4 mr-2" />Save for Later</>}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>About This Resource</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div><p className="text-muted-foreground mb-1">Resource Type</p><p className="font-medium capitalize">{resource.type}</p></div>
              <Separator />
              <div><p className="text-muted-foreground mb-1">Category</p><p className="font-medium">{resource.category}</p></div>
              {resource.topic && (
                <><Separator />
                <div>
                  <p className="text-muted-foreground mb-1">Topic</p>
                  <p className="font-medium">{resource.topic.topic_name}</p>
                  {resource.topic.description && <p className="text-xs text-muted-foreground mt-1">{resource.topic.description}</p>}
                </div></>
              )}
              <Separator />
              <div><p className="text-muted-foreground mb-1">Content Source</p><p className="font-medium">{resource.source}</p></div>
              {resource.pages && (<><Separator /><div><p className="text-muted-foreground mb-1">Pages</p><p className="font-medium">{resource.pages}</p></div></>)}
              {resource.readTime && (<><Separator /><div><p className="text-muted-foreground mb-1">Read Time</p><p className="font-medium">{resource.readTime}</p></div></>)}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}