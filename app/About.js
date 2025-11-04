import Image from "next/image";
import WhitepaperLink from "./WhitepaperLink";

export default function About() {
  return (
    <section id="about-sato" className="w-full bg-gradient-to-b from-yellow-50 via-white to-yellow-50 py-4 sm:py-6 lg:py-8 px-0 sm:px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-8">
          <div className="relative">
            <h2 className="font-cherry-bomb-one text-5xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 drop-shadow-lg text-center animate-gradient">
              About Sato
            </h2>
          </div>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Introduction Card */}
          <div className="space-y-6 order-1 flex flex-col">
            <div className="rounded-3xl p-4 sm:p-6 flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-12 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                <h3 className="font-cherry-bomb-one text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
                  Introduction
                </h3>
              </div>
              
              <div className="space-y-5">
                <p className="font-inter text-gray-700 leading-relaxed text-base sm:text-lg relative">
                  <span className="font-semibold text-gray-900">Sato the Dog (SATO)</span> is a decentralized meme coin born on the <span className="font-semibold text-blue-600">Base Chain</span> and originally launched with minimal
                  utility beyond its meme value. After a period of abandonment by the original developers, the project
                  was revived by a passionate community of holders who refused to let SATO fade into obscurity.
                </p>
                
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                
                <p className="font-inter text-gray-700 leading-relaxed text-base sm:text-lg relative">
                  Today, SATO is in the hands of its <span className="font-semibold">community</span>. No central authority, no hidden agenda - just a shared vision
                  and commitment to giving this meme coin a new life through <span className="font-semibold">creativity</span>, <span className="font-semibold">transparency</span>, and <span className="font-semibold">decentralized
                  coordination</span>.
                </p>
              </div>
              
              {/* Whitepaper */}
              <div className="text-center mt-6 sm:mt-12 py-4 px-2 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 rounded-3xl border-2 border-yellow-300">
                <p className="font-inter text-gray-800 text-lg sm:text-xl font-medium">
                  🐕 Discover the full story of SATO in our{" "}
                  <WhitepaperLink className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 underline decoration-2 underline-offset-4 transition-all duration-300 hover:scale-105 inline-block" />
                </p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-2 p-6 relative group flex items-center">
              <Image
                src="/assets/about-sato-img.jpg"
                alt="Sato the Dog"
                width={800}
                height={800}
                className="mx-auto rounded-2xl w-full max-w-[480px] h-auto border border-yellow-100 relative z-10"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
