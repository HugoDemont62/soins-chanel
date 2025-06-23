import { useEffect, useState } from 'react';
import Hero3D from '../../components/Hero3D/Hero3D.jsx';
import {Loader} from '@react-three/drei';
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

      {/* Section supplémentaire pour démontrer le scroll */}
      <section className="additional-section">
        <div className="additional-content">
          <h2 className="additional-title">
            Une Expérience Sensorielle Unique
          </h2>
          <p className="additional-text">
            Chaque produit de soin Chanel est une invitation au voyage,
            une expérience qui transcende les sens et révèle l'éclat naturel de votre beauté.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🌿</div>
              <h3 className="feature-title">Ingrédients Naturels</h3>
              <p className="feature-description">
                Des actifs d'exception soigneusement sélectionnés
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🔬</div>
              <h3 className="feature-title">Innovation</h3>
              <p className="feature-description">
                La recherche au service de votre beauté
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <h3 className="feature-title">Excellence</h3>
              <p className="feature-description">
                L'art du raffinement français
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation en bas */}
      <BottomNavbar />
    </div>
  );
};

export default Home;