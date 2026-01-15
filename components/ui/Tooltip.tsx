"use client";

import React, { useState } from "react";

interface TooltipProps {
  /** The text to underline and trigger the tooltip */
  text: string;
  /** The definition context to show in the tooltip */
  content: string;
  /** Optional URL for "Explore more" link */
  link?: string;
  /** Optional text for the link. Defaults to "Explore more ->" */
  linkText?: string;
}

export default function Tooltip({ text, content, link, linkText = "Explore more →" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {/* Trigger Text */}
      {/* Trigger Text */}
      {link ? (
        <>
        <a 
          href={link}
          target="_blank"
          rel="noopener"
          className="cursor-pointer border-b border-dashed border-zinc-500 decoration-zinc-500 hover:border-zinc-200 hover:text-zinc-100 transition-colors no-underline"
        >
          {text}
        </a> 
        <span>&nbsp;</span> 
        </>
      ) : (
        <>
        <span className="cursor-help border-b border-dashed border-zinc-500 decoration-zinc-500 hover:border-zinc-200 hover:text-zinc-100 transition-colors">
          {text}
        </span>
        <span>&nbsp;</span> 
        </>
      )}

      {/* Tooltip Popup */}
      {isVisible && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-zinc-800 text-zinc-100 text-sm rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-bottom-1 duration-200 border border-zinc-700"
          role="tooltip"
        >
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-4 border-transparent border-t-zinc-800" />
          
          <p className="leading-relaxed mb-2 mt-0 font-medium">
            {content}
          </p>
          
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener"
              className="text-blue-300 hover:text-blue-200 text-xs font-semibold uppercase tracking-wide inline-flex items-center gap-1 transition-colors"
            >
              {linkText}
            </a>
          )}
        </div>
      )}
    </span>
  );
}
