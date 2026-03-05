import { useState, useEffect } from 'react';
import { getSavedResources, removeResource } from '../utils/storage';
import { SavedResource } from '../types/resource';
import { ResourceCard } from '../components/ResourceCard';
import { SavedResourcesStats } from '../components/SavedResourcesStats';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { BookmarkCheck, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';

export function SavedResourcesPage() {
  const [savedResources, setSavedResources] = useState<SavedResource[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedResources = async () => {
    setLoading(true);
    const saved = await getSavedResources();
    setSavedResources(saved);
    setLoading(false);
  };

  useEffect(() => {
    loadSavedResources();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-xl shadow-md">
              <BookmarkCheck className="size-8" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Saved Resources
            </span>
          </h1>
          <p className="text-muted-foreground mt-3 text-lg ml-16">
            {savedResources.length} {savedResources.length === 1 ? 'resource' : 'resources'} saved for later
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground font-medium">
          Loading your saved resources…
        </div>
      ) : savedResources.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <Alert className="max-w-2xl mx-auto border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <Info className="size-4 text-indigo-600" />
            <AlertTitle className="text-indigo-900">No Saved Resources Yet</AlertTitle>
            <AlertDescription className="text-indigo-700">
              Start exploring and save resources you want to revisit later.
            </AlertDescription>
          </Alert>
          <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg">
            <Link to="/">Start Searching</Link>
          </Button>
        </div>
      ) : (
        <>
          <SavedResourcesStats resources={savedResources} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onSaveToggle={loadSavedResources}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}