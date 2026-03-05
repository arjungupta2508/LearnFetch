import { Link, useLocation } from 'react-router';
import { BookMarked, Search, Bookmark, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '../../lib/supabaseClient';

export function Header() {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="border-b bg-gradient-to-r from-indigo-50 to-purple-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
              <BookMarked className="size-6" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">LearnFetch</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              asChild
              className={location.pathname === '/' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md' : ''}
            >
              <Link to="/">
                <Search className="size-4 mr-2" />
                Search
              </Link>
            </Button>
            <Button
              variant={location.pathname === '/saved' ? 'default' : 'ghost'}
              asChild
              className={location.pathname === '/saved' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md' : ''}
            >
              <Link to="/saved">
                <Bookmark className="size-4 mr-2" />
                Saved
              </Link>
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="size-4 mr-2" />
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}