// Fichier: src/pages/Home/Home.jsx
import { useEffect, useState } from 'react';
import Hero3D from '../../components/Hero3D/Hero3D.jsx';
import Loader from '../../components/Loader/Loader.jsx';
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
    return (
      <>
        <Loader onComplete={handleLoaderComplete} />
      </>
    );
  }

  return (
    <>
      <div className="home-page">
        <Hero3D />

        <TextSection />

        <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Section pour tester le scroll</h2>
        </div>
      </div>

      <BottomNavbar />
    </>
  );
};

export default Home;