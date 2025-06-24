// Fichier: src/components/ManifestoSection/ManifestoSection.jsx (CORRECTION FINALE)
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ManifestoSection.css';

const ManifestoSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lettersRef = useRef([]);
  const manifestoContainerRef = useRef(null);

  // Refs pour les images de modèles (4 maintenant)
  const model1Ref = useRef(null);
  const model2Ref = useRef(null);
  const model3Ref = useRef(null);
  const model4Ref = useRef(null);

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
      const words = text.split(' ');
      element.innerHTML = '';

      const allLetters = []; // ← Tableau pour collecter toutes les lettres

      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.style.display = 'inline-block';
        wordSpan.style.marginRight = '0.3em';

        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'letter';
          wordSpan.appendChild(span);
          allLetters.push(span); // ← Ajouter au tableau
        }

        element.appendChild(wordSpan);
      });

      return allLetters; // ← Retourner le tableau de lettres
    };

    // Diviser le texte en lettres
    const letters = splitTextIntoLetters(textElement);
    lettersRef.current = letters; // ← Maintenant c'est garantit un tableau

    // ✅ NOUVEAU : Marquer que GSAP va prendre le contrôle
    textElement.classList.add('gsap-initialized');

    // RÉVÉLATION DES LETTRES - Plus rapide et plus courte
    const setupTextReveal = () => {
      // Vérification de sécurité
      if (!Array.isArray(letters) || letters.length === 0) {
        console.warn('Letters array is empty or invalid');
        return;
      }

      // ✅ CORRECTION : Immédiatement définir l'état initial AVANT toute animation
      gsap.set(letters, {
        opacity: 0.08,
        color: 'rgba(255, 255, 255, 0.08)'
      });

      // Animation de révélation PLUS RAPIDE et qui se termine plus tôt
      const scrollConfig = {
        trigger: section,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
        invalidateOnRefresh: true
      };

      // ← CORRECTION ICI : Filtrer avant d'utiliser dans GSAP
      const letterElements = letters.filter(l =>
        l && l.classList && l.classList.contains('letter')
      );

      // Animation principale des lettres - avec des valeurs plus visibles
      gsap.fromTo(
        letterElements, // ← Utiliser le tableau filtré
        {
          opacity: 0.08,
          color: 'rgba(255, 255, 255, 0.08)'
        },
        {
          opacity: 1,
          color: 'rgba(255, 255, 255, 1)', // ✅ Blanc pur à la fin
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: scrollConfig
        }
      );
    };

    // Animation des 4 images - VRAI PARALLAX avec vitesses différentes
    const setupModelsParallax = () => {
      // Modèle 1 - TRÈS LENT (arrière-plan, grande)
      if (model1Ref.current) {
        gsap.set(model1Ref.current, {
          y: 100,
          opacity: 1,
          scale: 1
        });

        // Parallax TRÈS LENT
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

      // Modèle 2 - TRÈS RAPIDE (premier plan, petite)
      if (model2Ref.current) {
        gsap.set(model2Ref.current, {
          y: 250,
          opacity: 1,
          scale: 1
        });

        // Parallax TRÈS RAPIDE
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

      // Modèle 3 - VITESSE MOYENNE (milieu, moyenne)
      if (model3Ref.current) {
        gsap.set(model3Ref.current, {
          y: 180,
          opacity: 1,
          scale: 1
        });

        // Parallax MOYEN
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

      // Modèle 4 - LENT (arrière-plan, grande)
      if (model4Ref.current) {
        gsap.set(model4Ref.current, {
          y: 80,
          opacity: 1,
          scale: 1
        });

        // Parallax LENT
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

    // Exécuter les animations avec gestion d'erreur
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
      {/* Grille de fond subtile */}
      <div className="background-grid"></div>

      {/* Texte principal centré - AVEC REF pour l'animation */}
      <div ref={manifestoContainerRef} className="manifesto-container">
        <div ref={textRef} className="manifesto-text">
          {manifestoText}
        </div>
        {/* Nom PDG en dessous - Simple et clean */}
        <div className="manifesto-author">
          <div className="author-name">Leena Nair</div>
          <div className="author-title">PDG Chanel</div>
        </div>
      </div>

      {/* Images des modèles avec parallax amélioré - 4 images */}
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

        {/* Modèle 4 - En bas à gauche - NOUVEAU ! */}
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