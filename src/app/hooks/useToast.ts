import { toast } from 'sonner';

export function useResourceToast() {
  const showSavedToast = (title: string) => {
    toast.success('Resource Saved', {
      description: `"${title}" has been saved to your collection.`,
    });
  };

  const showRemovedToast = (title: string) => {
    toast.success('Resource Removed', {
      description: `"${title}" has been removed from your collection.`,
    });
  };

  const showErrorToast = (message: string) => {
    toast.error('Error', {
      description: message,
    });
  };

  return {
    showSavedToast,
    showRemovedToast,
    showErrorToast,
  };
}

