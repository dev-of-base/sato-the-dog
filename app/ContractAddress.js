'use client';

import { useState } from "react";

export default function ContractAddress() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "0x5a70be406ce7471a44f0183b8d7091f4ad751db5";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      <div className="bg-white border-2 border-gray-200 rounded-2xl mt-4 p-2 sm:p-4 md:p-6 shadow-xl max-w-2xl w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
          <div className="flex-1 min-w-0 w-full">
            <p className="text-xs text-gray-500 mb-2 ms-2 uppercase tracking-wide font-semibold">
              Base Contract Address
            </p>
            <code className="text-gray-800 font-mono text-sm md:text-base break-words sm:break-all bg-gray-50 px-3 py-2 rounded-lg border block w-full">
              {contractAddress}
            </code>
          </div>
          <button
            onClick={copyToClipboard}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            title="Copy contract address"
          >
            {copied ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </span>
            )}
          </button>
        </div>
        <div className="flex mt-4 items-center justify-center">
          <a
            href={`https://app.uniswap.org/swap?outputCurrency=${contractAddress}&chain=base`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 text-lg"
          >
            <img
              src="/assets/uniswap-uni-logo.svg"
              alt="Uniswap Logo"
              className="h-6 w-6 brightness-0 invert"
            />
            Buy on Uniswap
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mt-4 p-4 md:p-6 w-full">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
          <a
            href="https://www.coingecko.com/en/coins/sato-the-dog"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200 flex-shrink-0"
            title="CoinGecko"
          >
            <img 
              src="/assets/coingecko.svg" 
              alt="CoinGecko" 
              className="h-8 w-auto md:h-10"
            />
          </a>
          <a
            href="https://coinmarketcap.com/currencies/sato-the-dog/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200 flex-shrink-0"
            title="CoinMarketCap"
          >
            <img 
              src="/assets/coinmarketcap.svg" 
              alt="CoinMarketCap" 
              className="h-8 w-auto md:h-10"
            />
          </a>
          <a
            href="https://dexscreener.com/base/0xddca7b95eb287493f901ae3ca747b0707c6ef7cd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200 flex-shrink-0"
            title="DexScreener"
          >
            <img 
              src="/assets/dexscreener.avif" 
              alt="DexScreener" 
              className="h-8 w-auto md:h-10"
            />
          </a>
          <a
            href="https://www.dextools.io/app/en/token/satobase"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200 flex-shrink-0"
            title="DexTools"
          >
            <img 
              src="/assets/dextools.avif" 
              alt="DexTools" 
              className="h-8 w-auto md:h-10"
            />
          </a>
        </div>
      </div>
      </>
  );
}
