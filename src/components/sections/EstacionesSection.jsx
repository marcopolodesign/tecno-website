import React, { useEffect, useRef} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTAButton from '../ui/CTAButton';
import banner1 from '../../assets/banner-1.jpg';
import banner2 from '../../assets/banner-2.jpg';
import me1 from '../../assets/m-e-1.jpg';
import me2 from '../../assets/m-e-2.jpg';
import cardio from '../../assets/cardio.jpg';



gsap.registerPlugin(ScrollTrigger);

const EstacionesSection = ({ onOpenContact }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRefs = useRef([]);
  // const [isDesktop, setIsDesktop] = useState(false);

  // Workout steps data
  const workoutSteps = [
    {
      minutes: "0'",
      stepNumber: null,
      title: "Entrada en calor",
      description: "Estabilidad, equilibrio y coordinación. Según el día, también ejercicios cardiovasculares.",
      image: null,
      bgColor: "linear-gradient(90deg, #FFF5E6 0%, #FF6B35 100%)"
    },
    {
      minutes: "7'",
      stepNumber: "01",
      title: "Entrada en calor, core y postural",
      description: "",
      image: banner1,
      bgColor: "linear-gradient(180deg, #F0F0F0 0%, #FFF5E6 100%)"
    },
    {
      minutes: "14'",
      stepNumber: "02",
      title: "Metabólicos y dinámicos",
      description: "Movimientos intensos y funcionales que elevan el ritmo cardíaco y generan la energía de la sesión.",
      image: banner2,
      bgColor: "linear-gradient(180deg, #F0F0F0 26.1%, #FFDFCF 67.77%, #F4AB37 108.39%)"
    },
    {
      minutes: "21'",
      stepNumber: "03",
      title: "Musculación específica I",
      description: "Fuerza focalizada en grupos musculares concretos. Mejora potencia y control.",
      image: me1,
      bgColor: "linear-gradient(180deg, #F0F0F0 26.1%, #FFDFCF 67.77%, #FF8A35 108.39%)"
    },
    {
      minutes: "28'",
      stepNumber: "04",
      title: "Musculación específica II",
      description: "Fuerza focalizada en grupos musculares concretos. Mejora potencia y control.",
      image: me2,
      bgColor: "linear-gradient(180deg, #F0F0F0 26.1%, #FFDFCF 67.77%, #FF8A35 108.39%)"
    },
    {
      minutes: "32'",
      stepNumber: "05",
      title: "Propiocepción, coordinación o cardio",
      description: "Estabilidad, equilibrio y coordinación. Según el día, también ejercicios cardiovasculares.",
      image: cardio,
      bgColor: "linear-gradient(180deg, #F0F0F0 26.1%, #FFDFCF 67.77%, #FF3124 108.39%)"
    }, 
    {
      minutes: "40'",
      stepNumber: null,
      title: "Elongación",
      description: "Movilidad y flexibilidad para cerrar la sesión. Relajá la musculatura y recuperá el cuerpo para potenciar tu próxima experiencia.",
      image: null,
      bgColor: "linear-gradient(90deg, #F0F0F0 -4.71%, #96D9FB 60.07%, #376DF4 111.04%)"
    },
  ];

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkDesktop = () => {
      // setIsDesktop(window.innerWidth >= 768);
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
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Oaksun-style implementation with pinning and proper transforms
        if (cardRefs.current.length > 0) {
          // Set up cards with proper 3D properties (like Oaksun)
          gsap.set(cardRefs.current, {
            force3D: true,
            backfaceVisibility: "hidden"
          });
          
          // Store wrappers for later use
          const wrappers = [];
          
          // Create wrapper elements for each card (like Oaksun's card-wrapper)
          cardRefs.current.forEach((cardRef, index) => {
            if (cardRef) {
              // Create wrapper div for pinning
              const wrapper = document.createElement('div');
              wrapper.className = 'card-wrapper';
              wrapper.style.position = 'relative';
              
              // Wrap the card
              cardRef.parentNode.insertBefore(wrapper, cardRef);
              
              wrapper.appendChild(cardRef);
              wrapper.style.marginBottom = `${index * 30}px`;
              wrappers.push(wrapper);

              // Calculate target values with much larger spacing between cards
              // const targetY = -300 + (20 * index); // -300px, -100px, 100px, 300px (much larger gaps)
              // const targetScale = 0.94 + (0.03 * index); // 0.94, 0.97, 1.00, 1.03
              
              // Apply Oaksun-style animation
              gsap.to(cardRef, {
                // y: targetY,
                // scale: targetScale,
                rotationX: 0,
                transformOrigin: "center center",
                ease: "none",
                scrollTrigger: {
                  trigger: wrapper,
                  start: `top ${50 + index * 50}px`, // cada tarjeta se frena 30px después de la anterior
                  end: `top ${50 + index * 50}px`, // cada tarjeta se frena 30px después de la anterior
                  endTrigger: cardRefs.current[cardRefs.current.length - 1], // Last card
                  scrub: 1,
                  pin: true,
                  pinSpacing: false,
                  id: `work-card-${index}`,
                  anticipatePin: 1,
                  fastScrollEnd: true
                }
              });
            }
          });

          // Blur animation when last card passes 70% of viewport
          const lastCardIndex = cardRefs.current.length - 1;
          const lastCard = cardRefs.current[lastCardIndex];
          const lastCardWrapper = wrappers[lastCardIndex];
          const allCardsExceptLast = cardRefs.current.slice(0, lastCardIndex);

          if (lastCard && lastCardWrapper && allCardsExceptLast.length > 0) {
            // Create initial state for all cards except last
            gsap.set(allCardsExceptLast, {
              filter: 'blur(0px)',
              y: 0,
              opacity: 1
            });

            // Create ScrollTrigger to observe when last card passes 70% of viewport
            ScrollTrigger.create({
              trigger: lastCardWrapper,
              start: 'top 70%', // When top of last card wrapper reaches 70% of viewport
              onEnter: () => {
                // When scrolling down past 70% - apply blur effect
                gsap.to(allCardsExceptLast, {
                  filter: 'blur(20px)',
                  y: -20,
                  opacity: 0,
                  duration: 0.8,
                  ease: 'power2.inOut'
                });
              },
              onLeaveBack: () => {
                // When scrolling up before reaching 70% - revert blur
                // This only fires when scrolling up BEFORE the trigger point
                gsap.to(allCardsExceptLast, {
                  filter: 'blur(0px)',
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: 'power2.inOut'
                });
              }
            });
          }
        }

      }, sectionRef);

      return () => {
        if (ctx) ctx.revert();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [workoutSteps.length]);

  return (
    <section 
      ref={sectionRef}
      id="boxes"
      className="py-16 md:py-24 bg-[#F0F0F0]"
    >
      <div className="md:max-w-7xl mx-auto md:px-8">
        <div className="relative flex flex-col justify-between">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-start">
            {/* Title */}
            <div ref={titleRef} className="mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-none font-firs ">
                Metodología de<br />
                entrenamiento por estación
              </h2>
            </div>

            {/* Paragraph */}
            <div ref={textRef} className="mb-12 flex flex-col md:flex-row justify-between items-start sm:items-end">
              <p className="text-lg md:text-xl text-black leading-relaxed font-firs md:max-w-3xl">
                Cada bloque tiene un propósito. Juntos, crean una experiencia completa en la que trabajás tu cuerpo de forma integral. Entrenamientos efectivos, seguros y guiados por coaches expertos, respaldados por tecnología de última generación.
              </p>

                {/* CTA Button - Bottom Right */}
                <div ref={ctaRef} className="flex justify-end mt-4 md:mt-0">
                    <CTAButton 
                    backgroundColor="#000"
                    color="#fff"
                    borderColor="#000"
                    className="w-auto"
                    onClick={onOpenContact}
                    />
                </div>
             </div>
           </div>

          {/* Workout Steps Timeline */}
          <div className="relative mt-24">
            {/* Cards Container with calculated height */}
            <div className="cards-container relative">
              {/* Steps Container - All cards with absolute positioning */}
              {workoutSteps.map((step, index) => (
                <div 
                  key={index} 
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="relative flex items-start gap-6 w-full mb-24" 
                  style={{
                    zIndex: index + 1
                  }}
                >
                     {/* Time Circle */}
                     <div 
                       className="w-10 h-10 bg-black rounded-full items-center justify-center z-10 hidden md:flex flex-shrink-0"
                     >
                      <span className="text-white font-bold text-xs">{step.minutes}</span>
                    </div>
                    
                    {/* Step Card */}
                    <div 
                      className={`w-full rounded-2xl overflow-hidden transition-all duration-300 flex-1 ${index === 0 ? '' : 'border border-black'}`}
                      style={{
                        background: step.bgColor,
                      }}
                    >
                      <div className="p-6 md:p-8 md:pb-10 flex flex-col md:flex-row items-start gap-6">
                        {/* Left Content */}
                        <div className="flex-1 flex ">
                          {/* Step Number */}
                          {step.stepNumber && (
                            <div className="text-6xl font-bold text-black mb-4 font-firs w-2/5 border-r border-black">
                              {step.stepNumber}.
                            </div>
                          )}
                          
                          <div className="flex flex-col justify-between max-w-3/5 pl-6">
                          {/* Title */}
                          <h3 className="text-2xl md:text-4xl font-bold text-black mb-12 font-firs md:pr-16">
                            {step.title}
                          </h3>
                          
                          {/* Description */}
                          {step.description && (
                            <p className="md:text-lg text-black leading-relaxed font-firs font-light">
                              {step.description}
                            </p>
                          )}
                          </div>
                        </div>
                        
                        {/* Right Image */}
                        {step.image && (
                          <div className="w-32 h-32 md:w-52 md:h-52 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstacionesSection;
