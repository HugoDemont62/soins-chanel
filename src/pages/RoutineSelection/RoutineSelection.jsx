// Fichier: src/pages/RoutineSelection/RoutineSelection.jsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RoutineSelection.css';

const RoutineSelection = () => {
  const pageRef = useRef(null);
  const blueContainerRef = useRef(null);
  const blackContainerRef = useRef(null);

  // Refs pour les nuages
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const cloud3Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const page = pageRef.current;
    if (!page) return;

    // Animation d'entrée des sections
    const tl = gsap.timeline({ delay: 0.3 });

    // Animation des deux sections qui entrent en même temps
    tl.fromTo([blueContainerRef.current, blackContainerRef.current],
      { opacity: 0, x: (index) => index === 0 ? -50 : 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.1
      }
    );

    // Animation des éléments internes
    const blueElements = blueContainerRef.current?.querySelectorAll('.animate-element');
    const blackElements = blackContainerRef.current?.querySelectorAll('.animate-element');

    tl.fromTo([...blueElements, ...blackElements],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15
      },
      "-=1"
    );

    // Animation des nuages
    const setupCloudsAnimation = () => {
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;

        if (cloud1Ref.current) {
          cloud1Ref.current.style.transform = `translate(${x * 15}px, ${y * 10}px)`;
        }
        if (cloud2Ref.current) {
          cloud2Ref.current.style.transform = `translate(${x * -20}px, ${y * 8}px)`;
        }
        if (cloud3Ref.current) {
          cloud3Ref.current.style.transform = `translate(${x * 12}px, ${y * -15}px)`;
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    };

    const cleanupClouds = setupCloudsAnimation();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      cleanupClouds();
    };
  }, []);

  const navigate = useNavigate();

  const handleSelectTargeted = () => {
    navigate('/routine/questionnaire/targeted');
  };

  const handleSelectException = () => {
    navigate('/routine/questionnaire/exception');
  };

  return (
    <div ref={pageRef} className="routine-selection-page">

      {/* Section Bleue - Routine Ciblée */}
      <div
        ref={blueContainerRef}
        className="routine-section blue-section"
        onClick={handleSelectTargeted}
        data-cursor="hover"
      >
        {/* Nuages flottants dans la section bleue */}
        <div
          ref={cloud1Ref}
          className="floating-cloud cloud-1"
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            zIndex: 2,
            opacity: 0.8,
            transition: 'transform 0.1s ease-out',
            pointerEvents: 'none'
          }}
        >
          <img src="/cloud.png" alt="" style={{ width: '200px', height: 'auto' }} />
        </div>

        <div
          ref={cloud2Ref}
          className="floating-cloud cloud-2"
          style={{
            position: 'absolute',
            top: '60%',
            right: '10%',
            zIndex: 2,
            opacity: 0.6,
            transition: 'transform 0.15s ease-out',
            pointerEvents: 'none'
          }}
        >
          <img src="/cloud.png" alt="" style={{ width: '150px', height: 'auto' }} />
        </div>

        <div
          ref={cloud3Ref}
          className="floating-cloud cloud-3"
          style={{
            position: 'absolute',
            top: '30%',
            left: '70%',
            zIndex: 2,
            opacity: 0.5,
            transition: 'transform 0.12s ease-out',
            pointerEvents: 'none'
          }}
        >
          <img src="/cloud.png" alt="" style={{ width: '120px', height: 'auto' }} />
        </div>

        {/* Contenu de la section bleue */}
        <div className="section-content">

          {/* Image de produits en bas */}
          <div className="product-image-container animate-element">
            <img
              src="/image-1.png"
              alt="Produit 1"
              className="product-image"
            />
          </div>

          {/* Texte en bas à gauche */}
          <div className="section-text-container blue-text">
            <h2 className="section-title animate-element">
              UNE ROUTINE DE<br />
              SOINS CIBLÉS
            </h2>
            <p className="section-description animate-element">
              Pour répondre à des besoins spécifiques<br />
              correspondant à vos attentes.
            </p>
          </div>

          {/* Prix et bouton en bas à droite avec bande */}
          <div className="section-footer gold-footer">
            <button
              className="section-arrow-button animate-element"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectException();
              }}
              data-cursor="hover"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Section Noire/Marron - Routine d'Exception */}
      <div
        ref={blackContainerRef}
        className="routine-section black-section"
        onClick={handleSelectException}
        data-cursor="hover"
      >
        {/* Contenu de la section noire */}
        <div className="section-content">

          {/* Image de produits en bas */}
          <div className="product-image-container animate-element">
            <img
              src="/image-1.png"
              alt="Produit Sublimage 1"
              className="product-image"
            />
          </div>

          {/* Texte en bas à gauche */}
          <div className="section-text-container gold-text">
            <h2 className="section-title animate-element">
              UNE ROUTINE DE<br />
              SOINS D'EXCEPTION
            </h2>
            <p className="section-description animate-element">
              Pour une prise en charge globale avec des<br />
              formules iconiques.
            </p>
          </div>

          {/* Bouton en bas à droite avec bande */}
          <div className="section-footer gold-footer">
            <button
              className="section-arrow-button animate-element"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectException();
              }}
              data-cursor="hover"
            >
              →
            </button>
          </div>
        </div>

        {/* Effets de lueur dorée */}
        <div className="golden-glow glow-1"></div>
        <div className="golden-glow glow-2"></div>
        <div className="golden-glow glow-3"></div>
      </div>
    </div>
  );
};

export default RoutineSelection;