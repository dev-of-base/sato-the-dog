"use client";

import { track } from '@vercel/analytics';

export default function WhitepaperLink({ className }) {
  return (
    <a
      href="/SATO_WhitePaper_CommunityTakeover.pdf"
      download="SATO_WhitePaper_CommunityTakeover.pdf"
      onClick={() => track('whitepaper_click', { source: 'about_section' })}
      className={className}
    >
      Whitepaper
    </a>
  );
}
