
import { useState } from 'react';
import { Movie } from '@/types/movie';
import { GeminiMovieService } from '@/services/geminiService';

export const useMovieGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMovies = async (genres: string[], languages: string[]): Promise<Movie[]> => {
    setIsGenerating(true);
    setError(null);

    try {
      console.log('🎬 Generating movies for:', { genres, languages });
      const movies = await GeminiMovieService.generateMovieRecommendations(genres, languages);
      
      if (movies.length === 0) {
        throw new Error('No movies were generated');
      }

      console.log(`✅ Successfully generated ${movies.length} movies`);
      return movies;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate movies';
      setError(errorMessage);
      console.error('❌ Movie generation error:', err);
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
