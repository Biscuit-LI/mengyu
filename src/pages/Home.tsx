import { useStore } from '@/store/useStore';
import { DreamCard } from '@/components/DreamCard';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { SkeletonCard } from '@/components/Skeleton';

interface HomeProps {
  onViewPost: (postId: string) => void;
}

export function Home({ onViewPost }: HomeProps) {
  const posts = useStore((state) => state.posts);
  const likePost = useStore((state) => state.likePost);
  const collectPost = useStore((state) => state.collectPost);
  const setCurrentTab = useStore((state) => state.setCurrentTab);
  const userCollections = useStore((state) => state.user.collections);
  const userLikedPosts = useStore((state) => state.user.likedPosts);

  const handleMessage = () => {
    setCurrentTab(3);
  };

  if (posts.length === 0) {
    return (
      <div className="min-h-screen pb-20">
        <GalaxyBackground />
        <div className="relative z-10 pt-11 px-3 py-3 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <GalaxyBackground />
      
      <div className="relative z-10 pt-11">
        <div className="z-20 backdrop-blur-md bg-bg/80 border-b border-rule">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-base font-bold text-ink">今日精选</h2>
              <p className="text-xs text-muted">共 {posts.length} 条梦话</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-accent">实时更新</span>
            </div>
          </div>
        </div>
        
        <div className="px-3 py-3 space-y-3">
          {posts.map((post) => (
            <DreamCard
              key={post.id}
              post={post}
              isCollected={userCollections.includes(post.id)}
              isLiked={userLikedPosts?.includes(post.id)}
              onLike={() => likePost(post.id)}
              onCollect={() => collectPost(post.id)}
              onView={() => onViewPost(post.id)}
              onMessage={handleMessage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
