import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { openWhatsApp } from '../../utils/whatsapp';

const BottomNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldCenter = scrollY > 100; // Start centering after 100px scroll
      setIsScrolled(shouldCenter);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    // Only animate on desktop
    if (window.innerWidth >= 768 && containerRef.current) {
      gsap.to(containerRef.current, {
        left: isScrolled ? '50%' : '5%',
        x: isScrolled ? '-50%' : '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [isScrolled]);

  useEffect(() => {
    // Set initial position to left on load (desktop only)
    if (window.innerWidth >= 768 && containerRef.current) {
      gsap.set(containerRef.current, {
        left: '0%',
        x: '0%',
      });
    }
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

  return (
    <div 
      ref={containerRef} 
      className="fixed bottom-0 md:bottom-10 left-0 md:left-10 w-full md:w-auto px-0 md:px-8 py-4 z-20 flex justify-center backdrop-blur-xl md:transition-all md:duration-500 md:ease-out border-t md:border md:rounded-[100px]" 
      style={{ 
        justifyContent: window.innerWidth >= 768 ? 'flex-start' : 'center',
        borderColor: !isScrolled ? '#FFF' : '#edeaea',
        background: 'rgba(255, 255, 255, 0.30)',
      }}
    >
      <nav 
        ref={navRef}
        className="flex space-x-4 md:space-x-8 px-4 md:px-8 max-w-fit"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item)}
            className="transition-colors duration-300 font-medium text-sm md:text-base"
            style={{
              color: isScrolled ? '#585858' : '#fff',
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
