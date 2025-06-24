// Fichier: src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// Components
import Loader from './components/Loader/Loader.jsx';
import PageTransition from './components/CustomPages/PageTransition.jsx';
import CustomCursor from './components/CustomPages/CustomCursor.jsx';

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
  const location = useLocation();

  return (
    <>
      {/* Curseur personnalisé */}
      <CustomCursor />

      {/* Contenu principal avec transitions */}
      <PageTransition pathname={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </PageTransition>
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