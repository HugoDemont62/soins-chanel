// Fichier: src/components/CustomPages/CustomCursor.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [cursorState, setCursorState] = useState('default');
  const [cursorText, setCursorText] = useState('');

  // Variables pour la position et le mouvement
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTextEl = cursorTextRef.current;

    if (!cursor || !cursorDot) return;

    // Animation fluide du curseur - Style Chanel discret
    const updateCursor = () => {
      // Interpolation fluide pour mouvement élégant
      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * 0.1;
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * 0.1;

      gsap.set(cursor, {
        x: cursorPosition.current.x - 15, // Centrer (30px / 2)
        y: cursorPosition.current.y - 15,
      });

      gsap.set(cursorDot, {
        x: mousePosition.current.x - 1, // Point précis
        y: mousePosition.current.y - 1,
      });

      requestAnimationFrame(updateCursor);
    };

    // Gestion du mouvement de la souris
    const handleMouseMove = (e) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
        gsap.to(cursorDot, { opacity: 1, duration: 0.2 });
      }
    };

    // Gestion de la sortie de la fenêtre
    const handleMouseLeave = () => {
      isVisible.current = false;
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
      gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
      gsap.to(cursorDot, { opacity: 1, duration: 0.2 });
    };

    // Fonction pour détecter le type d'élément - Style Chanel
    const detectElementType = (element) => {
      if (!element) return 'default';

      // Vérifier si c'est le carrousel Swiper
      if (element.closest('.swiper-products') ||
        element.closest('.products-slider-track')) {
        return 'drag';
      }

      // Vérifier si c'est le canvas 3D
      if (element.tagName === 'CANVAS' || element.closest('.threejs-container')) {
        return 'drag';
      }

      // Vérifier si c'est un lien ou bouton
      if (element.tagName === 'A' ||
        element.tagName === 'BUTTON' ||
        element.closest('a') ||
        element.closest('button') ||
        element.getAttribute('data-cursor') === 'hover' ||
        element.closest('.navbar-item') ||
        element.closest('.product-btn-modern') ||
        element.closest('.gamme-discover-button') ||
        element.closest('.routine-button') ||
        element.closest('.nav-arrow-square')) {
        return 'hover';
      }

      // Vérifier si c'est un élément de texte interactif
      if (element.closest('.text-word') ||
        element.getAttribute('data-cursor') === 'text') {
        return 'text';
      }

      return 'default';
    };

    // Gestion du hover sur les éléments
    const handleMouseOver = (e) => {
      const elementType = detectElementType(e.target);

      switch (elementType) {
        case 'hover':
          setCursorState('hover');
          setCursorText('');
          break;
        case 'drag':
          setCursorState('drag');
          setCursorText('');
          break;
        case 'text':
          setCursorState('text');
          setCursorText('');
          break;
        default:
          setCursorState('default');
          setCursorText('');
      }
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    // Démarrer l'animation
    updateCursor();

    // Observer pour les nouveaux éléments
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Les nouveaux éléments seront automatiquement détectés
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      observer.disconnect();
    };
  }, []);

  // Effet pour les changements d'état du curseur - Style Chanel discret
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorTextEl = cursorTextRef.current;

    if (!cursor) return;

    switch (cursorState) {
      case 'hover':
        gsap.to(cursor, {
          scale: 1.8,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;

      case 'drag':
        gsap.to(cursor, {
          scale: 2.2,
          backgroundColor: 'rgba(212, 175, 55, 0.8)',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;

      case 'text':
        gsap.to(cursor, {
          scale: 0.6,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;

      default:
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          duration: 0.3,
          ease: 'power2.out',
        });
    }

    // Animation du texte (si nécessaire)
    if (cursorText && cursorTextEl) {
      gsap.set(cursorTextEl, { opacity: 0, scale: 0.5 });
      gsap.to(cursorTextEl, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    } else if (cursorTextEl) {
      gsap.to(cursorTextEl, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  }, [cursorState, cursorText]);

  return (
    <>
      {/* Curseur principal - Style Chanel discret */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '30px',
          height: '30px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'normal', // Pas de difference pour Chanel
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'none',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Texte dans le curseur (optionnel) */}
        <span
          ref={cursorTextRef}
          style={{
            color: '#ffffff',
            fontSize: '8px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            opacity: 0,
            pointerEvents: 'none',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {cursorText}
        </span>
      </div>

      {/* Point central précis - Plus discret */}
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '2px',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'none',
        }}
      />
    </>
  );
};

export default CustomCursor;