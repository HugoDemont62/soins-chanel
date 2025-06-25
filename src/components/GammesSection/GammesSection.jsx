// Fichier: src/components/GammesSection/GammesSection.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GammesSection.css';

const GammesSection = () => {
  const sectionRef = useRef(null);
  const [currentSliders, setCurrentSliders] = useState({ hydra: 0, sublimage: 0, n1: 0 });

  // Refs pour les sliders de produits
  const sliderRefs = useRef({
    hydra: null,
    sublimage: null,
    n1: null
  });

  // Données des gammes
  const gammes = [
    {
      id: 'hydra',
      name: 'HYDRA BEAUTY',
      title: 'HYDRA BEAUTY',
      description: 'Inspirée par la puissance botanique de la Camélia, cette gamme infuse la peau d\'une hydratation continue, l\'éclat et la luminosité. Parfaite pour réconforter, repulper et révéler l\'éclat de votre teint.',
      image: '/image-1.png',
      buttonText: 'DÉCOUVRIR LA GAMME HYDRA BEAUTY',
      buttonAction: () => console.log('Découvrir Hydra Beauty'),
      backgroundColor: '#E8F4F8',
      cardClass: 'hydra-beauty',
      reverse: false,
      products: [
        {
          id: 1,
          gamme: 'HYDRA BEAUTY',
          name: 'HYDRA BEAUTY MICRO SÉRUM',
          utility: 'Suprême révélateur repulpant',
          price: '97€',
          image: '/product-hydra-1.png',
          addToCart: () => console.log('Ajout panier Hydra Sérum')
        },
        {
          id: 2,
          gamme: 'HYDRA BEAUTY',
          name: 'HYDRA BEAUTY MICRO CRÈME',
          utility: 'Hydratant brillance repulpant',
          price: '90€',
          image: '/product-hydra-2.png',
          addToCart: () => console.log('Ajout panier Hydra Crème')
        },
        {
          id: 3,
          gamme: 'HYDRA BEAUTY',
          name: 'HYDRA BEAUTY CAMÉLIA',
          utility: 'Hydratant revitalisant éclat',
          price: '110€',
          image: '/product-hydra-3.png',
          addToCart: () => console.log('Ajout panier Hydra Camélia')
        }
      ]
    },
    {
      id: 'n1',
      name: 'N°1 DE CHANEL',
      title: 'N°1 DE CHANEL',
      description: 'La ligne de soin rouge vitalisante, aux actifs du Camélia rouge. Pour revitaliser la peau et révéler sa jeunesse éclatante, naturellement.',
      image: '/image-n1.png',
      buttonText: 'DÉCOUVRIR LA GAMME N°1 DE CHANEL',
      buttonAction: () => console.log('Découvrir N°1 de Chanel'),
      backgroundColor: '#F8E8E8',
      cardClass: 'n1-chanel',
      reverse: true, // Photo à droite pour la 2ème
      products: [
        {
          id: 4,
          gamme: 'N°1 DE CHANEL',
          name: 'N°1 DE CHANEL SÉRUM ROUGE REVITALISANT',
          utility: 'Sérum revitalisant éclat',
          price: '135€',
          image: '/product-n1-1.png',
          addToCart: () => console.log('Ajout panier N°1 Sérum')
        },
        {
          id: 5,
          gamme: 'N°1 DE CHANEL',
          name: 'N°1 DE CHANEL CRÈME ROUGE REVITALISANTE',
          utility: 'Crème revitalisante fermeté',
          price: '120€',
          image: '/product-n1-2.png',
          addToCart: () => console.log('Ajout panier N°1 Crème')
        },
        {
          id: 6,
          gamme: 'N°1 DE CHANEL',
          name: 'N°1 DE CHANEL FLUIDE ROUGE',
          utility: 'Fluide revitalisant léger',
          price: '115€',
          image: '/product-n1-3.png',
          addToCart: () => console.log('Ajout panier N°1 Fluide')
        }
      ]
    },
    {
      id: 'sublimage',
      name: 'SUBLIMAGE',
      title: 'SUBLIMAGE',
      description: 'L\'excellence du soin selon CHANEL. Une routine d\'exception qui révèle une peau sublimée, régénérée et d\'une beauté éclatante.',
      image: '/image-sublimage.png',
      buttonText: 'DÉCOUVRIR LA GAMME SUBLIMAGE',
      buttonAction: () => console.log('Découvrir Sublimage'),
      backgroundColor: '#F5F2E8',
      cardClass: 'sublimage',
      reverse: false, // Photo à gauche pour la 3ème
      products: [
        {
          id: 7,
          gamme: 'SUBLIMAGE',
          name: 'SUBLIMAGE L\'ESSENCE FONDAMENTALE',
          utility: 'Préparation régénération ultime',
          price: '185€',
          image: '/product-sublimage-1.png',
          addToCart: () => console.log('Ajout panier Sublimage Essence')
        },
        {
          id: 8,
          gamme: 'SUBLIMAGE',
          name: 'SUBLIMAGE LA CRÈME',
          utility: 'Régénérant anti-âge exception',
          price: '220€',
          image: '/product-sublimage-2.png',
          addToCart: () => console.log('Ajout panier Sublimage Crème')
        },
        {
          id: 9,
          gamme: 'SUBLIMAGE',
          name: 'SUBLIMAGE LE SÉRUM',
          utility: 'Concentré régénération intense',
          price: '260€',
          image: '/product-sublimage-3.png',
          addToCart: () => console.log('Ajout panier Sublimage Sérum')
        }
      ]
    }
  ];

  // Navigation fluide des sliders de produits
  const moveSlider = (gammeId, direction) => {
    const gamme = gammes.find(g => g.id === gammeId);
    if (!gamme) return;

    const slider = sliderRefs.current[gammeId];
    if (!slider) return;

    const currentIndex = currentSliders[gammeId];
    const totalProducts = gamme.products.length;
    const maxIndex = totalProducts - 1; // Permet de naviguer jusqu'au dernier produit

    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    }

    // Animation plus fluide avec un décalage pour voir le produit suivant
    const cardWidth = 236; // 220px width + 16px gap
    const translateX = -(newIndex * cardWidth);

    gsap.to(slider, {
      x: translateX,
      duration: 0.8,
      ease: "power3.out"
    });

    setCurrentSliders(prev => ({
      ...prev,
      [gammeId]: newIndex
    }));
  };

  // Handle drag fluide sur sliders
  const handleSliderDrag = (e, gammeId) => {
    e.preventDefault();
    const slider = sliderRefs.current[gammeId];
    if (!slider) return;

    let isDown = true;
    let startX = e.pageX || (e.touches && e.touches[0].pageX) || 0;
    let hasMoved = false;

    const handleMove = (e) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX || (e.touches && e.touches[0].pageX) || 0;
      const walk = x - startX;

      if (Math.abs(walk) > 30 && !hasMoved) {
        hasMoved = true;
        if (walk > 0) {
          moveSlider(gammeId, 'prev');
        } else {
          moveSlider(gammeId, 'next');
        }
      }
    };

    const handleEnd = () => {
      isDown = false;
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  };

  // Setup animations GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Animation du titre principal
    const mainTitle = section.querySelector('.gammes-main-title');
    const mainSubtitle = section.querySelector('.gammes-main-subtitle');

    if (mainTitle) {
      gsap.fromTo(mainTitle,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainTitle,
            start: "top 80%",
            once: true
          }
        }
      );
    }

    if (mainSubtitle) {
      gsap.fromTo(mainSubtitle,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: mainSubtitle,
            start: "top 80%",
            once: true
          }
        }
      );
    }

    // Animation pour chaque gamme
    const gammeWrappers = section.querySelectorAll('.gamme-wrapper');
    gammeWrappers.forEach((wrapper, index) => {
      const title = wrapper.querySelector('.gamme-title');
      const description = wrapper.querySelector('.gamme-description');
      const button = wrapper.querySelector('.gamme-discover-button');
      const sliderContainer = wrapper.querySelector('.products-slider-container');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 70%",
          once: true
        }
      });

      tl.fromTo(title,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo(sliderContainer,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(description,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(button,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Setup initial position des sliders
  useEffect(() => {
    Object.keys(sliderRefs.current).forEach(gammeId => {
      const slider = sliderRefs.current[gammeId];
      if (slider) {
        gsap.set(slider, { x: 0 });
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="gammes-section">

      {/* Header principal de la section */}
      <div className="gammes-main-header">
        <h2 className="gammes-main-title">LES GAMMES SOINS BY CHANEL</h2>
        <p className="gammes-main-subtitle">TOUTES LES GAMMES</p>
      </div>

      {/* Chaque gamme comme section séparée */}
      {gammes.map((gamme, index) => (
        <div key={gamme.id} className="gamme-wrapper">
          <div className={`gamme-container ${gamme.reverse ? 'reverse' : ''}`}>

            {/* Section Image - 50% */}
            <div
              className="gamme-image-section"
              style={{
                backgroundColor: gamme.backgroundColor,
                backgroundImage: `url(${gamme.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Image en background pour un meilleur rendu */}
            </div>

            {/* Section Contenu - 50% */}
            <div className="gamme-content-section">

              {/* Titre de la gamme */}
              <h3 className="gamme-title">{gamme.title}</h3>

              {/* Slider de produits */}
              <div className="products-slider-container">
                <div className="products-slider-viewport">
                  <div
                    className="products-slider-track"
                    ref={el => sliderRefs.current[gamme.id] = el}
                    onMouseDown={(e) => handleSliderDrag(e, gamme.id)}
                    onTouchStart={(e) => handleSliderDrag(e, gamme.id)}
                  >
                    {gamme.products.map((product) => (
                      <div
                        key={product.id}
                        className={`product-card ${gamme.cardClass}`}
                      >
                        <div className="product-gamme-name">{product.gamme}</div>

                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image"
                          loading="lazy"
                        />

                        <h4 className="product-name">{product.name}</h4>

                        <p className="product-utility">{product.utility}</p>

                        <div className="product-footer">
                          <button
                            className="product-cta"
                            onClick={product.addToCart}
                            data-cursor="hover"
                          >
                            AJOUTER AU PANIER
                          </button>
                          <span className="product-price">{product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation dots du slider */}
                <div className="slider-navigation">
                  {gamme.products.map((_, dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`slider-nav-dot ${currentSliders[gamme.id] === dotIndex ? 'active' : ''}`}
                      onClick={() => {
                        const slider = sliderRefs.current[gamme.id];
                        if (slider) {
                          const cardWidth = 236;
                          const translateX = -(dotIndex * cardWidth);
                          gsap.to(slider, {
                            x: translateX,
                            duration: 0.8,
                            ease: "power3.out"
                          });
                          setCurrentSliders(prev => ({
                            ...prev,
                            [gamme.id]: dotIndex
                          }));
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Description de la gamme */}
              <p className="gamme-description">{gamme.description}</p>

              {/* Bouton découvrir */}
              <button
                className="gamme-discover-button"
                onClick={gamme.buttonAction}
                data-cursor="hover"
              >
                {gamme.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default GammesSection;