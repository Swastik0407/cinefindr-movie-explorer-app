import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface MovieFilterProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  onFilter: () => void;
}

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Animation'];
const languages = ['English', 'Hindi', 'Korean', 'Japanese', 'French', 'Spanish', 'German'];

export const MovieFilter: React.FC<MovieFilterProps> = ({
  selectedGenres,
  setSelectedGenres,
  selectedLanguages,
  setSelectedLanguages,
  onFilter
}) => {
  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-slate-800">
          Find Your Perfect Movie
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant={selectedGenres.includes(genre) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedGenres.includes(genre)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    : 'hover:bg-slate-100'
                }`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <Badge
                key={language}
                variant={selectedLanguages.includes(language) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedLanguages.includes(language)
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700'
                    : 'hover:bg-slate-100'
                }`}
                onClick={() => toggleLanguage(language)}
              >
                {language}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={onFilter}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Search className="w-5 h-5 mr-2" />
            Find Movies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
