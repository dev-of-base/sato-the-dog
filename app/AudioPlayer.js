"use client";

import { useState, useRef, useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.loop = true;
    audio.volume = 0.3; // Set volume to 30%
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    // Only handle internal links (starting with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = 80; // Approximate navbar height
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const toggleAudio = () => {

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        track('Pressed play');
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Play failed:', error);
      });
    }
  };

  return (
    <div className={`fixed right-4 z-40 transition-all duration-300 ${scrolled ? 'top-2' : 'top-6 lg:top-10'}`}>
      <audio
        ref={audioRef}
        src="/sato-audio-theme.mp3"
        preload="auto"
      />
      <button
        onClick={toggleAudio}
        className="bg-white/80 backdrop-blur-md hover:bg-white/90 cursor-pointer transition-all duration-200 rounded-full p-3 shadow-lg border border-gray-200 group"
        title={isPlaying ? "Pause music" : "Play music"}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? (
          // Pause icon
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-800 group-hover:text-blue-600 transition-colors"
          >
            <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1"/>
            <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1"/>
          </svg>
        ) : (
          // Play icon
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-800 group-hover:text-blue-600 transition-colors"
          >
            <path 
              d="M8 5v14l11-7z" 
              fill="currentColor"
            />
          </svg>
        )}
      </button>
      
      {/* Small indicator dot when playing */}
      {isPlaying && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}
