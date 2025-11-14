'use client';

import Image from 'next/image';

export default function BaseArena() {
  return (
    <section id="base-arena" className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-cherry-bomb-one text-4xl sm:text-5xl lg:text-6xl text-white drop-shadow-lg mb-4">
            The Base Arena ⚽🏟️
          </h2>
          <p className="font-inter text-base sm:text-xl text-blue-200">
            A Fast, Dynamic Mini-Football Experience
          </p>
        </div>

        {/* Game Image with Overlaid Description */}
        <div className="relative w-full mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/assets/base-arena.png"
            alt="The Base Arena - Mini Football Game"
            width="1024"
            height="768"
            className="object-cover"
            priority
            onError={(e) => {
              // Fallback to a gradient background if image doesn't exist
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          {/* Description Overlay */}
          <div className="sm:absolute sm:bottom-0 sm:left-0 sm:right-0 bg-white/10 backdrop-blur-md p-2 sm:p-4 lg:p-6 border-t border-white/20">
            <p className="font-inter text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed mb-4">
              We proudly present a brand-new mini-game experience! The Base Arena is a fast-paced, 
              dynamic mini-football game brought to you through the collaborative efforts of Krypto Cock Coin and SATO.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="https://game.satocto.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-4 px-4 sm:px-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-sm sm:text-xl"
          >
            <span className="relative z-10">🎮 Play The Base Arena</span>
            <svg 
              className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
            {/* Animated background effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

        {/* Powered by chips */}
        <div className="mt-2 flex items-center justify-center gap-6 sm:gap-8">
          <div className="text-center">
            <p className="font-inter text-sm text-blue-200 mb-2">Powered by</p>
            <div className="flex items-center gap-4">
              <a
                href="https://linktr.ee/kryptoCockCoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 hover:bg-white/20 transition-colors duration-200"
              >
                <span className="font-cherry-bomb-one text-2xl text-white">$COCK</span>
              </a>
              <span className="text-white text-2xl">×</span>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <span className="font-cherry-bomb-one text-2xl text-white">$SATO</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
