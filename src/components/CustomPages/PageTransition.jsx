import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PageTransition = ({ children, pathname }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) return;

    // Timeline pour l'animation de transition
    const tl = gsap.timeline();

    // Animation d'entrée de la nouvelle page
    tl.set(overlay, {
      scaleX: 0,
      transformOrigin: 'left center',
    })
    .set(container, {
      opacity: 0,
      y: 20,
    })
    .to(overlay, {
      scaleX: 1,
      duration: 0.6,
      ease: 'power3.inOut',
    })
    .to(overlay, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.6,
      ease: 'power3.inOut',
    })
    .to(container, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div className="relative">
      {/* Overlay de transition */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-chanel-black z-[9998]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000000',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      />

      {/* Contenu de la page */}
      <div
        ref={containerRef}
        className="page-content opacity-0"
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;