'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * Accessible tooltip component supporting hover (desktop) and tap (mobile).
 * Usage:
 * <Tooltip content="Full explanation"><span>💰 $0.000...</span></Tooltip>
 */
export default function Tooltip({ content, children, className = '' }) {
  const [visible, setVisible] = useState(false);
  const [touchTimeout, setTouchTimeout] = useState(null);
  const wrapperRef = useRef(null);
  const tooltipId = useRef(`tt-${Math.random().toString(36).slice(2)}`);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  // Mobile tap handler: toggle and auto hide after 2.5s
  const handleTouch = (e) => {
    // Prevent triggering click navigation parent might have
    e.stopPropagation();
    if (!visible) {
      show();
      if (touchTimeout) clearTimeout(touchTimeout);
      const to = setTimeout(() => setVisible(false), 2500);
      setTouchTimeout(to);
    } else {
      hide();
    }
  };

  useEffect(() => {
    return () => {
      if (touchTimeout) clearTimeout(touchTimeout);
    };
  }, [touchTimeout]);

  // Hide on outside click (mobile)
  useEffect(() => {
    function handleDoc(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        hide();
      }
    }
    if (visible) {
      document.addEventListener('click', handleDoc);
      document.addEventListener('touchstart', handleDoc);
    }
    return () => {
      document.removeEventListener('click', handleDoc);
      document.removeEventListener('touchstart', handleDoc);
    };
  }, [visible]);

  return (
    <span
      ref={wrapperRef}
      className={`relative z-50 inline-flex items-center ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onTouchStart={handleTouch}
      aria-describedby={tooltipId.current}
      tabIndex={0}
    >
      {children}
      {visible && (
        <span
          id={tooltipId.current}
          role="tooltip"
          className="z-50 select-none absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap rounded bg-gray-600 px-2 py-1 text-[10px] font-medium text-white shadow-lg"
        >
          {content}
        </span>
      )}
    </span>
  );
}
