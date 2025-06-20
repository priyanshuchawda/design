
import React, { useEffect, useState } from 'react';
import SEOHead from '../components/SEOHead';
import IntroSequence from '../components/IntroSequence';
import WelcomeMessage from '../components/WelcomeMessage';
import DevCommentary from '../components/DevCommentary';
import CommandConsole from '../components/CommandConsole';
import CyberpunkGrid from '../components/CyberpunkGrid';
import CreativitySection from '../components/sections/CreativitySection';
import MotionSection from '../components/sections/MotionSection';
import BreathingSection from '../components/sections/BreathingSection';
import ExplorationSection from '../components/sections/ExplorationSection';
import ImaginationSection from '../components/sections/ImaginationSection';
import ReflectionSection from '../components/sections/ReflectionSection';
import { useNarrative } from '../hooks/useNarrative';
import { useMemorySystem } from '../hooks/useMemorySystem';
import { useKeyboardListener } from '../hooks/useKeyboardListener';

const Index = () => {
  const { 
    discoveries, 
    currentSection, 
    secretModeUnlocked, 
    addDiscovery, 
    updateSection,
    getSectionNarrative
  } = useNarrative();

  const { memoryData, welcomeMessage, updateMemory } = useMemorySystem();
  
  const [showIntro, setShowIntro] = useState(true);
  const [showNarrative, setShowNarrative] = useState(false);
  const [appReady, setAppReady] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setAppReady(true);
    if (welcomeMessage && memoryData?.visitCount > 1) {
      setTimeout(() => setShowNarrative(true), 500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!appReady) return;
      
      const sections = document.querySelectorAll('section');
      const scrollPos = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          const sectionNames = ['CHAOS_CORE', 'MOTION_FLUX', 'VOID_SPACE', 'EXPLORATION_MATRIX', 'DREAM_STATE', 'REFLECTION_CHAMBER'];
          updateSection(sectionNames[index] || 'UNKNOWN');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateSection, appReady]);

  useEffect(() => {
    if (appReady) {
      const timer = setTimeout(() => setShowNarrative(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [currentSection, appReady]);

  useEffect(() => {
    if (memoryData && discoveries > memoryData.totalDiscoveries) {
      updateMemory({ 
        totalDiscoveries: discoveries,
        secretModeUnlocked: secretModeUnlocked || memoryData.secretModeUnlocked
      });
    }
  }, [discoveries, secretModeUnlocked, memoryData, updateMemory]);

  const { showConsole, closeConsole } = useKeyboardListener();

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">
      <SEOHead />
      
      {/* Intro Sequence */}
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}
      
      {/* Command Console Easter Egg */}
      <CommandConsole isOpen={showConsole} onClose={closeConsole} />
      
      {/* Main App Content */}
      {appReady && (
        <>
          {/* Cyberpunk grid overlay */}
          <CyberpunkGrid />
          
          {/* Welcome Message for returning visitors */}
          {welcomeMessage && memoryData?.visitCount > 1 && (
            <WelcomeMessage message={welcomeMessage} />
          )}
          
          {/* Developer Commentary */}
          <DevCommentary />
          
          {/* Narrative overlay */}
          {showNarrative && !welcomeMessage && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 
                            bg-black/90 border border-purple-400 p-4 sm:p-6 text-center animate-fade-in
                            max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="text-purple-400 font-mono text-xs sm:text-sm mb-2">
                NEURAL_INTERFACE_ACTIVE
              </div>
              <div className="text-white font-mono text-sm sm:text-base lg:text-lg">
                {getSectionNarrative(currentSection)}
              </div>
            </div>
          )}
          
          {/* Enhanced navigation dots - responsive positioning */}
          <nav className="fixed right-4 sm:right-6 lg:right-8 xl:right-12 top-1/2 transform -translate-y-1/2 z-50 space-y-4 lg:space-y-6">
            {[
              { name: 'CHAOS', color: '#ff0080' },
              { name: 'MOTION', color: '#00ff80' },
              { name: 'BREATHE', color: '#ffffff' },
              { name: 'EXPLORE', color: '#8000ff' },
              { name: 'DREAM', color: '#ffff00' },
              { name: 'REFLECT', color: '#ff6600' }
            ].map((section, index) => (
              <button
                key={section.name}
                className="group relative block"
                onClick={() => {
                  const element = document.querySelectorAll('section')[index];
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                title={section.name}
              >
                <div 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-white bg-black 
                             transition-all duration-300 group-hover:scale-125 lg:group-hover:scale-150 
                             group-hover:rotate-45"
                  style={{
                    backgroundColor: secretModeUnlocked ? section.color : 'black',
                    borderColor: section.color,
                    boxShadow: secretModeUnlocked ? `0 0 10px ${section.color}` : 'none'
                  }}
                />
                <div 
                  className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 opacity-0 
                             group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: section.color,
                    boxShadow: `0 0 20px ${section.color}`
                  }}
                />
                
                {/* Brutal label - responsive positioning */}
                <span 
                  className="absolute left-full ml-2 sm:ml-3 lg:ml-4 top-1/2 transform -translate-y-1/2 
                             font-black text-xs lg:text-sm opacity-0 group-hover:opacity-100 
                             transition-all duration-300 whitespace-nowrap
                             bg-black border-2 px-2 py-1 hidden sm:block"
                  style={{ borderColor: section.color, color: section.color }}
                >
                  {section.name}
                </span>
              </button>
            ))}
          </nav>
          
          {/* Brutal scroll indicator - responsive sizing */}
          <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white">
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="font-black text-xs sm:text-sm lg:text-base tracking-wider border-2 border-cyan-400 
                              px-2 sm:px-3 py-1 bg-black">
                SCROLL TO HACK REALITY
              </div>
              <div className="relative">
                <div className="w-px h-8 sm:h-10 lg:h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 
                             bg-cyan-400 rounded-full"
                  style={{ animation: 'matrix-rain 2s linear infinite' }}
                />
              </div>
            </div>
          </div>

          {/* Corner UI elements - responsive sizing and positioning */}
          <div className="fixed top-3 sm:top-4 left-3 sm:left-4 z-50 font-mono text-xs sm:text-sm 
                          text-cyan-400 border border-cyan-400 bg-black p-2 sm:p-3">
            <div>SYS_STATUS: ONLINE</div>
            <div>REALITY.EXE: CORRUPTED</div>
            <div>CREATIVITY: 999%</div>
          </div>

          <div className="fixed top-3 sm:top-4 right-3 sm:right-4 z-40 font-mono text-xs sm:text-sm 
                          text-magenta-400 border border-magenta-400 bg-black p-2 sm:p-3">
            <div>USER: CREATIVE_REBEL</div>
            <div>MODE: EXPERIMENTAL</div>
            <div>RULES: BROKEN</div>
          </div>
          
          {/* Content sections with proper responsive layout */}
          <div className="w-full">
            <CreativitySection />
            <MotionSection />
            <BreathingSection />
            <ExplorationSection 
              onDiscovery={addDiscovery}
              secretModeUnlocked={secretModeUnlocked}
            />
            <ImaginationSection />
            <ReflectionSection totalDiscoveries={discoveries} />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
