import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { TabBar } from '@/components/TabBar';
import { GalaxyBackground } from '@/components/GalaxyBackground';
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
  const [showSettings, setShowSettings] = useState(false);
  const [selectedPost, setSelectedPost] = useState<DreamPost | null>(null);
  const [selectedChatSession, setSelectedChatSession] = useState<ChatSession | null>(null);
  const [showFullScreenTip, setShowFullScreenTip] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const setCurrentTab = useStore((state) => state.setCurrentTab);
  const posts = useStore((state) => state.posts);
  const user = useStore((state) => state.user);
  const initializeUser = useStore((state) => state.initializeUser);
  const theme = useStore((state) => state.theme);
  const toasts = useStore((state) => state.toasts);
  const removeToast = useStore((state) => state.removeToast);

  const isUserInitialized = !!(user.nickname && user.constellation);

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
    navigate('/profile');
  };

  const handleViewPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
    }
  };

  const handleLaunchComplete = () => {
    setShowLaunch(false);
    const hasSeenOnboarding = localStorage.getItem('mengyu_onboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    } else {
      initializeUser();
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0f0f1a' }}>
      {/* GalaxyBackground 始终挂载，避免页面切换时 canvas 重复初始化 */}
      <GalaxyBackground />

      {showLaunch && <Launch onComplete={handleLaunchComplete} />}

      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      {!showLaunch && !showOnboarding && !isUserInitialized && (
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted text-sm">加载中...</p>
          </div>
        </div>
      )}

      {!showLaunch && !showOnboarding && isUserInitialized && (
        <>
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home onViewPost={handleViewPost} />} />
              <Route path="/publish" element={<Publish onViewPost={handleViewPost} />} />
              <Route path="/discover" element={<Discover onViewPost={handleViewPost} />} />
              <Route path="/message" element={<Message onViewChat={setSelectedChatSession} />} />
              <Route path="/profile" element={<Profile onViewPost={handleViewPost} />} />
            </Routes>
          </div>
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
        </>
      )}
    </div>
  );
}

export default App;
