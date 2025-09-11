
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AudioPlayer from "./AudioPlayer";
import { Cherry_Bomb_One, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

const cherryBombOne = Cherry_Bomb_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cherry-bomb-one"
})


export const metadata = {
  title: "Sato the Dog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cherryBombOne.variable} antialiased`}>
        <Navbar />
        <AudioPlayer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
