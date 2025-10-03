import React from 'react';
import Container from '../ui/Container';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-gray-900 text-white py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-black uppercase tracking-wider mb-4">
              TECNOFIT
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Tecnología como evolución del rendimiento. En 40 minutos, vivís una experiencia 
              exclusiva, dinámica y efectiva en tu propio box.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <p className="font-semibold">📞 CEL: 1134 000 000</p>
              <p className="font-semibold">📍 CRISTO REDENTOR, BUENOS AIRES</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#entrenamientos" className="text-gray-300 hover:text-white transition-colors">Entrenamientos</a></li>
              <li><a href="#ubicacion" className="text-gray-300 hover:text-white transition-colors">Ubicación</a></li>
              <li><a href="#contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Entrenamiento por estaciones</li>
              <li className="text-gray-300">Tecnología integrada</li>
              <li className="text-gray-300">Clases personalizadas</li>
              <li className="text-gray-300">Seguimiento de progreso</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 TECNOFIT. Todos los derechos reservados. 
            <span className="block mt-2">
              Desarrollado con ❤️ para tu rendimiento
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
