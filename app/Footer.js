import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full h-96 md:h-128 overflow-hidden">
      <Image
        src="/assets/footer-banner.png"
        alt="Footer Banner"
        fill
        className="object-cover"
        priority={false}
      />
    </footer>
  );
}
