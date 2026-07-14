import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, RefreshCw, Eye, Smartphone } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Avatar } from '@/components/Avatar';
import { MoodTag } from '@/components/MoodTag';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { EmptyState } from '@/components/EmptyState';
import { generateNickname } from '@/utils/anonymous';
import { getRandomConstellation } from '@/utils/constellation';

interface ProfileProps {
  onViewPost: (postId: string) => void;
}

export function Profile({ onViewPost }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'timeline' | 'collections' | 'messages'>('profile');
  const navigate = useNavigate();
  
  const user = useStore((state) => state.user);
  const messages = useStore((state) => state.messages);
  const posts = useStore((state) => state.posts);
  const getUserPosts = useStore((state) => state.getUserPosts);
  const setUser = useStore((state) => state.setUser);

  const collections = posts.filter(post => user.collections?.includes(post.id));
  const userPosts = getUserPosts();

  const handleRefreshIdentity = () => {
    const newNickname = generateNickname();
    const newConstellation = getRandomConstellation();
    
    setUser({
      ...user,
      nickname: newNickname,
      constellation: newConstellation,
    });
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    } catch {
      return '未知时间';
    }
  };

  const displayNickname = user.nickname || '点击刷新获取昵称';
  const displayConstellation = user.constellation || '未选择';

  return (
    <div className="min-h-screen pb-24">
      <GalaxyBackground />
      
      <div className="relative z-10 pt-12 px-4">
        {activeTab === 'profile' && (
          <div className="space-y-3">
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="relative inline-block mb-3">
                <Avatar constellation={displayConstellation} size="lg" />
                <button
                  onClick={handleRefreshIdentity}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center text-bg"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <h2 className="font-serif text-base font-bold text-ink mb-0.5">{displayNickname}</h2>
              <p className="text-xs text-muted mb-3">{displayConstellation}</p>
              
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className="flex flex-col items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="font-serif text-lg font-bold text-accent">{(user.posts || []).length}</span>
                  <span className="text-xs text-muted">发布</span>
                </button>
                <button
                  onClick={() => setActiveTab('collections')}
                  className="flex flex-col items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="font-serif text-lg font-bold text-accent">{collections.length}</span>
                  <span className="text-xs text-muted">收藏</span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="flex flex-col items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="font-serif text-lg font-bold text-accent">{messages.length}</span>
                  <span className="text-xs text-muted">梦信</span>
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-rule">
                <p className="text-xs text-muted mb-1">加入时间</p>
                <p className="text-xs text-ink">{formatDate(user.joinedAt || new Date().toISOString())}</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-3">
              <h3 className="text-xs font-medium text-ink mb-2">我的情绪分布</h3>
              <div className="flex flex-wrap gap-1.5">
                {(['chasing', 'living', 'daily', 'venting', 'lost', 'healing'] as const).map((mood) => (
                  <MoodTag key={mood} mood={mood} size="sm" />
                ))}
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-3">
              <button
                onClick={() => (window as any).openSettings?.()}
                className="w-full flex items-center gap-2 text-left"
              >
                <Settings className="w-4 h-4 text-muted" />
                <span className="text-xs text-ink">设置</span>
              </button>
            </div>

            <div className="glass-card rounded-xl p-3">
              <button
                onClick={() => {
                  if (window !== window.parent) {
                    window.parent.location.href = '/';
                  } else {
                    window.location.href = '/demo.html';
                  }
                }}
                className="w-full flex items-center gap-2 text-left"
              >
                <Smartphone className="w-4 h-4 text-muted" />
                <span className="text-xs text-ink">
                  {window !== window.parent ? '退出手机框预览' : '手机框预览'}
                </span>
              </button>
            </div>
            
            <p className="text-center text-xs text-muted/40">
              梦遇 - 每个人的人生，都是别人的一个梦
            </p>
          </div>
        )}
        
        {activeTab === 'collections' && (
          <div className="space-y-3">
            {collections.length > 0 ? (
              collections.map((post) => (
                <div 
                  key={post.id} 
                  className="glass-card rounded-xl p-3 cursor-pointer hover:bg-opacity-90 transition-all"
                  onClick={() => onViewPost(post.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar constellation={post.author.constellation} size="sm" showConstellation={false} />
                      <span className="text-xs font-medium text-ink">{post.author.nickname}</span>
                    </div>
                    <MoodTag mood={post.mood} size="sm" />
                  </div>
                  <p className="text-xs text-ink line-clamp-2 mb-2">{post.content}</p>
                  <div className="h-16 rounded-lg bg-gradient-to-br from-accent/10 to-accent2/10 flex items-center justify-center mb-2">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-accent/30" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted">{formatDate(post.createdAt)}</p>
                    <button className="flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      查看详情
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState 
                type="collections" 
                onAction={() => navigate('/discover')} 
              />
            )}
          </div>
        )}
        
        {activeTab === 'timeline' && (
          <div className="space-y-3">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="glass-card rounded-xl p-3 cursor-pointer hover:bg-opacity-90 transition-all"
                  onClick={() => onViewPost(post.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar constellation={post.author.constellation} size="sm" showConstellation={false} />
                      <span className="text-xs font-medium text-ink">{post.author.nickname}</span>
                    </div>
                    <MoodTag mood={post.mood} size="sm" />
                  </div>
                  <p className="text-xs text-ink line-clamp-2 mb-2">{post.content}</p>
                  <div className="h-16 rounded-lg bg-gradient-to-br from-accent/10 to-accent2/10 flex items-center justify-center mb-2">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-accent/30" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted">{formatDate(post.createdAt)}</p>
                    <button className="flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      查看详情
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState 
                type="posts" 
                onAction={() => navigate('/publish')} 
              />
            )}
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div className="space-y-3">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.id} className="glass-card rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <Avatar constellation={msg.sender.constellation} size="sm" showConstellation={false} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-ink">{msg.sender.nickname}</span>
                        <span className="text-xs text-muted">{formatDate(msg.createdAt)}</span>
                      </div>
                      <p className="text-xs text-ink">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState 
                type="messages" 
                onAction={() => navigate('/message')} 
              />
            )}
          </div>
        )}
        
        <div className="fixed bottom-20 left-0 right-0 px-4">
          <div className="flex gap-2 p-1 glass-card rounded-xl">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'profile' 
                  ? 'bg-accent text-bg' 
                  : 'text-muted hover:text-ink'
              }`}
            >
              档案
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'timeline' 
                  ? 'bg-accent text-bg' 
                  : 'text-muted hover:text-ink'
              }`}
            >
              发布
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'collections' 
                  ? 'bg-accent text-bg' 
                  : 'text-muted hover:text-ink'
              }`}
            >
              收藏
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'messages' 
                  ? 'bg-accent text-bg' 
                  : 'text-muted hover:text-ink'
              }`}
            >
              梦信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
