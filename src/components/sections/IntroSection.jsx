import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTAButton from '../ui/CTAButton';
import { colors } from '../../utils/colors';
import introImg from '../../assets/intro-img.jpg';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = ({ onOpenContact }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Image animation
        if (imageRef.current) {
          gsap.fromTo(imageRef.current, 
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: imageRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

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

        // CTA animation
        if (ctaRef.current) {
          gsap.fromTo(ctaRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top 85%',
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

  return (
    <section 
      ref={sectionRef}
      id="entrenamientos"
      className="sm:min-h-screen flex items-center justify-center md:px-8 md:py-24 py-12"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center">
          {/* Intro Image */}
          <div ref={imageRef} className="md:w-100 mx-auto">
            <img
              src={introImg}
              alt="TECNOFIT Training Experience"
              className="w-full max-w-4xl mx-auto"
            />
          </div>
          
          <div ref={textRef}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight font-firs mb-12 text-center max-w-4xl mx-auto md:-translate-y-10 -translate-y-6">
            Cada box, un entrenamiento diseñado para vos. Tecnología que impulsa tu evolución y transforma tu rendimiento
            </h2>
          </div>
          
          <div ref={ctaRef} className="flex justify-center">
            <CTAButton backgroundColor={colors.brand} color="#000" onClick={onOpenContact} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
