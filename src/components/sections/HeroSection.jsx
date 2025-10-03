import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Bubbles from '../ui/Bubbles';
import Logo from '../../assets/svg/Logo';
import landingImg from '../../assets/landing-img.png';

const HeroSection = () => {
  const heroRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightContentRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (!heroRef.current) return;

      const ctx = gsap.context(() => {
        // Get refs safely
        const leftImage = leftImageRef.current;
        const rightContent = rightContentRef.current;
        const cta = ctaRef.current;

        if (!leftImage || !rightContent || !cta) return;

        // Initial setup - hide elements
        gsap.set([leftImage, rightContent, cta], {
          opacity: 0,
          y: 50,
        });

        // Check if mobile
        const isMobile = window.innerWidth < 768;
        
        // Animate left image
        gsap.to(leftImage, {
          opacity: 1,
          y: isMobile ? -48 : 0, // -48px (translate-y-12) on mobile, 0 on desktop
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
        });

        // Set right content to visible without animation
        gsap.set(rightContent, {
          opacity: 1,
          y: 0,
        });

        // Set CTA button to visible without animation
        gsap.set(cta, {
          opacity: 1,
          y: 0,
        });

      }, heroRef);

      return () => {
        if (ctx) ctx.revert();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleCtaClick = () => {
    // Scroll to contact section or open booking modal
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="inicio"
      className="relative md:min-h-[95vh] flex items-center overflow-hidden rounded-xl md:rounded-4xl flex-col-reverse md:flex-row"
    >
      {/* Left Side - Image */}
      <div 
        ref={leftImageRef}
        className="relative min-h-[50vh] w-[90%] md:min-h-[95vh] md:w-1/2 -translate-y-12 md:translate-y-0 justify-center md:justify-start z-20 rounded-xl md:rounded-none overflow-hidden items-center md:items-start"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat flex items-center justify-center md:justify-start md:items-start"
          style={{
            backgroundImage: `url(${landingImg})`
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Overlay Text */}
          <div className="relative z-20 m-10 text-white md:max-w-md">
            <h2 className="text-center md:text-left text-4xl font-semibold mb-2 leading-tight font-firs">
              5 boxes, 40 minutos, 1 entrenamiento completo
            </h2>
          </div>
          
        
        </div>
      </div>

      {/* Right Side - Content */}
      <div 
        ref={rightContentRef}
        className="md:min-h-[95vh] md:w-1/2 flex flex-col justify-between items-center relative p-5 overflow-hidden rounded-xl md:rounded-none"
      >
        {/* Background Bubbles */}
        <Bubbles />
          <div className="mb-12 w-full">
            <Logo 
              variant="full"
              className="w-full h-auto relative z-20"
            />
          </div>
          
          {/* CTA Button */}
          <div ref={ctaRef} className="mb-12">
            <button
              onClick={handleCtaClick}
              className="text-white font-medium text-lg px-12 py-4 transform hover:scale-105 transition-all duration-300 uppercase tracking-wide w-full max-w-sm font-space"
              style={{
                borderRadius: '160.054px',
                border: '1.601px solid #FFF',
                background: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(5.300000190734863px)'
              }}
            >
              PROBA UNA CLASE GRATIS
            </button>
          </div>
                 
          {/* Contact Info */}
          <div className="space-y-3 text-base md:text-lg w-full relative z-20 opacity-0 md:opacity-100">
            <p className="text-lg text-white text-right font-space">+54 9 11 3455 0000</p>
            <p className="text-lg text-white text-right font-space uppercase">Costa Rica 3060, Buenos Aires</p>
        </div>
      </div>

      </section>
    );
  };

export default HeroSection;