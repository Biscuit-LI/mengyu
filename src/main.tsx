import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

function CacheCleaner() {
  useEffect(() => {
    const oldKeys = ['mengyu-store', 'zustand-persist-mengyu'];
    oldKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    const storedData = localStorage.getItem('mengyu-data');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (!parsed.posts || !parsed.comments) {
          localStorage.removeItem('mengyu-data');
        }
      } catch {
        localStorage.removeItem('mengyu-data');
      }
    }
  }, []);
  
  return null;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
          <div className="w-16 h-16 rounded-full bg-venting/20 flex items-center justify-center mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-lg font-bold text-white mb-2">应用加载失败</h2>
          <p className="text-sm text-muted mb-6">请尝试清除浏览器缓存后刷新页面</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg bg-accent text-bg text-sm font-medium"
          >
            重新加载
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="mt-3 px-6 py-2 rounded-lg bg-bg2 text-white text-sm font-medium"
          >
            清除缓存并重载
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// @ts-ignore
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CacheCleaner />
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
