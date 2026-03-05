import { BookMarked } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-16 bg-gradient-to-r from-slate-50 to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded-lg shadow-md">
              <BookMarked className="size-5" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">LearnFetch</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} LearnFetch. A unified learning resource aggregation platform.
          </p>
          
          <div className="text-sm text-muted-foreground">
            <p>Powered by React & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}