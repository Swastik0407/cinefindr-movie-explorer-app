import { useCallback } from 'react';
import { Movie } from '@/types/movie';

// Enhanced movie collection that will act as our "database"
const movieDatabase: Movie[] = [
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
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    rating: 9.0
  },
  {
    id: 5,
    title: "Spirited Away",
    genre: "Animation",
    language: "Japanese",
    summary: "A young girl becomes trapped in a mysterious spirit world and must find a way to save her parents.",
    poster: "https://images.unsplash.com/photo-1489599142342-0b8b5e0cb34f?w=400&h=600&fit=crop",
    rating: 9.3
  },
  {
    id: 6,
    title: "Amélie",
    genre: "Romance",
    language: "French",
    summary: "A shy waitress decides to help those around her find happiness while discovering love herself.",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    rating: 8.3
  },
  {
    id: 7,
    title: "Mad Max: Fury Road",
    genre: "Action",
    language: "English",
    summary: "In a post-apocalyptic wasteland, Max teams up with Furiosa to escape a tyrant who controls the land's water supply.",
    poster: "https://images.unsplash.com/photo-1635263670419-e9c66e8c2bb4?w=400&h=600&fit=crop",
    rating: 8.1
  },
  {
    id: 8,
    title: "Your Name",
    genre: "Animation",
    language: "Japanese",
    summary: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
    poster: "https://images.unsplash.com/photo-1551950751-27875d5a95e6?w=400&h=600&fit=crop",
    rating: 8.4
  },
  {
    id: 9,
    title: "The Grand Budapest Hotel",
    genre: "Comedy",
    language: "English",
    summary: "A legendary concierge and his protégé become involved in a murder mystery at a famous European hotel.",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=600&fit=crop",
    rating: 8.1
  },
  {
    id: 10,
    title: "Oldboy",
    genre: "Thriller",
    language: "Korean",
    summary: "After being kidnapped and imprisoned for 15 years, a man is released and must find his captor within five days.",
    poster: "https://images.unsplash.com/photo-1594736797933-d0ed62c93999?w=400&h=600&fit=crop",
    rating: 8.4
  },
  {
    id: 11,
    title: "Coco",
    genre: "Animation",
    language: "Spanish",
    summary: "A young boy accidentally travels to the Land of the Dead and seeks the help of his deceased musician great-great-grandfather.",
    poster: "https://images.unsplash.com/photo-1551976594-1837fde8c8e5?w=400&h=600&fit=crop",
    rating: 8.4
  },
  {
    id: 12,
    title: "Dune",
    genre: "Sci-Fi",
    language: "English",
    summary: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    rating: 8.0
  },
  {
    id: 13,
    title: "The Handmaiden",
    genre: "Drama",
    language: "Korean",
    summary: "A woman is hired as a handmaiden to a Japanese heiress, but secretly she is involved in a plot to defraud her.",
    poster: "https://images.unsplash.com/photo-1489599142342-0b8b5e0cb34f?w=400&h=600&fit=crop",
    rating: 8.1
  },
  {
    id: 14,
    title: "Everything Everywhere All at Once",
    genre: "Sci-Fi",
    language: "English",
    summary: "An aging Chinese immigrant is swept up in an insane adventure where she alone can save the world.",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    rating: 7.8
  },
  {
    id: 15,
    title: "La La Land",
    genre: "Romance",
    language: "English",
    summary: "A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles.",
    poster: "https://images.unsplash.com/photo-1551976594-1837fde8c8e5?w=400&h=600&fit=crop",
    rating: 8.0
  },
  {
    id: 16,
    title: "Akira",
    genre: "Animation",
    language: "Japanese",
    summary: "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psionic psychopath.",
    poster: "https://images.unsplash.com/photo-1551950751-27875d5a95e6?w=400&h=600&fit=crop",
    rating: 8.0
  },
  {
    id: 17,
    title: "Roma",
    genre: "Drama",
    language: "Spanish",
    summary: "A year in the life of a middle-class family's maid in Mexico City in the early 1970s.",
    poster: "https://images.unsplash.com/photo-1594736797933-d0ed62c93999?w=400&h=600&fit=crop",
    rating: 7.7
  },
  {
    id: 18,
    title: "Joker",
    genre: "Drama",
    language: "English",
    summary: "The origin story of the iconic Batman villain, exploring how a failed comedian becomes a criminal mastermind.",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    rating: 8.4
  }
];

export const useMovieFiltering = () => {
  const filterMovies = useCallback(async (genres: string[], languages: string[]): Promise<Movie[]> => {
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredMovies = movieDatabase;

    // Filter by genres
    if (genres.length > 0) {
      filteredMovies = filteredMovies.filter(movie => 
        genres.some(genre => movie.genre.toLowerCase().includes(genre.toLowerCase()))
      );
    }

    // Filter by languages
    if (languages.length > 0) {
      filteredMovies = filteredMovies.filter(movie => 
        languages.includes(movie.language)
      );
    }

    // Sort by rating (highest first)
    return filteredMovies.sort((a, b) => b.rating - a.rating);
  }, []);

  const getAllMovies = useCallback(async (): Promise<Movie[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return all movies sorted by rating
    return movieDatabase.sort((a, b) => b.rating - a.rating);
  }, []);

  const searchMovies = useCallback(async (searchTerm: string): Promise<Movie[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const searchResults = movieDatabase.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return searchResults.sort((a, b) => b.rating - a.rating);
  }, []);

  return {
    filterMovies,
    getAllMovies,
    searchMovies,
    totalMovies: movieDatabase.length
  };
};
