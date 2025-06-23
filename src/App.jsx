import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// Components
import CustomCursor from './components/CustomPages/CustomCursor.jsx';
import Loader from './components/Loader/Loader.jsx';
import PageTransition from './components/CustomPages/PageTransition.jsx';
import Navigation from './components/CustomPages/Navigation.jsx';

// Pages
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';

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
  // const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  // Gestion du loader initial
  // const handleLoaderComplete = () => {
  //   setIsLoading(false);
  //
  //   // Animation d'entrée du contenu principal
  //   gsap.fromTo('body',
  //     { overflow: 'hidden' },
  //     { overflow: 'auto', duration: 0.1 }
  //   );
  // };

  // Désactiver le scroll pendant le chargement
  // useEffect(() => {
  //   if (isLoading) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  //
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [isLoading]);

  return (
    <>
      {/* Curseur personnalisé */}
      {/*<CustomCursor />*/}

      {/* Loader initial */}
      {/*{isLoading && (*/}
      {/*  <Loader onComplete={handleLoaderComplete} />*/}
      {/*)}*/}

      {/* Loader de transition */}
      {/*{isTransitioning && !isLoading && (*/}
      {/*  <Loader onComplete={() => {}} isPageTransition={true} />*/}
      {/*)}*/}

      {/* Handler pour les changements de route */}
      <RouteChangeHandler setIsTransitioning={setIsTransitioning} />

      {/* Navigation */}
      <Navigation />

      {/* Contenu principal avec transitions */}
      <PageTransition pathname={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Routes>
      </PageTransition>

      {/* Footer */}
      {/*<Footer />*/}
    </>
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