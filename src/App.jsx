import React from 'react';
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

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#F0F0F0' }}>
      {/* <Header /> */}
      <main className="md:p-8 p-4" >
          <HeroSection />
          <IntroSection />
          <BannerSection />
          <EstacionesSection />
          <TFExperience />
          <MapSection />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default App;
