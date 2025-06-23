import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scene3DRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animation d'entrée des éléments
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8')
    .from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .from(scene3DRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
    }, '-=1');

    return () => tl.kill();
  }, []);

  return (
    <div className="min-h-screen bg-chanel-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Contenu principal */}
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Texte principal */}
            <div className="text-center lg:text-left">
              <h1
                ref={titleRef}
                className="text-elegant text-5xl md:text-6xl lg:text-7xl font-bold text-chanel-black leading-tight mb-6"
              >
                L'Art du
                <br />
                <span className="text-chanel-gold">Soin</span>
              </h1>

              <p
                ref={subtitleRef}
                className="text-lg md:text-xl text-chanel-gray-600 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Découvrez l'excellence des soins Chanel, où tradition et innovation se rencontrent pour révéler la beauté naturelle de votre peau.
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="bg-chanel-black text-chanel-white px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-chanel-gray-800 transition-elegant"
                  data-cursor="hover"
                >
                  Découvrir nos soins
                </Link>
                <button
                  className="border border-chanel-black text-chanel-black px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-chanel-black hover:text-chanel-white transition-elegant"
                  data-cursor="hover"
                >
                  En savoir plus
                </button>
              </div>
            </div>

            {/* Zone 3D */}
            <div
              ref={scene3DRef}
              className="relative h-96 lg:h-[500px] bg-gradient-to-br from-chanel-beige to-chanel-cream rounded-lg shadow-xl"
            >
              {/* Placeholder pour la scène 3D */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-chanel-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-4xl">✨</span>
                  </div>
                  <p className="text-chanel-gray-600 text-sm">
                    Scène 3D à venir
                    <br />
                    (Three.js)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-chanel-gold/30 rounded-full opacity-50" />
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-chanel-beige/50 rounded-full" />
      </section>

      {/* Section présentation */}
      <section className="py-20 bg-chanel-beige/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-elegant text-3xl md:text-4xl font-semibold text-chanel-black mb-8">
              Une Expérience Sensorielle Unique
            </h2>
            <p className="text-lg text-chanel-gray-700 leading-relaxed mb-12">
              Chaque produit de soin Chanel est une invitation au voyage,
              une expérience qui transcende les sens et révèle l'éclat naturel de votre beauté.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-chanel-black rounded-full flex items-center justify-center">
                  <span className="text-chanel-white text-xl">🌿</span>
                </div>
                <h3 className="text-elegant text-xl font-semibold mb-2">Ingrédients Naturels</h3>
                <p className="text-chanel-gray-600">
                  Des actifs d'exception soigneusement sélectionnés
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-chanel-black rounded-full flex items-center justify-center">
                  <span className="text-chanel-white text-xl">🔬</span>
                </div>
                <h3 className="text-elegant text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-chanel-gray-600">
                  La recherche au service de votre beauté
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-chanel-black rounded-full flex items-center justify-center">
                  <span className="text-chanel-white text-xl">✨</span>
                </div>
                <h3 className="text-elegant text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-chanel-gray-600">
                  L'art du raffinement français
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;