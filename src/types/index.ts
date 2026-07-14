export type MoodTag = 'chasing' | 'living' | 'daily' | 'venting' | 'lost' | 'healing';

export type PostType = 'dream' | 'article';

export type LifeDirection = 'career-change' | 'relocation' | 'startup' | 'education' | 'lifestyle';

export type MessageType = 'empathy' | 'question' | 'share';

export interface Author {
  nickname: string;
  constellation: string;
}

export interface DreamJourney {
  timestamp: string;
  title: string;
  description: string;
  advice?: string;
}

export interface DreamComment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  likes: number;
  createdAt: string;
}

export interface DreamPost {
  id: string;
  author: Author;
  mood: MoodTag;
  postType: PostType;
  title?: string;
  content: string;
  images?: string[];
  hasJourney: boolean;
  journey?: DreamJourney[];
  likes: number;
  collects: number;
  comments: number;
  createdAt: string;
}

export interface DreamMessage {
  id: string;
  fromPostId: string;
  type: MessageType;
  content: string;
  sender: Author;
  createdAt: string;
  replied?: boolean;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  content: string;
  senderId: string;
  senderName: string;
  senderConstellation: string;
  isMine: boolean;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerConstellation: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface User {
  nickname: string;
  constellation: string;
  joinedAt: string;
  posts: string[];
  collections: string[];
  messages: string[];
  likedPosts: string[];
  likedComments: string[];
}

export interface MoodConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const MOOD_CONFIG: Record<MoodTag, MoodConfig> = {
  chasing: { label: '追梦', color: '#a78bfa', bgColor: 'rgba(167,139,250,0.08)', borderColor: 'rgba(167,139,250,0.3)' },
  living: { label: '圆梦', color: '#fbbf24', bgColor: 'rgba(251,191,36,0.08)', borderColor: 'rgba(251,191,36,0.3)' },
  daily: { label: '日常', color: '#34d399', bgColor: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.3)' },
  venting: { label: '吐槽', color: '#f87171', bgColor: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.3)' },
  lost: { label: '迷茫', color: '#60a5fa', bgColor: 'rgba(96,165,250,0.08)', borderColor: 'rgba(96,165,250,0.3)' },
  healing: { label: '治愈', color: '#4ade80', bgColor: 'rgba(74,222,128,0.08)', borderColor: 'rgba(74,222,128,0.3)' },
};

export const MESSAGE_TYPE_CONFIG: Record<MessageType, string> = {
  empathy: '共鸣',
  question: '提问',
  share: '分享',
};
