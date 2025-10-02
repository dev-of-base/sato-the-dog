import Image from "next/image";

export default function SatoNFTs() {
  return (
    <section id="sato-nfts" className="w-full relative min-h-[600px] flex items-center justify-center px-4 py-16">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <Image
          src="/gallery/sato_punch.webp"
          alt="Sato Punch Background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Semi-transparent white box */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-8 md:p-12 shadow-2xl">
          {/* Title */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <h2 className="font-cherry-bomb-one text-3xl sm:text-4xl lg:text-5xl text-gray-800 drop-shadow-lg text-center">
              SATO NFTs
            </h2>
          </div>
          
          {/* Main Text */}
          <div className="space-y-6 mb-8">
            <p className="font-inter text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl text-center">
              Originally, around 5,000 NFTs were launched by the old team. After everything that happened, 
              we decided to create a new 100-piece limited collection — dedicated to the loyal holders who 
              stood by SATO and are helping rebuild the project.
            </p>
          {/* NFT Showcase Video */}
          <div className="flex justify-center mb-8">
            <video 
              className="rounded-xl shadow-lg max-w-full h-auto"
              width="400"
              height="300"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/assets/SATO_nft_showcase.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
            <p className="font-inter text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl text-center font-semibold">
              These special NFTs are now available on OpenSea.<br />Find your favorite & join the club 🐾
            </p>
          </div>
          
          {/* OpenSea Link */}
          <div className="flex justify-center">
            <a 
              href="https://opensea.io/collection/sato-100-limited-collection/explore"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-white font-cherry-bomb-one text-lg md:text-xl px-4 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-2 text-center"
            >
              Explore on OpenSea 
              <Image
                src="/assets/opensea-icon.svg"
                alt="OpenSea"
                width={30}
                height={30}
                className="inline-block w-[25px] h-[25px]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
