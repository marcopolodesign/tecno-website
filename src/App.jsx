import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
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
import WhatsAppFloatingButton from './components/ui/WhatsAppFloatingButton';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Check for #modal in URL on mount and when hash changes
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#modal') {
        setIsContactOpen(true)
        // Remove hash from URL without reloading
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }

    // Check on mount
    checkHash()

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash)

    return () => {
      window.removeEventListener('hashchange', checkHash)
    }
  }, [])

  return (
    <div className="App" style={{ backgroundColor: '#F0F0F0' }}>
      {/* <Header /> */}
      <main className="md:p-8 p-4" >
          <HeroSection onOpenContact={() => setIsContactOpen(true)} />
          <IntroSection onOpenContact={() => setIsContactOpen(true)} />
          {window.innerWidth >= 768 && <BannerSection />}
          <EstacionesSection onOpenContact={() => setIsContactOpen(true)} />
          <TFExperience onOpenContact={() => setIsContactOpen(true)} />
          <MapSection onOpenContact={() => setIsContactOpen(true)} />
      </main>
      <Footer onOpenContact={() => setIsContactOpen(true)} />
      <BottomNav onOpenContact={() => setIsContactOpen(true)} />
      <ContactSidecart 
        isOpen={isContactOpen} 
        onClose={() => {
          setIsContactOpen(false)
          // Remove hash if it exists
          if (window.location.hash === '#modal') {
            window.history.replaceState(null, '', window.location.pathname + window.location.search)
          }
        }} 
      />
      <WhatsAppFloatingButton />
      <Analytics />
    </div>
  );
}

export default App;
