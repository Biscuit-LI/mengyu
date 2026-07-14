interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-bg2 via-bg3 to-bg2 ${className}`}
      style={{
        backgroundSize: '200% 100%',
        animation: 'skeleton-wave 1.5s ease-in-out infinite',
      }}
    />
  );
}

export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 rounded mb-2 ${i === 0 ? 'w-full' : i === lines - 1 ? 'w-3/4' : 'w-5/6'}`}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
  return (
    <Skeleton className={`${sizeClasses[size]} rounded-full ${className}`} />
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-card rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <SkeletonAvatar size="sm" />
        <div className="flex-1">
          <SkeletonText lines={2} />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="mt-3">
        <Skeleton className="h-24 rounded-lg w-full" />
      </div>
      <div className="flex items-center gap-4 mt-3">
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-16 rounded" />
      </div>
    </div>
  );
}

export function SkeletonChatItem({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-card rounded-xl p-3 ${className}`}>
      <div className="flex items-start gap-3">
        <SkeletonAvatar size="md" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
          <SkeletonText lines={1} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonPostDetail() {
  return (
    <div className="space-y-4">
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <SkeletonAvatar size="md" />
          <div>
            <Skeleton className="h-5 w-28 rounded mb-1" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        </div>
        <SkeletonText lines={6} />
        <div className="mt-4">
          <Skeleton className="h-48 rounded-xl w-full" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>
      </div>
      
      <div>
        <Skeleton className="h-5 w-24 rounded mb-3" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <SkeletonAvatar size="sm" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="space-y-4">
      <div className="glass-card rounded-xl p-4 text-center">
        <SkeletonAvatar size="lg" className="mx-auto mb-3" />
        <Skeleton className="h-6 w-32 rounded mx-auto mb-1" />
        <Skeleton className="h-4 w-20 rounded mx-auto mb-4" />
        <div className="flex justify-center gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-6 w-12 rounded mx-auto mb-1" />
              <Skeleton className="h-3 w-10 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-3">
        <Skeleton className="h-4 w-20 rounded mb-2" />
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded" />
          ))}
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-3">
        <Skeleton className="h-4 w-full rounded" />
      </div>
    </div>
  );
}
