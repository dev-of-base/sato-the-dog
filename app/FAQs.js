'use client';

import { useState } from 'react';

export default function FAQs() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is SATO?",
      answer: "SATO is a fully community-led meme token built on the Base network. When the original team abandoned the project, they didn’t just walk away — they created damage. Through a flawed staking program, many holders lost not only their rewards but also their entire initial investment. What happened next is something rare in crypto. Instead of letting the project die, dedicated community members stepped in to save it. Out of their own wallets, loyal holders redistributed tokens back to those who had lost theirs. Without this unprecedented act of solidarity, SATO would never have survived — because a large portion of the community would have been permanently wiped out. This act of self-sacrifice and unity is what revived SATO. It turned the token into more than a meme — it became a story of resilience, trust, and true decentralization."
    },
    {
      id: 2,
      question: "Where can I trade SATO?",
      answer: "Right now, SATO can be traded on Uniswap (Base network). You can also access it directly through the Base app (previously Coinbase Wallet). Both options give you easy, decentralized access to buying and selling SATO."
    },
    {
      id: 3,
      question: "What is the official Contract Address of SATO?",
      answer: "The official contract address for $SATO on the base network is 0x5a70be406ce7471a44f0183b8d7091f4ad751db5. Always verify the contract address through our official channels to avoid scams."
    },
    {
      id: 4,
      question: "What are the SATO NFTs?",
      answer: "Originally, around 5,000 NFTs were launched by the old team. After everything that happened, we decided to create a new 100-piece limited collection — dedicated to the loyal holders who stood by SATO and are helping rebuild the project. These special NFTs are coming very soon."
    },
    {
      id: 5,
      question: "What is the Woof DAO?",
      answer: "The Woof DAO is SATO’s community-driven governance system. While it’s not fully official yet, the treasury is managed through a multi-signature wallet, decisions are made transparently, and holders can take part through polls and proposals."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="faqs" className="w-full bg-white py-6 px-2">
      <div className="max-w-4xl mx-auto mb-4">
        <h2 className="font-cherry-bomb-one text-4xl sm:text-5xl lg:text-6xl text-gray-800 text-center mb-6 sm:mb-12 drop-shadow-lg">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-50 rounded-lg border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left font-inter font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
              >
                <span className="text-lg">{faq.question}</span>
                <span
                  className={`transform transition-transform duration-200 text-2xl ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === faq.id
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="font-inter text-gray-700 text-sm sm:text-base sm:leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
