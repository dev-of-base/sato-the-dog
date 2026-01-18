import Image from "next/image";
import { SiX, SiTelegram, SiTiktok, SiFacebook, SiYoutube } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#ffff00] text-white pt-8">
      <div className="container mx-auto px-0 text-center">
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://x.com/SatoCtoBase"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-button hover:scale-110 transition-transform duration-200"
            title="X (Twitter)"
          >
            <SiX size={36} color="default" />
          </a>
          <a
            href="https://t.me/Satothedogcto"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-button hover:scale-110 transition-transform duration-200"
            title="Telegram"
          >
            <SiTelegram size={36} color="default" />
          </a>
          <a
            href="https://www.tiktok.com/@satothedogbase"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-button hover:scale-110 transition-transform duration-200"
            title="TikTok"
          >
            <SiTiktok size={36} color="default" />
          </a>
          <a
            href="https://www.facebook.com/share/1Hcja2isfz/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-button hover:scale-110 transition-transform duration-200"
            title="Facebook"
          >
            <SiFacebook size={36} color="default" />
          </a>
          <a
            href={`https://www.youtube.com/@animationx777`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-button hover:scale-110 transition-transform duration-200"
            title="Youtube"
          >
            <SiYoutube size={36} color="default" />
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mb-6 px-2">
          <p className="text-sm sm:text-base text-gray-900 max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> $SATO is a memecoin created for entertainment purposes only. 
            It has no intrinsic value and should not be considered an investment. 
            Please do your own research and invest responsibly.
          </p>
        </div>

        {/* Copyright */}
        <div className="mb-1 px-2">
          <p className="text-sm sm:text-base text-gray-900">
            © 2025 Sato The Dog. All rights reserved. | Built with ❤️ by{" "}
            <a
              href="https://x.com/KrakenC0ke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              @KrakenC0ke
            </a>
          </p>
        </div>

        {/* Footer Banner */}
        <div className="relative w-full">
          <Image
            src="/assets/footer-banner-fade.png"
            alt="Sato Footer Banner"
            width={1500}
            height={900}
            className="w-full h-auto object-cover"
            priority={false}
          />
        </div>
      </div>
    </footer>
  );
}
