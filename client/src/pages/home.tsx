import { useState, useEffect } from 'react';
import LyricForm from '@/components/lyric-form';
import ResultsDisplay from '@/components/results-display';
import LoadingState from '@/components/loading-state';
import ErrorState from '@/components/error-state';
import WelcomeState from '@/components/welcome-state';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { LyricInterpretation } from '@/lib/types';
import kendrickImage from '../assets/kenny.jpeg';

export default function Home() {
  const [results, setResults] = useState<LyricInterpretation | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Handle parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const lyricMutation = useMutation({
    mutationFn: async (lyric: string) => {
      const response = await apiRequest('POST', '/api/interpret', { lyric });
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data);
    },
  });

  const handleSubmit = (lyric: string) => {
    // Reset results when submitting a new lyric
    setResults(null);
    lyricMutation.mutate(lyric);
  };

  const handleTryAgain = () => {
    lyricMutation.reset();
  };

  // Calculate visibility based on scroll position - linear vertical reveal
  const squareVisibility = Math.min(1, Math.max(0, scrollY / 200));
  const triangleVisibility = Math.min(1, Math.max(0, (scrollY - 250) / 200));
  const circleVisibility = Math.min(1, Math.max(0, (scrollY - 500) / 200));
  const xVisibility = Math.min(1, Math.max(0, (scrollY - 750) / 200));
  
  // Calculate parallax movement for shapes
  const squareParallax = scrollY * 0.3;
  const triangleParallax = scrollY * 0.5;
  const circleParallax = scrollY * 0.7;
  const xParallax = scrollY * 0.9;

  return (
    <div className="relative min-h-[200vh] overflow-hidden">
      
      {/* Parallax Background */}
      <div 
        className="fixed inset-0 w-full h-full z-0 opacity-15"
        style={{
          backgroundImage: `url(${kendrickImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out',
          opacity: 0.12,
        }}
      />
      
      {/* Scrollytelling Shapes in a vertical line */}
      {/* Square */}
      <div className="fixed left-1/2 top-[20%] transform -translate-x-1/2 z-10 flex flex-col items-center">
        <div 
          style={{
            opacity: squareVisibility,
            transform: `rotate(${scrollY * 0.1}deg)`,
            transition: 'opacity 0.5s ease, transform 0.3s ease',
            width: '80px',
            height: '80px',
            position: 'relative',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                <feComposite in="SourceGraphic" operator="over" />
              </filter>
            </defs>
            <rect 
              x="5" y="5" 
              width="70" height="70" 
              fill="transparent" 
              stroke="#e11d48" 
              strokeWidth="3" 
              filter="url(#redGlow)" 
            />
          </svg>
        </div>
      </div>
      
      {/* Triangle */}
      <div className="fixed left-1/2 top-[35%] transform -translate-x-1/2 z-10 flex flex-col items-center">
        <div
          style={{
            opacity: triangleVisibility,
            transform: `rotate(${scrollY * -0.1}deg)`,
            transition: 'opacity 0.5s ease, transform 0.3s ease',
            width: '90px',
            height: '90px',
            position: 'relative',
          }}
        >
          <svg width="90" height="90" viewBox="0 0 90 90">
            <defs>
              <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                <feComposite in="SourceGraphic" operator="over" />
              </filter>
            </defs>
            <polygon 
              points="45,5 5,85 85,85" 
              fill="transparent" 
              stroke="#f8fafc" 
              strokeWidth="3"
              filter="url(#blueGlow)"
            />
          </svg>
        </div>
      </div>
      
      {/* Circle */}
      <div className="fixed left-1/2 top-[50%] transform -translate-x-1/2 z-10 flex flex-col items-center">
        <div
          style={{
            opacity: circleVisibility,
            transform: `scale(${0.8 + scrollY * 0.001})`,
            transition: 'opacity 0.5s ease, transform 0.3s ease',
            width: '80px',
            height: '80px',
            position: 'relative',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <filter id="blueGlow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                <feComposite in="SourceGraphic" operator="over" />
              </filter>
            </defs>
            <circle 
              cx="40" cy="40" 
              r="35" 
              fill="transparent" 
              stroke="#1e40af" 
              strokeWidth="3" 
              filter="url(#blueGlow2)" 
            />
          </svg>
        </div>
      </div>
      
      {/* X Shape */}
      <div className="fixed left-1/2 top-[65%] transform -translate-x-1/2 z-10 flex flex-col items-center">
        <div
          style={{
            opacity: xVisibility,
            transition: 'opacity 0.5s ease, transform 0.3s ease',
            width: '80px',
            height: '80px',
            position: 'relative',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <filter id="redGlow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                <feComposite in="SourceGraphic" operator="over" />
              </filter>
            </defs>
            <line x1="10" y1="10" x2="70" y2="70" stroke="#e11d48" strokeWidth="3" filter="url(#redGlow2)" />
            <line x1="70" y1="10" x2="10" y2="70" stroke="#e11d48" strokeWidth="3" filter="url(#redGlow2)" />
          </svg>
        </div>
      </div>
      
      {/* Content with glass-like container - positioned at bottom after scrolling */}
      <div className="relative z-20 container mx-auto px-4 py-8 max-w-3xl min-h-screen mt-[100vh]">
        {/* Welcome message that appears when user scrolls to this section */}
        <div
          className="text-center mb-8 transform"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 800) / 300)),
            transform: `translateY(${Math.max(0, 50 - (scrollY - 800) / 10)}px)`,
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
            Welcome to Kendrick Decoder
          </h2>
          <p className="text-gray-700 mb-8">
            Use the tool below to analyze the deeper meanings in his lyrics
          </p>
          <div className="w-16 h-1 rwb-divider mx-auto shadow-sm"/>
        </div>
        
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-200 p-6 md:p-8 shadow-blue">
          {/* Header Section */}
          <header className="text-center mb-8">
            <h1 className="font-bold text-3xl md:text-4xl mb-2 rwb-gradient-text">
              Kendrick Decoder
            </h1>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Uncover the hidden meanings, references, and double entendres in Kendrick Lamar's lyrics
            </p>
          </header>

          {/* Lyric Input Form */}
          <LyricForm onSubmit={handleSubmit} isLoading={lyricMutation.isPending} />

          {/* Content States */}
          {lyricMutation.isPending && <LoadingState />}
          
          {lyricMutation.isError && (
            <ErrorState 
              error={lyricMutation.error instanceof Error ? lyricMutation.error.message : 'An unexpected error occurred'} 
              onTryAgain={handleTryAgain} 
            />
          )}
          
          {results && !lyricMutation.isPending && <ResultsDisplay results={results} />}
          
          {!results && !lyricMutation.isPending && !lyricMutation.isError && <WelcomeState />}

          {/* Footer */}
          <footer className="mt-12 text-center text-neutral-500 text-sm">
            <p>This tool doesn't store any lyrics or input data.</p>
            <p className="mt-2">© {new Date().getFullYear()} Kendrick Decoder • Not affiliated with Kendrick Lamar or TDE</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
