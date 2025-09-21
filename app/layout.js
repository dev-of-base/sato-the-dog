
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import MarketData from "./MarketData";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AudioPlayer from "./AudioPlayer";
import { Cherry_Bomb_One, Inter, Poppins, Baloo_2 } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

const cherryBombOne = Cherry_Bomb_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cherry-bomb-one"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins"
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins"
});

export const metadata = {
  title: "Sato the Dog | Community-Owned Meme Coin on Base Chain",
  description: "SATO is a decentralized meme coin born on the Base Chain, revived by a passionate community. Join the movement for community ownership, creativity, and fun in the crypto space.",
  keywords: ["SATO", "meme coin", "memecoin", "Base network", "Base Chain", "cryptocurrency", "DeFi", "community token", "decentralized", "crypto", "blockchain"],
  authors: [{ name: "SATO Community" }],
  creator: "SATO Community",
  publisher: "SATO Community",
  metadataBase: new URL('http://www.satocto.com/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Sato the Dog | Community-Owned Meme Coin on Base Chain",
    description: "SATO is a decentralized meme coin born on the Base Chain, revived by a passionate community. Join the movement for community ownership, creativity, and fun in the crypto space.",
    url: 'http://www.satocto.com/',
    siteName: 'Sato the Dog',
    images: [
      {
        url: '/assets/sato_logo_transparent.png',
        width: 1200,
        height: 630,
        alt: 'Sato the Dog Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sato the Dog | Community-Owned Meme Coin on Base Chain",
    description: "SATO is a decentralized meme coin born on the Base Chain, revived by a passionate community. Join the movement for community ownership, creativity, and fun in the crypto space.",
    images: ['/assets/sato_logo_transparent.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'cryptocurrency',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/sato_logo_transparent.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${cherryBombOne.variable} ${poppins.variable} ${baloo.variable} antialiased`}>
        <MarketData />
        <Navbar />
        <AudioPlayer />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
