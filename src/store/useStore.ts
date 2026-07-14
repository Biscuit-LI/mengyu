import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DreamPost, DreamMessage, DreamComment, User, MoodTag, ChatSession, ChatMessage } from '@/types';
import { mockPosts, mockMessages, mockComments, mockChatSessions } from '@/data/mock-data';
import { generateNickname } from '@/utils/anonymous';
import { getRandomConstellation } from '@/utils/constellation';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface StoreState {
  posts: DreamPost[];
  messages: DreamMessage[];
  comments: DreamComment[];
  chatSessions: ChatSession[];
  user: User;
  currentTab: number;
  selectedMoodFilter: MoodTag | 'all';
  theme: 'dark' | 'light';
  toasts: Toast[];
  
  setCurrentTab: (tab: number) => void;
  setSelectedMoodFilter: (mood: MoodTag | 'all') => void;
  setTheme: (theme: 'dark' | 'light') => void;
  
  likePost: (postId: string) => void;
  collectPost: (postId: string) => void;
  
  addPost: (post: Omit<DreamPost, 'id' | 'createdAt' | 'likes' | 'collects' | 'comments'>) => void;
  
  sendMessage: (message: Omit<DreamMessage, 'id' | 'createdAt'>) => void;
  
  addComment: (comment: Omit<DreamComment, 'id' | 'createdAt'>) => void;
  likeComment: (commentId: string) => void;
  getCommentsByPostId: (postId: string) => DreamComment[];
  
  sendChatMessage: (sessionId: string, content: string) => void;
  getChatSessionById: (sessionId: string) => ChatSession | undefined;
  searchChatSessions: (keyword: string) => ChatSession[];
  
  initializeUser: () => void;
  setUser: (user: User) => void;
  
  getFilteredPosts: (mood?: MoodTag | 'all') => DreamPost[];
  getPostById: (id: string) => DreamPost | undefined;
  getMessagesByPostId: (postId: string) => DreamMessage[];
  getUserCollections: () => DreamPost[];
  getUserPosts: () => DreamPost[];
  
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist((set, get) => ({
  posts: mockPosts,
  messages: mockMessages,
  comments: mockComments,
  chatSessions: mockChatSessions,
  user: {
    nickname: '',
    constellation: '',
    joinedAt: new Date().toISOString(),
    posts: [],
    collections: [],
    messages: [],
    likedPosts: [],
    likedComments: [],
  },
  currentTab: 0,
  selectedMoodFilter: 'all' as const,
  theme: 'dark' as const,
  toasts: [],
  
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  setSelectedMoodFilter: (mood) => set({ selectedMoodFilter: mood }),
  
  setTheme: (theme) => {
    set({ theme });
    document.documentElement.setAttribute('data-theme', theme);
    window.dispatchEvent(new Event('data-theme-change'));
  },
  
  likePost: (postId) => set((state) => {
    const isLiked = state.user.likedPosts?.includes(postId);
    return {
      user: {
        ...state.user,
        likedPosts: isLiked
          ? state.user.likedPosts?.filter((id) => id !== postId)
          : [...(state.user.likedPosts || []), postId],
      },
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, likes: isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      ),
    };
  }),
  
  collectPost: (postId) => set((state) => {
    const isCollected = state.user.collections.includes(postId);
    return {
      user: {
        ...state.user,
        collections: isCollected
          ? state.user.collections.filter((id) => id !== postId)
          : [...state.user.collections, postId],
      },
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, collects: isCollected ? post.collects - 1 : post.collects + 1 }
          : post
      ),
    };
  }),
  
  addPost: (newPost) => set((state) => {
    const postId = Date.now().toString();
    return {
      posts: [
        {
          ...newPost,
          id: postId,
          createdAt: new Date().toISOString(),
          likes: 0,
          collects: 0,
          comments: 0,
        },
        ...state.posts,
      ],
      user: {
        ...state.user,
        posts: [postId, ...state.user.posts],
      },
    };
  }),
  
  sendMessage: (newMessage) => set((state) => {
    const msgId = `m${Date.now()}`;
    return {
      messages: [
        {
          ...newMessage,
          id: msgId,
          createdAt: new Date().toISOString(),
        },
        ...state.messages,
      ],
      user: {
        ...state.user,
        messages: [msgId, ...state.user.messages],
      },
    };
  }),
  
  addComment: (newComment) => set((state) => ({
    comments: [
      {
        ...newComment,
        id: `c${Date.now()}`,
        createdAt: new Date().toISOString(),
      },
      ...state.comments,
    ],
    posts: state.posts.map((post) =>
      post.id === newComment.postId
        ? { ...post, comments: post.comments + 1 }
        : post
    ),
  })),
  
  likeComment: (commentId) => set((state) => {
    const isLiked = state.user.likedComments?.includes(commentId);
    return {
      user: {
        ...state.user,
        likedComments: isLiked
          ? state.user.likedComments?.filter((id) => id !== commentId)
          : [...(state.user.likedComments || []), commentId],
      },
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: isLiked ? comment.likes - 1 : comment.likes + 1 }
          : comment
      ),
    };
  }),
  
  getCommentsByPostId: (postId) =>
    get().comments.filter((comment) => comment.postId === postId),
  
  sendChatMessage: (sessionId, content) => set((state) => {
    const { user } = state;
    const newMessage: ChatMessage = {
      id: `cm${Date.now()}`,
      sessionId,
      content,
      senderId: 'me',
      senderName: user.nickname || '我',
      senderConstellation: user.constellation || '未知',
      isMine: true,
      createdAt: new Date().toISOString(),
    };
    
    return {
      chatSessions: state.chatSessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              lastMessage: content,
              lastMessageTime: new Date().toISOString(),
              messages: [...session.messages, newMessage],
            }
          : session
      ),
    };
  }),
  
  getChatSessionById: (sessionId) =>
    get().chatSessions.find((session) => session.id === sessionId),
  
  searchChatSessions: (keyword) => {
    const { chatSessions } = get();
    if (!keyword.trim()) return chatSessions;
    const lowerKeyword = keyword.toLowerCase();
    return chatSessions.filter(
      (session) =>
        session.partnerName.toLowerCase().includes(lowerKeyword) ||
        session.lastMessage.toLowerCase().includes(lowerKeyword)
    );
  },
  
  initializeUser: () => set((state) => {
    const needsInit = !state.user.nickname || !state.user.constellation;
    if (!needsInit) return state;
    
    const nickname = generateNickname();
    const constellation = getRandomConstellation();
    const now = new Date();
    
    const userPosts = [
      {
        id: 'my_post_1',
        author: { nickname, constellation },
        mood: 'chasing' as const,
        postType: 'dream' as const,
        content: '昨晚做了一个很奇怪的梦，梦见自己在云端行走，脚下是柔软的棉花糖。醒来后还能记得那种轻盈的感觉，真希望每天都能做这样的梦。',
        images: [],
        hasJourney: false,
        likes: 42,
        collects: 8,
        comments: 3,
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'my_post_2',
        author: { nickname, constellation },
        mood: 'living' as const,
        postType: 'article' as const,
        title: '关于梦想的一点思考',
        content: '人活着，总要有一点梦想吧。哪怕它很小，很不切实际。梦想就像夜空中的星星，也许我们永远无法触及，但它会指引我们前行的方向。',
        images: [],
        hasJourney: false,
        likes: 89,
        collects: 23,
        comments: 7,
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'my_post_3',
        author: { nickname, constellation },
        mood: 'healing' as const,
        postType: 'dream' as const,
        content: '今天去公园散步，看到一只小猫在草地上打滚。阳光洒在它身上，毛茸茸的特别可爱。那一刻，所有的烦恼都消失了。生活中的小确幸，就是这么简单。',
        images: [],
        hasJourney: false,
        likes: 156,
        collects: 45,
        comments: 12,
        createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    
    const userComments = [
      { id: 'mc1', postId: 'my_post_1', author: { nickname: '浪漫的彗星', constellation: '白羊座' }, content: '云端行走的感觉一定很奇妙！', likes: 12, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc2', postId: 'my_post_1', author: { nickname: '温柔的晨曦', constellation: '双鱼座' }, content: '这个梦好美，让人向往。', likes: 8, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 3600000).toISOString() },
      { id: 'mc3', postId: 'my_post_1', author: { nickname: '闪烁的星轨', constellation: '天秤座' }, content: '我也做过类似的梦，漂浮在空中', likes: 5, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      
      { id: 'mc4', postId: 'my_post_2', author: { nickname: '深邃的星海', constellation: '天蝎座' }, content: '写得真好！梦想确实很重要。', likes: 23, createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc5', postId: 'my_post_2', author: { nickname: '温暖的星光', constellation: '巨蟹座' }, content: '每个人都有自己的星星，加油！', likes: 18, createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 7200000).toISOString() },
      { id: 'mc6', postId: 'my_post_2', author: { nickname: '梦幻的星云', constellation: '双鱼座' }, content: '哪怕遥不可及，也要仰望星空。', likes: 15, createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc7', postId: 'my_post_2', author: { nickname: '灿烂的星河', constellation: '双子座' }, content: '说得太对了，梦想指引方向。', likes: 12, createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 5400000).toISOString() },
      { id: 'mc8', postId: 'my_post_2', author: { nickname: '闪耀的金星', constellation: '狮子座' }, content: '共勉！', likes: 9, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc9', postId: 'my_post_2', author: { nickname: '神秘的黑洞', constellation: '摩羯座' }, content: '现实很残酷，但梦想不能丢。', likes: 11, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000 + 9000000).toISOString() },
      { id: 'mc10', postId: 'my_post_2', author: { nickname: '银河', constellation: '白羊座' }, content: '写得很有哲理！', likes: 7, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      
      { id: 'mc11', postId: 'my_post_3', author: { nickname: '极光', constellation: '狮子座' }, content: '小猫治愈一切！', likes: 34, createdAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc12', postId: 'my_post_3', author: { nickname: '朦胧的月光', constellation: '巨蟹座' }, content: '生活中的小确幸最珍贵。', likes: 28, createdAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000 + 43200000).toISOString() },
      { id: 'mc13', postId: 'my_post_3', author: { nickname: '孤独的行星', constellation: '水瓶座' }, content: '看到小动物心情就会变好', likes: 22, createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc14', postId: 'my_post_3', author: { nickname: '永恒的星环', constellation: '金牛座' }, content: '小确幸确实很重要。', likes: 19, createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000 + 7200000).toISOString() },
      { id: 'mc15', postId: 'my_post_3', author: { nickname: '暖心的月光', constellation: '双鱼座' }, content: '羡慕你能遇到这么可爱的小猫！', likes: 15, createdAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc16', postId: 'my_post_3', author: { nickname: '璀璨的星芒', constellation: '射手座' }, content: '我家猫也是这样，每天都很治愈。', likes: 21, createdAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000 + 10800000).toISOString() },
      { id: 'mc17', postId: 'my_post_3', author: { nickname: '星尘', constellation: '天蝎座' }, content: '公园散步是个好习惯。', likes: 13, createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc18', postId: 'my_post_3', author: { nickname: '星夜', constellation: '水瓶座' }, content: '治愈系的帖子，点赞！', likes: 17, createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000 + 5400000).toISOString() },
      { id: 'mc19', postId: 'my_post_3', author: { nickname: '流星雨', constellation: '巨蟹座' }, content: '阳光、小猫、草地，太美好了。', likes: 25, createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc20', postId: 'my_post_3', author: { nickname: '仙女座', constellation: '双鱼座' }, content: '小确幸就是幸福的源泉。', likes: 14, createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000 + 86400000).toISOString() },
      { id: 'mc21', postId: 'my_post_3', author: { nickname: '天狼星', constellation: '天秤座' }, content: '这种瞬间最让人感动。', likes: 16, createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'mc22', postId: 'my_post_3', author: { nickname: '北极星', constellation: '金牛座' }, content: '谢谢你分享这么温暖的瞬间。', likes: 18, createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000 + 43200000).toISOString() },
    ];
    
    return {
      posts: [...userPosts, ...state.posts],
      comments: [...userComments, ...state.comments],
      user: {
        ...state.user,
        nickname,
        constellation,
        joinedAt: new Date().toISOString(),
        posts: ['my_post_1', 'my_post_2', 'my_post_3'],
        collections: ['2', '4', '5'],
        messages: state.user.messages || [],
        likedPosts: state.user.likedPosts || [],
        likedComments: state.user.likedComments || [],
      },
    };
  }),
  
  setUser: (newUser) => set((state) => {
    const oldNickname = state.user.nickname;
    
    return {
      user: newUser,
      posts: state.posts.map((post) => {
        if (post.author.nickname === oldNickname) {
          return {
            ...post,
            author: {
              ...post.author,
              nickname: newUser.nickname,
              constellation: newUser.constellation,
            },
          };
        }
        return post;
      }),
    };
  }),
  
  getFilteredPosts: (mood = get().selectedMoodFilter) => {
    const { posts } = get();
    if (mood === 'all') return posts;
    return posts.filter((post) => post.mood === mood);
  },
  
  getPostById: (id) => get().posts.find((post) => post.id === id),
  
  getMessagesByPostId: (postId) =>
    get().messages.filter((msg) => msg.fromPostId === postId),
  
  getUserCollections: () =>
    get().posts.filter((post) => get().user.collections.includes(post.id)),
  
  getUserPosts: () => {
    const { posts, user } = get();
    if (!user.nickname) return [];
    return posts.filter((post) => post.author.nickname === user.nickname);
  },
  
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { ...toast, id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }],
  })),
  
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((toast) => toast.id !== id),
  })),
}), {
  name: 'mengyu-storage',
  partialize: (state) => ({
    user: state.user,
    theme: state.theme,
    posts: state.posts,
    comments: state.comments,
    chatSessions: state.chatSessions,
    messages: state.messages,
    currentTab: state.currentTab,
  }),
}));
