import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Bubbles = () => {
  const bubble1Ref = useRef(null);
  const bubble2Ref = useRef(null);
  const bubble3Ref = useRef(null);
  const bubble4Ref = useRef(null);

  useEffect(() => {
    // Create floating animations for each bubble
    const bubble1 = bubble1Ref.current;
    const bubble2 = bubble2Ref.current;
    const bubble3 = bubble3Ref.current;
    const bubble4 = bubble4Ref.current;

    if (!bubble1 || !bubble2 || !bubble3 || !bubble4) return;

      // Create individual animations for each bubble that run simultaneously
      const anim1 = gsap.to(bubble1, {
        y: -180,
        x: 90,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      });

      const anim2 = gsap.to(bubble2, {
        y: 135,
        x: -120,
        duration: 3.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      });

      const anim3 = gsap.to(bubble3, {
        y: -105,
        x: 75,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      });

      const anim4 = gsap.to(bubble4, {
        y: 150,
        x: -90,
        duration: 4.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      });

    return () => {
      anim1.kill();
      anim2.kill();
      anim3.kill();
      anim4.kill();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Bubble 1 - Dark Gray */}
      <div 
        ref={bubble1Ref}
        className="absolute w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw]"
        style={{
          borderRadius: '50%',
          background: '#1a1a1a',
          filter: 'blur(55.900001525878906px)',
          top: '0%',
          left: '-10%',
        }}
      />
      {/* Bubble 2 - Orange Accent */}
      <div 
        ref={bubble2Ref}
        className="absolute w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw]"
        style={{
          borderRadius: '50%',
          background: '#FF6B35',
          filter: 'blur(55.900001525878906px)',
          top: '-25%',
          right: '-7%',
        }}
      />
      {/* Bubble 3 - Charcoal */}
      <div 
        ref={bubble3Ref}
        className="absolute w-[50vw] h-[50vw] md:w-[25vw] md:h-[25vw]"
        style={{
          borderRadius: '50%',
          background: '#222',
          filter: 'blur(55.900001525878906px)',
          bottom: '-10%',
          left: '-5%',
        }}
      />
      {/* Bubble 4 - Deep Black with Orange tint */}
      <div 
        ref={bubble4Ref}
        className="absolute w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw]"
        style={{
          borderRadius: '50%',
          background: '#0f0f0f',
          filter: 'blur(55.900001525878906px)',
          bottom: '-5%',
          right: '-20%',
        }}
      />
    </div>
  );
};

export default Bubbles;
