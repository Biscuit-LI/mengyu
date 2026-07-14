import { useState } from 'react';
import { ArrowLeft, Moon, Sun, RefreshCw, Check, Star, Info, BookOpen, MessageCircle, Heart, Bookmark } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Avatar } from '@/components/Avatar';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { generateNickname } from '@/utils/anonymous';
import { CONSTELLATIONS } from '@/utils/constellation';

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const [editingNickname, setEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastCountdown, setToastCountdown] = useState(5);
  
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);

  const handleRefreshNickname = () => {
    const newNickname = generateNickname();
    setUser({ ...user, nickname: newNickname });
  };

  const handleSaveNickname = () => {
    if (nicknameInput.trim()) {
      setUser({ ...user, nickname: nicknameInput.trim() });
    }
    setEditingNickname(false);
    setNicknameInput('');
  };

  const handleConstellationChange = (constellation: string) => {
    setUser({ ...user, constellation });
  };

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    if (newTheme === 'light') {
      setToastCountdown(5);
      setShowToast(true);
      const timer = setInterval(() => {
        setToastCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowToast(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    setTheme(newTheme);
  };

  return (
    <div className="fixed inset-0 z-50 bg-bg overflow-y-auto">
      <GalaxyBackground />
      
      <div className="relative z-10 min-h-screen">
        <div className="pt-12 px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-bg2 flex items-center justify-center text-muted hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-serif text-base font-bold text-ink">设置</h1>
            <div className="w-10" />
          </div>
        </div>
        
        <div className="px-4 py-4 space-y-4">
          <div className="glass-card rounded-xl p-4">
            <h2 className="text-xs font-medium text-ink mb-3">个人信息</h2>
            
            <div className="flex items-center gap-3 mb-4">
              <Avatar constellation={user.constellation || '未选择'} size="md" />
              <div className="flex-1">
                {editingNickname ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={nicknameInput}
                      onChange={(e) => setNicknameInput(e.target.value)}
                      placeholder="输入昵称"
                      className="flex-1 bg-bg2/80 border border-accent/50 rounded-lg px-3 py-1.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent"
                      maxLength={20}
                      autoFocus
                    />
                    <button
                      onClick={handleSaveNickname}
                      className="px-3 py-1.5 rounded-lg bg-accent text-bg text-xs font-medium"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-ink font-medium">{user.nickname || '点击编辑昵称'}</p>
                    <button
                      onClick={() => setEditingNickname(true)}
                      className="text-xs text-accent"
                    >
                      编辑
                    </button>
                  </div>
                )}
                <button
                  onClick={handleRefreshNickname}
                  className="flex items-center gap-1 text-xs text-muted hover:text-accent mt-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  随机生成
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs text-muted mb-2">选择星座头像</p>
              <div className="grid grid-cols-6 gap-2">
                {CONSTELLATIONS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleConstellationChange(c.name)}
                    className={`relative flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                      user.constellation === c.name
                        ? 'bg-accent/20 border border-accent'
                        : 'bg-bg2/50 border border-transparent hover:border-rule'
                    }`}
                  >
                    <Avatar constellation={c.name} size="sm" showConstellation={false} />
                    <span className="text-[10px] text-muted whitespace-nowrap">{c.name}</span>
                    {user.constellation === c.name && (
                      <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-accent flex items-center justify-center">
                        <Check className="w-2 h-2 text-bg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-4">
            <h2 className="text-xs font-medium text-ink mb-3">主题设置</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                  theme === 'dark' ? 'bg-accent/20 border-2 border-accent' : 'bg-bg2/50 border border-rule hover:border-accent/50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs text-ink font-medium">深色模式</span>
                {theme === 'dark' && (
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-3 h-3 text-bg" />
                  </div>
                )}
              </button>
              
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                  theme === 'light' ? 'bg-accent/20 border-2 border-accent' : 'bg-bg2/50 border border-rule hover:border-accent/50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs text-ink font-medium">浅色模式</span>
                {theme === 'light' && (
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-3 h-3 text-bg" />
                  </div>
                )}
              </button>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-4">
            <h2 className="text-xs font-medium text-ink mb-3">关于梦遇</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-ink mb-1">什么是梦遇</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    梦遇是一个记录梦想、分享生活的社区。在这里，你可以写下自己的梦想故事，遇见志同道合的星友，一起追逐心中的星光。每个人的人生，都是别人的一个梦。
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-ink mb-1">如何使用</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs text-ink">入梦</span>
                      <span className="text-xs text-muted">浏览星友们分享的梦想故事</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs text-ink">说梦</span>
                      <span className="text-xs text-muted">记录自己的梦想和生活感悟</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs text-ink">寻梦</span>
                      <span className="text-xs text-muted">按情绪标签探索感兴趣的内容</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs text-ink">传梦</span>
                      <span className="text-xs text-muted">与星友交流互动，发送梦信</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-rule">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink">版本号</span>
                  <span className="text-xs text-muted">v1.0.0</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-ink">开发者</span>
                  <span className="text-xs text-muted">Jerry_Biscuit</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-ink">隐私政策</span>
                  <span className="text-xs text-accent">查看</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-xs text-muted/40">
            梦遇 - 每个人的人生，都是别人的一个梦
          </p>
        </div>
        
        {showToast && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="glass-card rounded-2xl p-6 max-w-xs mx-4 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-sm font-bold text-ink mb-2">浅色星系正在构建中</h3>
              <p className="text-xs text-muted">本次测试仅完善深色模式</p>
              <p className="text-xs text-muted mt-1">(浅色模式后续优化)</p>
              <div className="mt-4 text-xs text-accent">
                {toastCountdown}秒后自动关闭
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
