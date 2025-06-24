// Fichier: src/components/ManifestoSection/ManifestoSection.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ManifestoSection.css';

const ManifestoSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lettersRef = useRef([]);

  // Refs pour les images de modèles seulement
  const model1Ref = useRef(null);
  const model2Ref = useRef(null);
  const model3Ref = useRef(null);

  // Le texte exact du manifesto
  const manifestoText = "CHANEL RÉVÈLE UNE VISION SINGULIÈRE DE LA BEAUTÉ, OÙ LA SCIENCE RENCONTRE L'ÉLÉGANCE.";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textElement = textRef.current;

    if (!section || !textElement) return;

    // Fonction pour diviser le texte en lettres
    const splitTextIntoLetters = (element) => {
      const text = element.textContent;
      element.innerHTML = '';

      const letters = [];

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');

        if (char === ' ') {
          span.innerHTML = '&nbsp;';
          span.className = 'letter-space';
        } else {
          span.textContent = char;
          span.className = 'letter';
        }

        letters.push(span);
        element.appendChild(span);
      }

      return letters;
    };

    // Diviser le texte en lettres
    const letters = splitTextIntoLetters(textElement);
    lettersRef.current = letters;

    // Animation des images - SUPER SMOOTH comme Ghanendra Sahu
    const setupModelsAnimation = () => {
      // Modèle 1 - Mouvement smooth et lent
      if (model1Ref.current) {
        gsap.set(model1Ref.current, {
          y: 150,
          x: -80,
          rotation: -8,
          opacity: 0
        });

        // Apparition douce
        gsap.to(model1Ref.current, {
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            once: true
          }
        });

        // Parallax smooth et subtil
        gsap.fromTo(model1Ref.current,
          { y: 150, x: -80, rotation: -8 },
          {
            y: -150,
            x: 80,
            rotation: 5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 3, // Plus lent = plus smooth
              invalidateOnRefresh: true
            }
          }
        );
      }

      // Modèle 2 - Mouvement vertical smooth
      if (model2Ref.current) {
        gsap.set(model2Ref.current, {
          y: 200,
          x: 60,
          rotation: 12,
          opacity: 0
        });

        gsap.to(model2Ref.current, {
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true
          }
        });

        // Parallax très smooth
        gsap.fromTo(model2Ref.current,
          { y: 200, x: 60, rotation: 12 },
          {
            y: -100,
            x: -40,
            rotation: -6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 4, // Encore plus smooth
              invalidateOnRefresh: true
            }
          }
        );
      }

      // Modèle 3 - Mouvement diagonal smooth
      if (model3Ref.current) {
        gsap.set(model3Ref.current, {
          y: -100,
          x: 100,
          rotation: 15,
          opacity: 0
        });

        gsap.to(model3Ref.current, {
          opacity: 1,
          duration: 3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true
          }
        });

        // Parallax ultra smooth
        gsap.fromTo(model3Ref.current,
          { y: -100, x: 100, rotation: 15 },
          {
            y: 200,
            x: -70,
            rotation: -8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2.5, // Vitesse différente pour plus de dynamisme
              invalidateOnRefresh: true
            }
          }
        );
      }
    };

    // Animation ultra smooth des lettres
    const setupLettersAnimation = () => {
      // État initial : toutes les lettres sont blanches mais très transparentes
      letters.forEach((letter) => {
        if (letter.classList.contains('letter')) {
          gsap.set(letter, {
            color: 'rgba(255, 255, 255, 0.08)', // Encore plus transparent
            opacity: 0.08
          });
        }
      });

      // Animation super smooth des lettres
      letters.forEach((letter, index) => {
        if (letter.classList.contains('letter')) {
          gsap.to(letter, {
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 2, // Smooth
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress;
                const totalLetters = letters.filter(l => l.classList.contains('letter')).length;
                const letterProgress = (progress * totalLetters) - index;
                const clampedProgress = Math.max(0, Math.min(1, letterProgress * 1.2));

                if (clampedProgress > 0) {
                  // Transition ultra smooth de l'opacity
                  const opacity = 0.08 + (0.92 * clampedProgress);

                  gsap.set(letter, {
                    color: `rgba(255, 255, 255, ${opacity})`,
                    opacity: opacity
                  });
                }
              }
            }
          });
        }
      });
    };

    // Gestion smooth du layering
    const setupLayering = () => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 2, // Smooth
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Transition smooth du z-index
          const zIndexValue = progress > 0.5 ? 2 : 4;

          [model1Ref.current, model2Ref.current, model3Ref.current].forEach(el => {
            if (el) {
              el.style.zIndex = zIndexValue;
            }
          });
        }
      });
    };

    setupModelsAnimation();
    setupLettersAnimation();
    setupLayering();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="manifesto-section">
      {/* Grille de fond subtile */}
      <div className="background-grid"></div>

      {/* Texte principal centré */}
      <div className="manifesto-container">
        <div ref={textRef} className="manifesto-text">
          {manifestoText}
        </div>
      </div>

      {/* Images des modèles SEULEMENT - pas de produit */}
      <div className="models-container">
        {/* Modèle 1 - En haut à gauche */}
        <div
          ref={model1Ref}
          className="model-image model-1"
          style={{ backgroundImage: 'url("/image-1.png")' }}
        />

        {/* Modèle 2 - En haut à droite */}
        <div
          ref={model2Ref}
          className="model-image model-2"
          style={{ backgroundImage: 'url("/image-2.png")' }}
        />

        {/* Modèle 3 - En bas à droite */}
        <div
          ref={model3Ref}
          className="model-image model-3"
          style={{ backgroundImage: 'url("/image-3.png")' }}
        />
      </div>
    </section>
  );
};

export default ManifestoSection;