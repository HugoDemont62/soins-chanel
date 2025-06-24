// Fichier: src/hooks/useLenis.js
import { useEffect, useRef } from 'react';

export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Méthodes utiles
  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };

  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start
  };
};