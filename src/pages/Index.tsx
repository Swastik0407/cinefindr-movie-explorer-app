import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MovieFilter } from '../components/MovieFilter';
import { MovieGrid } from '../components/MovieGrid';
import { Movie } from '../types/movie';
import { useMovieGenerator } from '../hooks/useMovieGenerator';
import { toast } from 'sonner';

// Dummy movie data
const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    language: "English",
    summary: "A skilled thief is given a chance at redemption if he can successfully plant an idea into a target's subconscious.",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    rating: 8.8
  },
  {
    id: 2,
    title: "Parasite",
    genre: "Thriller",
    language: "Korean",
    summary: "A poor family's scheme to infiltrate a wealthy household spirals into chaos in this dark social satire.",
    poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop",
    rating: 8.6
  },
  {
    id: 3,
    title: "3 Idiots",
    genre: "Comedy",
    language: "Hindi",
    summary: "Three friends navigate college life and personal growth while challenging India's rigid education system.",
    poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop",
    rating: 8.4
  },
  {
    id: 4,
    title: "The Dark Knight",
    genre: "Action",
    language: "English",
    summary: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    rating: 9.0
  },
  {
    id: 5,
    title: "Spirited Away",
    genre: "Animation",
    language: "Japanese",
    summary: "A young girl becomes trapped in a mysterious spirit world and must find a way to save her parents.",
    poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop",
    rating: 9.3
  },
  {
    id: 6,
    title: "Amélie",
    genre: "Romance",
    language: "French",
    summary: "A shy waitress decides to help those around her find happiness while discovering love herself.",
    poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop",
    rating: 8.3
  }
];

const Index = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(sampleMovies);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const { generateMovies, isGenerating, error } = useMovieGenerator();

  const handleFilterMovies = async () => {
    console.log('Generating AI movies with:', { selectedGenres, selectedLanguages });
    
    toast.loading('Generating personalized movie recommendations...', {
      id: 'generating-movies'
    });

    try {
      const aiMovies = await generateMovies(selectedGenres, selectedLanguages);
      
      if (aiMovies.length > 0) {
        setFilteredMovies(aiMovies);
        toast.success(`Generated ${aiMovies.length} personalized recommendations!`, {
          id: 'generating-movies'
        });
      } else {
        // Fallback to original filtering logic if AI generation fails
        let filtered = sampleMovies;
        
        if (selectedGenres.length > 0) {
          filtered = filtered.filter(movie => 
            selectedGenres.some(genre => movie.genre.toLowerCase().includes(genre.toLowerCase()))
          );
        }
        
        if (selectedLanguages.length > 0) {
          filtered = filtered.filter(movie => 
            selectedLanguages.includes(movie.language)
          );
        }
        
        setFilteredMovies(filtered);
        toast.success('Showing filtered results from our collection', {
          id: 'generating-movies'
        });
      }
    } catch (err) {
      console.error('Failed to generate movies:', err);
      toast.error('Failed to generate recommendations. Please try again.', {
        id: 'generating-movies'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            CineFindr
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover your next favorite movie with AI-powered personalized recommendations tailored to your taste
          </p>
        </div>

        <MovieFilter
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
          onFilter={handleFilterMovies}
          isLoading={isGenerating}
        />

        <MovieGrid movies={filteredMovies} />
      </main>
    </div>
  );
};

export default Index;
