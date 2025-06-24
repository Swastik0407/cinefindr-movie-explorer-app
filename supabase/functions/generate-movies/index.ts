
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { genres, languages } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

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
    - Use realistic movie titles and summaries
    - Rating should be between 6.0 and 9.5
    - Use appropriate Unsplash image URLs for posters (cinema/movie themed)
    - Match the requested genres and languages when possible
    - Provide diverse recommendations
    - Keep summaries concise and engaging
    
    Return only the JSON array, no additional text.`;

    console.log('Making request to Gemini API...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
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
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');
    
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Clean up the response to extract JSON
    let cleanedText = generatedText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\s*/, '').replace(/```\s*$/, '');
    }
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\s*/, '').replace(/```\s*$/, '');
    }

    let movies;
    try {
      movies = JSON.parse(cleanedText);
      console.log(`Successfully parsed ${movies.length} movies`);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', cleanedText);
      throw new Error('Invalid response format from Gemini API');
    }

    return new Response(JSON.stringify({ movies }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-movies function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
