"use client"

import Image from "next/image";
import { useState, useEffect } from "react";

export default function GalleryImages() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (artwork) => {
    setSelectedImage(artwork);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = artworkImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === artworkImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? artworkImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(artworkImages[newIndex]);
  };

  // Close modal on Escape key press, navigate with arrow keys
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    }
  };

  // Add event listener for Escape key
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen]);
  // Actual artwork data with real images
  const artworkImages = [
    { id: 1, src: "/gallery/A1.png", alt: "Sato Artwork A1", type: "square" },
    { id: 2, src: "/gallery/campfire_scene.webp", alt: "Sato Campfire Scene", type: "portrait" },
    { id: 3, src: "/gallery/moon_scene.webp", alt: "Sato Moon Scene", type: "portrait" },
    { id: 4, src: "/gallery/sato_cliff_sunset.webp", alt: "Sato Cliff Sunset", type: "portrait" },
    { id: 5, src: "/gallery/sato_campfire.webp", alt: "Sato by the Campfire", type: "square" },
    { id: 6, src: "/gallery/sato_cloak.webp", alt: "Sato in Cloak", type: "square" },
    { id: 7, src: "/gallery/sato_dragon.webp", alt: "Sato Dragon", type: "portrait" },
    { id: 8, src: "/gallery/sato_greenbeam.webp", alt: "Sato Green Beam", type: "portrait" },
    { id: 9, src: "/gallery/sato_hug.webp", alt: "Sato Hug", type: "square" },
    { id: 10, src: "/gallery/sato_king_web.webp", alt: "Sato King", type: "portrait" },
    { id: 11, src: "/gallery/sato_wolf.webp", alt: "Sato Wolf", type: "portrait" },
    { id: 12, src: "/gallery/sato_powerup.webp", alt: "Sato Power Up", type: "portrait" },
    { id: 13, src: "/gallery/sato_punch.webp", alt: "Sato Punch", type: "square" },
    { id: 14, src: "/gallery/sato_rocky_web.webp", alt: "Sato Rocky", type: "portrait" },
    { id: 15, src: "/gallery/sato_sunset.webp", alt: "Sato Sunset", type: "square" },
    { id: 16, src: "/gallery/sato_underwater.webp", alt: "Sato Underwater", type: "portrait" },
    { id: 17, src: "/gallery/sato_village.webp", alt: "Sato Village", type: "square" },
    { id: 18, src: "/gallery/sato_whale_web.webp", alt: "Sato Whale", type: "portrait" },
    { id: 19, src: "/gallery/sato_crappy_bird.jpg", alt: "Sato and Crappy Bird", type: "square" },
    { id: 20, src: "/gallery/sato_goalkeeper.jpg", alt: "Sato Goalkeeper", type: "portrait" },
  ];

  return (
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-cherry-bomb-one text-4xl sm:text-5xl lg:text-6xl text-gray-100 mb-4 drop-shadow-lg">
            SATO Gallery
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Explore Sato through stunning artwork and community creations
          </p>
        </div>

        {/* Artwork Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {artworkImages.map((artwork, index) => (
            <div
              key={artwork.id}
              className="break-inside-avoid mb-4 md:mb-6"
            >
              <div 
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => openModal(artwork)}
              >
                {/* Actual Image */}
                <div 
                  className={`
                    relative overflow-hidden
                    ${artwork.type === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'}
                  `}
                >
                  <Image
                    src={artwork.src}
                    alt={artwork.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            {/* Modal overlay - click to close */}
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={closeModal}
            />
            
            {/* Modal content */}
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 cursor-pointer z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Previous button */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 cursor-pointer transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next button */}
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 cursor-pointer transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>

              {/* Image info */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-gray-300 text-sm mb-2">
                    {artworkImages.findIndex(img => img.id === selectedImage.id) + 1} of {artworkImages.length}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Use arrow keys to navigate • ESC to close
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
