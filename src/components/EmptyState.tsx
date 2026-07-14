interface EmptyStateProps {
  type: 'posts' | 'collections' | 'messages' | 'search' | 'comments';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

const emptyStateConfig = {
  posts: {
    icon: '✍️',
    title: '还没有发布过内容',
    description: '去「说梦」写下你的第一个梦想故事吧',
    actionText: '去发布',
  },
  collections: {
    icon: '⭐',
    title: '暂无收藏',
    description: '在浏览时点击收藏，将喜欢的内容珍藏',
    actionText: '去发现',
  },
  messages: {
    icon: '💬',
    title: '暂无梦信',
    description: '给星友发送一条梦信，开启对话吧',
    actionText: '去传梦',
  },
  search: {
    icon: '🔍',
    title: '没有找到相关内容',
    description: '试试其他关键词或标签',
    actionText: undefined,
  },
  comments: {
    icon: '💭',
    title: '暂无评论',
    description: '写下第一条评论，开启讨论吧',
    actionText: undefined,
  },
};

export function EmptyState({ type, title, description, actionText, onAction }: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayActionText = actionText || config.actionText;

  return (
    <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(240, 194, 127, 0.5) 0%, rgba(167, 139, 250, 0.3) 50%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(240, 194, 127, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)',
            boxShadow: '0 0 30px rgba(240, 194, 127, 0.15)',
          }}
        >
          <span className="text-4xl opacity-80">{config.icon}</span>
        </div>

        <h3 className="text-base font-medium text-ink mb-2">{displayTitle}</h3>
        <p className="text-xs text-muted mb-6 leading-relaxed">{displayDescription}</p>

        {displayActionText && onAction && (
          <button
            onClick={onAction}
            className="px-6 py-2.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(240, 194, 127, 0.2) 0%, rgba(232, 168, 124, 0.2) 100%)',
              border: '1px solid rgba(240, 194, 127, 0.3)',
              color: '#f0c27f',
              boxShadow: '0 4px 15px rgba(240, 194, 127, 0.1)',
            }}
          >
            {displayActionText}
          </button>
        )}
      </div>
    </div>
  );
}
