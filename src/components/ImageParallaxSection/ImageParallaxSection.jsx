// Fichier: src/components/ImageParallaxSection/ImageParallaxSection.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImageParallaxSection.css';

const ImageParallaxSection = () => {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const centerColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  // Refs pour les nuages flottants
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const cloud3Ref = useRef(null);
  const cloud4Ref = useRef(null);

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

    // Animation des nuages flottants avec la souris
    const setupCloudsAnimation = () => {
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;

        // Mouvement des nuages avec différentes vitesses (comme dans Hero3D)
        if (cloud1Ref.current) {
          cloud1Ref.current.style.transform = `translate(${x * 20}px, ${y * 15}px)`;
        }
        if (cloud2Ref.current) {
          cloud2Ref.current.style.transform = `translate(${x * -25}px, ${y * 10}px)`;
        }
        if (cloud3Ref.current) {
          cloud3Ref.current.style.transform = `translate(${x * 15}px, ${y * -20}px)`;
        }
        if (cloud4Ref.current) {
          cloud4Ref.current.style.transform = `translate(${x * -18}px, ${y * 22}px)`;
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    };

    if (!section || !leftColumn || !centerColumn || !rightColumn) return;

    // Configuration des animations parallax
    const setupParallax = () => {
      // Colonne de GAUCHE - Va vers le HAUT (mouvement révélateur)
      gsap.fromTo(leftColumn,
        { y: 200 }, // Commence plus bas (visible depuis le bas)
        {
          y: -100, // Monte vers le haut
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

      // Colonne du CENTRE - Va vers le HAUT (vitesse plus lente pour rester visible)
      gsap.fromTo(centerColumn,
        { y: 100 }, // Commence moins bas
        {
          y: -50, // Monte moins haut pour rester visible
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

      // Colonne de DROITE - Va vers le HAUT (vitesse rapide)
      gsap.fromTo(rightColumn,
        { y: 250 }, // Commence encore plus bas
        {
          y: -150, // Monte plus haut
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
            scale: 1.1,
          },
          {
            scale: 1,
            duration: 0.2,
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
    const cleanupClouds = setupCloudsAnimation();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
      cleanupClouds(); // Nettoyer les event listeners des nuages
    };
  }, []);

  return (
    <section ref={sectionRef} className="image-parallax-section">
      {/* Nuages flottants au niveau du texte - Même taille que Hero3D */}
      <div
        ref={cloud1Ref}
        className="floating-cloud cloud-1"
        style={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          zIndex: 1,
          opacity: 0.6,
          transition: 'transform 0.1s ease-out',
          pointerEvents: 'none'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '800px', height: 'auto' }} />
      </div>

      <div
        ref={cloud2Ref}
        className="floating-cloud cloud-2"
        style={{
          position: 'absolute',
          top: '15%',
          right: '-15%',
          zIndex: 1,
          opacity: 0.5,
          transition: 'transform 0.15s ease-out',
          pointerEvents: 'none'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '700px', height: 'auto' }} />
      </div>

      <div
        ref={cloud3Ref}
        className="floating-cloud cloud-3"
        style={{
          position: 'absolute',
          top: '25%',
          left: '60%',
          zIndex: 1,
          opacity: 0.4,
          transition: 'transform 0.12s ease-out',
          pointerEvents: 'none'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '650px', height: 'auto' }} />
      </div>

      <div
        ref={cloud4Ref}
        className="floating-cloud cloud-4"
        style={{
          position: 'absolute',
          top: '35%',
          left: '-5%',
          zIndex: 1,
          opacity: 0.7,
          transition: 'transform 0.14s ease-out',
          pointerEvents: 'none'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '750px', height: 'auto' }} />
      </div>

      {/* Titre de la section */}
      <div className="parallax-header">
        <h2 className="parallax-title">L'ART DE VIVRE CHANEL</h2>
        <p className="parallax-subtitle">
          Découvrez l'univers visuel qui inspire nos créations
        </p>
      </div>

      {/* Section avec les deux blocs de texte */}
      <div className="science-section">
        <div className="science-container">
          <div className="science-block">
            <h3 className="science-title">UNE SCIENCE DU SOIN EXIGEANTE, À LA HAUTEUR DE LA PEAU.</h3>
            <p className="science-text">
              La Recherche CHANEL développe ses propres actifs, formule avec exigence, et teste chaque soin selon des protocoles rigoureux. La peau est étudiée dans toute sa complexité pour créer des soins à la fois puissants, sûrs et parfaitement affinitaires.
            </p>
          </div>

          <div className="science-block">
            <h3 className="science-title science-title2">UNE APPROCHE DU SOIN GLOBALE ET SENSORIELLE.</h3>
            <p className="science-text">
              Chez CHANEL, l'efficacité s'exprime dans la justesse du geste, la précision des textures et l'élégance du résultat. Chaque formule est pensée comme une expérience : pour la peau, pour le temps, pour soi.
            </p>
          </div>
        </div>
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
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageParallaxSection;