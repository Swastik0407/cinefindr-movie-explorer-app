# 🎬 CineFindr - Movie Discovery Platform

## ✨ Features

- **Smart Movie Filtering**: Genre and language filtering with real-time results
- **Curated Movie Collection**: Hand-picked selection of 18 acclaimed films
- **AI-Powered Recommendations**: Gemini API integration for personalized suggestions
- **GSAP Animations**: Cinematic entrance animations and hover effects
- **Dark/Light Theme**: Emerald/teal/navy color palette with theme switching
- **Authentication**: Secure user registration and login
- **Save Movies**: Personal movie collection with persistent storage

## 🛠️ Tech Stack

- **React 18** + **TypeScript** - Modern frontend framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **GSAP** - Professional animations
- **shadcn/ui** - Component library
- **Supabase** - Backend and authentication
- **Google Gemini AI** - Movie recommendations

## 📊 User Flow Diagram

```
┌────────────────────────────────────────────────────────────┐
│                      🎯 USER JOURNEY                       |
├────────────────────────────────────────────────────────────┤
│                                                            │
│  START                                                     │
│    │                                                       │
│    ▼                                                       │
│  ┌─────────────┐                                           │
│  │ Landing Page│──────────────────────┐                    │
│  │ (Header +   │                      │                    │
│  │  Hero +     │                      ▼                    │
│  │  Stats)     │                 ┌─────────────┐           │
│  └─────────────┘                 │ Auth Page   │           │
│         │                        │ Sign In/Up  │           │
│         ▼                        └─────────────┘           │
│  ┌─────────────┐                      │                    │
│  │ Movie Filter│◄─────────────────────┘                    │
│  │ • Genres    │                                           │
│  │ • Languages │                                           │
│  │ • Search    │                                           │
│  └─────────────┘                                           |
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐         ┌─────────────┐                   │
│  │ Movie Grid  │         │ Movie Card  │                   │
│  │ GSAP        │────────►│ • Poster    │                   │
│  │ Staggered   │         │ • Rating    │                   │
│  │ Animation   │         │ • Genre     │                   │
│  └─────────────┘         │ • Summary   │                   │
│                          │ • Save Btn  │                   │
│                          └─────────────┘                   │
│                                 │                          │
│                                 ▼                          │
│                          ┌─────────────┐                   │
│                          │ Saved Movies│                   │
│                          │ Collection  │                   │
│                          └─────────────┘                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                    🎬 CINEFINDR ARCHITECTURE                           │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │  
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │   🎨 Frontend  │    │   🔧 Backend    │    │  🤖 AI Service  |     |
│  │                 │    │                 │    │                 │     │
│  │ React + TypeScript │ │ Supabase        │    │ Google Gemini   │     │
│  │ Tailwind CSS    │    │ PostgreSQL      │    │ Movie Recommendations │
│  │ GSAP Animations │    │ Authentication  │    │ Smart Filtering │     │
│  │ shadcn/ui       │    │ Real-time DB    │    │ Content Generation    │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘     │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

```bash
# Clone repository
git clone <repository-url>
cd cinefindr-movie-explorer-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase and Gemini API keys

# Start development server
npm run dev
```

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

---

<div align="center">
  <p><strong>🎬 CineFindr</strong> - Discover Your Next Favorite Movie</p>
  <p><em>Built with React, TypeScript, Tailwind CSS, GSAP & Supabase</em></p>
</div>
