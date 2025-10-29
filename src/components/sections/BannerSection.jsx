import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { colors } from '../../utils/colors';


const BannerSection = () => {
  const sectionRef = useRef(null);
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      // Use CSS transforms with will-change for better performance
      if (firstRowRef.current) {
        firstRowRef.current.style.willChange = 'transform';
        firstRowRef.current.style.transform = 'translateX(0)';
      }
      
      if (secondRowRef.current) {
        secondRowRef.current.style.willChange = 'transform';
        secondRowRef.current.style.transform = 'translateX(0)';
      }

      const ctx = gsap.context(() => {
        // First row animation - right to left (continuous, faster)
        if (firstRowRef.current) {
          gsap.to(firstRowRef.current, {
            x: '-33.333%',
            duration: 20,
            ease: 'none',
            repeat: -1,
          });
        }

        // Second row animation - left to right (continuous, slower)
        if (secondRowRef.current) {
          gsap.to(secondRowRef.current, {
            x: '-33.333%',
            duration: 30,
            ease: 'none',
            repeat: -1,
          });
        }

      }, sectionRef);

      return () => {
        if (ctx) ctx.revert();
        // Clean up will-change
        if (firstRowRef.current) firstRowRef.current.style.willChange = 'auto';
        if (secondRowRef.current) secondRowRef.current.style.willChange = 'auto';
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Content for the first row
  const bannerText1Content = (
    <>
      <span className="text-black"> 40 MINUTOS DE ENTRENAMIENTO</span>
      <span className="text-black"> • </span>
      <span style={{ color: colors.brand }}>5</span>
      <span className="text-black"> ESTACIONES</span>
      <span className="text-black"> • </span>
      <span className="text-black">4OO MOVIMIENTOS ADAPTABLES • </span>
    </>
  );

  // Content for the second row
  const bannerText2Content = (
    <>
      <span style={{ color: colors.brand }}>5</span>
      <span className="text-black"> ESTACIONES</span>
      <span className="text-black"> • </span>
      <span className="text-black">4OO MOVIMIENTOS ADAPTABLES</span>
      <span className="text-black"> • </span>
      <span className="text-black">40 MINUTOS DE ENTRENAMIENTO</span>
      <span className="text-black"> • </span>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden py-16 md:py-20 font-firs uppercase text-5xl md:text-7xl lg:text-8xl font-bol md:-mx-8 -mx-4 "
      style={{
        zIndex: 10,
        minHeight: window.innerWidth < 768 ? '40vh' : '60vh'
      }}
    >
      {/* Left Image (Banner 1) */}
      {/* <img
        src={banner1}
        alt="Training intensity"
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[200px] md:w-[300px] lg:w-[300px] h-auto object-cover rounded-lg"
        style={{ zIndex: 12, transform: 'translateY(-40%) translateX(30%)' }}
      /> */}

      {/* Right Image (Banner 2) */}
      {/* <img
        src={banner2}
        alt="Woman training"
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[200px] md:w-[300px] lg:w-[400px] h-auto object-cover rounded-lg"
        style={{ zIndex: 12, transform: 'translateY(-30%) translateX(-25%)' }}
      /> */}

      {/* Text Container */}
      <div className="relative w-full overflow-hidden">
        {/* First row of text (Right to Left) */}
        <div 
          ref={firstRowRef} 
          className="flex items-center justify-start whitespace-nowrap"
          style={{ zIndex: 11, width: '300%' }}
        >
          <div className="flex items-center">
            {Array(3).fill(bannerText1Content).map((text, i) => (
              <span key={i} className="inline-block px-6">
                {text}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            {Array(3).fill(bannerText1Content).map((text, i) => (
              <span key={`dup1-${i}`} className="inline-block px-6">
                {text}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            {Array(3).fill(bannerText1Content).map((text, i) => (
              <span key={`dup2-${i}`} className="inline-block px-6">
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Second row of text (Left to Right) */}
        <div 
          ref={secondRowRef} 
          className="flex items-center justify-start whitespace-nowrap mt-16"
          style={{ zIndex: 30, width: '300%' }}
        >
          <div className="flex items-center">
            {Array(3).fill(bannerText2Content).map((text, i) => (
              <span key={i} className="inline-block px-6">
                {text}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            {Array(3).fill(bannerText2Content).map((text, i) => (
              <span key={`dup1-${i}`} className="inline-block px-6">
                {text}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            {Array(3).fill(bannerText2Content).map((text, i) => (
              <span key={`dup2-${i}`} className="inline-block px-6">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
