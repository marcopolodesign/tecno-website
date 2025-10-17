import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../ui/Container';

gsap.registerPlugin(ScrollTrigger);

const MethodologySection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const trainingSteps = [
    {
      number: '01',
      title: 'Entrada en calor, core y postural',
      description: 'Estabilidad, equilibrio y coordinación. Según el día, también ejercicios cardiovasculares.',
      duration: '10 min',
      icon: '🧘‍♀️',
      color: 'from-orange-400 to-orange-500',
    },
    {
      number: '02',
      title: 'Metabólicos y dinámicos',
      description: 'Movimientos intensos y funcionales que elevan el ritmo cardíaco y generan la energía de la sesión.',
      duration: '7 min',
      icon: '⚡',
      color: 'from-orange-500 to-red-500',
    },
    {
      number: '03',
      title: 'Musculación específica I',
      description: 'Fuerza focalizada en grupos musculares concretos. Mejora potencia y control.',
      duration: '14 min',
      icon: '💪',
      color: 'from-red-500 to-red-600',
    },
    {
      number: '04',
      title: 'Musculación específica II',
      description: 'Complemento de fuerza en otras zonas, asegurando un desarrollo equilibrado.',
      duration: '21 min',
      icon: '🏋️‍♂️',
      color: 'from-red-600 to-amber-600',
    },
    {
      number: '05',
      title: 'Propiocepción, coordinación o cardio',
      description: 'Estabilidad, equilibrio y coordinación. Según el día, también ejercicios cardiovasculares.',
      duration: '28 min',
      icon: '🎯',
      color: 'from-amber-600 to-orange-700',
    },
  ];

  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
      // Animate section title
      const sectionTitle = sectionRef.current.querySelector('.section-title');
      if (sectionTitle) {
        gsap.fromTo(sectionTitle,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionTitle,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animate section description
      const sectionDescription = sectionRef.current.querySelector('.section-description');
      if (sectionDescription) {
        gsap.fromTo(sectionDescription,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionDescription,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animate timeline line
      const timelineLine = sectionRef.current.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animate each step
      trainingSteps.forEach((step, index) => {
        const stepElement = sectionRef.current?.querySelector(`[data-step="${index}"]`);
        if (!stepElement) return;

        gsap.fromTo(stepElement,
          { opacity: 0, x: -50, rotationY: -15 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepElement,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Stagger animation for step elements
        const stepContentElements = stepElement.querySelectorAll('.step-content > *');
        if (stepContentElements.length > 0) {
          gsap.fromTo(stepContentElements,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: stepElement,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

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
      className="py-16 md:py-24 bg-gray-50"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Metodología de entrenamiento por estación
          </h2>
          <p className="section-description text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Cada bloque tiene un propósito específico y se complementa con los demás para crear una experiencia integral. 
            La tecnología integrada permite adaptar cada ejercicio a tu nivel y objetivos personales.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-8 md:left-16 top-0 bottom-0 w-1 bg-gray-300 origin-top"></div>

          {/* Timeline Steps */}
          <div className="space-y-8 md:space-y-12">
            {trainingSteps.map((step, index) => (
              <div
                key={step.number}
                data-step={index}
                className="relative flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-8"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg md:text-xl">{step.number}</span>
                  </div>
                  
                  {/* Time indicator */}
                  <div className="absolute -right-2 -top-2 w-8 h-8 bg-white border-2 border-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-red-500">{step.duration}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="step-content flex-1 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 w-full">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-4 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{step.icon}</div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    
                    {/* Duration badge */}
                    <div className={`px-4 py-2 bg-gradient-to-r ${step.color} rounded-full`}>
                      <span className="text-white font-semibold text-sm">{step.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-center md:text-left">
                    {step.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${step.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${(parseInt(step.duration) / 28) * 100}%`,
                          transitionDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Time Summary */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-red-600 to-amber-500 text-white px-8 py-4 rounded-2xl shadow-xl">
              <span className="text-2xl font-bold">TOTAL: 40 MINUTOS</span>
              <span className="text-lg">⚡ ENTRENAMIENTO COMPLETO</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MethodologySection;
