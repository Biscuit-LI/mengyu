import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

export function ToastItem({ id, type, message, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    warning: 'bg-yellow-500/10 border-yellow-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
  };

  const typeLabels = {
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '信息',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md
        shadow-lg transition-all duration-300
        ${bgColors[type]}
        ${isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
      style={{
        maxWidth: '320px',
      }}
    >
      <span className="sr-only">{typeLabels[type]}:</span>
      {icons[type]}
      <span className="text-sm font-medium text-ink flex-1">{message}</span>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onClose(id), 300);
        }}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="关闭提示"
      >
        <X className="w-4 h-4 text-muted" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<Omit<ToastProps, 'onClose'>>;
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-16 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}
