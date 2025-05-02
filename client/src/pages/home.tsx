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

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="fixed inset-0 w-full h-full z-0 opacity-20"
        style={{
          backgroundImage: `url(${kendrickImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
      
      {/* Content with glass-like container */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl min-h-screen">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          {/* Header Section */}
          <header className="text-center mb-8">
            <h1 className="font-bold text-3xl md:text-4xl mb-2 bg-gradient-to-r from-purple-600 to-indigo-800 text-transparent bg-clip-text">
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
