// Fichier: src/pages/RoutineSelection/RoutineSelection.jsx - DESIGN ADAPTÉ À L'IMAGE
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RoutineSelection.css';

const RoutineSelection = () => {
  const pageRef = useRef(null);
  const logoRef = useRef(null);
  const blueContainerRef = useRef(null);
  const beigeContainerRef = useRef(null);

  // Refs pour les nuages
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const cloud3Ref = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const page = pageRef.current;
    if (!page) return;

    // Animation d'entrée de page
    const tl = gsap.timeline({ delay: 0.2 });

    // Logo apparaît en premier
    tl.fromTo(logoRef.current,
      { opacity: 0, y: -30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Animation des deux sections qui entrent en même temps
    tl.fromTo([blueContainerRef.current, beigeContainerRef.current],
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.1
      },
      "-=0.8"
    );

    // Animation des éléments internes avec délais
    const setupElementAnimations = () => {
      const allElements = page.querySelectorAll('.animate-element');
      allElements.forEach((element, index) => {
        gsap.fromTo(element,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.8 + (index * 0.15)
          }
        );
      });
    };

    setupElementAnimations();

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

  const handleSelectTargeted = () => {
    navigate('/routine/questionnaire/targeted');
  };

  const handleSelectException = () => {
    navigate('/routine/questionnaire/exception');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div ref={pageRef} className="routine-selection-page">

      {/* Logo Chanel en haut au centre */}
      <div ref={logoRef} className="selection-logo-header">
        <img
          src="/Chanel-Logo.png"
          alt="CHANEL"
          className="selection-logo-img"
          data-cursor="hover"
          onClick={handleGoHome}
        />
      </div>

      {/* Section Bleue - Routine Ciblée (GAUCHE) */}
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
            top: '15%',
            left: '10%',
          }}
        >
          <img src="/cloud.png" alt="" style={{ width: '180px', height: 'auto' }} />
        </div>

        <div
          ref={cloud2Ref}
          className="floating-cloud cloud-2"
          style={{
            top: '65%',
            right: '15%',
          }}
        >
          <img src="/cloud.png" alt="" style={{ width: '140px', height: 'auto' }} />
        </div>

        <div
          ref={cloud3Ref}
          className="floating-cloud cloud-3"
          style={{
            top: '40%',
            left: '70%',
          }}
        >
          <img src="/cloud.png" alt="" style={{ width: '100px', height: 'auto' }} />
        </div>

        {/* Contenu de la section bleue */}
        <div className="section-content">

          {/* Image principale centrée */}
          <img
            src="/image-1.png"
            alt="Routine de soins ciblés"
            className="main-product-image animate-element"
            loading="lazy"
          />

          {/* Texte centré */}
          <div className="section-text-container blue-text">
            <h2 className="section-title animate-element">
              UNE ROUTINE DE<br />
              SOINS CIBLÉS
            </h2>
            <p className="section-subtitle animate-element">
              POUR RÉPONDRE À DES BESOINS SPÉCIFIQUES
            </p>
            <p className="section-description animate-element">
              CORRESPONDANT À VOS ATTENTES.
            </p>
          </div>

          {/* Bouton centré en bas */}
          <div className="section-cta-container">
            <button
              className="section-arrow-button blue-button animate-element"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectTargeted();
              }}
              data-cursor="hover"
              aria-label="Choisir la routine de soins ciblés"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Section Beige - Routine d'Exception (DROITE) */}
      <div
        ref={beigeContainerRef}
        className="routine-section beige-section"
        onClick={handleSelectException}
        data-cursor="hover"
      >
        {/* Contenu de la section beige */}
        <div className="section-content">

          {/* Image principale centrée */}
          <img
            src="/image-2.png"
            alt="Routine de soins d'exception"
            className="main-product-image animate-element"
            loading="lazy"
          />

          {/* Texte centré */}
          <div className="section-text-container beige-text">
            <h2 className="section-title animate-element">
              UNE ROUTINE DE<br />
              SOINS D'EXCEPTION
            </h2>
            <p className="section-subtitle animate-element">
              POUR UNE PRISE EN CHARGE GLOBALE AVEC DES
            </p>
            <p className="section-description animate-element">
              FORMULES ICONIQUES.
            </p>
          </div>

          {/* Bouton centré en bas */}
          <div className="section-cta-container">
            <button
              className="section-arrow-button beige-button animate-element"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectException();
              }}
              data-cursor="hover"
              aria-label="Choisir la routine de soins d'exception"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineSelection;