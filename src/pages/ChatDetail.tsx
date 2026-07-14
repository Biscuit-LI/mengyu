import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Avatar } from '@/components/Avatar';
import type { ChatSession } from '@/types';

interface ChatDetailProps {
  session: ChatSession;
  onClose: () => void;
}

export function ChatDetail({ session, onClose }: ChatDetailProps) {
  const [inputContent, setInputContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const sendChatMessage = useStore((state) => state.sendChatMessage);
  const theme = useStore((state) => state.theme);
  
  const currentSession = useStore((state) => state.chatSessions.find(s => s.id === session.id)) || session;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession.messages]);

  const handleSend = () => {
    if (!inputContent.trim()) return;
    sendChatMessage(session.id, inputContent.trim());
    setInputContent('');
  };

  const formatTimeSeparator = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const diffDays = Math.floor((today.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      if (diffDays === 0) {
        return `今天 ${hours}:${minutes}`;
      } else if (diffDays === 1) {
        return `昨天 ${hours}:${minutes}`;
      } else {
        return `${date.getMonth() + 1}月${date.getDate()}日 ${hours}:${minutes}`;
      }
    } catch {
      return '';
    }
  };

  const shouldShowTimeSeparator = (prevMsgDate: string | undefined, currMsgDate: string) => {
    if (!prevMsgDate) return true;
    try {
      const prevDate = new Date(prevMsgDate);
      const currDate = new Date(currMsgDate);
      const diffMinutes = Math.abs((currDate.getTime() - prevDate.getTime()) / (1000 * 60));
      return diffMinutes >= 5;
    } catch {
      return true;
    }
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-ink';
  const subTextColor = isDark ? 'text-white/60' : 'text-muted';
  const bgColor = isDark ? 'bg-[#0f0f1a]' : 'bg-bg';
  const inputBg = isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-card-bg border-rule text-ink placeholder:text-muted';

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col ${bgColor} pt-11`}>
      <div className={`backdrop-blur-md border-b flex-shrink-0 ${isDark ? 'bg-[rgba(15,15,26,0.95)] border-white/10' : 'bg-card-bg/95 border-rule'}`}>
        <div className="flex items-center justify-between h-10 px-3">
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 text-white/60 hover:text-white' : 'bg-bg2 text-muted hover:text-ink'}`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Avatar constellation={session.partnerConstellation} size="sm" showConstellation={false} />
            <div className="text-left">
              <h1 className={`font-serif text-sm font-bold ${textColor}`}>{session.partnerName}</h1>
              <p className={`text-[10px] ${subTextColor}`}>{session.partnerConstellation}</p>
            </div>
          </div>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 text-white/60 hover:text-white' : 'bg-bg2 text-muted hover:text-ink'}`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-3 relative z-10">
        <div className="space-y-2">
          {currentSession.messages.map((msg, index) => {
            const prevMsg = index > 0 ? currentSession.messages[index - 1] : null;
            const showTimeSeparator = shouldShowTimeSeparator(prevMsg?.createdAt, msg.createdAt);
            
            return (
              <div key={msg.id}>
                {showTimeSeparator && (
                  <div className="flex justify-center mb-2">
                    <div className={`px-3 py-1 rounded-full text-[10px] ${isDark ? 'bg-white/10 text-white/50' : 'bg-bg2 text-muted'}`}>
                      {formatTimeSeparator(msg.createdAt)}
                    </div>
                  </div>
                )}
                <div className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-1.5 max-w-[70%] ${msg.isMine ? 'flex-row-reverse' : ''}`}>
                    {!msg.isMine && (
                      <Avatar constellation={msg.senderConstellation} size="sm" showConstellation={false} />
                    )}
                    <div className={`rounded-xl px-3 py-2 ${msg.isMine ? 'bg-gradient-to-r from-accent to-accent2 text-black rounded-br-sm' : isDark ? 'bg-white/10 text-white/90 rounded-bl-sm' : 'bg-card-bg text-ink rounded-bl-sm'}`}>
                      {!msg.isMine && (
                        <span className={`text-[10px] ${subTextColor} block mb-1`}>
                          {msg.senderName}
                        </span>
                      )}
                      <p className="text-xs leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className={`backdrop-blur-md border-t flex-shrink-0 ${isDark ? 'bg-[rgba(15,15,26,0.95)] border-white/10' : 'bg-card-bg/95 border-rule'}`}>
        <div className="px-3 py-2">
          <div className="flex gap-2 items-end">
            <input
              type="text"
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              placeholder="发送消息..."
              className={`flex-1 rounded-full px-3 py-2 text-xs focus:outline-none focus:border-accent/50 border ${inputBg}`}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!inputContent.trim()}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-accent to-accent2 flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}