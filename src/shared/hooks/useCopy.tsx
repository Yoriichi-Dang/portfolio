import { useState, useEffect, useRef } from 'react';

const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Clear existing timeout if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset copied state after 4 seconds
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 4000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      setCopied(false);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { copied, copyToClipboard };
};

export { useCopy };
