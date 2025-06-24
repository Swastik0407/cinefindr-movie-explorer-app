
import React from 'react';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">CineFindr</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
              Favorites
            </a>
            <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-slate-600">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
