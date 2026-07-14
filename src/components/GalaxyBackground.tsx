import { useEffect, useRef, useState } from 'react';

interface GalaxyBackgroundProps {
  className?: string;
}

export function GalaxyBackground({ className = '' }: GalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    };
    
    updateTheme();
    window.addEventListener('data-theme-change', updateTheme);
    return () => window.removeEventListener('data-theme-change', updateTheme);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      rotation: number;
      orbitRadius: number;
      orbitSpeed: number;
      centerX: number;
      centerY: number;
    }

    let stars: Star[] = [];
    let time = 0;

    const isLight = theme === 'light';

    const getDimensions = () => {
      const w = window.innerWidth || document.documentElement.clientWidth || 375;
      const h = window.innerHeight || document.documentElement.clientHeight || 812;
      return { w: Math.max(w, 1), h: Math.max(h, 1) };
    };

    const resize = () => {
      const { w, h } = getDimensions();
      canvas.width = w;
      canvas.height = h;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const arms = 4;
      const starsPerArm = isLight ? 50 : 80;
      const armSpread = 30;

      for (let arm = 0; arm < arms; arm++) {
        const baseAngle = (arm * Math.PI * 2) / arms;
        for (let i = 0; i < starsPerArm; i++) {
          const orbitRadius = (i + 1) * (Math.min(canvas.width, canvas.height) / starsPerArm) * 0.3;
          const angleOffset = (Math.random() - 0.5) * (armSpread * Math.PI / 180);
          const rotation = baseAngle + angleOffset;
          
          stars.push({
            x: centerX + Math.cos(rotation) * orbitRadius,
            y: centerY + Math.sin(rotation) * orbitRadius,
            size: Math.random() * 1.2 + 0.3,
            opacity: isLight ? Math.random() * 0.4 + 0.15 : Math.random() * 0.7 + 0.2,
            rotation: rotation,
            orbitRadius: orbitRadius,
            orbitSpeed: 0.0003 * (1 - orbitRadius / (canvas.width * 0.6)),
            centerX: centerX,
            centerY: centerY,
          });
        }
      }

      const outerStars = Math.floor((canvas.width * canvas.height) / (isLight ? 12000 : 8000));
      for (let i = 0; i < outerStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 0.6 + 0.2,
          opacity: isLight ? Math.random() * 0.25 + 0.1 : Math.random() * 0.4 + 0.1,
          rotation: Math.random() * Math.PI * 2,
          orbitRadius: Math.max(canvas.width, canvas.height) * 0.8 + Math.random() * 200,
          orbitSpeed: Math.random() * 0.0001 + 0.00005,
          centerX: centerX,
          centerY: centerY,
        });
      }
    };

    const drawStars = () => {
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        animationId = requestAnimationFrame(drawStars);
        return;
      }

      ctx.fillStyle = isLight ? '#fdfbf7' : '#0f0f1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (!isFinite(centerX) || !isFinite(centerY)) {
        animationId = requestAnimationFrame(drawStars);
        return;
      }

      if (!isLight) {
        const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
        centerGlow.addColorStop(0, 'rgba(167, 139, 250, 0.15)');
        centerGlow.addColorStop(0.3, 'rgba(167, 139, 250, 0.08)');
        centerGlow.addColorStop(1, 'rgba(167, 139, 250, 0)');
        ctx.fillStyle = centerGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      stars.forEach((star) => {
        star.rotation += star.orbitSpeed;
        star.x = star.centerX + Math.cos(star.rotation) * star.orbitRadius;
        star.y = star.centerY + Math.sin(star.rotation) * star.orbitRadius;

        if (!isFinite(star.x) || !isFinite(star.y)) return;

        if (star.opacity > 0.4 && !isLight) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 6);
          glow.addColorStop(0, `rgba(240, 194, 127, ${star.opacity * 0.2})`);
          glow.addColorStop(1, 'rgba(240, 194, 127, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = isLight 
          ? `rgba(71, 85, 105, ${star.opacity})` 
          : `rgba(224, 224, 255, ${star.opacity})`;
        ctx.fill();
      });

      if (!isLight) {
        for (let arm = 0; arm < 4; arm++) {
          const baseAngle = (arm * Math.PI * 2) / 4 + time * 0.0002;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          
          for (let r = 20; r < Math.min(canvas.width, canvas.height) * 0.4; r += 5) {
            const wobble = Math.sin(r * 0.05 + time * 0.003) * 15;
            const x = centerX + Math.cos(baseAngle) * r + wobble * Math.sin(baseAngle);
            const y = centerY + Math.sin(baseAngle) * r - wobble * Math.cos(baseAngle);
            ctx.lineTo(x, y);
          }
          
          ctx.strokeStyle = 'rgba(167, 139, 250, 0.05)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      time++;
      animationId = requestAnimationFrame(drawStars);
    };

    // Initial setup
    resize();
    drawStars();

    // Delayed re-resize to handle iframe loading timing
    const delayedResize1 = setTimeout(() => {
      resize();
    }, 100);

    const delayedResize2 = setTimeout(() => {
      resize();
    }, 500);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(delayedResize1);
      clearTimeout(delayedResize2);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <>
      <div className={`fixed inset-0 z-0 pointer-events-none ${className}`} style={{ backgroundColor: theme === 'light' ? '#fdfbf7' : '#0f0f1a' }} />
      <canvas ref={canvasRef} className={`fixed inset-0 z-0 pointer-events-none ${className}`} />
    </>
  );
}
