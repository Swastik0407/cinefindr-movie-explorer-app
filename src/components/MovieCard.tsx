
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-yellow-500 text-yellow-900 font-semibold">
            ⭐ {movie.rating}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {movie.title}
          </h3>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              {movie.genre}
            </Badge>
            <Badge variant="outline" className="text-green-600 border-green-600">
              {movie.language}
            </Badge>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {movie.summary}
        </p>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
          >
            More Info
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Add to Favorites
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
