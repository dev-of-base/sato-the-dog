import Image from "next/image";

export default function About() {
  return (
    <section id="about-sato" className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2 className="font-cherry-bomb-one text-4xl sm:text-5xl lg:text-6xl text-gray-800 drop-shadow-lg text-center">
            About Sato
          </h2>
          <Image
            src="/assets/sato-logo.jpg"
            alt="Sato the Dog Logo"
            width={60}
            height={60}
            className="ml-2 rounded-full"
          />
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Introduction */}
          <div className="space-y-6">
            <div>
              <h3 className="font-cherry-bomb-one text-2xl sm:text-3xl text-gray-800 mb-4">
                Introduction
              </h3>
              <p className="font-inter text-gray-700 leading-relaxed text-lg">
                SATO is a decentralized meme coin born on the Base network and originally launched with minimal
                utility beyond its meme value. After a period of abandonment by the original developers, the project
                was revived by a passionate community of holders who refused to let SATO fade into obscurity.
              </p>
              <p className="font-inter text-gray-700 leading-relaxed text-lg mt-4">
                Today, SATO is in the hands of its community. No central authority, no promises—just a shared vision
                and commitment to giving this meme coin a new life through creativity, transparency, and decentralized
                coordination.
              </p>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="space-y-6">
            <div>
              <h3 className="font-cherry-bomb-one text-2xl sm:text-3xl text-gray-800 mb-4">
                Vision & Mission
              </h3>
              <p className="font-inter text-gray-700 leading-relaxed text-lg mb-4">
                The SATO project is not just a meme coin — it is a living, evolving cultural experiment. At its core,
                SATO represents the spirit of community ownership, creativity, and fun, but it also carries the potential
                to grow far beyond its origins.
              </p>
              
              <p className="font-inter text-gray-700 leading-relaxed text-lg mb-4">
                We see SATO as:
              </p>
              
              <ul className="font-inter text-gray-700 leading-relaxed text-lg space-y-2 ml-6 list-disc">
                <li>A decentralized, community-owned movement</li>
                <li>A symbol of crypto culture that thrives on memes, transparency, and collaboration</li>
                <li>A digital character that can expand across art, gaming, entertainment, and storytelling</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Whitepaper Section */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="font-inter text-gray-700 text-lg">
            Find out more about SATO in our{" "}
            <a
              href="/SATO_WhitePaper_CommunityTakeover.pdf"
              download="SATO_WhitePaper_CommunityTakeover.pdf"
              className="font-semibold text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
            >
              Whitepaper
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
