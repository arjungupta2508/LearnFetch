import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { categories } from '../data/mockResources';

interface FilterPanelProps {
  filters: {
    type: string;
    category: string;
    sortBy: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-2xl border-2 border-slate-200 shadow-sm">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[160px]">
          <Label htmlFor="type-filter" className="mb-2 block text-slate-700">Resource Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => onFilterChange('type', value)}
          >
            <SelectTrigger id="type-filter" className="bg-white border-2 border-slate-200 hover:border-indigo-400 transition-colors">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="pdf">PDFs</SelectItem>
              <SelectItem value="article">Articles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[160px]">
          <Label htmlFor="category-filter" className="mb-2 block text-slate-700">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => onFilterChange('category', value)}
          >
            <SelectTrigger id="category-filter" className="bg-white border-2 border-slate-200 hover:border-indigo-400 transition-colors">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[160px]">
          <Label htmlFor="sort-filter" className="mb-2 block text-slate-700">Sort By</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => onFilterChange('sortBy', value)}
          >
            <SelectTrigger id="sort-filter" className="bg-white border-2 border-slate-200 hover:border-indigo-400 transition-colors">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}