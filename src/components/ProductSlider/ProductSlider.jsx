// Fichier: src/components/ProductSlider/ProductSlider.jsx (Version avec options)
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ProductSlider.css';

const ProductSlider = ({
                         autoPlay = false,           // Auto-play optionnel
                         autoPlayDelay = 5000,      // Délai auto-play en ms
                         showCounter = true,        // Afficher le compteur
                         showIndicators = true,     // Afficher les indicateurs
                         customSlides = null        // Slides personnalisés
                       }) => {
  const sliderRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Données des slides (peut être surchargé par customSlides)
  const defaultSlides = [
    {
      id: 1,
      title: "LIBÉRER LA PEAU DES TRACES DU JOUR AVEC DÉLICATESSE.",
      subtitle: "Des formules d'exception. Une expertise sur mesure. Explorez une nouvelle vision du soin du visage, où la science rencontre la sensorialité, et chaque geste sublime l'essentiel.",
      buttonText: "DÉCOUVRIR",
      buttonAction: () => console.log('Découvrir slide 1'),
      image: "/image-slider-1.jpg",
      backgroundColor: "#f8f6f3",
      textAlign: "left" // "left", "center", "right"
    },
    {
      id: 2,
      title: "RÉVELER UNE PEAU NETTE, PURE ET RESPECTÉE.",
      subtitle: "Nettoyage en profondeur et démaquillage. La science rencontre la douceur pour révéler l'éclat naturel de votre peau avec respect et efficacité.",
      buttonText: "VOIR LA SÉRIE",
      buttonAction: () => console.log('Voir la série slide 2'),
      image: "/image-slider-2.jpg",
      backgroundColor: "#f2f7f9",
      textAlign: "left"
    },
    {
      id: 3,
      title: "PRÉPARER LA PEAU À RECEVOIR L'ESSENTIEL DU SOIN.",
      subtitle: "La phase de préparation fondatrice pour une peau réceptive. Chaque geste compte pour révéler la beauté naturelle et préparer l'épiderme aux soins qui suivent.",
      buttonText: "EN SAVOIR PLUS",
      buttonAction: () => console.log('En savoir plus slide 3'),
      image: "/image-slider-3.jpg",
      backgroundColor: "#f5f3f0",
      textAlign: "left"
    },
    {
      id: 4,
      title: "CIBLER LES BESOINS AVEC PRÉCISION ET EFFICACITÉ.",
      subtitle: "Des soins ciblés et performants. La technologie au service de la beauté pour des résultats visibles et durables.",
      buttonText: "DÉCOUVRIR",
      buttonAction: () => console.log('Découvrir slide 4'),
      image: "/image-slider-4.jpg",
      backgroundColor: "#e8f4f0",
      textAlign: "left"
    }
  ];

  const slides = customSlides || defaultSlides;
  const totalSlides = slides.length;

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    autoPlayRef.current = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, autoPlayDelay);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, isPaused, isAnimating, currentSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlay) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsPaused(false);
    }
  };

  // Navigation avec transition personnalisée
  const nextSlide = (customTransition = null) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newIndex = (currentSlide + 1) % totalSlides;

    animateToSlide(newIndex, customTransition || 'slideLeft');
  };

  const prevSlide = (customTransition = null) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;

    animateToSlide(newIndex, customTransition || 'slideRight');
  };

  // Aller directement à un slide
  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    const direction = index > currentSlide ? 'slideLeft' : 'slideRight';
    animateToSlide(index, direction);
  };

  // Animations GSAP améliorées
  const animateToSlide = (newIndex, transition) => {
    const container = slidesContainerRef.current;
    if (!container) return;

    const currentSlideEl = container.children[currentSlide];
    const nextSlideEl = container.children[newIndex];

    // Différents types de transitions
    const transitions = {
      slideLeft: {
        out: { x: '-100%', opacity: 0 },
        in: { x: '100%', opacity: 0 },
        inTo: { x: '0%', opacity: 1 }
      },
      slideRight: {
        out: { x: '100%', opacity: 0 },
        in: { x: '-100%', opacity: 0 },
        inTo: { x: '0%', opacity: 1 }
      },
      fade: {
        out: { opacity: 0, scale: 0.95 },
        in: { opacity: 0, scale: 1.05 },
        inTo: { opacity: 1, scale: 1 }
      },
      zoomOut: {
        out: { opacity: 0, scale: 0.8 },
        in: { opacity: 0, scale: 1.2 },
        inTo: { opacity: 1, scale: 1 }
      }
    };

    const trans = transitions[transition] || transitions.slideLeft;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(newIndex);
        setIsAnimating(false);

        // Reset transform properties
        gsap.set([currentSlideEl, nextSlideEl], {
          x: "0%",
          opacity: 1,
          scale: 1,
          zIndex: 1,
          clearProps: "transform"
        });
      }
    });

    // Animation sortante
    tl.to(currentSlideEl, {
      ...trans.out,
      duration: 0.6,
      ease: "power2.inOut"
    });

    // Préparer le slide entrant
    gsap.set(nextSlideEl, {
      ...trans.in,
      zIndex: 10
    });

    // Animation entrante
    tl.to(nextSlideEl, {
      ...trans.inTo,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");
  };

  // Animation d'entrée des éléments du slide (améliorée)
  useEffect(() => {
    const currentSlideElement = slidesContainerRef.current?.children[currentSlide];
    if (!currentSlideElement) return;

    const title = currentSlideElement.querySelector('.slide-title');
    const subtitle = currentSlideElement.querySelector('.slide-subtitle');
    const button = currentSlideElement.querySelector('.slide-button');
    const image = currentSlideElement.querySelector('.slide-image');

    // Animation plus sophistiquée avec délais échelonnés
    const tl = gsap.timeline();

    // Reset initial
    gsap.set([title, subtitle, button], {
      y: 60,
      opacity: 0,
      rotationX: -15
    });

    gsap.set(image, {
      scale: 1.15,
      opacity: 0,
      rotationY: 10
    });

    // Animations d'entrée
    tl.to(title, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(subtitle, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.7")
    .to(button, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .to(image, {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=1");

  }, [currentSlide]);

  // Touch/Swipe support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Navigation avec les touches du clavier (améliorée)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating) return;

      switch (e.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case ' ': // Espace pour pause/play
          e.preventDefault();
          if (autoPlay) {
            setIsPaused(!isPaused);
          }
          break;
        case 'Home':
          goToSlide(0);
          break;
        case 'End':
          goToSlide(totalSlides - 1);
          break;
        default:
          // Touches numériques 1-9
          const num = parseInt(e.key);
          if (num >= 1 && num <= totalSlides) {
            goToSlide(num - 1);
          }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isAnimating, isPaused, autoPlay]);

  return (
    <section
      className="product-slider"
      ref={sliderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress bar pour auto-play */}
      {autoPlay && (
        <div className="auto-play-progress">
          <div
            className="progress-bar"
            style={{
              animationDuration: `${autoPlayDelay}ms`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          />
        </div>
      )}

      {/* Container des slides */}
      <div className="slides-container" ref={slidesContainerRef}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundColor: slide.backgroundColor }}
          >
            {/* Contenu textuel */}
            <div className="slide-content">
              <div className={`content-wrapper text-${slide.textAlign}`}>
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <button
                  className="slide-button"
                  data-cursor="hover"
                  onClick={slide.buttonAction}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>

            {/* Image du produit */}
            <div className="slide-image-container">
              <img
                src={slide.image}
                alt={slide.title}
                className="slide-image"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation flèches */}
      <button
        className="nav-arrow nav-arrow-left"
        onClick={() => prevSlide('slideRight')}
        disabled={isAnimating}
        data-cursor="hover"
        aria-label="Slide précédent"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        className="nav-arrow nav-arrow-right"
        onClick={() => nextSlide('slideLeft')}
        disabled={isAnimating}
        data-cursor="hover"
        aria-label="Slide suivant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Auto-play control */}
      {autoPlay && (
        <button
          className="auto-play-control"
          onClick={() => setIsPaused(!isPaused)}
          data-cursor="hover"
          aria-label={isPaused ? 'Reprendre' : 'Pause'}
        >
          {isPaused ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polygon points="5,3 19,12 5,21" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
              <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
            </svg>
          )}
        </button>
      )}

      {/* Indicateurs de slides */}
      {showIndicators && (
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              data-cursor="hover"
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Numérotation */}
      {showCounter && (
        <div className="slide-counter">
          <span className="current-number">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="separator">/</span>
          <span className="total-number">{String(totalSlides).padStart(2, '0')}</span>
        </div>
      )}
    </section>
  );
};

export default ProductSlider;