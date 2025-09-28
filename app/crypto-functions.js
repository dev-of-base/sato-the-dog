/**
 * Internal helper to format very small numbers with zero counting logic
 * @param {number} numPrice - The numeric price
 * @returns {Object} Object with display parts for rendering
 */
export function formatSmallNumber(numPrice) {
  // Convert to fixed decimal notation instead of using toString()
  // Use enough decimal places to capture very small numbers
  const str = numPrice.toFixed(20);
  
  if (!str.includes('.')) return { display: str, subscript: '', digits: '' };

  const [intPart, decPartRaw] = str.split('.');
  
  if (intPart !== '0') {
    return { display: numPrice.toFixed(2), subscript: '', digits: '' };
  }
  
  // Count leading zeros after the decimal point
  let zeros = 0;
  for (let i = 0; i < decPartRaw.length; i++) {
    if (decPartRaw[i] === '0') zeros++;
    else break;
  }
  
  let display = `${intPart}.`;
  let subscript = '';
  let digits = '';

  if (zeros > 2) {
    display += '0';
    subscript = zeros.toString();
    digits = decPartRaw.slice(zeros, zeros + 4);
    if (digits.length < 4) {
      digits = digits.padEnd(4, '0');
    }
  } else if (zeros === 1 || zeros === 2) {
    display += '0'.repeat(zeros);
    digits = decPartRaw.slice(zeros, zeros + 4);
    if (digits.length < 4) {
      digits = digits.padEnd(4, '0');
    }
  } else {
    digits = decPartRaw.slice(0, 4);
    if (digits.length < 4) {
      digits = digits.padEnd(4, '0');
    }
  }

  return { display, subscript, digits };
}

/**
 * Shortens price USD for display with proper formatting for very small numbers
 * Returns a string representation (subscript notation as text)
 * @param {number|string} price - The price in USD (number or string)
 * @returns {string} Formatted price string
 */
export function shortenPriceUsd(price) {
  if (price === undefined || price === null) return '--';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) return '--';
  
  // For numbers >= 1, show with appropriate decimal places
  if (numPrice >= 1) {
    if (numPrice >= 1000) {
      return numPrice.toLocaleString('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      });
    } else {
      return numPrice.toFixed(2);
    }
  }
  
  const { display, subscript, digits } = formatSmallNumber(numPrice);
  
  if (subscript) {
    return `${display}(${subscript})${digits}`;
  } else {
    return `${display}${digits}`;
  }
}

/**
 * Shortens price USD for display with proper JSX subscript rendering for very small numbers
 * @param {number|string} price - The price in USD (number or string)
 * @returns {React.ReactNode} Formatted price with proper subscript JSX
 */
export function shortenPriceUsdJSX(price) {
  if (price === undefined || price === null) return '--';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) return '--';
  
  // For numbers >= 1, show with appropriate decimal places
  if (numPrice >= 1) {
    if (numPrice >= 1000) {
      return numPrice.toLocaleString('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      });
    } else {
      return numPrice.toFixed(2);
    }
  }
  
  const { display, subscript, digits } = formatSmallNumber(numPrice);

  return (
    <>
      {display}
      {subscript && (
        <sub style={{ fontSize: '0.7em', verticalAlign: 'middle' }}>{subscript}</sub>
      )}
      {digits}
    </>
  );
}