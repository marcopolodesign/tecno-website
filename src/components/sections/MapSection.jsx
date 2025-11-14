import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTAButton from '../ui/CTAButton';

gsap.registerPlugin(ScrollTrigger);

const MapSection = ({ onOpenContact }) => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Map animation
        if (mapRef.current) {
          gsap.fromTo(mapRef.current, 
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: mapRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Content animation
        if (contentRef.current) {
          gsap.fromTo(contentRef.current, 
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentRef.current,
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
      id="ubicacion"
      className="sm:py-16 py-8 md:py-24 bg-[#F0F0F0]"
    >
      <div className="msm:ax-w-7xl mx-auto sm:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Map Container */}
          <div 
            ref={mapRef}
            className="w-full lg:w-1/2 h-[400px] md:h-[520px] rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.1234567890!2d-58.4123456!3d-34.5876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd1912126686e65ac!2sTecnoFit!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TecnoFit Location"
            ></iframe>
          </div>

          {/* Content */}
          <div 
            ref={contentRef}
            className="w-full lg:w-1/2 flex flex-col gap-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-black font-firs leading-tight">
              Costa Rica 5823, Palermo, Ciudad Autónoma de Buenos Aires
              </h2>
              <p className="text-xl md:text-2xl text-black font-firs">
              +54 9 11 2297-7747
              </p>
            </div>
            
            <div ref={ctaRef}>
              <CTAButton 
                backgroundColor="#F45F37" 
                color="#000"
                className="w-full max-w-sm"
                onClick={onOpenContact}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
