'use client';

import { useState } from 'react';

export default function FAQs() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is SATO?",
      answer: "SATO is a community-driven meme token inspired by Sato the Dog, bringing fun and utility to the crypto space with a focus on building a strong, engaged community."
    },
    {
      id: 2,
      question: "Where can I trade SATO?",
      answer: "SATO can be traded on various decentralized exchanges (DEXs) and centralized exchanges. Check our official channels for the most up-to-date list of supported trading platforms."
    },
    {
      id: 3,
      question: "What is the official Contract Address of SATO?",
      answer: "The official contract address can be found in our Contract Address section above. Always verify the contract address through our official channels to avoid scams."
    },
    {
      id: 4,
      question: "What are the SATO NFTs?",
      answer: "SATO NFTs are unique digital collectibles featuring Sato the Dog artwork and characters. These NFTs provide holders with special utility and community benefits within the SATO ecosystem."
    },
    {
      id: 5,
      question: "What is the Woof DAO?",
      answer: "Woof DAO is the decentralized autonomous organization that governs the SATO ecosystem. It allows community members to participate in decision-making processes and vote on important proposals for the project's future."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-cherry-bomb-one text-4xl sm:text-5xl lg:text-6xl text-gray-800 text-center mb-12 drop-shadow-lg">
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
                  <p className="font-inter text-gray-700 leading-relaxed">
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
