'use client';
import Image from "next/image";
import { useEffect } from 'react';

export default function ShopItem() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.ShopifyBuy && window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      }
    };

    function ShopifyBuyInit() {
      const client = window.ShopifyBuy.buildClient({
        domain: 'ycjkxs-m4.myshopify.com',
        storefrontAccessToken: 'b0b0f19803c17dd8790093e903cf8c30',
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent('collection', {
          id: '507271348519', // collection ID
          node: document.getElementById('collection-component-1762102981888'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              contents: {
                img: false, // show static image on grid
                imgWithCarousel: true, // disable carousel on grid
                thumbnails: false, // no thumbnail strip
              },
              openModalOnClick: true, // ✅ clicking product opens modal
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': 'calc(25% - 20px)',
                    'margin-left': '20px',
                    'margin-bottom': '50px',
                    'width': 'calc(25% - 20px)',
                    'min-width': '150px',
                  },
                  '@media (max-width: 600px)': {
                    'max-width': 'calc(50% - 20px)',
                    'margin-left': '20px',
                    'margin-bottom': '30px',
                    'width': 'calc(50% - 20px)',
                    'min-width': '120px',
                  },
                  'margin-top': '0 !important',
                },
                button: {
                  'border-radius': '8px',
                  'font-size': '14px',
                  'padding': '10px',
                },
                carousel: {
                  'display': 'none !important',
                },
              },
              text: {
                button: 'Add to cart',
              },
            },
            productSet: {
              styles: {
                products: {
                  'margin-left': '-20px',
                },
              },
            },
            // ✅ Modal config (automatically created & attached by SDK)
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true, // carousel enabled only inside modal
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  'border-radius': '8px',
                },
                carousel: {
                  'display': 'none !important',
                },
              },
              text: {
                button: 'Add to cart',
              },
            },
            cart: {
              styles: {
                button: {
                  'border-radius': '8px',
                },
              },
              text: {
                total: 'Subtotal',
                button: 'Checkout',
              },
            },
          },
        });
      });
    }

    return () => {
      const old = document.getElementById('collection-component-1762102981888');
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
          <div id="collection-component-1762102981888"></div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mb-6">
        <a
          href="https://ycjkxs-m4.myshopify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
        >
          Visit Full Store{" "}
          <Image
            src="/assets/shopify_glyph.svg"
            alt="Shopify"
            width={30}
            height={30}
            className="inline-block w-[25px] h-[25px] -mt-1"
          />
        </a>
      </div>
    </section>
  );
}
