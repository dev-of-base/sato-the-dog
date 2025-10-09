'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";

export default function SatoVideoAnimation() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      // Pause the video and show first frame for 2 seconds
      video.pause();
      video.currentTime = 0; // Reset to first frame
      
      setTimeout(() => {
        video.play();
      }, 2000); // 2-second delay
    };

    // Remove the loop attribute and handle it manually
    video.removeAttribute('loop');
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      width={600}
      height={600}
      className="mx-auto px-16"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/assets/SATO-Webanimation.webm" type="video/webm" />
      <source src="/assets/SATO-Webanimation.mov" type="video/quicktime" />
      {/* Fallback image for browsers that don't support video */}
      <Image
        src="/assets/sato_logo_transparent.png"
        alt="Sato the Dog"
        width={600}
        height={600}
        className="mx-auto px-16"
      />
    </video>
  );
}