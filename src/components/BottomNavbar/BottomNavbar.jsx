import { Link, useLocation } from 'react-router-dom';
import './BottomNavbar.css';

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'CHANEL', path: '/', isLogo: true },
    { name: 'Nos produits', path: '/products' },
    { name: 'Nos gammes', path: '/gammes' },
    { name: 'Ma routine', path: '/routine' }
  ];

  return (
    <nav className="bottom-navbar">
      <div className="navbar-container">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`navbar-item ${item.isLogo ? 'navbar-logo' : ''} ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;