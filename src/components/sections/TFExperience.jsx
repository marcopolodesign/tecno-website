import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import banner1 from '../../assets/banner-1.jpg';
import banner2 from '../../assets/banner-2.jpg';
import introImg from '../../assets/intro-img.jpg';
import tf1 from '../../assets/tf-1.jpg';
import mockup from '../../assets/mock.png';

gsap.registerPlugin(ScrollTrigger);

const TFExperience = ({ onOpenContact }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const [isDesktop, setIsDesktop] = useState(false);

  // TF360 Experience cards based on Figma design
  const experienceCards = [
    {
      id: 1,
      title: "Rutina personalizada",
      description: "medida según días de entrenamiento elegidos",
      image: tf1, // Woman with raised arms exercise
      overlay: null
    },
    {
      id: 2,
      title: "5 boxes",
      description: "Rutinas a medida según días de entrenamiento elegidos",
      image: banner2, // Man doing barbell squat
      overlay:  null
    },
    {
      id: 3,
      title: "Entrenamiento en circuito",
      description: "Combina ejercicios de fuerza y cardio para maximizar resultados",
      image: introImg, // Woman in lunge pose
      overlay: null
    },
    {
      id: 4,
      title: "Progreso monitoreado",
      description: "Seguimiento detallado de las mejoras en fuerza y resistencia",
      image: mockup, // Man doing barbell squat
      overlay: null
    }
  ];

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Title animation
        if (titleRef.current) {
          gsap.fromTo(titleRef.current, 
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Cards animation
        if (cardRefs.current.length > 0) {
          cardRefs.current.forEach((cardRef, index) => {
            if (cardRef) {
              gsap.fromTo(cardRef, 
                { opacity: 0, y: 80, scale: 0.9 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1,
                  ease: 'power3.out',
                  delay: index * 0.2,
                  scrollTrigger: {
                    trigger: cardRef,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                  }
                }
              );
            }
          });
        }

      }, sectionRef);

      return () => {
        if (ctx) ctx.revert();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isDesktop]);

  return (
    <section 
      ref={sectionRef}
      id="tf-experience"
      className="sm:py-16 py-8 md:py-24 bg-[#F0F0F0] sm:mt-16 mt-8 "
    >
      <div className="sm:max-w-7xl mx-auto sm:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-none font-firs">
            Experiencia TF360®
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed font-firs mt-6 max-w-3xl mx-auto">
            Descubrí los beneficios de entrenar con nosotros.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experienceCards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative"
            >
              {/* Card */}
              <div className="relative h-96 rounded-2xl overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                
                {/* Trainer Overlay (for card 2) */}
                {card.overlay && card.overlay.type === "trainer" && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={card.overlay.image}
                        alt="Trainer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 font-firs leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed font-firs opacity-90">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={onOpenContact}
            className="bg-black text-white px-8 py-4 rounded-full font-firs font-bold text-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Comenzar Ahora
          </button>
        </div>
      </div>
    </section>
  );
};

export default TFExperience;
