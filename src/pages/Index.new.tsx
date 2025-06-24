import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { MovieFilter } from '../components/MovieFilter';
import { MovieGrid } from '../components/MovieGrid';
import { Movie } from '../types/movie';
import { useMovieFiltering } from '../hooks/useMovieFiltering';
import { toast } from 'sonner';

const Index = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { filterMovies, getAllMovies, totalMovies } = useMovieFiltering();  // Load all movies on component mount (only once)
  useEffect(() => {
    const loadInitialMovies = async () => {
      const allMovies = await getAllMovies();
      setFilteredMovies(allMovies);
    };
    loadInitialMovies();
  }, []); // Empty dependency array - only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleFilterMovies = async () => {
    console.log('🎬 Filtering movies with preferences:', { selectedGenres, selectedLanguages });
    
    const hasFilters = selectedGenres.length > 0 || selectedLanguages.length > 0;
    const loadingMessage = hasFilters 
      ? 'Finding movies that match your preferences...' 
      : 'Loading our movie collection...';
    
    setIsLoading(true);
    toast.loading(loadingMessage, {
      id: 'filtering-movies'
    });

    try {
      const movies = hasFilters 
        ? await filterMovies(selectedGenres, selectedLanguages)
        : await getAllMovies();
        
      setFilteredMovies(movies);
      
      if (movies.length > 0) {
        const message = hasFilters 
          ? `✨ Found ${movies.length} movies matching your preferences!`
          : `🎬 Loaded ${movies.length} movies from our collection!`;
        
        toast.success(message, {
          id: 'filtering-movies'
        });
      } else {
        toast.info('No movies found with those filters. Try different combinations!', {
          id: 'filtering-movies'
        });
        // Keep the filtered results (empty array) to show no movies
      }
      
    } catch (err) {
      console.error('❌ Failed to filter movies:', err);
      toast.error('Something went wrong while filtering movies.', {
        id: 'filtering-movies'
      });
      // Keep the current filtered movies instead of showing all movies
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CineFindr
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover your next favorite movie with smart recommendations tailored to your unique taste
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{totalMovies}</div>
              <div className="text-sm text-slate-600">Movies Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{filteredMovies.length}</div>
              <div className="text-sm text-slate-600">Currently Shown</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">8</div>
              <div className="text-sm text-slate-600">Languages</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <MovieFilter
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
          onFilter={handleFilterMovies}
          isLoading={isLoading}
        />

        {/* Results Section */}
        <MovieGrid movies={filteredMovies} />
      </main>
    </div>
  );
};

export default Index;
