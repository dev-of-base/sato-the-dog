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
 * Formats large numbers with appropriate suffixes (K, M, B)
 * @param value - The number to format (number or string)
 * @returns Formatted string with suffix
 */
export function formatLargeNumber(value) {
  if (value === undefined || value === null) return '--';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '--';
  
  if (numValue >= 1e9) {
    return `$${(numValue / 1e9).toFixed(2)}B`;
  } else if (numValue >= 1e6) {
    return `$${(numValue / 1e6).toFixed(2)}M`;
  } else if (numValue >= 1e3) {
    return `$${(numValue / 1e3).toFixed(2)}K`;
  } else {
    return `$${numValue.toFixed(2)}`;
  }
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
 * Formats a timestamp string to a readable date format
 * @param timestamp - The timestamp string to format
 * @returns Formatted date string or 'Not available' if timestamp is invalid
 */
export function formatTimestamp(timestamp) {
  if (!timestamp) return 'Not available';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}