import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../ui/Container';

gsap.registerPlugin(ScrollTrigger);

const MetricsSection = () => {
  const sectionRef = useRef(null);
  const [animatedValues, setAnimatedValues] = useState({
    minutes: 0,
    movements: 0,
    stations: 0,
    duration: 0,
  });

  const metrics = [
    {
      number: 200,
      suffix: '',
      label: 'MINUTOS DE ENTRENAMIENTO',
      key: 'minutes',
      icon: '⏱️',
    },
    {
      number: 200,
      suffix: '',
      label: 'MOVIMIENTOS ADAPTABLES',
      key: 'movements',
      icon: '🔄',
    },
    {
      number: 5,
      suffix: '',
      label: 'ESTACIONES',
      key: 'stations',
      icon: '🏋️',
    },
    {
      number: 40,
      suffix: '',
      label: 'MINUTOS',
      key: 'duration',
      icon: '⚡',
    },
  ];

  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        metrics.forEach((metric, index) => {
          const element = sectionRef.current?.querySelector(`[data-metric="${metric.key}"]`);
          if (!element) return;

          gsap.fromTo(element,
            { opacity: 0, y: 50, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          // Animate the numbers
          const numberTween = gsap.fromTo(
            { value: 0 },
            {
              value: metric.number,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                setAnimatedValues(prev => ({
                  ...prev,
                  [metric.key]: Math.round(this.targets()[0].value)
                }));
              },
              scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
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
      className="py-16 md:py-24 bg-white"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <div
              key={metric.key}
              data-metric={metric.key}
              className="text-center group"
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-amber-500 rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>
              </div>

              {/* Number */}
              <div className="mb-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-gradient">
                  {animatedValues[metric.key] || 0}
                </span>
                {metric.suffix && (
                  <span className="text-4xl md:text-5xl lg:text-6xl font-black text-gradient">
                    {metric.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide leading-tight">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Additional visual elements */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left image placeholder */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">😤</span>
                  </div>
                  <p className="text-lg font-semibold">INTENSIDAD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right image placeholder */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💪</span>
                  </div>
                  <p className="text-lg font-semibold">FUERZA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MetricsSection;
