import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Variables pour la position du curseur
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Animation de suivi du curseur avec un léger délai pour l'effet "mouse follower"
    const updateCursor = () => {
      // Interpolation pour un mouvement fluide
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      gsap.set(cursor, {
        x: cursorX - 10, // Centrer le curseur (20px / 2)
        y: cursorY - 10,
      });

      requestAnimationFrame(updateCursor);
    };

    // Gestion du mouvement de la souris
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Gestion du hover sur les éléments interactifs
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: '#D4AF37', // Couleur or Chanel
        duration: 0.3,
        ease: 'power2.out',
      });
      cursor.classList.add('cursor-hover');
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#000000', // Noir Chanel
        duration: 0.3,
        ease: 'power2.out',
      });
      cursor.classList.remove('cursor-hover');
    };

    // Cacher le curseur quand il quitte la fenêtre
    const handleMouseLeaveWindow = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.3,
      });
    };

    // Ajouter les event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Sélectionner tous les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="hover"]');

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Démarrer l'animation
    updateCursor();

    // Observer pour les nouveaux éléments ajoutés dynamiquement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const newInteractiveElements = node.querySelectorAll?.('a, button, [data-cursor="hover"]') || [];
            newInteractiveElements.forEach((el) => {
              el.addEventListener('mouseenter', handleMouseEnter);
              el.addEventListener('mouseleave', handleMouseLeave);
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Curseur principal */}
      <div
        ref={cursorRef}
        className="cursor fixed top-0 left-0 w-5 h-5 bg-chanel-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          backgroundColor: '#000000',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />

      {/* Point central (optionnel pour un effet plus sophistiqué) */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-chanel-white rounded-full pointer-events-none z-[10000]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-2px, -2px)',
        }}
      />
    </>
  );
};

export default CustomCursor;