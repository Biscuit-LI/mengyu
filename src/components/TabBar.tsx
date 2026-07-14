import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, PenLine, Compass, MessageCircle, User, Minimize2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

const tabs = [
  { id: 0, name: '入梦', icon: Home, path: '/' },
  { id: 1, name: '说梦', icon: PenLine, path: '/publish' },
  { id: 2, name: '寻梦', icon: Compass, path: '/discover' },
  { id: 3, name: '传梦', icon: MessageCircle, path: '/message' },
  { id: 4, name: '我的', icon: User, path: '/profile' },
];

type AnimState = 'normal' | 'collapsing' | 'collapsed' | 'expanding';

export function TabBar() {
  const navigate = useNavigate();
  const currentTab = useStore((state) => state.currentTab);
  const theme = useStore((state) => state.theme);
  const chatSessions = useStore((state) => state.chatSessions);
  
  const unreadCount = chatSessions.reduce((sum, session) => sum + session.unreadCount, 0);

  const [animState, setAnimState] = useState<AnimState>('normal');
  const [ballPos, setBallPos] = useState({ x: 20, y: window.innerHeight - 80 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragMoved, setDragMoved] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const ballRef = useRef<HTMLDivElement>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expandTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
      if (expandTimer.current) clearTimeout(expandTimer.current);
    };
  }, []);

  useEffect(() => {
    if (animState !== 'collapsed') {
      setBallPos({ x: 20, y: window.innerHeight - 80 });
    }
  }, [animState]);

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;
      const ballSize = 48;
      const maxX = window.innerWidth - ballSize - 8;
      const maxY = window.innerHeight - ballSize - 8;
      const minX = 8;
      const minY = 80;

      const clampedX = Math.max(minX, Math.min(maxX, newX));
      const clampedY = Math.max(minY, Math.min(maxY, newY));

      const moveDistance = Math.sqrt(
        Math.pow(clientX - dragStartPos.current.x, 2) +
        Math.pow(clientY - dragStartPos.current.y, 2)
      );
      if (moveDistance > 5) setDragMoved(true);

      setBallPos({ x: clampedX, y: clampedY });
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleEnd = () => {
      setDragging(false);
      setTimeout(() => setDragMoved(false), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [dragging, dragOffset]);

  const handleBallStart = (clientX: number, clientY: number) => {
    setDragging(true);
    setDragMoved(false);
    dragStartPos.current = { x: clientX, y: clientY };
    setDragOffset({
      x: clientX - ballPos.x,
      y: clientY - ballPos.y,
    });
  };

  const handleBallMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleBallStart(e.clientX, e.clientY);
  };

  const handleBallTouchStart = (e: React.TouchEvent) => {
    handleBallStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleBallClick = () => {
    if (!dragMoved) {
      handleExpand();
    }
  };

  const handleCollapse = () => {
    setAnimState('collapsing');
    collapseTimer.current = setTimeout(() => {
      setAnimState('collapsed');
    }, 800);
  };

  const handleExpand = () => {
    setAnimState('expanding');
    expandTimer.current = setTimeout(() => {
      setAnimState('normal');
    }, 800);
  };

  const isDark = theme === 'dark';
  const showBar = animState === 'normal' || animState === 'collapsing' || animState === 'expanding';
  const showBall = animState === 'collapsed' || animState === 'expanding';
  const showParticles = animState === 'collapsing' || animState === 'expanding';

  return (
    <>
      {showParticles && <ParticleBurst phase={animState} />}

      {showBall && (
        <div
          ref={ballRef}
          onMouseDown={handleBallMouseDown}
          onTouchStart={handleBallTouchStart}
          onClick={handleBallClick}
          className="fixed z-50 cursor-grab active:cursor-grabbing select-none"
          style={{
            left: ballPos.x,
            top: ballPos.y,
            animation: animState === 'expanding' ? 'ballImplode 0.8s ease-in forwards' : 'ballAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <div className="relative w-12 h-12 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-accent2/30 backdrop-blur-md border border-accent/40 shadow-lg" />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white animate-pulse"
                  style={{
                    width: '2px',
                    height: '2px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.6 + 0.2,
                    animationDelay: Math.random() * 2 + 's',
                    animationDuration: Math.random() * 2 + 2 + 's',
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-accent2 opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              {(() => {
                const Icon = tabs[currentTab].icon;
                return <Icon className="w-5 h-5 text-accent" />;
              })()}
            </div>
            <div className="absolute -inset-1 rounded-full bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )}

      {showBar && (
        <nav
          className={`fixed bottom-0 left-0 right-0 z-40 tab-bar-bg backdrop-blur-xl border-t border-rule ${
            animState === 'collapsing' ? 'nav-dissolve' : ''
          } ${animState === 'expanding' ? 'nav-materialize' : ''}`}
        >
          <div className="flex items-center justify-around h-14 px-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative ${
                    animState === 'collapsing' ? 'icon-scatter' : ''
                  } ${animState === 'expanding' ? 'icon-gather' : ''}`}
                  style={animState === 'collapsing' || animState === 'expanding' ? {
                    animationDelay: `${index * 0.06}s`,
                  } : undefined}
                  aria-label={tab.name}
                >
                  <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-muted'} transition-colors duration-300`} />
                    {tab.id === 3 && unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-1 text-accent font-bold text-[11px] leading-none drop-shadow-md">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-accent' : 'text-muted'} transition-colors duration-300`}>
                    {tab.name}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
      
      {animState === 'normal' && (
        <button
          onClick={handleCollapse}
          className={`fixed bottom-16 right-4 z-50 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg ${
            isDark ? 'bg-bg2/90 border border-accent/30 text-accent' : 'bg-card-bg/90 border border-rule text-accent shadow-md'
          }`}
          title="收起导航栏"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      )}

      <style>{`
        @keyframes navDissolve {
          0% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
          40% { opacity: 0.6; transform: scale(0.95) translateY(10px); filter: blur(2px); }
          100% { opacity: 0; transform: scale(0.8) translateY(30px); filter: blur(8px); }
        }
        .nav-dissolve {
          animation: navDissolve 0.8s ease-in forwards;
        }

        @keyframes navMaterialize {
          0% { opacity: 0; transform: scale(0.8) translateY(30px); filter: blur(8px); }
          40% { opacity: 0.6; transform: scale(0.95) translateY(10px); filter: blur(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }
        .nav-materialize {
          animation: navMaterialize 0.8s ease-out forwards;
        }

        @keyframes iconScatter {
          0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
          50% { opacity: 0.8; transform: translateY(-20px) scale(0.8) rotate(180deg); }
          100% { opacity: 0; transform: translateY(-60px) scale(0.2) rotate(360deg); }
        }
        .icon-scatter {
          animation: iconScatter 0.8s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }

        @keyframes iconGather {
          0% { opacity: 0; transform: translateY(-60px) scale(0.2) rotate(-360deg); }
          50% { opacity: 0.8; transform: translateY(-20px) scale(0.8) rotate(-180deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }
        .icon-gather {
          animation: iconGather 0.8s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }

        @keyframes ballAppear {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          60% { opacity: 1; transform: scale(1.3) rotate(360deg); }
          100% { opacity: 1; transform: scale(1) rotate(360deg); }
        }

        @keyframes ballImplode {
          0% { opacity: 1; transform: scale(1) rotate(360deg); }
          40% { opacity: 1; transform: scale(1.3) rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(0deg); }
        }

        @keyframes particleFly {
          0% { opacity: 0; transform: translate(0, 0) scale(0); }
          20% { opacity: 1; transform: translate(var(--tx-mid), var(--ty-mid)) scale(1.5); }
          100% { opacity: 0; transform: translate(var(--tx-end), var(--ty-end)) scale(0.2); }
        }
        .particle-fly {
          animation: particleFly 0.8s ease-out forwards;
        }

        @keyframes particleGather {
          0% { opacity: 0; transform: translate(var(--tx-end), var(--ty-end)) scale(0.2); }
          40% { opacity: 1; transform: translate(var(--tx-mid), var(--ty-mid)) scale(1.5); }
          100% { opacity: 0; transform: translate(0, 0) scale(0); }
        }
        .particle-gather {
          animation: particleGather 0.8s ease-in forwards;
        }

        @keyframes ringExpand {
          0% { opacity: 0.8; transform: translate(-50%, -50%) scale(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(3); }
        }
        .ring-expand {
          animation: ringExpand 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}

function ParticleBurst({ phase }: { phase: 'collapsing' | 'expanding' }) {
  const isGather = phase === 'expanding';
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const distance = 80 + Math.random() * 60;
    const midDistance = distance * 0.5;
    return {
      id: i,
      txMid: Math.cos(angle) * midDistance,
      tyMid: Math.sin(angle) * midDistance - 30,
      txEnd: Math.cos(angle) * distance,
      tyEnd: Math.sin(angle) * distance - 80,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.1,
      color: ['#f0c27f', '#a78bfa', '#34d399', '#fbbf24'][i % 4],
    };
  });

  return (
    <div className="fixed bottom-7 left-1/2 z-50 pointer-events-none" style={{ transform: 'translateX(-50%)' }}>
      <div
        className="absolute w-10 h-10 rounded-full border-2 border-accent/50 ring-expand"
        style={{ left: '50%', top: '50%' }}
      />
      <div
        className="absolute w-10 h-10 rounded-full border border-accent2/30 ring-expand"
        style={{ left: '50%', top: '50%', animationDelay: '0.1s' }}
      />
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${isGather ? 'particle-gather' : 'particle-fly'}`}
          style={
            {
              '--tx-mid': `${p.txMid}px`,
              '--ty-mid': `${p.tyMid}px`,
              '--tx-end': `${p.txEnd}px`,
              '--ty-end': `${p.tyEnd}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
