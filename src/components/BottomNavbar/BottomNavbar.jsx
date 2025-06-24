// Fichier: src/components/BottomNavbar/BottomNavbar.jsx
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import './BottomNavbar.css';

const BottomNavbar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [portalContainer, setPortalContainer] = useState(null);

  const navItems = [
    {name: 'CHANEL', path: '/', isLogo: true},
    {name: 'Nos produits', path: '/products'},
    {name: 'Nos gammes', path: '/gammes'},
    {name: 'Ma routine', path: '/routine'},
  ];

  useEffect(() => {
    // Créer un conteneur spécialement pour la navbar
    let container = document.getElementById('navbar-center');

    setPortalContainer(container);

    // Cleanup
    return () => {
      // On ne supprime pas le conteneur pour éviter les re-renders
    };
  }, []);

  const navbarContent = (
    <div className="navbar-center">
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
    </div>
  );

  // Utiliser createPortal pour rendre la navbar directement dans le body
  return portalContainer ? createPortal(navbarContent, portalContainer) : null;
};

export default BottomNavbar;