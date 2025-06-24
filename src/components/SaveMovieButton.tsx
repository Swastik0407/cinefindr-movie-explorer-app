
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Movie } from '@/types/movie';
import { useSavedMovies } from '@/hooks/useSavedMovies';
import { useAuth } from '@/contexts/AuthContext';

interface SaveMovieButtonProps {
  movie: Movie;
}

export const SaveMovieButton: React.FC<SaveMovieButtonProps> = ({ movie }) => {
  const { saveMovie, removeSavedMovie, isMovieSaved } = useSavedMovies();
  const { user } = useAuth();
  const isSaved = isMovieSaved(movie.title);

  const handleClick = async () => {
    if (!user) return;

    if (isSaved) {
      await removeSavedMovie(movie.title);
    } else {
      await saveMovie(movie);
    }
  };

  if (!user) return null;

  return (
    <Button
      onClick={handleClick}
      variant={isSaved ? "default" : "outline"}
      size="sm"
      className={`${isSaved 
        ? 'bg-red-500 hover:bg-red-600 text-white' 
        : 'hover:bg-red-50 hover:text-red-600 hover:border-red-300'
      } transition-all duration-200`}
    >
      <Heart className={`w-4 h-4 mr-1 ${isSaved ? 'fill-current' : ''}`} />
      {isSaved ? 'Saved' : 'Save'}
    </Button>
  );
};
