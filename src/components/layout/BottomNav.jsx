import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        left: isScrolled ? '50%' : '5%',
        x: isScrolled ? '-50%' : '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [isScrolled]);

  useEffect(() => {
    // Set initial position to left on load
    if (containerRef.current) {
      gsap.set(containerRef.current, {
        left: '0%',
        x: '0%',
      });
    }
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Entrenamientos', href: '#entrenamientos' },
    { label: 'Ubicación', href: '#ubicacion' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-10 left-10 px-8 py-4 z-20 flex justify-center backdrop-blur-xl transition-all duration-500 ease-out " 
    style={{ 
        justifyContent: 'flex-start',
        borderRadius: '100px',
        border: !isScrolled ? '1px solid #FFF' : '1px solid #edeaea',
        background: 'rgba(255, 255, 255, 0.30)',
      //   backdropFilter: 'blur(250px)',
    
   
      }}
      >
      <nav 
        ref={navRef}
        className="flex space-x-8 px-8 max-w-fit "
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="transition-colors duration-300 font-medium text-sm md:text-base"
            style={{
              color: isScrolled ? '#585858' : '#fff',
            //   mixBlendMode: 'difference',
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
