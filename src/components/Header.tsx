
import React from 'react';
import { Button } from '@/components/ui/button';
import { Film, LogOut, User, Heart, Search, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };  return (
    <header className="bg-slate-50/80 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">CineFindr</span>
          </div>          <nav className="hidden md:flex items-center space-x-8">            <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
              <Search className="w-4 h-4 mr-2" />
              Discover
            </Button>
            <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">
              <Heart className="w-4 h-4 mr-2" />
              My Movies
              <Badge variant="secondary" className="ml-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">0</Badge>
            </Button>
            <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
              Trending
            </Button>
          </nav><div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-sm">                    <div className="font-medium text-slate-800 dark:text-slate-100">Welcome back!</div>
                    <div className="text-slate-600 dark:text-slate-400 text-xs">{user.email}</div>
                  </div>
                </div>
                <Button 
                  onClick={handleSignOut}
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 dark:text-slate-300"
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
