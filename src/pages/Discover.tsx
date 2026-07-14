import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { DreamCard } from '@/components/DreamCard';
import { MoodTag } from '@/components/MoodTag';
import type { MoodTag as MoodTagType } from '@/types';

const moods: MoodTagType[] = ['chasing', 'living', 'daily', 'venting', 'lost', 'healing'];

interface DiscoverProps {
  onViewPost: (postId: string) => void;
}

export function Discover({ onViewPost }: DiscoverProps) {
  const [activeTab, setActiveTab] = useState<'dream' | 'journey'>('dream');
  const [selectedMood, setSelectedMood] = useState<MoodTagType | 'all'>('all');
  const [searchText, setSearchText] = useState('');
  
  const posts = useStore((state) => state.posts);
  const likePost = useStore((state) => state.likePost);
  const collectPost = useStore((state) => state.collectPost);
  const setCurrentTab = useStore((state) => state.setCurrentTab);
  const userCollections = useStore((state) => state.user.collections);
  const userLikedPosts = useStore((state) => state.user.likedPosts);

  const filteredPosts = posts.filter(post => {
    const matchMood = selectedMood === 'all' || post.mood === selectedMood;
    const matchSearch = !searchText || 
      post.content.toLowerCase().includes(searchText.toLowerCase()) ||
      post.author.nickname.toLowerCase().includes(searchText.toLowerCase());
    return matchMood && matchSearch;
  });
  
  const journeyPosts = posts.filter(p => p.hasJourney && (!searchText || 
    p.content.toLowerCase().includes(searchText.toLowerCase()) ||
    p.author.nickname.toLowerCase().includes(searchText.toLowerCase())));

  const handleLike = (postId: string) => {
    likePost(postId);
  };

  const handleCollect = (postId: string) => {
    collectPost(postId);
  };

  const handleMessage = () => {
    setCurrentTab(3);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="relative z-10 pt-12 px-3">
        <div className="glass-card rounded-xl p-2 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-muted" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="搜索梦话..."
            className="flex-1 bg-transparent text-base text-ink placeholder:text-muted outline-none"
          />
          {searchText && (
            <button onClick={() => setSearchText('')} className="text-muted hover:text-ink transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2 mb-4 p-1 glass-card rounded-lg">
          <button
            onClick={() => setActiveTab('dream')}
            className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === 'dream' 
                ? 'bg-accent text-bg' 
                : 'text-muted hover:text-ink'
            }`}
          >
            梦话广场
          </button>
          <button
            onClick={() => setActiveTab('journey')}
            className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === 'journey' 
                ? 'bg-accent text-bg' 
                : 'text-muted hover:text-ink'
            }`}
          >
            追梦经验
          </button>
        </div>
        
        <div className="flex gap-2 mb-4 overflow-x-auto galaxy-scrollbar">
          <button
            onClick={() => setSelectedMood('all')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedMood === 'all'
                ? 'bg-accent text-bg'
                : 'glass-card text-muted hover:text-accent'
            }`}
          >
            全部
          </button>
          {moods.map((mood) => (
            <MoodTag
              key={mood}
              mood={mood}
              selected={selectedMood === mood}
              onClick={() => setSelectedMood(mood)}
            />
          ))}
        </div>
        
        <div className="space-y-3">
          {(activeTab === 'dream' ? filteredPosts : journeyPosts).map((post) => (
            <DreamCard
              key={post.id}
              post={post}
              isCollected={userCollections.includes(post.id)}
              isLiked={userLikedPosts?.includes(post.id)}
              onLike={() => handleLike(post.id)}
              onCollect={() => handleCollect(post.id)}
              onView={() => onViewPost(post.id)}
              onMessage={handleMessage}
            />
          ))}
        </div>
        
        {(activeTab === 'dream' ? filteredPosts : journeyPosts).length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted text-sm">暂无相关梦话</p>
          </div>
        )}
      </div>
    </div>
  );
}
