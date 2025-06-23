import { useEffect, useState } from 'react';
import Hero3D from '../../components/Hero3D/Hero3D.jsx';
import Loader from '../../components/Loader/Loader.jsx'; // Import corrigé
import TextSection from '../../components/TextSection/TextSection.jsx';
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar.jsx';
import './Home.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    // Permettre le scroll après le chargement
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    // Désactiver le scroll pendant le chargement
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  if (isLoading) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="home-page">
      {/* Hero Section avec objet 3D */}
      <Hero3D />

      {/* Section avec texte animé */}
      <TextSection />

      {/* Navigation en bas */}
      <BottomNavbar />
    </div>
  );
};

export default Home;