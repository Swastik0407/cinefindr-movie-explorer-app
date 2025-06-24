
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Movie } from '@/types/movie';
import { toast } from 'sonner';

export const useSavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchSavedMovies = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_movies')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });

      if (error) {
        console.error('Error fetching saved movies:', error);
        toast.error('Failed to load saved movies');
        return;
      }

      const movies: Movie[] = data?.map(movie => ({
        id: parseInt(movie.id),
        title: movie.movie_title,
        genre: movie.movie_genre || '',
        language: movie.movie_language || '',
        summary: movie.movie_summary || '',
        poster: movie.movie_poster || '',
        rating: parseFloat(movie.movie_rating?.toString() || '0')
      })) || [];

      setSavedMovies(movies);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load saved movies');
    } finally {
      setLoading(false);
    }
  };

  const saveMovie = async (movie: Movie) => {
    if (!user) {
      toast.error('Please sign in to save movies');
      return false;
    }

    try {
      const { error } = await supabase
        .from('saved_movies')
        .insert({
          user_id: user.id,
          movie_title: movie.title,
          movie_genre: movie.genre,
          movie_language: movie.language,
          movie_summary: movie.summary,
          movie_poster: movie.poster,
          movie_rating: movie.rating
        });

      if (error) {
        console.error('Error saving movie:', error);
        toast.error('Failed to save movie');
        return false;
      }

      toast.success('Movie saved successfully!');
      fetchSavedMovies();
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save movie');
      return false;
    }
  };

  const removeSavedMovie = async (movieTitle: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_movies')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_title', movieTitle);

      if (error) {
        console.error('Error removing movie:', error);
        toast.error('Failed to remove movie');
        return false;
      }

      toast.success('Movie removed from saved list');
      fetchSavedMovies();
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to remove movie');
      return false;
    }
  };

  const isMovieSaved = (movieTitle: string) => {
    return savedMovies.some(movie => movie.title === movieTitle);
  };

  useEffect(() => {
    if (user) {
      fetchSavedMovies();
    } else {
      setSavedMovies([]);
    }
  }, [user]);

  return {
    savedMovies,
    loading,
    saveMovie,
    removeSavedMovie,
    isMovieSaved,
    refetch: fetchSavedMovies
  };
};
