// Fichier: src/components/MaRoutineSection/MaRoutineSection.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MaRoutineSection.css';

const MaRoutineSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section) return;


    // Animation d'entrée pour les éléments de texte
    const setupTextAnimations = () => {
      const elements = [
        { ref: lineRef, delay: 0 },
        { ref: titleRef, delay: 0.2 },
        { ref: descriptionRef, delay: 0.4 },
        { ref: buttonRef, delay: 0.6 }
      ];

      elements.forEach(({ ref, delay }) => {
        if (ref.current) {
          gsap.fromTo(ref.current,
            {
              opacity: 0,
              y: 60,
              rotationX: -15
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.2,
              ease: "power3.out",
              delay: delay,
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
              }
            }
          );
        }
      });
    };

    setupTextAnimations();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Fonction pour gérer le clic sur le bouton
  const handleCreateRoutine = () => {
    console.log('Créer ma routine clicked');
  };

  return (
    <section ref={sectionRef} className="ma-routine-section">
      <div className="routine-container">

        {/* Section Image - 65% */}
        <div className="routine-image-section">
          <img
            ref={imageRef}
            src="/image-4.png" // ← Change ce nom selon ton image
            alt="Routine de soin Chanel"
            className="routine-main-image"
            loading="lazy"
          />
          <div className="image-overlay" />
        </div>

        {/* Section Contenu - 35% */}
        <div ref={contentRef} className="routine-content-section">

          {/* Titre principal */}
          <h2 ref={titleRef} className="routine-title">
            Un protocole de soin à l'écoute de votre peau.
          </h2>

          {/* Description */}
          <p ref={descriptionRef} className="routine-description">
            Parce que chaque peau est unique, CHANEL vous propose une routine personnalisée, conçue à partir de vos besoins, de vos priorités, de votre rythme. Des formules d'exception, des textures choisies avec soin, pour une expérience de beauté aussi précise qu'intime.
          </p>

          {/* Bouton call-to-action */}
          <button
            ref={buttonRef}
            className="routine-button"
            onClick={handleCreateRoutine}
            data-cursor="hover"
          >
            Créer ma routine
          </button>
        </div>
      </div>
    </section>
  );
};

export default MaRoutineSection;