import { useState, useMemo } from 'react';
import { Search, Send, Heart, HelpCircle, Share2, MessageCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Avatar } from '@/components/Avatar';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import type { MessageType, ChatSession } from '@/types';
import { MESSAGE_TYPE_CONFIG } from '@/types';

const messageTypes: MessageType[] = ['empathy', 'question', 'share'];

interface MessageProps {
  onViewChat: (session: ChatSession) => void;
}

export function Message({ onViewChat }: MessageProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState<MessageType>('empathy');
  const [inputContent, setInputContent] = useState('');
  const [showSendPanel, setShowSendPanel] = useState(false);
  
  const chatSessions = useStore((state) => state.chatSessions);
  const messages = useStore((state) => state.messages);
  const sendMessage = useStore((state) => state.sendMessage);
  const user = useStore((state) => state.user);
  const theme = useStore((state) => state.theme);

  const filteredSessions = useMemo(() => {
    if (!searchKeyword.trim()) return chatSessions;
    const lowerKeyword = searchKeyword.toLowerCase();
    return chatSessions.filter(
      (session) =>
        session.partnerName.toLowerCase().includes(lowerKeyword) ||
        session.lastMessage.toLowerCase().includes(lowerKeyword)
    );
  }, [chatSessions, searchKeyword]);

  const handleSend = () => {
    if (!inputContent.trim()) return;
    
    sendMessage({
      fromPostId: '1',
      type: selectedType,
      content: inputContent.trim(),
      sender: {
        nickname: user.nickname || '匿名星友',
        constellation: user.constellation || '星座未知',
      },
    });
    
    setInputContent('');
    setShowSendPanel(false);
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

  const typeIcons = {
    empathy: Heart,
    question: HelpCircle,
    share: Share2,
  };

  const typeColors = {
    empathy: '#4ade80',
    question: '#60a5fa',
    share: '#fbbf24',
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-ink';
  const subTextColor = isDark ? 'text-white/60' : 'text-muted';
  const cardBg = isDark ? 'bg-white/5 border-white/10' : 'bg-card-bg border-rule';

  return (
    <div className="min-h-screen pb-20">
      <GalaxyBackground />
      
      <div className="relative z-10 pt-12 px-4">
        <div className={`rounded-xl p-3 mb-3 border ${cardBg}`}>
          <div className="flex items-center gap-2">
            <Search className={`w-4 h-4 ${subTextColor}`} />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索聊天记录..."
              className={`flex-1 bg-transparent text-sm outline-none ${textColor} placeholder:text-muted/50`}
            />
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-3 mb-3">
          <h3 className="text-xs font-medium text-ink mb-2">聊天会话</h3>
          <div className="space-y-2">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => onViewChat(session)}
                  className={`flex items-center gap-3 p-2.5 rounded-lg bg-bg/50 border border-rule cursor-pointer hover:border-accent/20 transition-all`}
                >
                  <Avatar constellation={session.partnerConstellation} size="sm" showConstellation={false} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-ink">{session.partnerName}</span>
                      <span className="text-xs text-muted">{formatTime(session.lastMessageTime)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-ink truncate">{session.lastMessage}</p>
                      {session.unreadCount > 0 && (
                        <span className="flex-shrink-0 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center px-1.5 ml-2">
                          {session.unreadCount > 99 ? '99+' : session.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <MessageCircle className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-bg3'}`} />
                <p className="text-sm text-muted">暂无匹配的聊天记录</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-3 mb-3">
          <h3 className="text-xs font-medium text-ink mb-2">收到的梦信</h3>
          <div className="space-y-2">
            {messages.map((msg) => {
              const Icon = typeIcons[msg.type];
              const color = typeColors[msg.type];
              
              return (
                <div 
                  key={msg.id} 
                  className="p-2.5 rounded-lg bg-bg/50 border border-rule"
                >
                  <div className="flex items-start gap-2">
                    <Avatar constellation={msg.sender.constellation} size="sm" showConstellation={false} />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-medium text-ink">{msg.sender.nickname}</span>
                        <span 
                          className="px-1.5 py-0.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${color}20`, color }}
                        >
                          <Icon className="w-3 h-3 inline mr-1" />
                          {MESSAGE_TYPE_CONFIG[msg.type]}
                        </span>
                      </div>
                      <p className="text-xs text-ink leading-relaxed">{msg.content}</p>
                      {msg.replied && (
                        <span className="text-xs text-muted mt-1.5 inline-block">已回复</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {messages.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-muted">暂无梦信</p>
              <p className="text-xs text-muted/50 mt-1">去给心动的故事发送梦信吧</p>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setShowSendPanel(!showSendPanel)}
          className="w-full glass-card rounded-xl py-3 flex items-center justify-center gap-2 hover:border-accent/20 transition-all"
        >
          <Send className="w-4 h-4 text-accent" />
          <span className="text-accent text-sm font-medium">{showSendPanel ? '收起' : '发送梦信'}</span>
        </button>
        
        {showSendPanel && (
          <div className="glass-card rounded-xl p-3 mt-3">
            <h3 className="text-xs font-medium text-ink mb-2">选择梦信类型</h3>
            <div className="flex gap-1.5 mb-3">
              {messageTypes.map((type) => {
                const Icon = typeIcons[type];
                const color = typeColors[type];
                
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex-1 py-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                      selectedType === type 
                        ? 'border-2' 
                        : 'border border-rule'
                    }`}
                    style={{ 
                      backgroundColor: selectedType === type ? `${color}20` : 'transparent',
                      borderColor: selectedType === type ? color : undefined,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                    <span className="text-xs font-medium" style={{ color }}>
                      {MESSAGE_TYPE_CONFIG[type]}
                    </span>
                  </button>
                );
              })}
            </div>
            
            <textarea
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              placeholder="写下你想说的话..."
              className="w-full h-20 bg-transparent text-ink placeholder:text-muted/50 resize-none outline-none text-sm leading-relaxed mb-3"
            />
            
            <button
              onClick={handleSend}
              disabled={!inputContent.trim()}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent2 text-bg text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>发送</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}