// Fichier: src/components/GammesSection/GammesSection.jsx
import {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './GammesSection.css';

const GammesSection = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Données des gammes AVEC TES VRAIES IMAGES
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
          image: '/image-2.png',
          addToCart: () => console.log('Ajout panier Hydra Sérum'),
        },
        {
          id: 2,
          gamme: 'HYDRA BEAUTY',
          name: 'HYDRA BEAUTY MICRO CRÈME',
          utility: 'Hydratant brillance repulpant',
          price: '90€',
          image: '/image-3.png',
          addToCart: () => console.log('Ajout panier Hydra Crème'),
        },
        {
          id: 3,
          gamme: 'HYDRA BEAUTY',
          name: 'HYDRA BEAUTY CAMÉLIA',
          utility: 'Hydratant revitalisant éclat',
          price: '110€',
          image: '/image-4.png',
          addToCart: () => console.log('Ajout panier Hydra Camélia'),
        },
        {
          id: 4,
          gamme: 'HYDRA BEAUTY',
          name: 'HYDRA BEAUTY ESSENCE',
          utility: 'Essence hydratante éclat',
          price: '85€',
          image: '/image-5.png',
          addToCart: () => console.log('Ajout panier Hydra Essence'),
        },
      ],
    },
    {
      id: 'n1',
      name: 'N°1 DE CHANEL',
      title: 'N°1 DE CHANEL',
      description: 'La ligne de soin rouge vitalisante, aux actifs du Camélia rouge. Pour revitaliser la peau et révéler sa jeunesse éclatante, naturellement.',
      image: '/image-5.png',
      buttonText: 'DÉCOUVRIR LA GAMME N°1 DE CHANEL',
      buttonAction: () => console.log('Découvrir N°1 de Chanel'),
      backgroundColor: '#F8E8E8',
      cardClass: 'n1-chanel',
      reverse: true,
      products: [
        {
          id: 4,
          gamme: 'N°1 DE CHANEL',
          name: 'N°1 DE CHANEL SÉRUM ROUGE REVITALISANT',
          utility: 'Sérum revitalisant éclat',
          price: '135€',
          image: '/image-6.png',
          addToCart: () => console.log('Ajout panier N°1 Sérum'),
        },
        {
          id: 5,
          gamme: 'N°1 DE CHANEL',
          name: 'N°1 DE CHANEL CRÈME ROUGE REVITALISANTE',
          utility: 'Crème revitalisante fermeté',
          price: '120€',
          image: '/image-7.png',
          addToCart: () => console.log('Ajout panier N°1 Crème'),
        },
        {
          id: 6,
          gamme: 'N°1 DE CHANEL',
          name: 'N°1 DE CHANEL FLUIDE ROUGE',
          utility: 'Fluide revitalisant léger',
          price: '115€',
          image: '/image-8.png',
          addToCart: () => console.log('Ajout panier N°1 Fluide'),
        },
        {
          id: 7,
          gamme: 'N°1 DE CHANEL',
          name: 'N°1 DE CHANEL BAUME ROUGE',
          utility: 'Baume revitalisant nourrissant',
          price: '95€',
          image: '/image-9.png',
          addToCart: () => console.log('Ajout panier N°1 Baume'),
        },
      ],
    },
    {
      id: 'sublimage',
      name: 'SUBLIMAGE',
      title: 'SUBLIMAGE',
      description: 'L\'excellence du soin selon CHANEL. Une routine d\'exception qui révèle une peau sublimée, régénérée et d\'une beauté éclatante.',
      image: '/image.png',
      buttonText: 'DÉCOUVRIR LA GAMME SUBLIMAGE',
      buttonAction: () => console.log('Découvrir Sublimage'),
      backgroundColor: '#F5F2E8',
      cardClass: 'sublimage',
      reverse: false,
      products: [
        {
          id: 7,
          gamme: 'SUBLIMAGE',
          name: 'SUBLIMAGE L\'ESSENCE FONDAMENTALE',
          utility: 'Préparation régénération ultime',
          price: '185€',
          image: '/image-1.png',
          addToCart: () => console.log('Ajout panier Sublimage Essence'),
        },
        {
          id: 8,
          gamme: 'SUBLIMAGE',
          name: 'SUBLIMAGE LA CRÈME',
          utility: 'Régénérant anti-âge exception',
          price: '220€',
          image: '/image-2.png',
          addToCart: () => console.log('Ajout panier Sublimage Crème'),
        },
        {
          id: 9,
          gamme: 'SUBLIMAGE',
          name: 'SUBLIMAGE LE SÉRUM',
          utility: 'Concentré régénération intense',
          price: '260€',
          image: '/image-3.png',
          addToCart: () => console.log('Ajout panier Sublimage Sérum'),
        },
        {
          id: 10,
          gamme: 'SUBLIMAGE',
          name: 'SUBLIMAGE LA LOTION',
          utility: 'Lotion régénérante éclat',
          price: '150€',
          image: '/image-4.png',
          addToCart: () => console.log('Ajout panier Sublimage Lotion'),
        },
      ],
    },
  ];

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
        {opacity: 0, y: 50},
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mainTitle,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }

    if (mainSubtitle) {
      gsap.fromTo(mainSubtitle,
        {opacity: 0, y: 30},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: mainSubtitle,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }

    // Animation pour chaque gamme
    const gammeWrappers = section.querySelectorAll('.gamme-wrapper');
    gammeWrappers.forEach((wrapper, index) => {
      const title = wrapper.querySelector('.gamme-title');
      const description = wrapper.querySelector('.gamme-description');
      const button = wrapper.querySelector('.gamme-discover-button');
      const sliderContainer = wrapper.querySelector(
        '.products-slider-container');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 70%',
          once: true,
        },
      });

      tl.fromTo(title,
        {opacity: 0, y: 40},
        {opacity: 1, y: 0, duration: 1, ease: 'power3.out'},
      ).fromTo(sliderContainer,
        {opacity: 0, x: index % 2 === 0 ? -50 : 50},
        {opacity: 1, x: 0, duration: 1.2, ease: 'power3.out'},
        '-=0.5',
      ).fromTo(description,
        {opacity: 0, y: 30},
        {opacity: 1, y: 0, duration: 1, ease: 'power3.out'},
        '-=0.8',
      ).fromTo(button,
        {opacity: 0, y: 20},
        {opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'},
        '-=0.5',
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
                backgroundPosition: 'center',
              }}
            >
            </div>

            {/* Section Contenu - 50% */}
            <div className="gamme-content-section">

              {/* Titre de la gamme */}
              <h3 className="gamme-title">{gamme.title}</h3>

              {/* SWIPER CARROUSEL - NOUVEAU DESIGN DE CARDS */}
              <div className="products-slider-container">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView="auto"
                  centeredSlides={false}
                  loop={false}
                  loopFillGroupWithBlank={false}
                  grabCursor={true}
                  freeMode={false}
                  autoplay={false}
                  pagination={false}
                  navigation={!isMobile}
                  speed={400}
                  effect="slide"
                  resistance={true}
                  resistanceRatio={0.85}
                  watchSlidesProgress={true}
                  watchSlidesVisibility={true}
                  slidesPerGroup={1}
                  allowTouchMove={true}
                  touchRatio={1}
                  className="swiper-products"
                >
                  {gamme.products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className={`product-card-modern ${gamme.cardClass}`}>

                        {/* Tag gamme en haut à gauche */}
                        <div className="product-tag">{product.gamme}</div>

                        {/* Image produit centrée */}
                        <div className="product-image-container">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="product-image-modern"
                            loading="lazy"
                          />
                        </div>

                        {/* Section contenu en bas avec tout aligné à gauche */}
                        <div className="product-content-section">

                          {/* Nom du produit - aligné à gauche */}
                          <h4
                            className="product-name-modern">{product.name}</h4>

                          {/* Description - alignée à gauche */}
                          <p
                            className="product-utility-modern">{product.utility}</p>

                          {/* Actions : bouton à gauche + prix à droite */}
                          <div className="product-actions">
                            <button
                              className="product-btn-modern"
                              onClick={product.addToCart}
                              data-cursor="hover"
                            >
                              AJOUTER AU PANIER
                            </button>
                            <span
                              className="product-price-modern">{product.price}</span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
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