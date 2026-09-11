import React, { useState } from 'react';
import { FontProvider } from './context/FontContext';
import { FontSwitcher } from './components/FontSwitcher';
import { EnvelopeModal } from './components/EnvelopeModal';
import { MusicPlayer } from './components/MusicPlayer';
import { BaratSection } from './components/BaratSection';
import { QuranicVerse } from './components/QuranicVerse';
import { ScratchCard } from './components/ScratchCard';
import { CountdownTimer } from './components/CountdownTimer';
import { BestCompliments } from './components/BestCompliments';
import { RSVPSection } from './components/RSVPSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <FontProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] relative selection:bg-[#D4AF37]/30 selection:text-[#2B231D] font-sans-clean overflow-x-hidden">
        {/* Background patterns and atmospheric gold ambient glows */}
        <div className="fixed inset-0 opacity-25 laser-cut-pattern pointer-events-none z-0" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(212,175,55,0.12)_0%,transparent_65%)] pointer-events-none z-0" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(184,134,11,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

        {/* Opening Envelope Interactive Experience */}
        <EnvelopeModal isOpen={isOpened} onOpen={() => setIsOpened(true)} />

        {/* Floating Audio Controller */}
        <MusicPlayer />

        {/* Floating Aesthetic Font Switcher */}
        <FontSwitcher />

        {/* Main Wedding Content Flow */}
        <main className="relative z-10 w-full flex flex-col items-center pt-4 pb-12">
          <BaratSection />
          <QuranicVerse />
          <ScratchCard />
          <CountdownTimer />
          <BestCompliments />
          <RSVPSection />
          <FooterSection />
        </main>
      </div>
    </FontProvider>
  );
}
