import { useState, useEffect, useMemo } from 'react';
import { Heart, Bookmark, Send, ArrowLeft, MessageCircle, SendHorizontal, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Avatar } from '@/components/Avatar';
import { MoodTag } from '@/components/MoodTag';
import type { DreamPost } from '@/types';

interface StoryDetailProps {
  post: DreamPost;
  onClose: () => void;
}

export function StoryDetail({ post, onClose }: StoryDetailProps) {
  const [commentText, setCommentText] = useState('');
  
  const likePost = useStore((state) => state.likePost);
  const collectPost = useStore((state) => state.collectPost);
  const addComment = useStore((state) => state.addComment);
  const likeComment = useStore((state) => state.likeComment);
  const allComments = useStore((state) => state.comments);
  const userCollections = useStore((state) => state.user.collections);
  const userLikedPosts = useStore((state) => state.user.likedPosts);
  const userLikedComments = useStore((state) => state.user.likedComments);
  const user = useStore((state) => state.user);
  const theme = useStore((state) => state.theme);
  const currentPost = useStore((state) => state.posts.find(p => p.id === post.id)) || post;
  
  const comments = useMemo(
    () => allComments.filter(c => c.postId === post.id),
    [allComments, post.id]
  );

  const isLiked = userLikedPosts?.includes(post.id) || false;
  const isCollected = userCollections.includes(post.id);
  const isArticle = post.postType === 'article';

  useEffect(() => {
    const handleBack = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleBack);
    return () => window.removeEventListener('keydown', handleBack);
  }, [onClose]);

  const handleLike = () => {
    likePost(post.id);
  };

  const handleCollect = () => {
    collectPost(post.id);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    addComment({
      postId: post.id,
      author: {
        nickname: user.nickname || '匿名星星',
        constellation: user.constellation || '未知',
      },
      content: commentText,
      likes: 0,
    });
    setCommentText('');
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (hours < 1) return '刚刚';
      if (hours < 24) return `${hours}小时前`;
      if (days < 7) return `${days}天前`;
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    } catch {
      return '未知时间';
    }
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-white/60' : 'text-black/60';
  const cardBg = isDark ? 'bg-white/5 border-white/10' : 'bg-card-bg border-rule shadow-sm';
  const inputBg = isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-bg2 border-rule text-black placeholder:text-black/40';

  return (
    <div className={`fixed inset-0 z-[100] overflow-y-auto ${isDark ? 'bg-[#0f0f1a]' : 'bg-bg'}`}>
      <div className="relative z-10 pb-24 pt-11">
        <div className={`backdrop-blur-md border-b ${isDark ? 'bg-[rgba(15,15,26,0.95)] border-white/10' : 'bg-card-bg/95 border-rule'}`}>
          <div className="flex items-center justify-between h-12 px-4">
            <button
              onClick={onClose}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 text-white/60 hover:text-white' : 'bg-bg2 text-muted hover:text-ink'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className={`font-serif text-lg font-bold ${textColor}`}>帖子详情</h1>
            <button
              onClick={onClose}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 text-white/60 hover:text-white' : 'bg-bg2 text-muted hover:text-ink'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="px-4 py-4">
          <div className={`rounded-xl p-4 mb-4 border ${cardBg}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar constellation={post.author.constellation} size="md" />
                <div>
                  <h2 className={`text-base font-medium ${textColor}`}>{post.author.nickname}</h2>
                  <p className={`text-xs ${subTextColor}`}>{post.author.constellation} · {formatDate(post.createdAt)}</p>
                </div>
              </div>
              <MoodTag mood={post.mood} size="sm" />
            </div>
            
            {isArticle && post.title && (
              <h2 className={`text-xl font-bold mb-3 leading-snug ${textColor}`}>{post.title}</h2>
            )}
            
            <p className={`text-base leading-relaxed mb-4 whitespace-pre-wrap ${textColor}`}>
              {post.content}
            </p>
            
            {post.hasJourney && post.journey && post.journey.length > 0 && (
              <div className={`rounded-xl p-4 mb-4 border ${cardBg}`}>
                <h3 className={`text-xs font-medium mb-3 flex items-center gap-2 ${textColor}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  追梦历程
                </h3>
                <div className="relative">
                  <div className="absolute left-[14px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent to-accent2 opacity-30" />
                  {post.journey.map((step, index) => (
                    <div key={index} className="flex gap-3 mb-3 last:mb-0">
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cardBg}`}>
                          <span className="text-xs font-medium text-accent">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-accent">{step.timestamp}</span>
                          <span className={`text-xs font-medium ${textColor}`}>{step.title}</span>
                        </div>
                        <p className={`text-xs mb-1.5 ${subTextColor}`}>{step.description}</p>
                        {step.advice && (
                          <div className="p-2 rounded-lg bg-accent/5 border border-accent/10">
                            <p className="text-xs text-accent">💡 {step.advice}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className={`flex items-center justify-between pt-3 border-t ${isDark ? 'border-white/10' : 'border-rule'}`}>
              <div className="flex items-center gap-5">
                <button
                  onClick={handleLike}
                  className={`action-btn flex items-center gap-2 transition-colors ${isLiked ? 'liked' : ''}`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{currentPost.likes}</span>
                </button>
                <button
                  onClick={handleCollect}
                  className={`action-btn flex items-center gap-2 transition-colors ${isCollected ? 'collected' : ''}`}>
                  <Bookmark className={`w-6 h-6 ${isCollected ? 'fill-current' : ''}`} />
                  <span className="text-sm">{currentPost.collects}</span>
                </button>
                <div className={`action-btn flex items-center gap-2 ${isCollected ? '' : ''}`}>
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-sm">{currentPost.comments}</span>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent to-accent2 text-black text-xs font-medium flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>传梦</span>
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className={`text-base font-medium flex items-center gap-2 mb-3 ${textColor}`}>
              <MessageCircle className="w-5 h-5 text-accent" />
              <span>评论 ({comments.length})</span>
            </h3>
            
            <div className={`rounded-xl p-3 mb-3 border ${cardBg}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="写下你的评论..."
                  className={`flex-1 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-accent/50 border ${inputBg}`}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                  className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <SendHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {comments.length > 0 ? (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className={`rounded-xl p-3 border ${cardBg}`}>
                    <div className="flex items-start gap-3">
                      <Avatar constellation={comment.author.constellation} size="sm" showConstellation={false} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm font-medium ${textColor}`}>{comment.author.nickname}</span>
                          <span className={`text-xs ${subTextColor}`}>{formatDate(comment.createdAt)}</span>
                        </div>
                        <p className={`text-base mb-2 ${textColor}`}>{comment.content}</p>
                        <button
                          onClick={() => likeComment(comment.id)}
                          className={`flex items-center gap-1.5 text-xs transition-colors ${userLikedComments?.includes(comment.id) ? 'text-red-500' : isDark ? 'text-white/60 hover:text-red-500' : 'text-muted hover:text-red-500'}`}
                        >
                          <Heart className={`w-4 h-4 ${userLikedComments?.includes(comment.id) ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`rounded-xl p-8 text-center border ${cardBg}`}>
                <MessageCircle className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-bg3'}`} />
                <p className={`text-base ${subTextColor}`}>暂无评论</p>
                <p className={`text-xs mt-2 ${isDark ? 'text-white/40' : 'text-muted'}`}>来发表第一条评论吧</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
