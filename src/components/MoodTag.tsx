import { memo } from 'react';
import type { MoodTag as MoodTagType } from '@/types';
import { MOOD_CONFIG } from '@/types';

interface MoodTagProps {
  mood: MoodTagType;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  onClick?: () => void;
}

const MoodTag = memo(function MoodTagComponent({ mood, size = 'md', selected = false, onClick }: MoodTagProps) {
  const config = MOOD_CONFIG[mood];
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';

  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-2 rounded-full font-medium transition-all duration-300 ${sizeClasses[size]} ${
        selected
          ? 'bg-accent text-bg'
          : `bg-opacity-10 border border-opacity-30 hover:scale-105`
      }`}
      style={{
        backgroundColor: selected ? config.color : config.bgColor,
        borderColor: selected ? config.color : config.borderColor,
        color: selected ? (isLight ? '#f8fafc' : '#0f0f1a') : config.color,
      }}
    >
      <span 
        className="w-2 h-2 rounded-full"
        style={{ 
          backgroundColor: selected ? (isLight ? '#f8fafc' : '#0f0f1a') : config.color,
          boxShadow: selected ? 'none' : `0 0 6px ${config.color}`,
        }}
      />
      {config.label}
    </button>
  );
});

export { MoodTag };
