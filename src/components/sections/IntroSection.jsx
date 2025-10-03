import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';
import Container from '../ui/Container';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
      // Text animation
      if (textRef.current) {
        gsap.fromTo(textRef.current, 
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Left image animation
      if (leftImageRef.current) {
        gsap.fromTo(leftImageRef.current,
          { opacity: 0, x: -60, rotation: -5 },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftImageRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Right image animation
      if (rightImageRef.current) {
        gsap.fromTo(rightImageRef.current,
          { opacity: 0, x: 60, rotation: 5 },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightImageRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // CTA button animation
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      }, sectionRef);

      return () => {
        if (ctx) ctx.revert();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleCtaClick = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="entrenamientos"
      className="py-16 md:py-24 bg-gray-50"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Image */}
          <div 
            ref={leftImageRef}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="relative">
              {/* Placeholder for exercise image */}
              <div className="aspect-square bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💪</span>
                    </div>
                    <p className="text-sm font-semibold">MOVIMIENTO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div ref={textRef} className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                En tu propio box y en 40 minutos, vivís una experiencia exclusiva, dinámica y efectiva: tecnología como evolución del rendimiento.
              </h2>
              
              <div ref={ctaRef} className="mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto"
                >
                  PROBA UNA CLASE GRATIS
                </Button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div 
            ref={rightImageRef}
            className="lg:col-span-3 order-3"
          >
            <div className="relative">
              {/* Placeholder for silhouette image */}
              <div className="aspect-square bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🧘</span>
                    </div>
                    <p className="text-sm font-semibold">EQUILIBRIO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default IntroSection;
