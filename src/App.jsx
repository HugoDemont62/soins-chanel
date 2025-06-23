import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// Components
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import PageTransition from './components/PageTransition';
import Navigation from './components/Navigation';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';

// Hook pour détecter les changements de route
function RouteChangeHandler({ setIsTransitioning }) {
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);

    // Simuler un court délai de transition
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname, setIsTransitioning]);

  return null;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  // Gestion du loader initial
  const handleLoaderComplete = () => {
    setIsLoading(false);

    // Animation d'entrée du contenu principal
    gsap.fromTo('body',
      { overflow: 'hidden' },
      { overflow: 'auto', duration: 0.1 }
    );
  };

  // Désactiver le scroll pendant le chargement
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <>
      {/* Curseur personnalisé */}
      <CustomCursor />

      {/* Loader initial */}
      {isLoading && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      {/* Loader de transition */}
      {isTransitioning && !isLoading && (
        <Loader onComplete={() => {}} isPageTransition={true} />
      )}

      {/* Handler pour les changements de route */}
      <RouteChangeHandler setIsTransitioning={setIsTransitioning} />

      {/* Navigation */}
      <Navigation />

      {/* Contenu principal avec transitions */}
      <PageTransition pathname={location.pathname}>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<AboutPlaceholder />} />
            <Route path="/contact" element={<ContactPlaceholder />} />
          </Routes>
        </main>
      </PageTransition>

      {/* Footer */}
      <Footer />
    </>
  );
}

// Composants placeholder pour les pages manquantes
function AboutPlaceholder() {
  return (
    <div className="min-h-screen bg-chanel-beige/20 flex items-center justify-center pt-20">
      <div className="text-center">
        <h1 className="text-elegant text-4xl font-bold text-chanel-black mb-4">
          À Propos
        </h1>
        <p className="text-chanel-gray-600">
          Page en cours de développement
        </p>
      </div>
    </div>
  );
}

function ContactPlaceholder() {
  return (
    <div className="min-h-screen bg-chanel-beige/20 flex items-center justify-center pt-20">
      <div className="text-center">
        <h1 className="text-elegant text-4xl font-bold text-chanel-black mb-4">
          Contact
        </h1>
        <p className="text-chanel-gray-600">
          Page en cours de développement
        </p>
      </div>
    </div>
  );
}

// Composant Footer
function Footer() {
  return (
    <footer className="bg-chanel-black text-chanel-white py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">

          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="text-elegant text-2xl font-bold mb-4">
              CHANEL SOINS
            </div>
            <p className="text-chanel-white/70 max-w-md leading-relaxed">
              L'art du soin à la française.
              Découvrez nos collections exclusives dédiées à la beauté et au bien-être.
            </p>
          </div>

          {/* Navigation rapide */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-chanel-white/70 hover:text-chanel-white transition-elegant" data-cursor="hover">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/products" className="text-chanel-white/70 hover:text-chanel-white transition-elegant" data-cursor="hover">
                  Produits
                </a>
              </li>
              <li>
                <a href="/about" className="text-chanel-white/70 hover:text-chanel-white transition-elegant" data-cursor="hover">
                  À propos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-chanel-white/70 hover:text-chanel-white transition-elegant" data-cursor="hover">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-chanel-white/70">
              <p>Paris, France</p>
              <p>+33 1 42 86 28 00</p>
              <p>contact@chanel.com</p>
            </div>
          </div>
        </div>

        {/* Ligne de séparation et copyright */}
        <div className="border-t border-chanel-white/20 mt-12 pt-8 text-center">
          <p className="text-chanel-white/50 text-sm">
            © 2024 Chanel. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Composant App principal
function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;