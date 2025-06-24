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
      size="sm"      className={`${isSaved 
        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white' 
        : 'hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-500'
      } transition-all duration-200`}
    >
      <Heart className={`w-4 h-4 mr-1 ${isSaved ? 'fill-current' : ''}`} />
      {isSaved ? 'Saved' : 'Save'}
    </Button>
  );
};
