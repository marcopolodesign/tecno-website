import React, { useState } from 'react';
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import BannerSection from './components/sections/BannerSection';
import EstacionesSection from './components/sections/EstacionesSection';
import TFExperience from './components/sections/TFExperience';
import MapSection from './components/sections/MapSection';
import MethodologySection from './components/sections/MethodologySection';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';
import ContactSidecart from './components/ContactSidecart';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="App" style={{ backgroundColor: '#F0F0F0' }}>
      {/* <Header /> */}
      <main className="md:p-8 p-4" >
          <HeroSection onOpenContact={() => setIsContactOpen(true)} />
          <IntroSection />
          {window.innerWidth >= 768 && <BannerSection />}
          <EstacionesSection />
          <TFExperience />
          <MapSection />
      </main>
      <Footer onOpenContact={() => setIsContactOpen(true)} />
      <BottomNav onOpenContact={() => setIsContactOpen(true)} />
      <ContactSidecart isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;
