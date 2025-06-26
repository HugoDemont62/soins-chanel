// Fichier: src/pages/RoutineProducts/RoutineProducts.jsx
import { useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RoutineProducts.css';

const RoutineProducts = () => {
  const { type } = useParams(); // 'targeted' ou 'exception'
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  // Récupérer les réponses du questionnaire
  const answers = location.state?.answers || {};

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

    // Animation d'entrée de page
    const tl = gsap.timeline({ delay: 0.3 });

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

    // Titre et description
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.8"
    );

    tl.fromTo(descriptionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3
      },
      "-=0.8"
    );

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
          delay: 0.8 + (index * 0.2),
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(`/routine/results/${type}`, {
      state: { answers }
    });
  };

  return (
    <div ref={pageRef} className="routine-products-page">
      {/* Logo Chanel en haut au centre */}
      <div ref={logoRef} className="products-logo-header">
        <img
          src="/Chanel-Logo.png"
          alt="CHANEL"
          className="products-logo-img"
          data-cursor="hover"
          onClick={handleGoHome}
        />
      </div>

      {/* Section header */}
      <section className="products-hero-section">
        <button
          className="back-button"
          onClick={handleGoBack}
          data-cursor="hover"
        >
          ← Retour
        </button>

        <div className="products-section-header">
          <h1 ref={titleRef} className="products-section-title">
            VOTRE ROUTINE PERSONNALISÉE
          </h1>
          <p ref={descriptionRef} className="products-section-description">
            Basée sur vos réponses, nous avons sélectionné ces soins d'exception
            qui correspondent parfaitement à votre profil et vos besoins.
          </p>
        </div>
      </section>

      {/* Grid des produits recommandés */}
      <section className="products-grid-section">
        <div className="recommended-products-grid">
          {recommendedProducts.map((product, index) => (
            <div key={product.id} className="recommended-product-card">
              <img
                src={product.image}
                alt={product.name}
                className="recommended-product-image"
                loading="lazy"
              />

              <h3 className="recommended-product-name">
                {product.name}
              </h3>

              <p className="recommended-product-description">
                {product.description}
              </p>

              <div className="product-benefits">
                {product.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="benefit-item">
                    {benefit}
                  </div>
                ))}
              </div>

              <div className="recommended-product-actions">
                <div className="recommended-product-price">
                  {product.price}
                </div>
                <button
                  className="recommended-product-button"
                  onClick={product.addToCart}
                  data-cursor="hover"
                >
                  AJOUTER AU PANIER
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RoutineProducts;