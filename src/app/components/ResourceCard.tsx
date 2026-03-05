import { Resource } from '../types/resource';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FileText, Video, BookOpen, ExternalLink, Bookmark, BookmarkCheck, Clock, Eye, Star } from 'lucide-react';
import { Link } from 'react-router';
import { isResourceSaved, saveResource, removeResource } from '../utils/storage';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface ResourceCardProps {
  resource: Resource;
  onSaveToggle?: () => void;
}

export function ResourceCard({ resource, onSaveToggle }: ResourceCardProps) {
  const [saved, setSaved] = useState(isResourceSaved(resource.id));

  const getTypeIcon = () => {
    switch (resource.type) {
      case 'video':
        return <Video className="size-4" />;
      case 'pdf':
        return <FileText className="size-4" />;
      case 'article':
        return <BookOpen className="size-4" />;
    }
  };

  const getTypeColor = () => {
    switch (resource.type) {
      case 'video':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0';
      case 'pdf':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0';
      case 'article':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0';
    }
  };

  const getDurationInfo = () => {
    if (resource.duration) return resource.duration;
    if (resource.pages) return `${resource.pages} pages`;
    if (resource.readTime) return resource.readTime;
    return '';
  };

  const handleSaveToggle = () => {
    if (saved) {
      removeResource(resource.id);
      setSaved(false);
      toast.success('Resource Removed', {
        description: `"${resource.title}" has been removed from your collection.`,
      });
    } else {
      saveResource(resource);
      setSaved(true);
      toast.success('Resource Saved', {
        description: `"${resource.title}" has been saved to your collection.`,
      });
    }
    onSaveToggle?.();
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-slate-200 hover:border-indigo-300 bg-white">
      <div className="aspect-video w-full overflow-hidden bg-muted relative group">
        <ImageWithFallback
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className={getTypeColor()}>
              <span className="mr-1">{getTypeIcon()}</span>
              {resource.type.toUpperCase()}
            </Badge>
            <Badge variant="secondary">{resource.category}</Badge>
          </div>
        </div>
        <CardTitle className="line-clamp-2">
          <Link to={`/resource/${resource.id}`} className="hover:underline">
            {resource.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {resource.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>{getDurationInfo()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="size-3" />
            <span>{(resource.views / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span>{resource.rating}</span>
          </div>
        </div>
        
        <div className="text-sm">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">{resource.author}</span> • {resource.source}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {resource.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-3 border-t">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleSaveToggle}
        >
          {saved ? (
            <>
              <BookmarkCheck className="size-4 mr-1" />
              Saved
            </>
          ) : (
            <>
              <Bookmark className="size-4 mr-1" />
              Save
            </>
          )}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          asChild
        >
          <Link to={`/resource/${resource.id}`}>
            View Details
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="size-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}