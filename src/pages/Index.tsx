import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { MovieFilter } from '../components/MovieFilter';
import { MovieGrid } from '../components/MovieGrid';
import { Movie } from '../types/movie';
import { useMovieFiltering } from '../hooks/useMovieFiltering';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { filterMovies, getAllMovies, totalMovies } = useMovieFiltering();

  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Load all movies on component mount (only once)
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

  // Animation effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide elements
      gsap.set([titleRef.current, subtitleRef.current], { 
        opacity: 0, 
        y: 50 
      });
      gsap.set(statsRef.current?.children || [], { 
        opacity: 0, 
        y: 30, 
        scale: 0.8 
      });
      gsap.set(filterRef.current, { 
        opacity: 0, 
        y: 40 
      });

      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(statsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .to(filterRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.2");

      // Stats counter animation
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('[data-count]');
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-count') || '0');
          gsap.fromTo(stat, 
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              delay: 1
            }
          );
        });
      }
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  // Movies grid animation when movies change
  useEffect(() => {
    if (filteredMovies.length > 0 && gridRef.current) {
      gsap.fromTo(gridRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1
        }
      );
    }
  }, [filteredMovies]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-8" ref={heroRef}>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 dark:from-emerald-300 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent" ref={titleRef}>
              CineFindr
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed" ref={subtitleRef}>
              Discover your next favorite movie with smart recommendations tailored to your unique taste
            </p>
          </div>
          
          {/* Stats */}          <div className="flex justify-center gap-8 pt-6" ref={statsRef}>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-white" data-count={totalMovies}>0</div>
              <div className="text-sm text-slate-600 dark:text-gray-400">Movies Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-white" data-count={filteredMovies.length}>0</div>
              <div className="text-sm text-slate-600 dark:text-gray-400">Currently Shown</div>
            </div>            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-white" data-count="8">0</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Languages</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div ref={filterRef}>
          <MovieFilter
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            onFilter={handleFilterMovies}
            isLoading={isLoading}
          />
        </div>

        {/* Results Section */}
        <div ref={gridRef}>
          <MovieGrid movies={filteredMovies} />
        </div>
      </main>
    </div>
  );
};

export default Index;
