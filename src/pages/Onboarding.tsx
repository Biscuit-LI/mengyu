import { useState } from 'react';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { ChevronRight, Sparkles, MessageCircle, Compass } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Sparkles,
    title: '说出你的梦',
    description: '无论是远大的理想，还是平凡的日常，这里都有人愿意倾听。',
    color: '#a78bfa',
  },
  {
    icon: MessageCircle,
    title: '连接共鸣',
    description: '因相似的情感而相遇，匿名交流，没有社交压力。',
    color: '#f0c27f',
  },
  {
    icon: Compass,
    title: '寻找方向',
    description: '圆梦者分享经验，追梦者获得指引，共同成长。',
    color: '#34d399',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-bg z-50 flex flex-col">
      <GalaxyBackground />
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-500 ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-10' 
                  : 'opacity-0 translate-x-10'
            }`}
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
              style={{ 
                background: `linear-gradient(135deg, ${slide.color}20, ${slide.color}10)`,
                border: `1px solid ${slide.color}30`
              }}
            >
              <slide.icon 
                className="w-10 h-10" 
                style={{ color: slide.color }}
              />
            </div>
            
            <h2 
              className="font-serif text-2xl md:text-3xl font-bold mb-4 text-center"
              style={{ color: document.documentElement.getAttribute('data-theme') === 'light' ? '#0f172a' : '#ffffff' }}
            >
              {slide.title}
            </h2>
            
            <p className="text-muted text-center max-w-sm leading-relaxed">
              {slide.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="relative z-10 pb-12 px-6">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-accent' 
                  : 'w-3 bg-muted/30'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
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
            {currentSlide < slides.length - 1 ? (
              <>
                <span className="font-serif text-lg font-bold text-white tracking-wider">继续</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-accent2/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-accent2/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-serif text-lg font-bold text-white tracking-wider">进入梦遇</span>
              </>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        
        <p className="text-center text-muted/50 text-xs mt-6">
          梦遇 - 以梦为引，相遇彼此
        </p>
      </div>
    </div>
  );
}
