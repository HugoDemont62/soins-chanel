// Fichier: src/App.jsx - AVEC SOUNDCONTROL STICKY GLOBAL
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useLenis } from './hooks/useLenis';

// Components
import Loader from './components/Loader/Loader.jsx';
import PageTransition from './components/CustomPages/PageTransition.jsx';
import CustomCursor from './components/CustomPages/CustomCursor.jsx';
import SoundControl from './components/SoundControl/SoundControl.jsx'; // ← AJOUTÉ

// Pages
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';
import MaRoutine from './pages/MaRoutine/MaRoutine.jsx';
import RoutineSelection from './pages/RoutineSelection/RoutineSelection.jsx';
import RoutineQuestionnaire from './pages/RoutineQuestionnaire/RoutineQuestionnaire.jsx';
import PersonalityReveal from './pages/PersonalityReveal/PersonalityReveal.jsx';
import RoutineResults from './pages/RoutineResults/RoutineResults.jsx';
import RoutineProducts from './pages/RoutineProducts/RoutineProducts.jsx';

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

  // Initialiser Lenis pour le smooth scroll
  const { lenis, scrollTo } = useLenis();

  // Exposer scrollTo globalement si nécessaire
  useEffect(() => {
    window.scrollToSmooth = scrollTo;
  }, [scrollTo]);

  return (
    <>
      {/* Curseur personnalisé */}
      <CustomCursor />

      {/* CONTRÔLE DU SON STICKY - GLOBAL SUR TOUTE L'APP */}
      <SoundControl />

      {/* Contenu principal avec transitions */}
      <PageTransition pathname={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/routine" element={<MaRoutine />} />
          <Route path="/routine/selection" element={<RoutineSelection />} />
          <Route path="/routine/questionnaire/:type" element={<RoutineQuestionnaire />} />
          <Route path="/routine/results/:type" element={<RoutineResults />} />
          <Route path="/routine/personality/:type" element={<PersonalityReveal />} />
          <Route path="/routine/product/:type" element={<RoutineProducts />} />
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