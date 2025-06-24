// Fichier: src/components/ImageParallaxSection/ImageParallaxSection.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImageParalaxSection.css';

const ImageParallaxSection = () => {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const centerColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  // Les images pour les 3 colonnes (tu peux changer ces noms selon tes images dans /public)
  const imagesData = {
    leftColumn: [
      '/image-1.png',
      '/image-2.png',
      '/image-3.png',
      '/image-4.png',
      '/image-5.png',
      '/image-6.png',
      '/image-7.png',
      '/image-8.png'
    ],
    centerColumn: [
      '/image-3.png',
      '/image-4.png',
      '/image-5.png',
      '/image-6.png',
      '/image-7.png',
      '/image-8.png',
      '/image-1.png',
      '/image-2.png'
    ],
    rightColumn: [
      '/image-5.png',
      '/image-6.png',
      '/image-7.png',
      '/image-8.png',
      '/image-1.png',
      '/image-2.png',
      '/image-3.png',
      '/image-4.png'
    ]
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const leftColumn = leftColumnRef.current;
    const centerColumn = centerColumnRef.current;
    const rightColumn = rightColumnRef.current;

    if (!section || !leftColumn || !centerColumn || !rightColumn) return;

    // Configuration des animations parallax
    const setupParallax = () => {
      // Colonne de GAUCHE - Va vers le BAS (vitesse normale)
      gsap.fromTo(leftColumn,
        { y: -150 },
        {
          y: 300,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Vitesse normale
            invalidateOnRefresh: true
          }
        }
      );

      // Colonne du CENTRE - Va vers le HAUT (vitesse plus lente)
      gsap.fromTo(centerColumn,
        { y: 200 },
        {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2, // Plus lent que les autres
            invalidateOnRefresh: true
          }
        }
      );

      // Colonne de DROITE - Va vers le BAS (vitesse rapide)
      gsap.fromTo(rightColumn,
        { y: -200 },
        {
          y: 350,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8, // Plus rapide
            invalidateOnRefresh: true
          }
        }
      );
    };

    // Animation d'apparition des images au scroll
    const setupImageReveal = () => {
      const images = section.querySelectorAll('.parallax-image');

      images.forEach((img, index) => {
        gsap.fromTo(img,
          {
            opacity: 0,
            scale: 1.2,
            filter: 'blur(4px)'
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              once: true
            }
          }
        );
      });
    };

    setupParallax();
    setupImageReveal();

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
    <section ref={sectionRef} className="image-parallax-section">
      {/* Titre de la section */}
      <div className="parallax-header">
        <h2 className="parallax-title">L'ART DE VIVRE CHANEL</h2>
        <p className="parallax-subtitle">
          Découvrez l'univers visuel qui inspire nos créations
        </p>
      </div>

      {/* Container des 3 colonnes */}
      <div className="parallax-container">

        {/* COLONNE GAUCHE - Va vers le bas */}
        <div ref={leftColumnRef} className="parallax-column left-column">
          {imagesData.leftColumn.map((imageSrc, index) => (
            <div key={`left-${index}`} className="image-wrapper">
              <img
                src={imageSrc}
                alt={`Chanel visual ${index + 1}`}
                className="parallax-image"
                data-cursor="hover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* COLONNE CENTRE - Va vers le haut (plus lente) */}
        <div ref={centerColumnRef} className="parallax-column center-column">
          {imagesData.centerColumn.map((imageSrc, index) => (
            <div key={`center-${index}`} className="image-wrapper center-wrapper">
              <img
                src={imageSrc}
                alt={`Chanel visual ${index + 1}`}
                className="parallax-image center-image"
                data-cursor="hover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* COLONNE DROITE - Va vers le bas (plus rapide) */}
        <div ref={rightColumnRef} className="parallax-column right-column">
          {imagesData.rightColumn.map((imageSrc, index) => (
            <div key={`right-${index}`} className="image-wrapper">
              <img
                src={imageSrc}
                alt={`Chanel visual ${index + 1}`}
                className="parallax-image"
                data-cursor="hover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay décoratif */}
      <div className="parallax-overlay">
        <div className="overlay-text">
          <span>CHANEL</span>
        </div>
      </div>
    </section>
  );
};

export default ImageParallaxSection;