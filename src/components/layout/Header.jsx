import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { openWhatsApp } from '../../utils/whatsapp';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, item) => {
    if (item.label === 'Contacto') {
      e.preventDefault();
      openWhatsApp();
    }
  };

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Entrenamientos', href: '#estaciones' },
    { label: 'Ubicación', href: '#ubicacion' },
    { label: 'Contacto', href: '#contacto' },
  ];

  useEffect(() => {
    if (isScrolled) {
      gsap.to('.nav-backdrop', {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        duration: 0.3,
      });
    } else {
      gsap.to('.nav-backdrop', {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(5px)',
        duration: 0.3,
      });
    }
  }, [isScrolled]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-backdrop bg-black/40 backdrop-blur-md transition-all duration-300">
      <nav className="container-max section-padding">
        <div className="flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-white">
            TECNOFIT
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="text-white hover:text-orange-300 transition-colors duration-300 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
