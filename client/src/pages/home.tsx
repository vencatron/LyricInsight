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

  // Calculate visibility based on scroll position
  const squareVisibility = Math.min(1, Math.max(0, scrollY / 300));
  const triangleVisibility = Math.min(1, Math.max(0, (scrollY - 200) / 300));
  const circleVisibility = Math.min(1, Math.max(0, (scrollY - 400) / 300));
  const xVisibility = Math.min(1, Math.max(0, (scrollY - 600) / 300));
  
  // Calculate parallax movement for shapes
  const squareParallax = scrollY * 0.3;
  const triangleParallax = scrollY * 0.5;
  const circleParallax = scrollY * 0.7;
  const xParallax = scrollY * 0.9;

  return (
    <div className="relative min-h-[200vh] overflow-hidden">
      {/* Scroll Indicator */}
      <div 
        className="fixed top-5 left-0 right-0 mx-auto z-30 text-center"
        style={{
          opacity: Math.max(0, 1 - scrollY / 300),
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="inline-block bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-lg">
          <p className="text-white text-lg font-bold mb-1">Scroll down to explore Kendrick's journey</p>
          <div className="animate-bounce mt-2">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
      
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
      
      {/* Scrollytelling Shapes */}
      {/* Square */}
      <div className="fixed left-[20%] z-10 flex flex-col items-center">
        <div 
          className="w-24 h-24 bg-purple-600 shadow-lg"
          style={{
            opacity: squareVisibility,
            transform: `rotate(${scrollY * 0.1}deg)`,
            transition: 'opacity 0.5s ease, transform 0.3s ease',
          }}
        />
        <p 
          className="mt-2 text-center font-bold text-white text-shadow px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm max-w-xs"
          style={{
            opacity: squareVisibility,
            transform: `translateY(${squareParallax * 0.2}px)`,
          }}
        >
          Section.80 <span className="block text-sm font-normal mt-1">2011 - The debut that started it all</span>
        </p>
        <div
          style={{
            opacity: squareVisibility,
            top: `calc(20% - ${squareParallax}px)`,
          }}
        />
      </div>
      
      {/* Triangle */}
      <div className="fixed right-[25%] z-10 flex flex-col items-center">
        <div
          style={{
            opacity: triangleVisibility,
            transform: `rotate(${scrollY * -0.1}deg)`,
            transition: 'opacity 0.5s ease, transform 0.3s ease',
            width: '0',
            height: '0',
            borderLeft: '50px solid transparent',
            borderRight: '50px solid transparent',
            borderBottom: '100px solid #4338ca',
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
          }}
        />
        <p 
          className="mt-2 text-center font-bold text-white text-shadow px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm max-w-xs"
          style={{
            opacity: triangleVisibility,
            transform: `translateY(${triangleParallax * 0.2}px)`,
          }}
        >
          good kid, m.A.A.d city <span className="block text-sm font-normal mt-1">2012 - The cinematic masterpiece</span>
        </p>
        <div
          style={{
            opacity: triangleVisibility,
            top: `calc(35% - ${triangleParallax}px)`,
          }}
        />
      </div>
      
      {/* Circle */}
      <div className="fixed left-[30%] z-10 flex flex-col items-center">
        <div
          className="w-32 h-32 rounded-full bg-indigo-500 shadow-lg"
          style={{
            opacity: circleVisibility,
            transform: `scale(${0.8 + scrollY * 0.001})`,
            transition: 'opacity 0.5s ease, transform 0.3s ease',
          }}
        />
        <p 
          className="mt-2 text-center font-bold text-white text-shadow px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm max-w-xs"
          style={{
            opacity: circleVisibility,
            transform: `translateY(${circleParallax * 0.2}px)`,
          }}
        >
          To Pimp a Butterfly <span className="block text-sm font-normal mt-1">2015 - The revolutionary jazz-inspired opus</span>
        </p>
        <div
          style={{
            opacity: circleVisibility,
            top: `calc(50% - ${circleParallax}px)`,
          }}
        />
      </div>
      
      {/* X Shape */}
      <div className="fixed right-[35%] z-10 flex flex-col items-center">
        <div
          style={{
            opacity: xVisibility,
            transition: 'opacity 0.5s ease, transform 0.3s ease',
            width: '80px',
            height: '80px',
            position: 'relative',
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '10px',
              background: '#ec4899',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
            }}
          />
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '10px',
              background: '#ec4899',
              top: '50%',
              transform: 'translateY(-50%) rotate(-45deg)',
            }}
          />
        </div>
        <p 
          className="mt-2 text-center font-bold text-white text-shadow px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm max-w-xs"
          style={{
            opacity: xVisibility,
            transform: `translateY(${xParallax * 0.2}px)`,
          }}
        >
          DAMN. <span className="block text-sm font-normal mt-1">2017 - The Pulitzer Prize-winning classic</span>
        </p>
        <div
          style={{
            opacity: xVisibility,
            top: `calc(65% - ${xParallax}px)`,
          }}
        />
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
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-4">
            You've traveled through Kendrick's discography!
          </h2>
          <p className="text-gray-700 mb-8">
            Now use the decoder below to analyze the deeper meanings in his lyrics
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-700 mx-auto rounded-full"/>
        </div>
        
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
