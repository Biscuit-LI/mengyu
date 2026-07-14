interface NavBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightIcon?: React.ReactNode;
}

export function NavBar({ title, showBack = false, onBack, rightIcon }: NavBarProps) {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-40 nav-bar-bg backdrop-blur-xl border-b border-rule"
      role="banner"
    >
      <div className="flex items-center justify-between h-12 px-4">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center text-muted hover:text-ink transition-colors rounded-lg hover:bg-bg2"
              aria-label="返回"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="font-serif text-lg font-bold text-ink" role="heading" aria-level={1}>
            {title}
          </h1>
        </div>
        {rightIcon && (
          <div className="flex items-center">{rightIcon}</div>
        )}
      </div>
    </header>
  );
}
