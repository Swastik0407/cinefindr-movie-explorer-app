# 🎬 CineFindr - Smart Movie Discovery Platform

## 🌟 Overview

CineFindr is a modern, responsive movie discovery platform that helps users find their perfect movie through intelligent filtering and personalized recommendations. Built with cutting-edge web technologies, it offers a seamless experience for exploring a curated collection of high-quality films from around the world.

## ✨ Features

### 🎯 Core Functionality
- **Smart Movie Filtering**: Filter by genres (Action, Comedy, Drama, Horror, Sci-Fi, Romance, Thriller, Animation) and languages (English, Hindi, Korean, Japanese, French, Spanish, German, Italian)
- **Curated Movie Collection**: Hand-picked selection of 18 acclaimed movies with detailed information
- **Real-time Search**: Instant filtering with smooth loading states and transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 👤 User Management
- **Supabase Authentication**: Secure user registration and login
- **Personal Movie Library**: Save and manage favorite movies
- **User Profiles**: Personalized user experience with profile management

### 🎨 User Experience
- **Modern UI/UX**: Beautiful gradients, smooth animations, and intuitive design
- **Toast Notifications**: Real-time feedback for user actions
- **Empty States**: Helpful suggestions when no movies match filters
- **Loading States**: Professional loading indicators and skeleton screens

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### UI Components
- **shadcn/ui** - Beautiful, accessible, and customizable component library
- **Radix UI** - Low-level primitives for building robust UI components
- **Lucide React** - Beautiful, pixel-perfect icons
- **Sonner** - Elegant toast notifications

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Row Level Security (RLS)** - Secure data access policies
- **Real-time subscriptions** - Live data updates

### State Management & Data Fetching
- **React Query (TanStack Query)** - Powerful data synchronization
- **Context API** - Global state management for authentication
- **Custom Hooks** - Reusable logic for movies, authentication, and filtering

## 🏗️ Architecture

### Application Flow
```
User → React App → Authentication (Supabase Auth)
                ↓
         Movie Discovery Interface
                ↓
    In-Memory Filtering System ← Curated Movie Database
                ↓
         Filtered Results Display
                ↓
    Save to Personal Library (Supabase DB)
```

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── MovieCard.tsx   # Individual movie display
│   ├── MovieFilter.tsx # Filtering interface
│   ├── MovieGrid.tsx   # Movies grid layout
│   └── SaveMovieButton.tsx # Save functionality
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── hooks/              # Custom React hooks
│   ├── useMovieFiltering.ts # Movie filtering logic
│   ├── useSavedMovies.ts   # Personal library management
│   └── use-toast.ts        # Toast notifications
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── pages/              # Application pages
│   ├── Index.tsx       # Main movie discovery page
│   ├── Auth.tsx        # Authentication page
│   └── NotFound.tsx    # 404 error page
├── types/              # TypeScript type definitions
│   └── movie.ts        # Movie interface
└── lib/                # Utility functions
    └── utils.ts        # Helper functions
```

### Database Schema
```sql
-- User Profiles
profiles (
  id: UUID (FK to auth.users)
  email: TEXT
  full_name: TEXT
  avatar_url: TEXT
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
)

-- Saved Movies
saved_movies (
  id: UUID (FK to profiles)
  user_id: UUID
  movie_title: TEXT
  movie_genre: TEXT
  movie_language: TEXT
  movie_summary: TEXT
  movie_poster: TEXT
  movie_rating: DECIMAL
  saved_at: TIMESTAMP
)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation
```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd cinefindr-movie-explorer-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue to Purple gradient (`from-blue-600 to-purple-600`)
- **Secondary**: Green to Teal gradient (`from-green-600 to-teal-600`)
- **Background**: Slate gradient (`from-slate-50 via-blue-50 to-indigo-100`)
- **Text**: Slate variations for hierarchy

### Typography
- **Headings**: Bold, gradient text with size variations
- **Body**: Clean, readable Tailwind default fonts
- **UI Elements**: Consistent sizing and spacing

## 🔐 Security Features

- **Authentication**: Secure email/password authentication via Supabase
- **Authorization**: Row Level Security (RLS) policies ensure users only access their data
- **Data Validation**: TypeScript interfaces and runtime validation
- **CORS Protection**: Properly configured cross-origin resource sharing

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices with progressive enhancement
- **Breakpoints**: 
  - `sm`: 640px (Mobile)
  - `md`: 768px (Tablet)
  - `lg`: 1024px (Desktop)
  - `xl`: 1280px (Large Desktop)

## 🔧 Development Features

- **TypeScript**: Full type safety with strict mode enabled
- **ESLint**: Code quality and consistency enforcement
- **Hot Reload**: Instant development feedback with Vite
- **Modern JavaScript**: ES2022+ features with Babel compilation

## 📊 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: Responsive images with proper sizing
- **Lazy Loading**: Components and routes loaded on demand
- **Memoization**: React.memo and useCallback for performance

## 🚀 Deployment

### Quick Deploy with Lovable
1. Open [Lovable Project](https://lovable.dev/projects/eea5a155-5ba8-4fb9-ba94-e68b0c02f96e)
2. Click Share → Publish
3. Your app will be deployed automatically

### Custom Domain
Navigate to Project → Settings → Domains in Lovable to connect your custom domain.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is built with [Lovable](https://lovable.dev) and follows their terms of service.

## 🆘 Support

For support and questions:
- Check the [Lovable Documentation](https://docs.lovable.dev)
- Open an issue in this repository
- Contact the development team

---

**Built with ❤️ using Lovable, React, TypeScript, and Supabase**
