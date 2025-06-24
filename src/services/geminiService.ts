import { Movie } from '@/types/movie';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export class GeminiMovieService {
  private static async callGeminiAPI(prompt: string): Promise<string> {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  private static parseMoviesFromResponse(responseText: string): Movie[] {
    try {
      // Clean up the response to extract JSON
      let cleanedText = responseText.trim();
      
      // Remove markdown code blocks if present
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\s*/, '').replace(/```\s*$/, '');
      }
      if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\s*/, '').replace(/```\s*$/, '');
      }

      // Parse the JSON
      const movies = JSON.parse(cleanedText);
      
      // Validate the structure
      if (Array.isArray(movies)) {
        return movies.filter(movie => 
          movie.title && 
          movie.genre && 
          movie.language && 
          movie.summary && 
          movie.rating
        ).map((movie, index) => ({
          id: movie.id || (1000 + index), // Generate ID if not provided
          title: movie.title,
          genre: movie.genre,
          language: movie.language,
          summary: movie.summary,
          poster: movie.poster || `https://images.unsplash.com/photo-${1526374965328 + index}?w=400&h=600&fit=crop`,
          rating: parseFloat(movie.rating)
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      console.error('Raw response:', responseText);
      return [];
    }
  }

  static async generateMovieRecommendations(
    genres: string[], 
    languages: string[]
  ): Promise<Movie[]> {
    const genreText = genres.length > 0 ? genres.join(', ') : 'any genre';
    const languageText = languages.length > 0 ? languages.join(', ') : 'any language';

    const prompt = `Generate 6 movie recommendations for someone who likes ${genreText} movies in ${languageText}. 

Please respond with a JSON array of movies with this exact structure:
[
  {
    "id": 1,
    "title": "Movie Title",
    "genre": "Action",
    "language": "English",
    "summary": "Brief movie summary in 1-2 sentences",
    "poster": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    "rating": 8.5
  }
]

Important guidelines:
- Use real, well-known movie titles and accurate information
- Rating should be between 7.0 and 9.5 (only recommend good movies)
- Use appropriate Unsplash image URLs for posters (cinema/movie themed)
- Match the requested genres and languages when possible
- Provide diverse recommendations within the criteria
- Keep summaries concise and engaging (1-2 sentences max)
- Ensure all movies are appropriate for general audiences

Return only the JSON array, no additional text or markdown formatting.`;

    try {
      console.log('🤖 Generating AI movie recommendations...');
      const responseText = await this.callGeminiAPI(prompt);
      const movies = this.parseMoviesFromResponse(responseText);
      
      console.log(`✅ Generated ${movies.length} movie recommendations`);
      return movies;
    } catch (error) {
      console.error('❌ Failed to generate movie recommendations:', error);
      throw error;
    }
  }
}
