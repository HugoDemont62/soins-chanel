// Fichier: src/pages/MaRoutine/MaRoutine.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MaRoutine.css';

const MaRoutine = () => {
  const pageRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

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

    // Titre avec animation décalée pour chaque ligne
    const titleLines = titleRef.current?.querySelectorAll('.title-line');
    if (titleLines) {
      tl.fromTo(titleLines,
        { opacity: 0, y: 60, rotationX: -20 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.2
        },
        "-=0.8"
      );
    }

    // Description
    tl.fromTo(descriptionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=1"
    );

    // Bouton en dernier
    tl.fromTo(buttonRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.8"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleCreateRoutine = () => {
    console.log('Redirection vers la page de création de routine');
    // Ici tu peux ajouter la navigation React Router
    // navigate('/routine/creation');
  };

  return (
    <div ref={pageRef} className="ma-routine-page">
      {/* Logo Chanel en haut au centre */}
      <div ref={logoRef} className="routine-logo-header">
        <img
          src="/Chanel-Logo.png"
          alt="CHANEL"
          className="routine-logo-img"
          data-cursor="hover"
        />
      </div>

      {/* Container principal centré */}
      <div className="routine-main-container">

        {/* Titre avec disposition décalée */}
        <div ref={titleRef} className="routine-main-title">
          <div className="title-line line-1">COMPOSEZ VOTRE</div>
          <div className="title-line line-2">RITUEL DE SOIN</div>
          <div className="title-line line-3">SUR MESURE.</div>
        </div>

        {/* Description */}
        <p ref={descriptionRef} className="routine-main-description">
          Chaque peau est unique. CHANEL vous accompagne pas à pas pour révéler la vôtre,
          à travers une sélection de soins pensée en fonction de vos besoins, de vos sensations
          et de votre rythme.
        </p>

        {/* Bouton CTA */}
        <button
          ref={buttonRef}
          className="routine-cta-button"
          onClick={handleCreateRoutine}
          data-cursor="hover"
        >
          CRÉER MA ROUTINE
        </button>
      </div>

      {/* Élément décoratif subtil en arrière-plan */}
      <div className="routine-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
};

export default MaRoutine;