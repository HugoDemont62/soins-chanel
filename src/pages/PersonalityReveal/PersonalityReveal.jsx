// Fichier: src/pages/PersonalityReveal/PersonalityReveal.jsx
import { useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './PersonalityReveal.css';

const PersonalityReveal = () => {
  const { type } = useParams(); // 'targeted' ou 'exception'
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const logoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentLogoRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const downloadTextRef = useRef(null);
  const buttonRef = useRef(null);

  // Récupérer les réponses du questionnaire
  const answers = location.state?.answers || {};

  // Données des résultats selon le type et les réponses
  const getPersonalityData = () => {
    if (type === 'targeted') {
      const primaryNeed = answers[1]; // Première question

      switch (primaryNeed) {
        case 'hydration':
          return {
            personality: 'VOUS ÊTES INTUITIVE.',
            description: 'Ceci vous aide à mieux vous connaître afin de choisir des produits qui répondent à vos besoins spécifiques. L\'hydratation est votre priorité, et votre approche du soin est naturelle et bienveillante.',
            className: 'personality-intuitive',
            images: [
              '/image-1.png', '/image-2.png', '/image-3.png',
              '/image-4.png', '/image-5.png', '/image-6.png'
            ]
          };
        case 'anti-age':
          return {
            personality: 'VOUS ÊTES PRÉVENTIVE.',
            description: 'Ceci vous aide à mieux vous connaître afin de choisir des produits qui répondent à vos besoins spécifiques. Vous anticipez les besoins de votre peau avec sagesse.',
            className: 'personality-preventive',
            images: [
              '/image-2.png', '/image-3.png', '/image-4.png',
              '/image-5.png', '/image-6.png', '/image-7.png'
            ]
          };
        case 'eclat':
          return {
            personality: 'VOUS ÊTES LUMINEUSE.',
            description: 'Ceci vous aide à mieux vous connaître afin de choisir des produits qui répondent à vos besoins spécifiques. Vous recherchez l\'éclat authentique et la beauté rayonnante.',
            className: 'personality-luminous',
            images: [
              '/image-3.png', '/image-4.png', '/image-5.png',
              '/image-6.png', '/image-7.png', '/image-8.png'
            ]
          };
        case 'purete':
          return {
            personality: 'VOUS ÊTES PERFECTIONNISTE.',
            description: 'Ceci vous aide à mieux vous connaître afin de choisir des produits qui répondent à vos besoins spécifiques. Vous aspirez à la perfection dans chaque geste de soin.',
            className: 'personality-perfectionist',
            images: [
              '/image-4.png', '/image-5.png', '/image-6.png',
              '/image-7.png', '/image-8.png', '/image-9.png'
            ]
          };
        case 'sensibilite':
          return {
            personality: 'VOUS ÊTES DÉLICATE.',
            description: 'Ceci vous aide à mieux vous connaître afin de choisir des produits qui répondent à vos besoins spécifiques. Vous choisissez la douceur et le respect de votre peau sensible.',
            className: 'personality-delicate',
            images: [
              '/image-5.png', '/image-6.png', '/image-7.png',
              '/image-8.png', '/image-9.png', '/image-1.png'
            ]
          };
        default:
          return {
            personality: 'VOUS ÊTES INTUITIVE.',
            description: 'Ceci vous aide à mieux vous connaître afin de choisir des produits qui répondent à vos besoins spécifiques.',
            className: 'personality-intuitive',
            images: [
              '/image-1.png', '/image-2.png', '/image-3.png',
              '/image-4.png', '/image-5.png', '/image-6.png'
            ]
          };
      }
    } else {
      // Logique pour routine d'exception
      return {
        personality: 'VOUS ÊTES EXIGEANTE.',
        description: 'Ceci vous aide à mieux vous connaître afin de choisir des produits qui répondent à vos besoins spécifiques. Vous ne transigez jamais sur la qualité.',
        className: 'personality-demanding',
        images: [
          '/image-6.png', '/image-7.png', '/image-8.png',
          '/image-9.png', '/image-1.png', '/image-2.png'
        ]
      };
    }
  };

  const personalityData = getPersonalityData();

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    // Ajouter la classe CSS pour la personnalité
    page.className = `personality-reveal-page ${personalityData.className}`;

    // Animation d'entrée spectaculaire
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Images apparaissent en stagger
    const images = page.querySelectorAll('.mosaic-image');
    tl.to(images, {
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });

    // 2. Logo en haut
    tl.fromTo(logoRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.5"
    );

    // 3. Rectangle central avec scale
    tl.fromTo(overlayRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.8"
    );

    // 4. Contenu du rectangle en cascade
    tl.fromTo(contentLogoRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.6"
    );

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.6"
    );

    tl.fromTo(descriptionRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.8"
    );

    tl.fromTo(downloadTextRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      },
      "-=0.6"
    );

    tl.fromTo(buttonRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.4"
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [personalityData.className]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleDiscoverRoutine = () => {
    // Naviguer vers la page des produits recommandés avec les données
    navigate(`/routine/results/${type}`, {
      state: { answers }
    });
  };

  return (
    <div ref={pageRef} className="personality-reveal-page">
      {/* Logo Chanel en haut */}
      <div ref={logoRef} className="personality-logo-header">
        <img
          src="/Chanel-Logo.png"
          alt="CHANEL"
          className="personality-logo-img"
          data-cursor="hover"
          onClick={handleGoHome}
        />
      </div>

      {/* Mosaïque d'images en arrière-plan */}
      <div className="images-mosaic">
        {personalityData.images.map((imageSrc, index) => (
          <div
            key={index}
            className={`mosaic-image ${index === 1 ? 'center-image' : ''}`}
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
      </div>

      {/* Rectangle noir central avec contenu */}
      <div ref={overlayRef} className="personality-content-overlay">
        {/* Logo Chanel dans le rectangle */}
        <div ref={contentLogoRef} className="content-logo">
          <img src="/Chanel-Logo.png" alt="CHANEL" />
        </div>

        {/* Titre de la personnalité */}
        <h1 ref={titleRef} className="personality-title">
          {personalityData.personality}
        </h1>

        {/* Description */}
        <p ref={descriptionRef} className="personality-description">
          {personalityData.description}
        </p>

        {/* Texte téléchargement */}
        <p ref={downloadTextRef} className="download-text">
          TÉLÉCHARGEZ MA PERSONNALITÉ
        </p>

        {/* Bouton découvrir routine */}
        <button
          ref={buttonRef}
          className="discover-routine-button"
          onClick={handleDiscoverRoutine}
          data-cursor="hover"
        >
          DÉCOUVRIR VOTRE ROUTINE
        </button>
      </div>
    </div>
  );
};

export default PersonalityReveal;