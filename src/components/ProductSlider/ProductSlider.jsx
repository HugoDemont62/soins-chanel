// Fichier: src/components/ProductSlider/ProductSlider.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductSlider.css';

const ProductSlider = () => {
  const sliderRef = useRef(null);
  const slidesWrapperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Données des slides
  const slides = [
    {
      id: 1,
      title: "LIBÉRER LA PEAU DES TRACES DU JOUR AVEC DÉLICATESSE.",
      description: "Des formules d'exception. Une expertise sur mesure. Explorez une nouvelle vision du soin du visage, où la science rencontre la sensorialité, et chaque geste sublime l'essentiel.",
      buttonText: "DÉCOUVRIR",
      buttonAction: () => console.log('Découvrir slide 1'),
      image: "/image.png",
    },
    {
      id: 2,
      title: "RÉVELER UNE PEAU NETTE, PURE ET RESPECTÉE.",
      description: "Nettoyage en profondeur et démaquillage. La science rencontre la douceur pour révéler l'éclat naturel de votre peau avec respect et efficacité.",
      buttonText: "VOIR LA SÉRIE",
      buttonAction: () => console.log('Voir la série slide 2'),
      image: "/image-slider-2.jpg",
    },
    {
      id: 3,
      title: "PRÉPARER LA PEAU À RECEVOIR L'ESSENTIEL DU SOIN.",
      description: "La phase de préparation fondatrice pour une peau réceptive. Chaque geste compte pour révéler la beauté naturelle et préparer l'épiderme aux soins qui suivent.",
      buttonText: "EN SAVOIR PLUS",
      buttonAction: () => console.log('En savoir plus slide 3'),
      image: "/image-slider-3.jpg",
    },
    {
      id: 4,
      title: "CIBLER LES BESOINS AVEC PRÉCISION ET EFFICACITÉ.",
      description: "Des soins ciblés et performants. La technologie au service de la beauté pour des résultats visibles et durables.",
      buttonText: "DÉCOUVRIR",
      buttonAction: () => console.log('Découvrir slide 4'),
      image: "/image-slider-4.jpg",
    }
  ];

  const totalSlides = slides.length;

  // Navigation suivant
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = (currentSlide + 1) % totalSlides;
    animateToSlide(newIndex);
  };

  // Navigation précédent
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    animateToSlide(newIndex);
  };

  // Animation vers un slide
  const animateToSlide = (newIndex) => {
    const wrapper = slidesWrapperRef.current;
    if (!wrapper) return;

    const currentSlideEl = wrapper.children[currentSlide];
    const nextSlideEl = wrapper.children[newIndex];

    // Timeline d'animation
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(newIndex);
        setIsAnimating(false);

        // Reset
        gsap.set([currentSlideEl, nextSlideEl], {
          opacity: '',
          clearProps: "all"
        });

        // Assurer que seul le slide actif est visible
        Array.from(wrapper.children).forEach((slide, index) => {
          slide.classList.toggle('active', index === newIndex);
        });
      }
    });

    // Sortie du slide actuel
    tl.to(currentSlideEl, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });

    // Entrée du nouveau slide
    tl.fromTo(nextSlideEl,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.2"
    );
  };

  // Animation d'entrée des éléments du slide
  useEffect(() => {
    const wrapper = slidesWrapperRef.current;
    if (!wrapper) return;

    const currentSlideElement = wrapper.children[currentSlide];
    if (!currentSlideElement) return;

    const title = currentSlideElement.querySelector('.slider-title');
    const description = currentSlideElement.querySelector('.slider-description');
    const button = currentSlideElement.querySelector('.slider-button');

    // Reset initial
    gsap.set([title, description, button], {
      y: 30,
      opacity: 0
    });

    // Animation d'entrée
    const tl = gsap.timeline();

    tl.to(title, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2
    })
    .to(description, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    }, "-=1")
    .to(button, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    }, "-=1");

  }, [currentSlide]);

  // Setup initial
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = slidesWrapperRef.current;
    if (!wrapper) return;

    // Activer seulement le premier slide
    Array.from(wrapper.children).forEach((slide, index) => {
      slide.classList.toggle('active', index === 0);
    });

  }, []);

  // Calcul du pourcentage de progression
  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <section ref={sliderRef} className="product-slider">
      <div className="slider-container">

        {/* Section Contenu - 35% (GAUCHE) */}
        <div className="slider-content-section">
          <div ref={slidesWrapperRef} className="slides-wrapper">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="slide-content">
                  <h2 className="slider-title">{slide.title}</h2>
                  <p className="slider-description">{slide.description}</p>
                  <button
                    className="slider-button"
                    onClick={slide.buttonAction}
                    data-cursor="hover"
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Image - 65% (DROITE) */}
        <div
          className="slider-image-section"
          style={{ backgroundColor: slides[currentSlide].backgroundColor }}
        >
          <div className="slide-image-container">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="slider-main-image"
              loading="lazy"
            />
          </div>

          {/* Navigation flèches - EN BAS À GAUCHE */}
          <div className="navigation-controls">
            <button
              className="nav-arrow-square"
              onClick={prevSlide}
              disabled={isAnimating}
              data-cursor="hover"
              aria-label="Slide précédent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              className="nav-arrow-square"
              onClick={nextSlide}
              disabled={isAnimating}
              data-cursor="hover"
              aria-label="Slide suivant"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Progress bar - SOUS L'IMAGE */}
          <div className="progress-bar-container">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Compteur de slides */}
          <div className="slide-counter">
            <span className="current-number">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="separator">/</span>
            <span className="total-number">{String(totalSlides).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;