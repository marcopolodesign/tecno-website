import React from 'react';
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import MetricsSection from './components/sections/MetricsSection';
import MethodologySection from './components/sections/MethodologySection';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <main className="md:p-8 p-4 bg-background">
          <HeroSection />
          <IntroSection />
          <MetricsSection />
          <MethodologySection />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default App;
