// Fichier: src/pages/Home/Home.jsx (version mise à jour avec ImageParallaxSection)
import { useEffect, useState } from 'react';
import Hero3D from '../../components/Hero3D/Hero3D.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ManifestoSection from '../../components/ManifestoSection/ManifestoSection.jsx';
import ProductSlider from '../../components/ProductSlider/ProductSlider.jsx';
import ImageParallaxSection from '../../components/ImageParallaxSection/ImageParallaxSection.jsx';
import MaRoutineSection from '../../components/MaRoutineSection/MaRoutineSection.jsx';

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
        {/* Hero 3D avec le modèle et les nuages */}
        <Hero3D />

        {/* Section manifesto avec les lettres qui s'animent */}
        <ManifestoSection />

        {/* Slider de produits */}
        <ProductSlider />

        {/* NOUVELLE SECTION : Parallax d'images en 3 colonnes */}
        <ImageParallaxSection />

        {/* Section Ma Routine avec l'image et le texte */}
        <MaRoutineSection />
      </div>
    </>
  );
};

export default Home;