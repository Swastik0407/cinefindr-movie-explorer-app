
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
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <div className="text-4xl">🎬</div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-700">No movies found</h3>
            <p className="text-slate-500">Try adjusting your filters or explore different genres and languages to discover amazing movies</p>
          </div>
          <div className="flex justify-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Try: Action</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Try: Korean</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Try: Animation</span>
          </div>
        </div>
      </div>
    );
  }

  return (    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60">        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-800">
              Movie Recommendations
            </h2>
            {isAIGenerated && (
              <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                🤖 AI Generated
              </span>
            )}
          </div>
          <p className="text-slate-600 mt-1">
            {isAIGenerated 
              ? `AI-generated ${movies.length} personalized recommendations`
              : `Found ${movies.length} movies matching your preferences`
            }
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 mr-2">Sort by:</span>
          <Button variant="outline" size="sm" className="text-slate-600">
            <Star className="w-4 h-4 mr-1" />
            Rating
          </Button>
          <Button variant="outline" size="sm" className="text-slate-600">
            <Calendar className="w-4 h-4 mr-1" />
            Year
          </Button>
          <Button variant="outline" size="sm" className="text-slate-600">
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
