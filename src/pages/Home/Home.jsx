// Fichier: src/pages/Home/Home.jsx (version mise à jour)
import { useEffect, useState } from 'react';
import Hero3D from '../../components/Hero3D/Hero3D.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ManifestoSection from '../../components/ManifestoSection/ManifestoSection.jsx';
import ProductSlider from '../../components/ProductSlider/ProductSlider.jsx'; // ← NOUVEAU
import TestSections from '../../components/TestSections/TestSections.jsx';
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar.jsx';
import './Home.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
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
    <>
      <div className="home-page">
        <Hero3D />
        <ManifestoSection />

        <ProductSlider />

        <TestSections />
      </div>
    </>
  );
};

export default Home;