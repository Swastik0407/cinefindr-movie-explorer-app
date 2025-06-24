import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SaveMovieButton } from './SaveMovieButton';
import { Movie } from '../types/movie';
import { Play, Info } from 'lucide-react';
import { gsap } from 'gsap';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const badge = badgeRef.current;

    if (!card || !overlay || !badge) return;

    // Initial state
    gsap.set(overlay, { opacity: 0, scale: 1.1 });
    gsap.set(badge, { scale: 0.8, rotation: -5 });

    // Hover animations
    const handleMouseEnter = () => {
      gsap
        .timeline()
        .to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(
          overlay,
          { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
          '-=0.1'
        )
        .to(
          badge,
          { scale: 1, rotation: 0, duration: 0.2, ease: 'back.out(1.7)' },
          '-=0.2'
        );
    };

    const handleMouseLeave = () => {
      gsap
        .timeline()
        .to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(
          overlay,
          { opacity: 0, scale: 1.1, duration: 0.2, ease: 'power2.out' },
          '-=0.1'
        )
        .to(
          badge,
          { scale: 0.8, rotation: -5, duration: 0.2, ease: 'power2.out' },
          '-=0.2'
        );
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [movie]);

  return (    <Card
      ref={cardRef}
      className="group overflow-hidden shadow-lg bg-slate-50/80 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200/60 dark:border-slate-600/60"
    >
      <div className="relative overflow-hidden group/poster">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/60 flex items-center justify-center"
        >
          <Button
            size="sm"
            className="bg-emerald-600/20 backdrop-blur-sm hover:bg-emerald-600/30 border-emerald-400/50 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Watch Trailer
          </Button>
        </div>        <div className="absolute top-3 right-3">
          <div
            ref={badgeRef}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg px-2 py-1 rounded text-sm"
          >
            ⭐ {movie.rating}
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {movie.title}
          </h3>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400"
            >
              {movie.genre}
            </Badge>
            <Badge
              variant="outline"
              className="text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400"
            >
              {movie.language}
            </Badge>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
          {movie.summary}
        </p>
        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            className="flex-1 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-600 dark:hover:border-emerald-400 transition-all duration-200"
          >
            <Info className="w-4 h-4 mr-2" />
            Details
          </Button>
          <SaveMovieButton movie={movie} />
        </div>
      </CardContent>
    </Card>
  );
};
