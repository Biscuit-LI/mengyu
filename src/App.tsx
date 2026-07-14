import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { TabBar } from '@/components/TabBar';
import { Launch } from '@/pages/Launch';
import { Onboarding } from '@/pages/Onboarding';
import { Home } from '@/pages/Home';
import { Publish } from '@/pages/Publish';
import { Discover } from '@/pages/Discover';
import { Message } from '@/pages/Message';
import { Profile } from '@/pages/Profile';
import { StoryDetail } from '@/pages/StoryDetail';
import { Settings } from '@/pages/Settings';
import { ChatDetail } from '@/pages/ChatDetail';
import { ToastContainer } from '@/components/Toast';
import { GalaxyTip } from '@/components/GalaxyTip';
import type { DreamPost, ChatSession } from '@/types';

function App() {
  const [showLaunch, setShowLaunch] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedPost, setSelectedPost] = useState<DreamPost | null>(null);
  const [selectedChatSession, setSelectedChatSession] = useState<ChatSession | null>(null);
  const [showFullScreenTip, setShowFullScreenTip] = useState(true);
  
  const location = useLocation();
  const setCurrentTab = useStore((state) => state.setCurrentTab);
  const posts = useStore((state) => state.posts);
  const initializeUser = useStore((state) => state.initializeUser);
  const theme = useStore((state) => state.theme);
  const toasts = useStore((state) => state.toasts);
  const removeToast = useStore((state) => state.removeToast);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('mengyu_onboarding');
    if (!hasSeenOnboarding) {
      setTimeout(() => {
        setShowLaunch(false);
        setShowOnboarding(true);
      }, 3500);
    } else {
      setTimeout(() => {
        setShowLaunch(false);
        initializeUser();
        setIsUserInitialized(true);
      }, 2000);
    }
  }, [initializeUser]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    (window as any).openSettings = () => setShowSettings(true);
  }, [theme]);

  useEffect(() => {
    const pathMap: Record<string, number> = {
      '/': 0,
      '/publish': 1,
      '/discover': 2,
      '/message': 3,
      '/profile': 4,
    };
    const tabIndex = pathMap[location.pathname] ?? 0;
    setCurrentTab(tabIndex);
  }, [location.pathname, setCurrentTab]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('mengyu_onboarding', 'true');
    setShowOnboarding(false);
    initializeUser();
    setIsUserInitialized(true);
  };

  const handleViewPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
    }
  };

  if (showLaunch) {
    return <Launch onComplete={() => {}} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (!isUserInitialized) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted text-sm">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Routes>
        <Route path="/" element={<Home onViewPost={handleViewPost} />} />
        <Route path="/publish" element={<Publish onViewPost={handleViewPost} />} />
        <Route path="/discover" element={<Discover onViewPost={handleViewPost} />} />
        <Route path="/message" element={<Message onViewChat={setSelectedChatSession} />} />
        <Route path="/profile" element={<Profile onViewPost={handleViewPost} />} />
      </Routes>
      <TabBar />
      
      {selectedPost && (
        <StoryDetail 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
      
      {selectedChatSession && (
        <ChatDetail 
          session={selectedChatSession} 
          onClose={() => setSelectedChatSession(null)} 
        />
      )}
      
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
      
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      {showFullScreenTip && (
        <GalaxyTip
          message="切回手机框预览：点击「我的」→「手机框预览」"
          onClose={() => setShowFullScreenTip(false)}
          duration={5000}
        />
      )}
    </div>
  );
}

export default App;
