
import React from 'react';

const BreathingSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 
                        flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Minimal zen grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Gentle floating particles - responsive positioning */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            animation: `gentle-pulse ${4 + i}s ease-in-out infinite`
          }}
        />
      ))}
      
      {/* Content - responsive text sizing */}
      <div className="relative z-10 text-center max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 sm:mb-8 text-white/80 tracking-wider">
          breathe
        </h2>
        
        <div className="w-24 sm:w-32 lg:w-40 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-6 sm:mb-8" />
        
        <p className="text-base sm:text-lg lg:text-xl text-white/60 font-light leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
          In the space between chaos and order,<br className="hidden sm:block"/>
          <span className="block sm:inline"> creativity finds its rhythm.</span>
        </p>
        
        <div className="text-xs sm:text-sm text-white/40 font-mono">
          [ preparing next transmission... ]
        </div>
      </div>
    </section>
  );
};

export default BreathingSection;
