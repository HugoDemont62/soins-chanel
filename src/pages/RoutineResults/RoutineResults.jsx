// Fichier: src/pages/RoutineResults/RoutineResults.jsx - ADAPTÉ POUR VITE
import { useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RoutineResults.css';

const RoutineResults = () => {
  const { type } = useParams(); // 'targeted' ou 'exception'
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaButtonRef = useRef(null);

  // Récupérer les réponses du questionnaire
  const answers = location.state?.answers || {};

  // Données des résultats selon le type et les réponses
  const getPersonalityType = () => {
    if (type === 'targeted') {
      // Logique pour routine ciblée basée sur les réponses
      const primaryNeed = answers[1]; // Première question

      switch (primaryNeed) {
        case 'hydration':
          return {
            personality: 'VOUS ÊTES INTUITIVE',
            description: 'Vous savez écouter votre peau et ses besoins d\'hydratation. Votre approche du soin est naturelle et bienveillante.',
            image: '/image-1.png'
          };
        case 'anti-age':
          return {
            personality: 'VOUS ÊTES PRÉVENTIVE',
            description: 'Vous anticipez les besoins de votre peau avec sagesse. Votre vision du soin s\'inscrit dans la durée.',
            image: '/image-2.png'
          };
        case 'eclat':
          return {
            personality: 'VOUS ÊTES LUMINEUSE',
            description: 'Vous recherchez l\'éclat authentique et la beauté rayonnante. Votre peau reflète votre joie de vivre.',
            image: '/image-3.png'
          };
        case 'purete':
          return {
            personality: 'VOUS ÊTES PERFECTIONNISTE',
            description: 'Vous aspirez à la perfection dans chaque geste de soin. Votre routine est un rituel de pureté.',
            image: '/image-4.png'
          };
        case 'sensibilite':
          return {
            personality: 'VOUS ÊTES DÉLICATE',
            description: 'Vous choisissez la douceur et le respect de votre peau sensible. Votre approche est empreinte de tendresse.',
            image: '/image-5.png'
          };
        default:
          return {
            personality: 'VOUS ÊTES INTUITIVE',
            description: 'Vous savez écouter votre peau et ses besoins. Votre approche du soin est naturelle et bienveillante.',
            image: '/image-1.png'
          };
      }
    } else {
      // Logique pour routine d'exception
      return {
        personality: 'VOUS ÊTES EXIGEANTE',
        description: 'Vous ne transigez jamais sur la qualité. Votre quête de l\'excellence guide chacun de vos choix beauté.',
        image: '/image-6.png'
      };
    }
  };

  const personalityResult = getPersonalityType();

  // Produits recommandés selon le type et les réponses
  const getRecommendedProducts = () => {
    if (type === 'targeted') {
      const primaryNeed = answers[1];

      switch (primaryNeed) {
        case 'hydration':
          return [
            {
              id: 'hydra-serum',
              name: 'HYDRA BEAUTY MICRO SÉRUM',
              description: 'Concentré d\'hydratation intense pour une peau repulpée et éclatante.',
              benefits: ['Hydratation 48h', 'Éclat immédiat', 'Confort durable'],
              price: '97€',
              image: '/image-2.png',
              addToCart: () => console.log('Ajout Hydra Sérum')
            },
            {
              id: 'hydra-creme',
              name: 'HYDRA BEAUTY MICRO CRÈME',
              description: 'Crème hydratante qui révèle l\'éclat naturel de la peau.',
              benefits: ['Texture fondante', 'Brillance naturelle', 'Protection 24h'],
              price: '90€',
              image: '/image-3.png',
              addToCart: () => console.log('Ajout Hydra Crème')
            },
            {
              id: 'hydra-essence',
              name: 'HYDRA BEAUTY ESSENCE',
              description: 'Première étape essentielle pour préparer la peau à recevoir les soins.',
              benefits: ['Préparation optimale', 'Fraîcheur instantanée', 'Absorption parfaite'],
              price: '85€',
              image: '/image-5.png',
              addToCart: () => console.log('Ajout Hydra Essence')
            }
          ];

        case 'anti-age':
          return [
            {
              id: 'n1-serum',
              name: 'N°1 DE CHANEL SÉRUM ROUGE REVITALISANT',
              description: 'Sérum anti-âge global aux actifs du Camélia rouge.',
              benefits: ['Anti-âge global', 'Fermeté visible', 'Éclat revitalisé'],
              price: '135€',
              image: '/image-6.png',
              addToCart: () => console.log('Ajout N°1 Sérum')
            },
            {
              id: 'n1-creme',
              name: 'N°1 DE CHANEL CRÈME ROUGE REVITALISANTE',
              description: 'Crème revitalisante pour une peau visiblement plus ferme.',
              benefits: ['Fermeté renforcée', 'Rides lissées', 'Jeunesse préservée'],
              price: '120€',
              image: '/image-7.png',
              addToCart: () => console.log('Ajout N°1 Crème')
            }
          ];

        case 'eclat':
          return [
            {
              id: 'sublimage-serum',
              name: 'SUBLIMAGE LE SÉRUM',
              description: 'Concentré de régénération pour une peau sublimée et lumineuse.',
              benefits: ['Éclat instantané', 'Peau sublimée', 'Texture précieuse'],
              price: '260€',
              image: '/image-3.png',
              addToCart: () => console.log('Ajout Sublimage Sérum')
            },
            {
              id: 'hydra-fluide',
              name: 'HYDRA BEAUTY FLUIDE ÉCLAT',
              description: 'Fluide léger qui révèle la luminosité naturelle de la peau.',
              benefits: ['Éclat immédiat', 'Texture fraîche', 'Luminosité durable'],
              price: '88€',
              image: '/image-4.png',
              addToCart: () => console.log('Ajout Hydra Fluide')
            }
          ];

        default:
          return [
            {
              id: 'hydra-serum',
              name: 'HYDRA BEAUTY MICRO SÉRUM',
              description: 'Concentré d\'hydratation intense pour une peau repulpée et éclatante.',
              benefits: ['Hydratation 48h', 'Éclat immédiat', 'Confort durable'],
              price: '97€',
              image: '/image-2.png',
              addToCart: () => console.log('Ajout Hydra Sérum')
            }
          ];
      }
    } else {
      // Produits d'exception SUBLIMAGE
      return [
        {
          id: 'sublimage-essence',
          name: 'SUBLIMAGE L\'ESSENCE FONDAMENTALE',
          description: 'Préparation ultime pour une régénération d\'exception.',
          benefits: ['Régénération cellulaire', 'Préparation optimale', 'Texture somptueuse'],
          price: '185€',
          image: '/image-1.png',
          addToCart: () => console.log('Ajout Sublimage Essence')
        },
        {
          id: 'sublimage-creme',
          name: 'SUBLIMAGE LA CRÈME',
          description: 'L\'excellence du soin anti-âge selon CHANEL.',
          benefits: ['Anti-âge d\'exception', 'Régénération intense', 'Luxe absolu'],
          price: '220€',
          image: '/image-2.png',
          addToCart: () => console.log('Ajout Sublimage Crème')
        },
        {
          id: 'sublimage-serum',
          name: 'SUBLIMAGE LE SÉRUM',
          description: 'Concentré de régénération pour une peau sublimée.',
          benefits: ['Concentré puissant', 'Résultats visibles', 'Perfection ultime'],
          price: '260€',
          image: '/image-3.png',
          addToCart: () => console.log('Ajout Sublimage Sérum')
        }
      ];
    }
  };

  const recommendedProducts = getRecommendedProducts();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const page = pageRef.current;
    if (!page) return;

    // Animation d'entrée de page avec style Chanel
    const tl = gsap.timeline({ delay: 0.3 });

    // Logo apparaît en premier avec élégance
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

    // Titre principal avec effet spectaculaire
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 80, rotationX: -20 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.8,
        ease: "power3.out"
      },
      "-=0.8"
    );

    // Sous-titre avec douceur
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=1.2"
    );

    // Bouton CTA avec finesse
    tl.fromTo(ctaButtonRef.current,
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

    // Animation des sections au scroll
    const setupScrollAnimations = () => {
      // Animation du titre des produits
      const productsTitle = page.querySelector('.products-section-title');
      const productsDescription = page.querySelector('.products-section-description');

      if (productsTitle) {
        gsap.fromTo(productsTitle,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: productsTitle,
              start: "top 80%",
              once: true
            }
          }
        );
      }

      if (productsDescription) {
        gsap.fromTo(productsDescription,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: productsDescription,
              start: "top 80%",
              once: true
            }
          }
        );
      }

      // Animation des cards produits avec stagger élégant
      const productCards = page.querySelectorAll('.recommended-product-card');
      productCards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, rotationY: -10 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true
            }
          }
        );
      });

      // Animation de la section finale
      const finalTitle = page.querySelector('.final-section-title');
      const finalDescription = page.querySelector('.final-section-description');
      const finalButtons = page.querySelector('.final-cta-buttons');

      [finalTitle, finalDescription, finalButtons].forEach((element, index) => {
        if (element) {
          gsap.fromTo(element,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: index * 0.2,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                once: true
              }
            }
          );
        }
      });
    };

    setupScrollAnimations();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleViewPersonality = () => {
    // Naviguer vers la page révélation de personnalité
    navigate(`/routine/personality/${type}`, {
      state: { answers }
    });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div ref={pageRef} className="routine-results-page">
      {/* Logo Chanel en haut au centre */}
      <div ref={logoRef} className="results-logo-header">
        <img
          src="/Chanel-Logo.png"
          alt="CHANEL"
          className="results-logo-img"
          data-cursor="hover"
          onClick={handleGoHome}
        />
      </div>

      {/* Section Hero avec résultat principal */}
      <section className="results-hero-section">
        {/* Éléments décoratifs */}
        <div className="decorative-element decorative-circle-1"></div>
        <div className="decorative-element decorative-circle-2"></div>

        {/* Titre principal avec personnalité */}
        <h1 ref={titleRef} className="results-main-title">
          {personalityResult.personality.split(' ').slice(0, 2).join(' ')}
          <span className="highlight">
            {personalityResult.personality.split(' ').slice(2).join(' ')}
          </span>
        </h1>

        {/* Description de la personnalité */}
        <p ref={subtitleRef} className="results-subtitle">
          {personalityResult.description}
        </p>

        {/* Bouton CTA principal */}
        <button
          ref={ctaButtonRef}
          className="results-cta-button"
          onClick={handleViewPersonality}
          data-cursor="hover"
        >
          VOIR MA PERSONNALITÉ
        </button>

        {/* Bouton pour voir les produits */}
        <button
          className="results-cta-button"
          onClick={() => navigate(`/routine/products/${type}`, { state: { answers } })}
          data-cursor="hover"
          style={{ marginTop: '20px', backgroundColor: 'transparent', color: '#000000', border: '2px solid #000000' }}
        >
          VOIR MES PRODUITS
        </button>
      </section>


    </div>
  );
};

export default RoutineResults;