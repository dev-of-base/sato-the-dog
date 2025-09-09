import Image from "next/image";
import SatoToken from "./SatoToken";
import GalleryImages from "./Gallery";
import FAQs from "./FAQs";
import About from "./About";
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
import Gallery from "./Gallery";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center pt-6 md:pt-16 lg:pt-24">
      <div className="text-center">
        <h1 className="font-cherry-bomb-one text-6xl sm:text-8xl lg:text-9xl text-gray-800 mb-4 drop-shadow-lg">
          Sato the Dog
        </h1>
        <div className="flex items-baseline justify-center gap-2 max-w-2xl mx-auto">
          <span className="font-inter text-md md:text-2xl text-gray-900">Built on</span>
          <Image
            src="/assets/Base_lockup_2color.png"
            alt="Base"
            width={140}
            height={35}
            className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[35px] w-auto"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4 my-8 md:my-12 lg:my-16 flex-wrap">
            <a
                href={`https://x.com/Satothedog`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                title="X (Twitter)"
              >
                <SiX size={36} color="default" />
            </a>
            <a
                href={`https://t.me/Satothedogcto`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                title="Telegram"
              >
                <SiTelegram size={36} color="default" />
            </a>
          </div>
        <Image
          src="/assets/sato_logo_transparent.png"
          alt="Sato the Dog"
          width={600}
          height={600}
          className="mx-auto px-16"
        />
      </div>
      {/* About Sato */}
      <About />
      {/* Trade Sato */}
      <section id="sato-token" className="w-full flex flex-col items-center justify-center bg-gray-800 py-6 px-2">
        <div className="flex items-center justify-center gap-4 my-4">
          <h2 className="font-cherry-bomb-one text-4xl sm:text-5xl lg:text-6xl text-gray-100 drop-shadow-lg m-0">
            $SATO Token
          </h2>
          <Image
            src="/assets/sato-logo.jpg"
            alt="Sato the Dog Logo"
            width={60}
            height={60}
            className="ml-2 rounded-full"
          />
        </div>
        <p className="text-center font-inter text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            SATO is designed to be clean and fair. With no hidden mechanics or unfair allocations, it’s a pure
meme coin, entirely owned by the people.
          </p>
        <SatoToken />
      </section>
      {/* Gallery */}
      <section id="gallery" className="w-full bg-[#0052FF] py-16 px-4">
        <Gallery />
      </section>
      {/* FAQs */}
      <FAQs />
      {/*  */}
    </main>
  );
}
