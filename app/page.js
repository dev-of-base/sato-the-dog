import Image from "next/image";
import SatoToken from "./SatoToken";
import FAQs from "./FAQs";
import About from "./About";
import SatoNFTs from "./SatoNFTs";
import ShopItem from "./Shop";
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
import SatoVideoAnimation from "./SatoVideoAnimation";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center pt-6 md:pt-16 lg:pt-24">
      <div className="text-center">
        {/* <h1 className="font-cherry-bomb-one text-7xl sm:text-8xl lg:text-9xl text-gray-800 mb-4 drop-shadow-lg">
          Sato the Dog
        </h1> */}
        <Image 
          src="/assets/sato-wordart.png"
          alt="SATO"
          width={550}
          height={225}
          priority
          className="mx-auto px-4 w-[400px] md:w-[500px] lg:w-[550px] h-auto"
        />
        <div className="flex items-baseline justify-center gap-2 max-w-2xl mx-auto">
          <span className="font-inter text-md md:text-2xl text-gray-900">on</span>
          <Image
            src="/assets/Base_lockup_2color.png"
            alt="Base"
            width={140}
            height={35}
            className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[35px] w-auto"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 my-8 md:my-12 lg:my-16 flex-wrap">
            <a
                href={`https://x.com/Satothedog`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                title="X (Twitter)"
              >
                <SiX className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" color="default" />
            </a>
            <a
                href={`https://t.me/Satothedogcto`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                title="Telegram"
              >
                <SiTelegram className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" color="default" />
            </a>
            <a
                href={`https://www.tiktok.com/@satothedogbase`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                title="TikTok"
              >
                <SiTiktok className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" color="default" />
            </a>
            <a
                href={`https://www.facebook.com/share/1Hcja2isfz/`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                title="Facebook"
              >
                <SiFacebook className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" color="default" />
            </a>
            <a
                href={`https://youtube.com/@satothedogcto`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                title="Youtube"
              >
                <SiYoutube className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" color="default" />
            </a>
          </div>
        <SatoVideoAnimation />
      </div>
      {/* About Sato */}
      <About />
      {/* Trade Sato */}
      <SatoToken />
      {/* Gallery */}  
      <Gallery />
      {/* Store */}
      <ShopItem />
      {/* SATO NFTs */}
      <SatoNFTs />
      {/* FAQs */}
      <FAQs />
      {/*  */}
    </main>
  );
}
