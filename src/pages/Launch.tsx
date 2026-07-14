import { useEffect, useState } from 'react';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { getConstellationEmoji, CONSTELLATIONS } from '@/utils/constellation';

interface LaunchProps {
  onComplete: () => void;
}

export function Launch({ onComplete }: LaunchProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentConstellation, setCurrentConstellation] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setCurrentConstellation((prev) => (prev + 1) % CONSTELLATIONS.length);
    }, 250);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    if (!isAnimating) {
      onComplete();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-bg z-50 flex flex-col items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => !isAnimating && onComplete()}
    >
      <GalaxyBackground />
      
      <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center px-6 relative">
          <div 
            className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
            style={{ animation: 'fadeInUp 1s 0.2s forwards', opacity: 0 }}
          >
            <span className="text-accent/60 text-xs tracking-[0.2em] uppercase">MengYu</span>
          </div>
          
          <div 
            className="relative w-24 h-24 mx-auto mb-6"
            style={{ animation: 'fadeInUp 1s 0.5s forwards', opacity: 0 }}
          >
            <div className={`absolute inset-0 rounded-full border-2 border-accent/30 ${isPressed ? 'scale-95' : 'scale-100'} transition-transform duration-300`} />
            <div className={`absolute inset-2 rounded-full border border-accent/20 ${isPressed ? 'scale-95' : 'scale-100'} transition-transform duration-300`} />
            <div className={`absolute inset-4 rounded-full bg-bg2/50 flex items-center justify-center ${isPressed ? 'scale-95' : 'scale-100'} transition-transform duration-300`}>
              <span className="text-4xl" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                {getConstellationEmoji(CONSTELLATIONS[currentConstellation].name)}
              </span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs text-accent tracking-wider">
                {CONSTELLATIONS[currentConstellation].name}
              </span>
            </div>
          </div>
          
          <h1 
            className="font-serif text-4xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ 
              animation: 'fadeInUp 1.2s 0.8s forwards', 
              opacity: 0,
              textShadow: '0 0 60px rgba(240,194,127,0.15)',
              color: document.documentElement.getAttribute('data-theme') === 'light' ? '#0f172a' : '#ffffff'
            }}
          >
            梦遇
          </h1>
          
          <p 
            className="font-serif text-base md:text-lg text-accent/80 font-light"
            style={{ animation: 'fadeInUp 1.2s 1.2s forwards', opacity: 0 }}
          >
            每个人的人生，都是别人的一个梦
          </p>
        </div>
      </div>
      
      <div 
        className={`absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-8 ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
      >
        <button
          onClick={() => !isAnimating && onComplete()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`w-full py-4 rounded-2xl transition-all duration-300 relative overflow-hidden group ${isPressed ? 'scale-[0.98]' : 'scale-100'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/10 to-accent2/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(240,194,127,0.1)_0%,_transparent_70%)]" />
          
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.6 + 0.2,
                  animationDelay: Math.random() * 2 + 's',
                  animationDuration: Math.random() * 2 + 2 + 's',
                }}
              />
            ))}
          </div>
          
          <div className="absolute inset-0 border border-accent/30 rounded-2xl" />
          <div className="absolute inset-[2px] border border-accent/20 rounded-2xl" />
          
          <div className="relative z-10 flex items-center justify-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-accent2/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -inset-2 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="text-center">
              <p className="font-serif text-lg font-bold text-white tracking-wider">进入梦遇</p>
              <p className="text-xs text-accent/70">开启你的星际之旅</p>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        
        <p className="text-center mt-4 text-xs text-muted/50">点击按钮进入</p>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
}
