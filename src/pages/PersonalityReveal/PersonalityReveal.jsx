// Fichier: src/pages/PersonalityReveal/PersonalityReveal.jsx - VERSION SIMPLE CLEAN
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
  const codeCardRef = useRef(null);
  const leftColumnRef = useRef(null);
  const centerColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

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
            description: 'Votre approche du soin est naturelle et bienveillante.',
            className: 'personality-intuitive',
            images: {
              leftColumn: ['/image-1.png', '/image-4.png', '/image-7.png'],
              centerColumn: ['/image-2.png', '/image-5.png', '/image-8.png'],
              rightColumn: ['/image-3.png', '/image-6.png', '/image-2.png']
            }
          };
        case 'anti-age':
          return {
            personality: 'VOUS ÊTES PRÉVENTIVE.',
            description: 'Vous anticipez les besoins de votre peau avec sagesse.',
            className: 'personality-preventive',
            images: {
              leftColumn: ['/image-2.png', '/image-5.png', '/image-8.png'],
              centerColumn: ['/image-3.png', '/image-6.png', '/image-2.png'],
              rightColumn: ['/image-4.png', '/image-7.png', '/image-1.png']
            }
          };
        case 'eclat':
          return {
            personality: 'VOUS ÊTES LUMINEUSE.',
            description: 'Vous recherchez l\'éclat authentique et la beauté rayonnante.',
            className: 'personality-luminous',
            images: {
              leftColumn: ['/image-3.png', '/image-6.png', '/image-2.png'],
              centerColumn: ['/image-4.png', '/image-7.png', '/image-1.png'],
              rightColumn: ['/image-5.png', '/image-8.png', '/image-2.png']
            }
          };
        default:
          return {
            personality: 'VOUS ÊTES INTUITIVE.',
            description: 'Votre approche du soin est naturelle et bienveillante.',
            className: 'personality-intuitive',
            images: {
              leftColumn: ['/image-1.png', '/image-4.png', '/image-7.png'],
              centerColumn: ['/image-2.png', '/image-5.png', '/image-8.png'],
              rightColumn: ['/image-3.png', '/image-6.png', '/image-2.png']
            }
          };
      }
    } else {
      // Logique pour routine d'exception
      return {
        personality: 'VOUS ÊTES EXIGEANTE.',
        description: 'Vous ne transigez jamais sur la qualité.',
        className: 'personality-demanding',
        images: {
          leftColumn: ['/image-6.png', '/image-2.png', '/image-3.png'],
          centerColumn: ['/image-7.png', '/image-1.png', '/image-4.png'],
          rightColumn: ['/image-8.png', '/image-2.png', '/image-5.png']
        }
      };
    }
  };

  const personalityData = getPersonalityData();

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    // Ajouter la classe CSS pour la personnalité
    page.className = `personality-reveal-page ${personalityData.className}`;

    // Animation d'entrée
    const tl = gsap.timeline({ delay: 0.5 });

    // 1. Logo en haut
    tl.fromTo(logoRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

    // 2. Images apparaissent en cascade
    const leftImages = leftColumnRef.current?.querySelectorAll('.image-wrapper');
    const centerImages = centerColumnRef.current?.querySelectorAll('.image-wrapper');
    const rightImages = rightColumnRef.current?.querySelectorAll('.image-wrapper');

    tl.fromTo([...leftImages, ...centerImages, ...rightImages],
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      },
      "-=0.5"
    );

    // 3. Card de code au centre
    tl.fromTo(codeCardRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.6"
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
    // Naviguer vers la page des produits recommandés
    navigate(`/routine/product/${type}`, {
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

      {/* Layout en 3 colonnes PLEINE LARGEUR */}
      <div className="personality-images-container">

        {/* Colonne GAUCHE */}
        <div ref={leftColumnRef} className="personality-column left-column">
          {personalityData.images.leftColumn.map((imageSrc, index) => (
            <div key={`left-${index}`} className="image-wrapper">
              <img
                src={imageSrc}
                alt={`Image ${index + 1}`}
                className="personality-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Colonne CENTRE */}
        <div ref={centerColumnRef} className="personality-column center-column">
          {personalityData.images.centerColumn.map((imageSrc, index) => (
            <div key={`center-${index}`} className="image-wrapper">
              <img
                src={imageSrc}
                alt={`Image ${index + 1}`}
                className="personality-image center-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Colonne DROITE */}
        <div ref={rightColumnRef} className="personality-column right-column">
          {personalityData.images.rightColumn.map((imageSrc, index) => (
            <div key={`right-${index}`} className="image-wrapper">
              <img
                src={imageSrc}
                alt={`Image ${index + 1}`}
                className="personality-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Card simple au centre pour ton code */}
      <div ref={codeCardRef} className="code-card">
        {/* Logo Chanel dans la card */}
        <div className="card-logo">
          <img src="/Chanel-Logo.png" alt="CHANEL" />
        </div>

        {/* Titre de la personnalité */}
        <h1 className="card-title">
          {personalityData.personality}
        </h1>

        {/* Description */}
        <p className="card-description">
          {personalityData.description}
        </p>

        {/* Exemple - Tu peux remplacer par ce que tu veux */}
        <div className="custom-content">
          <p>Ici tu peux mettre tout ton code personnalisé !</p>

          {/* Bouton exemple */}
          <button
            className="custom-button"
            onClick={handleDiscoverRoutine}
            data-cursor="hover"
          >
            DÉCOUVRIR VOTRE ROUTINE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityReveal;