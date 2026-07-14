import { memo } from 'react';
import { getConstellationEmoji } from '@/utils/constellation';

interface AvatarProps {
  constellation: string;
  size?: 'sm' | 'md' | 'lg';
  showConstellation?: boolean;
}

const Avatar = memo(function AvatarComponent({ constellation, size = 'md', showConstellation = true }: AvatarProps) {
  const emoji = getConstellationEmoji(constellation);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-xl',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-bg2 border border-rule flex items-center justify-center relative`}
    >
      <span className="select-none">{emoji}</span>
      {showConstellation && (
        <span className="absolute text-[10px] text-muted/60 mt-6">{constellation}</span>
      )}
    </div>
  );
});

export { Avatar };
