
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Movie } from '@/types/movie';

export const useMovieGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMovies = async (genres: string[], languages: string[]): Promise<Movie[]> => {
    setIsGenerating(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-movies', {
        body: { genres, languages }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate movies');
      }

      return data.movies || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate movies';
      setError(errorMessage);
      console.error('Movie generation error:', err);
      return [];
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateMovies,
    isGenerating,
    error
  };
};
