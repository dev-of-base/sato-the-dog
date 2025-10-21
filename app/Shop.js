'use client';
import { useEffect } from 'react';

export default function ShopItem() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit();
        }
      }
    };

    function ShopifyBuyInit() {
      const client = window.ShopifyBuy.buildClient({
        domain: 'ycjkxs-m4.myshopify.com',
        storefrontAccessToken: 'b0b0f19803c17dd8790093e903cf8c30',
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent('product', {
          id: '9962797269287',
          node: document.getElementById('product-component-1760214515358'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  'background-color': '#FFFF00',
                  'text-align': 'center'
                },
                img: {
                  'border-radius': '8px',
                  'max-width': '100%'
                },
                button: {
                  'border-radius': '8px'
                },
              },
              text: { button: 'Add to cart' },
            },
          },
        });
      });
    }

    return () => {
      // Cleanup if needed when component unmounts
      const old = document.getElementById('product-component-1760214515358');
      if (old) old.innerHTML = '';
    };
  }, []);

  return (
  <section id="sato-store" className="w-full py-6 px-2 sm:px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-6 sm:mb-12">
        <h2 className="font-cherry-bomb-one text-4xl sm:text-5xl lg:text-6xl text-gray-800 drop-shadow-lg text-center">
          Sato Store
        </h2>
      </div>
      <div className="w-full flex items-center justify-center">
        <div id="product-component-1760214515358"></div>
      </div>
    </div>
  </section>
  )
}
