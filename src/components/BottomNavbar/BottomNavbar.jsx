// Fichier: src/components/BottomNavbar/BottomNavbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './BottomNavbar.css';

const BottomNavbar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [portalContainer, setPortalContainer] = useState(null);

  const navItems = [
    { name: 'CHANEL', path: '/', isLogo: true },
    { name: 'Nos produits', path: '/products' },
    { name: 'Nos gammes', path: '/gammes' },
    { name: 'Ma routine', path: '/routine' }
  ];

  useEffect(() => {
    // Créer un conteneur spécialement pour la navbar
    let container = document.getElementById('bottom-navbar-portal');

    if (!container) {
      container = document.createElement('div');
      container.id = 'bottom-navbar-portal';
      container.style.position = 'fixed';
      container.style.bottom = '0';
      container.style.left = '0';
      container.style.right = '0';
      container.style.zIndex = '999999';
      container.style.pointerEvents = 'none'; // Permettre aux enfants de recevoir les événements
      document.body.appendChild(container);
    }

    setPortalContainer(container);

    // Cleanup
    return () => {
      // On ne supprime pas le conteneur pour éviter les re-renders
    };
  }, []);

  const navbarContent = (
    <nav
      className="bottom-navbar-inner"
      style={{
        position: 'relative',
        width: '100%',
        pointerEvents: 'all', // Réactiver les événements pour la navbar
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 -4px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="navbar-container">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`navbar-item ${item.isLogo ? 'navbar-logo' : ''} ${
              location.pathname === item.path ? 'active' : ''
            }`}
            onClick={(e) => {
              console.log(`Navigation vers: ${item.path}`);
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );

  // Utiliser createPortal pour rendre la navbar directement dans le body
  return portalContainer ? createPortal(navbarContent, portalContainer) : null;
};

export default BottomNavbar;