import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const menuRef = useRef(null);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Produits', path: '/products' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Gérer le scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu lors du changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Animation du menu mobile
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isOpen) {
      gsap.set(menu, { display: 'flex' });
      gsap.fromTo(menu,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => gsap.set(menu, { display: 'none' })
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Navigation principale */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-chanel-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link
              to="/"
              className="text-elegant text-2xl font-bold text-chanel-black hover:text-chanel-gold transition-elegant"
              data-cursor="hover"
            >
              CHANEL
            </Link>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm uppercase tracking-wider font-medium transition-elegant hover:text-chanel-gold ${
                    location.pathname === item.path
                      ? 'text-chanel-gold'
                      : 'text-chanel-black'
                  }`}
                  data-cursor="hover"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col space-y-1 w-6 h-6 justify-center items-center"
              data-cursor="hover"
              aria-label="Menu"
            >
              <span
                className={`block w-6 h-0.5 bg-chanel-black transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-chanel-black transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-chanel-black transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        ref={menuRef}
        className="fixed top-20 left-0 right-0 bg-chanel-white/95 backdrop-blur-md z-40 md:hidden"
        style={{ display: 'none' }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col space-y-6">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-item text-lg font-medium transition-elegant hover:text-chanel-gold ${
                  location.pathname === item.path
                    ? 'text-chanel-gold'
                    : 'text-chanel-black'
                }`}
                data-cursor="hover"
              >
                {item.name}
              </Link>
            ))}

            {/* Bouton CTA mobile */}
            <div className="mobile-nav-item pt-4 border-t border-chanel-gray-200">
              <button
                className="w-full bg-chanel-black text-chanel-white py-3 px-6 text-sm uppercase tracking-wider font-medium hover:bg-chanel-gray-800 transition-elegant"
                data-cursor="hover"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pour fermer le menu mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;