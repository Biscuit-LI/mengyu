import { useState, useMemo } from 'react';
import { Wand2, Send, MessageCircle, FileText, Image, Mic } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { MoodTag } from '@/components/MoodTag';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import type { MoodTag as MoodTagType, PostType, DreamPost } from '@/types';

const moods: MoodTagType[] = ['chasing', 'living', 'daily', 'venting', 'lost', 'healing'];

interface PublishProps {
  onViewPost?: (postId: string) => void;
}

export function Publish({ onViewPost }: PublishProps) {
  const [postType, setPostType] = useState<PostType>('dream');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodTagType>('daily');
  const [isPolishing, setIsPolishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const addPost = useStore((state) => state.addPost);
  const user = useStore((state) => state.user);
  const setCurrentTab = useStore((state) => state.setCurrentTab);
  const posts = useStore((state) => state.posts);

  const userPosts = useMemo(() => {
    if (!user.nickname) return [];
    return posts.filter((post: DreamPost) => post.author.nickname === user.nickname);
  }, [posts, user.nickname]);

  const maxLength = postType === 'article' ? 5000 : 500;

  const handlePolish = async () => {
    if (!content.trim()) return;
    
    setIsPolishing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (postType === 'article') {
      setContent(content + '\n\n在这个忙碌的世界里，我们常常会停下脚步思考，什么才是真正想要的生活。');
    } else {
      setContent('在这个忙碌的世界里，我常常会停下脚步思考，什么才是我真正想要的生活。');
    }
    setIsPolishing(false);
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    if (postType === 'article' && !title.trim()) return;
    
    addPost({
      author: {
        nickname: user.nickname || '匿名星友',
        constellation: user.constellation || '星座未知',
      },
      mood: selectedMood,
      postType,
      title: postType === 'article' ? title.trim() : undefined,
      content: content.trim(),
      hasJourney: false,
    });
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setContent('');
      setTitle('');
      setSelectedMood('daily');
      setPostType('dream');
      setCurrentTab(0);
    }, 1500);
  };

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (hours < 1) return '刚刚';
      if (hours < 24) return `${hours}小时前`;
      if (days < 7) return `${days}天前`;
      return `${date.getMonth() + 1}/${date.getDate()}`;
    } catch {
      return '';
    }
  };

  const truncateContent = (content: string, maxLen: number = 60) => {
    if (content.length <= maxLen) return content;
    return content.slice(0, maxLen) + '...';
  };

  return (
    <div className="min-h-screen pb-20">
      <GalaxyBackground />
      
      <div className="relative z-10 pt-12 px-4">
        <div className="glass-card rounded-xl p-2 mb-2 flex gap-1">
          <button
            onClick={() => setPostType('dream')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1 text-xs font-medium transition-all ${
              postType === 'dream'
                ? 'bg-accent text-bg'
                : 'text-muted hover:text-ink'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>梦话</span>
          </button>
          <button
            onClick={() => setPostType('article')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1 text-xs font-medium transition-all ${
              postType === 'article'
                ? 'bg-accent text-bg'
                : 'text-muted hover:text-ink'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>文章</span>
          </button>
        </div>
        
        <div className="glass-card rounded-xl p-3 mb-2">
          {postType === 'article' && (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="文章标题..."
              className="w-full bg-transparent text-ink placeholder:text-muted/50 outline-none text-sm font-medium mb-2 pb-1.5 border-b border-rule"
            />
          )}
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
            placeholder={postType === 'article' 
              ? '写下你的文章...' 
              : '说出你的梦、生活、感受...'
            }
            className={`w-full bg-transparent text-ink placeholder:text-muted/50 resize-none outline-none text-xs leading-relaxed ${postType === 'article' ? 'h-32' : 'h-24'}`}
          />
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-accent transition-colors hover:bg-bg2">
                <Image className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-accent transition-colors hover:bg-bg2">
                <Mic className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[10px] text-muted">{content.length}/{maxLength}</span>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-2.5 mb-2">
          <h3 className="text-[10px] font-medium text-ink mb-1.5">选择情绪标签</h3>
          <div className="flex flex-wrap gap-1">
            {moods.map((mood) => (
              <MoodTag
                key={mood}
                mood={mood}
                selected={selectedMood === mood}
                onClick={() => setSelectedMood(mood)}
              />
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={handlePolish}
            disabled={!content.trim() || isPolishing}
            className="flex-1 glass-card rounded-xl py-2 flex items-center justify-center gap-1.5 hover:border-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 className={`w-3.5 h-3.5 text-accent ${isPolishing ? 'animate-spin' : ''}`} />
            <span className="text-accent text-xs font-medium">{isPolishing ? '润色中...' : 'AI润色'}</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || (postType === 'article' && !title.trim())}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-accent to-accent2 text-bg font-medium flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="text-xs">{postType === 'article' ? '发布文章' : '发布梦话'}</span>
          </button>
        </div>
        
        <div className="glass-card rounded-xl p-3">
          <h3 className="text-xs font-medium text-ink mb-2">我的发布</h3>
          {userPosts.length > 0 ? (
            <div className="space-y-2">
              {userPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="p-2 rounded-lg bg-bg/50 border border-rule cursor-pointer hover:bg-bg/70 transition-colors"
                  onClick={() => onViewPost?.(post.id)}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs font-medium text-ink">{post.author.nickname}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-accent/20 text-accent">
                      {post.postType === 'article' ? '文章' : '梦话'}
                    </span>
                  </div>
                  {post.title && (
                    <h4 className="text-xs font-medium text-ink mb-1">{post.title}</h4>
                  )}
                  <p className="text-xs text-ink line-clamp-2">{truncateContent(post.content, 60)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted">{formatTime(post.createdAt)}</span>
                    <span className="text-xs text-muted">{post.likes}赞 · {post.comments}评论</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-xs text-muted">还没有发布过内容</p>
              <p className="text-[10px] text-muted/50 mt-1">写下你的第一个梦话吧</p>
            </div>
          )}
        </div>
      </div>
      
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-healing/20 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-healing" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-base font-bold text-ink mb-1">发布成功</h3>
            <p className="text-sm text-muted">{postType === 'article' ? '你的文章已发送到宇宙' : '你的梦话已发送到宇宙'}</p>
          </div>
        </div>
      )}
    </div>
  );
}