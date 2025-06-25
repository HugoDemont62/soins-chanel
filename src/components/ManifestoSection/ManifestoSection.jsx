// Fichier: src/components/ManifestoSection/ManifestoSection.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ManifestoSection.css';

const ManifestoSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lettersRef = useRef([]);
  const manifestoContainerRef = useRef(null);

  // Refs pour les images de modèles
  const model1Ref = useRef(null);
  const model2Ref = useRef(null);
  const model3Ref = useRef(null);
  const model4Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textElement = textRef.current;

    if (!section || !textElement) return;

    // Fonction pour diviser le texte ligne par ligne
    const splitText = (element) => {
      const lines = element.querySelectorAll('.manifesto-line');
      const allLetters = [];

      lines.forEach(line => {
        const text = line.textContent;
        const words = text.split(' ');

        // Vider la ligne
        line.innerHTML = '';

        words.forEach((word, wordIndex) => {
          // Créer un span pour chaque mot
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word';

          // Diviser chaque mot en lettres
          for (let i = 0; i < word.length; i++) {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = word[i];
            letterSpan.className = 'letter';
            wordSpan.appendChild(letterSpan);
            allLetters.push(letterSpan);
          }

          line.appendChild(wordSpan);

          // Ajouter un espace après chaque mot (sauf le dernier)
          if (wordIndex < words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.innerHTML = '&nbsp;';
            spaceSpan.className = 'space';
            line.appendChild(spaceSpan);
          }
        });
      });

      return allLetters;
    };

    // Appliquer le split au texte
    const letters = splitText(textElement);
    lettersRef.current = letters;

    // Animation des lettres au scroll
    const setupTextReveal = () => {
      if (!Array.isArray(letters) || letters.length === 0) {
        console.warn('Letters array is empty or invalid');
        return;
      }

      // État initial - très transparent pour qu'on puisse un peu voir le texte
      gsap.set(letters, {
        color: 'rgba(255, 255, 255, 0.1)'
      });

      // Animation de révélation progressive au scroll
      gsap.fromTo(letters,
        {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        {
          color: 'rgba(255, 255, 255, 1)',
          stagger: {
            each: 0.015,
            from: "start"
          },
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center", // Commence quand le haut de la section arrive au centre
            end: "bottom center", // Finit quand le bas de la section arrive au centre
            scrub: 1.5, // Animation bien liée au scroll
            invalidateOnRefresh: true,
          }
        }
      );
    };

    // Animation des images parallax
    const setupModelsParallax = () => {
      // Modèle 1 - TRÈS LENT
      if (model1Ref.current) {
        gsap.set(model1Ref.current, {
          y: 100,
          opacity: 1,
          scale: 1
        });

        gsap.fromTo(model1Ref.current,
          { y: 100 },
          {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 3,
              invalidateOnRefresh: true
            }
          }
        );
      }

      // Modèle 2 - TRÈS RAPIDE
      if (model2Ref.current) {
        gsap.set(model2Ref.current, {
          y: 250,
          opacity: 1,
          scale: 1
        });

        gsap.fromTo(model2Ref.current,
          { y: 250 },
          {
            y: -300,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true
            }
          }
        );
      }

      // Modèle 3 - VITESSE MOYENNE
      if (model3Ref.current) {
        gsap.set(model3Ref.current, {
          y: 180,
          opacity: 1,
          scale: 1
        });

        gsap.fromTo(model3Ref.current,
          { y: 180 },
          {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true
            }
          }
        );
      }

      // Modèle 4 - LENT
      if (model4Ref.current) {
        gsap.set(model4Ref.current, {
          y: 80,
          opacity: 1,
          scale: 1
        });

        gsap.fromTo(model4Ref.current,
          { y: 80 },
          {
            y: -120,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2.5,
              invalidateOnRefresh: true
            }
          }
        );
      }
    };

    try {
      setupTextReveal();
      setupModelsParallax();
    } catch (error) {
      console.error('Erreur dans les animations ManifestoSection:', error);
    }

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
      <div className="background-grid"></div>

      <div ref={manifestoContainerRef} className="manifesto-container">
        <div ref={textRef} className="manifesto-text">
          <p className="manifesto-line">CHANEL RÉVÈLE UNE</p>
          <p className="manifesto-line">VISION SINGULIÈRE DE</p>
          <p className="manifesto-line">LA BEAUTÉ, OÙ LA</p>
          <p className="manifesto-line">SCIENCE RENCONTRE</p>
          <p className="manifesto-line">L'ÉLÉGANCE.</p>
        </div>

        <div className="manifesto-author">
          <div className="author-name">Leena Nair</div>
          <div className="author-title">PDG Chanel</div>
        </div>
      </div>

      <div className="models-container">
        <div
          ref={model1Ref}
          className="model-image model-1"
          style={{ backgroundImage: 'url("/image-1.png")' }}
        />

        <div
          ref={model2Ref}
          className="model-image model-2"
          style={{ backgroundImage: 'url("/image-2.png")' }}
        />

        <div
          ref={model3Ref}
          className="model-image model-3"
          style={{ backgroundImage: 'url("/image-3.png")' }}
        />

        <div
          ref={model4Ref}
          className="model-image model-4"
          style={{ backgroundImage: 'url("/image-4.png")' }}
        />
      </div>
    </section>
  );
};

export default ManifestoSection;