import Image from "next/image";
import ContractAddress from "./ContractAddress";
import ArtworkCollage from "./ArtworkCollage";
import FAQs from "./FAQs";
import { 
  SiTelegram, 
  SiX, 
  SiFarcaster, 
  SiYoutube, 
  SiInstagram, 
  SiFacebook, 
  SiTiktok, 
  SiDiscord, 
  SiReddit
} from '@icons-pack/react-simple-icons';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center pt-24">
      <div className="text-center">
        <h1 className="font-cherry-bomb-one text-5xl sm:text-8xl lg:text-9xl text-gray-800 mb-4 drop-shadow-lg">
          Sato the Dog
        </h1>
        <Image
          src="/assets/sato.png"
          alt="Sato the Dog"
          width={550}
          height={550}
          className="mx-auto px-16"
        />
      </div>
      {/* Social Links */}
      <div className="w-full flex items-center justify-center h-16 bg-white">
          <h2 className="font-inter text-lg md:text-xl lg:text-2xl me-12 text-gray-800 drop-shadow-md">Discover Sato</h2>
          <div className="flex flex-row items-center justify-center gap-4 my-3 flex-wrap">
            <a
                href={`https://x.com/Satothedog`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button bg-slate-900"
                title="X (Twitter)"
              >
                <SiX size={20} />
            </a>
            <a
                href={`https://t.me/Satothedogcto`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button bg-blue-400"
                title="Telegram"
              >
                <SiTelegram size={20} />
            </a>
          </div>
      </div>
      {/* Trade Sato */}
      <section className="w-full flex flex-col items-center justify-center bg-gray-800 py-6 px-2">
        <h2 className="font-cherry-bomb-one text-4xl sm:text-5xl lg:text-6xl text-gray-100 my-4 drop-shadow-lg">
          Trade SATO
        </h2>
        <ContractAddress />
      </section>
      {/* Artwork Collage */}
      <section className="w-full bg-[#0052FF] py-16 px-4">
      <ArtworkCollage />
      </section>
      {/* FAQs */}
      <FAQs />
      {/*  */}
    </main>
  );
}
