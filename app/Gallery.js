import Image from "next/image";

export default function GalleryImages() {
  // Placeholder image data with different aspect ratios
  const artworkPlaceholders = [
    { id: 1, alt: "Sato Artwork 1", type: "portrait" },
    { id: 2, alt: "Sato Artwork 2", type: "square" },
    { id: 3, alt: "Sato Artwork 3", type: "square" },
    { id: 4, alt: "Sato Artwork 4", type: "portrait" },
    { id: 5, alt: "Sato Artwork 5", type: "square" },
    { id: 6, alt: "Sato Artwork 6", type: "portrait" },
    { id: 7, alt: "Sato Artwork 7", type: "square" },
    { id: 8, alt: "Sato Artwork 8", type: "portrait" },
    { id: 9, alt: "Sato Artwork 9", type: "square" },
    { id: 10, alt: "Sato Artwork 10", type: "portrait" },
    { id: 11, alt: "Sato Artwork 11", type: "square" },
    { id: 12, alt: "Sato Artwork 12", type: "portrait" },
  ];

  return (
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-cherry-bomb-one text-4xl sm:text-5xl lg:text-6xl text-gray-100 mb-4 drop-shadow-lg">
            SATO Artwork
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Explore the creative world of Sato through stunning artwork and community creations
          </p>
        </div>

        {/* Artwork Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {artworkPlaceholders.map((artwork, index) => (
            <div
              key={artwork.id}
              className="break-inside-avoid mb-4 md:mb-6"
            >
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {/* Placeholder with gradient background */}
                <div 
                  className={`
                    relative bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center
                    ${artwork.type === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'}
                  `}
                >
                  {/* Placeholder content */}
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-lg md:text-2xl">🎨</span>
                    </div>
                    <p className="text-gray-700 font-medium text-xs md:text-sm px-2">
                      {artwork.type === 'portrait' ? '📏' : '⬜'} Art {artwork.id}
                    </p>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3">
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            View Gallery
          </button>
        </div>
      </div>
  );
}
