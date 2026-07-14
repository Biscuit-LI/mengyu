import { useEffect, useState, useRef } from 'react';

interface GalaxyTipProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function GalaxyTip({ message, onClose, duration = 5000 }: GalaxyTipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; delay: number; color: string }>>([]);
  const [countdown, setCountdown] = useState(Math.ceil(duration / 1000));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const colors = ['#f0c27f', '#e8a87c', '#a78bfa', '#60a5fa', '#4ade80', '#fbbf24'];
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.6 + 0.2,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);

    requestAnimationFrame(() => setIsVisible(true));

    timerRef.current = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 600);
    }, duration);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 600);
  };

  return (
    <div
      className={`
        fixed top-16 left-4 right-4 z-50 pointer-events-none
        transition-all duration-500 ease-out
        ${isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
      `}
    >
      <div
        className="relative rounded-2xl p-5 shadow-2xl pointer-events-auto overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(16, 16, 30, 0.95) 50%, rgba(26, 26, 46, 0.95) 100%)',
          border: '1px solid rgba(240, 194, 127, 0.2)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`
                absolute rounded-full transition-all duration-600
                ${isVisible && !isExiting ? 'scale-100' : 'scale-0'}
              `}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                transitionDelay: `${particle.delay}s`,
                transform: isExiting ? 'scale(0) translateY(-20px)' : 'scale(1) translateY(0)',
              }}
            />
          ))}
          
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(240, 194, 127, 0.5) 0%, transparent 70%)',
              animation: isVisible && !isExiting ? 'pulse 3s ease-in-out infinite' : 'none',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, transparent 70%)',
              animation: isVisible && !isExiting ? 'pulse 4s ease-in-out infinite reverse' : 'none',
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(240, 194, 127, 0.2) 0%, rgba(232, 168, 124, 0.2) 100%)',
                  boxShadow: '0 0 20px rgba(240, 194, 127, 0.3)',
                }}
              >
                <span className="text-lg">🌌</span>
              </div>
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: 'linear-gradient(135deg, rgba(240, 194, 127, 0.4) 0%, rgba(232, 168, 124, 0.4) 100%)',
                  animationDuration: '2s',
                }}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">{message}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-accent/70">
                  {countdown > 0 ? `${countdown}秒后自动消失` : '即将消失...'}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <svg
              className="w-4 h-4 text-muted hover:text-accent transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.2; transform: translateX(-50%) scale(1); }
            50% { opacity: 0.4; transform: translateX(-50%) scale(1.2); }
          }
        `}</style>
      </div>
    </div>
  );
}
