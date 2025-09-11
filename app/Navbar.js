"use client";

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (e, href) => {
    // Only handle internal links (starting with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsMenuOpen(false); // Close mobile menu
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = 80; // Approximate navbar height
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const menuItems = [
    { href: "#about-sato", label: "About Sato", target: "_self" },
    { href: "#sato-token", label: "$SATO", target: "_self" },
    { href: "#gallery", label: "Sato Gallery", target: "_self" },
    { href: "#sato-nfts", label: "Sato NFTs", target: "_self" },
    { href: "/SATO_WhitePaper_CommunityTakeover.pdf", label: "Whitepaper", target: "_blank" },
    { href: "#faqs", label: "FAQs", target: "_self" }
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <nav className="font-inter relative top-2 lg:fixed lg:top-6 left-1/2 transform -translate-x-1/2 z-50">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex px-8 py-3 gap-6 items-center bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.target}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-gray-800 font-semibold hover:text-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Navigation - Burger Button */}
        <div className="lg:hidden">
          <div className="px-4 py-3 flex justify-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu - Outside of nav container */}
      <div 
        className={`lg:hidden fixed top-16 left-0 w-full bg-[#FFFF00]/50 backdrop-blur-md border-b border-gray-200 shadow-lg z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-full overflow-hidden">
          <div className="py-2">
            {menuItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                target={item.target}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`block w-full py-3 text-center text-gray-800 font-bold hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 ${
                  isMenuOpen 
                    ? 'transform translate-x-0 opacity-100' 
                    : 'transform translate-x-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
