import { useEffect, useRef, useState } from 'react';
import './Loader.css';

const Loader = ({ onComplete, isPageTransition = false }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;

    if (!loader || !logo) return;

    // Animation d'entrée du logo
    const logoAnimation = () => {
      logo.style.opacity = '0';
      logo.style.transform = 'scale(0.8) translateY(20px)';

      setTimeout(() => {
        logo.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1) translateY(0)';
      }, 200);
    };

    logoAnimation();

    // Simulation du chargement
    const duration = isPageTransition ? 1000 : 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);

        // Animation de sortie
        setTimeout(() => {
          loader.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          loader.style.opacity = '0';

          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
        }, 500);
      }
    }, interval);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete, isPageTransition]);

  return (
    <div ref={loaderRef} className="loader-overlay">
      {/* Logo Chanel */}
      <div ref={logoRef} className="chanel-logo">
        <div>CHANEL</div>
      </div>

      {/* Pourcentage */}
      <div className="loader-percentage">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default Loader;