// Fichier: src/components/CustomPages/CustomCursor.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'drag', 'text'
  const [cursorText, setCursorText] = useState('');

  // Variables pour la position et le mouvement
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const isVisible = useRef(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTextEl = cursorTextRef.current;

    if (!cursor || !cursorDot) return;

    // Animation fluide du curseur
    const updateCursor = () => {
      // Interpolation pour un mouvement fluide
      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * 0.15;
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * 0.15;

      gsap.set(cursor, {
        x: cursorPosition.current.x - 25, // Centrer le curseur (50px / 2)
        y: cursorPosition.current.y - 25,
      });

      gsap.set(cursorDot, {
        x: mousePosition.current.x - 2, // Point précis
        y: mousePosition.current.y - 2,
      });

      requestAnimationFrame(updateCursor);
    };

    // Gestion du mouvement de la souris
    const handleMouseMove = (e) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
        gsap.to(cursorDot, { opacity: 1, duration: 0.3 });
      }
    };

    // Gestion de la sortie de la fenêtre
    const handleMouseLeave = () => {
      isVisible.current = false;
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      gsap.to(cursorDot, { opacity: 0, duration: 0.3 });
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
      gsap.to(cursorDot, { opacity: 1, duration: 0.3 });
    };

    // Fonction pour détecter le type d'élément sous le curseur
    const detectElementType = (element) => {
      if (!element) return 'default';

      // Vérifier si c'est le canvas 3D
      if (element.tagName === 'CANVAS' || element.closest('.threejs-container')) {
        return 'drag';
      }

      // Vérifier si c'est un lien ou bouton
      if (element.tagName === 'A' ||
        element.tagName === 'BUTTON' ||
        element.closest('a') ||
        element.closest('button') ||
        element.getAttribute('data-cursor') === 'hover') {
        return 'hover';
      }

      // Vérifier si c'est un élément de texte interactif
      if (element.closest('.navbar-item') ||
        element.closest('.text-word') ||
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
          setCursorText('CLICK');
          break;
        case 'drag':
          setCursorState('drag');
          setCursorText('DRAG');
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
            // Pas besoin d'ajouter d'event listeners spécifiques
            // car on utilise la délégation d'événements
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

  // Effet pour les changements d'état du curseur
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorTextEl = cursorTextRef.current;

    if (!cursor) return;

    switch (cursorState) {
      case 'hover':
        gsap.to(cursor, {
          scale: 1.5,
          backgroundColor: '#D4AF37',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;

      case 'drag':
        gsap.to(cursor, {
          scale: 2,
          backgroundColor: '#87ceeb',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;

      case 'text':
        gsap.to(cursor, {
          scale: 0.8,
          backgroundColor: '#525252',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;

      default:
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: '#000000',
          duration: 0.3,
          ease: 'power2.out',
        });
    }

    // Animation du texte
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
      {/* Curseur principal */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50px',
          height: '50px',
          backgroundColor: '#000000',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'none', // On utilise GSAP pour les animations
        }}
      >
        {/* Texte dans le curseur */}
        <span
          ref={cursorTextRef}
          style={{
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            opacity: 0,
            pointerEvents: 'none',
            mixBlendMode: 'normal',
          }}
        >
          {cursorText}
        </span>
      </div>

      {/* Point central précis */}
      <div
        ref={cursorDotRef}
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
          transition: 'none',
        }}
      />
    </>
  );
};

export default CustomCursor;