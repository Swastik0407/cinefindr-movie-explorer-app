
import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../types/movie';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, Star, Calendar } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  isAIGenerated?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, isAIGenerated = false }) => {  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-full flex items-center justify-center">
            <div className="text-4xl">🎬</div>
          </div>
          <div className="space-y-2">            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-100">No movies found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or explore different genres and languages to discover amazing movies</p>
          </div>
          <div className="flex justify-center gap-2">            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-sm">Try: Action</span>
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full text-sm">Try: Korean</span>
            <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-full text-sm">Try: Animation</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-50/50 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200/60 dark:border-slate-600/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Movie Recommendations
            </h2>
            {isAIGenerated && (
              <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                🤖 AI Generated
              </span>
            )}
          </div>
          <p className="text-slate-600 dark:text-gray-300 mt-1">
            {isAIGenerated 
              ? `AI-generated ${movies.length} personalized recommendations`
              : `Found ${movies.length} movies matching your preferences`
            }
          </p>
        </div>
        
        <div className="flex items-center gap-2">          <span className="text-sm text-slate-600 dark:text-gray-400 mr-2">Sort by:</span>
          <Button variant="outline" size="sm" className="text-slate-600 dark:text-gray-300 border-slate-300 dark:border-gray-600">
            <Star className="w-4 h-4 mr-1" />
            Rating
          </Button>
          <Button variant="outline" size="sm" className="text-slate-600 dark:text-gray-300 border-slate-300 dark:border-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            Year
          </Button>
          <Button variant="outline" size="sm" className="text-slate-600 dark:text-gray-300 border-slate-300 dark:border-gray-600">
            <SlidersHorizontal className="w-4 h-4 mr-1" />
            Relevance
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
