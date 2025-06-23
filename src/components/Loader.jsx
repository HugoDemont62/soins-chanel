import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete, isPageTransition = false }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loader = loaderRef.current;
    const text = textRef.current;
    const progressBar = progressBarRef.current;

    if (!loader || !text || !progressBar) return;

    // Timeline pour l'animation du loader
    const tl = gsap.timeline();

    // Animation d'entrée du loader
    tl.set(loader, { opacity: 1, display: 'flex' })
    .from(text, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
    .from(progressBar.parentElement, {
      scaleX: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.5');

    // Simulation du chargement avec progression
    const duration = isPageTransition ? 1000 : 2500; // Plus court pour les transitions de page
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      // Animation de la barre de progression
      gsap.to(progressBar, {
        width: `${newProgress}%`,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (newProgress >= 100) {
        clearInterval(progressInterval);

        // Animation de sortie du loader
        setTimeout(() => {
          const exitTl = gsap.timeline({
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });

          exitTl.to(text, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.in',
          })
          .to(progressBar.parentElement, {
            scaleX: 0,
            transformOrigin: 'right center',
            duration: 0.6,
            ease: 'power2.in',
          }, '-=0.6')
          .to(loader, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(loader, { display: 'none' });
            }
          }, '-=0.3');
        }, 500);
      }
    }, interval);

    return () => {
      clearInterval(progressInterval);
      tl.kill();
    };
  }, [onComplete, isPageTransition]);

  return (
    <div
      ref={loaderRef}
      className="loader-overlay fixed top-0 left-0 w-full h-full bg-chanel-black z-[10000] flex items-center justify-center opacity-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
      }}
    >
      {/* Contenu principal du loader */}
      <div className="text-center">
        <div
          ref={textRef}
          className="loader-text text-elegant text-chanel-white text-4xl md:text-5xl font-semibold tracking-widest uppercase mb-8"
        >
          {isPageTransition ? 'Chanel' : 'Chanel Soins'}
        </div>

        {/* Petite description (seulement pour le loader initial) */}
        {!isPageTransition && (
          <div className="text-chanel-white/70 text-sm md:text-base tracking-wide uppercase font-light">
            L'Art du Soin
          </div>
        )}
      </div>

      {/* Barre de progression */}
      <div className="loader-progress absolute bottom-8 left-8 right-8 h-px bg-white/20">
        <div
          ref={progressBarRef}
          className="loader-progress-bar h-full bg-chanel-white w-0"
          style={{
            width: '0%',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Pourcentage de progression */}
      <div className="absolute bottom-8 right-8 text-chanel-white text-sm font-light">
        {Math.round(progress)}%
      </div>

      {/* Logo ou monogramme Chanel (optionnel) */}
      <div className="absolute top-8 left-8">
        <div className="w-8 h-8 border border-chanel-white/30 rounded-full flex items-center justify-center">
          <span className="text-chanel-white text-xs font-bold">C</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;