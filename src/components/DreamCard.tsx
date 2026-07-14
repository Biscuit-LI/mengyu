import { useState, memo } from 'react';
import { Heart, Bookmark, Send, Eye, MessageCircle, FileText } from 'lucide-react';
import type { DreamPost } from '@/types';
import { MOOD_CONFIG } from '@/types';
import { Avatar } from './Avatar';
import { MoodTag } from './MoodTag';

interface DreamCardProps {
  post: DreamPost;
  isCollected?: boolean;
  isLiked?: boolean;
  onLike: () => void;
  onCollect: () => void;
  onView: () => void;
  onMessage: () => void;
}

const DreamCard = memo(function DreamCardComponent({ post, isCollected, isLiked, onLike, onCollect, onView, onMessage }: DreamCardProps) {
  const [liked, setLiked] = useState(isLiked || false);
  const [isPressing, setIsPressing] = useState(false);
  
  const moodConfig = MOOD_CONFIG[post.mood];
  const isArticle = post.postType === 'article';
  const previewContent = isArticle && post.content.length > 120 
    ? post.content.slice(0, 120) + '...' 
    : post.content;

  const handleLike = () => {
    setLiked(!liked);
    onLike();
  };

  const handleCardClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    onView();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`glass-card rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${isPressing ? 'scale-[0.98]' : ''}`}
      onClick={handleCardClick}
      onTouchStart={() => setIsPressing(true)}
      onTouchEnd={() => setIsPressing(false)}
      onMouseDown={() => setIsPressing(true)}
      onMouseUp={() => setIsPressing(false)}
      onMouseLeave={() => setIsPressing(false)}
    >
      <div className="relative h-20 bg-gradient-to-br from-accent/10 to-accent2/10 flex items-center justify-center border-b border-rule">
        <div className="relative">
          <div className="w-9 h-9 rounded-full border-2 border-accent/30 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent2/40 animate-pulse" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-ink/30" />
        </div>
        {isArticle && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-accent/20 border border-accent/30 flex items-center gap-1">
            <FileText className="w-2.5 h-2.5 text-accent" />
            <span className="text-[10px] text-accent font-medium">文章</span>
          </div>
        )}
        <span className="absolute bottom-2 text-[10px] text-muted/60">未添加图片 · 仅演示</span>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar constellation={post.author.constellation} size="sm" showConstellation={false} />
            <div>
              <p className="text-xs font-medium text-ink">{post.author.nickname}</p>
              <p className="text-xs text-muted">{post.author.constellation}</p>
            </div>
          </div>
          <MoodTag mood={post.mood} size="sm" />
        </div>
        
        {isArticle && post.title && (
          <h3 className="text-sm font-bold text-ink mb-2 leading-snug">{post.title}</h3>
        )}
        
        <p 
          className={`text-ink text-sm leading-relaxed mb-3 ${isArticle ? 'whitespace-pre-wrap' : ''}`}
          style={{ color: moodConfig.color }}
        >
          {previewContent}
        </p>
        
        {isArticle && post.content.length > 120 && (
          <button
            onClick={onView}
            className="text-xs text-accent hover:underline mb-2"
          >
            查看全文
          </button>
        )}
        
        {post.hasJourney && post.journey && (
          <div className="mb-3 p-2 rounded-lg bg-bg/50 border border-rule">
            <p className="text-xs text-muted mb-1.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              追梦历程 · {post.journey.length}个阶段
            </p>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {post.journey.slice(0, 3).map((step, index) => (
                <span 
                  key={index}
                  className="flex-shrink-0 px-2 py-0.5 rounded-lg bg-bg2 text-xs text-muted border border-rule"
                >
                  {step.timestamp}
                </span>
              ))}
              {post.journey.length > 3 && (
                <span className="flex-shrink-0 px-2 py-0.5 rounded-lg bg-bg2 text-xs text-muted border border-rule">
                  ...
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-rule">
          <div className="flex items-center gap-3">
            <button
            onClick={(e) => { handleButtonClick(e); handleLike(); }}
            className={`action-btn flex items-center gap-1 text-xs transition-all duration-200 ${liked ? 'liked' : ''}`}
          >
            <Heart className={`w-4 h-4 transition-transform duration-300 ${liked ? 'fill-current scale-125' : ''}`} />
            {post.likes + (liked ? (isLiked ? 0 : 1) : (isLiked ? -1 : 0))}
          </button>
          <button
            onClick={(e) => { handleButtonClick(e); onCollect(); }}
            className={`action-btn flex items-center gap-1 text-xs transition-all duration-200 ${isCollected ? 'collected' : ''}`}
          >
            <Bookmark className={`w-4 h-4 ${isCollected ? 'fill-current' : ''}`} />
            {post.collects}
          </button>
          <button
            onClick={(e) => { handleButtonClick(e); onView(); }}
            className="action-btn flex items-center gap-1 text-xs transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            {post.comments}
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => { handleButtonClick(e); onView(); }}
            className="action-btn w-7 h-7 rounded-full bg-bg2/80 flex items-center justify-center transition-all hover:bg-bg2"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { handleButtonClick(e); onMessage(); }}
            className="action-btn w-7 h-7 rounded-full bg-bg2/80 flex items-center justify-center transition-all hover:bg-bg2"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        </div>
      </div>
    </div>
  );
});

export { DreamCard };
