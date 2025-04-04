
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { User, Bot, Check, CheckCheck } from 'lucide-react';

interface MessageProps {
  content: string;
  isCurrentUser: boolean;
  timestamp: Date;
  isBot?: boolean;
  isRead?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
}

export const Message: React.FC<MessageProps> = ({
  content,
  isCurrentUser,
  timestamp,
  isBot = false,
  isRead = false,
  status = 'sent',
}) => {
  const renderStatusIcon = () => {
    switch(status) {
      case 'sending':
        return <span className="h-3 w-3 rounded-full bg-gray-300 animate-pulse"></span>;
      case 'sent':
        return <Check className="h-3 w-3 text-gray-500" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-500" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      case 'error':
        return <span className="text-xs text-red-500">Lỗi</span>;
      default:
        return null;
    }
  };
  
  return (
    <div
      className={`flex ${
        isCurrentUser ? 'justify-end' : 'justify-start'
      } mb-4 animate-fade-in`}
    >
      {!isCurrentUser && (
        <div className="flex-shrink-0 mr-3">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
            isBot ? 'bg-blue-100' : 'bg-gray-200'
          } shadow-sm`}>
            {isBot ? (
              <Bot className="h-5 w-5 text-blue-600" />
            ) : (
              <User className="h-5 w-5 text-gray-600" />
            )}
          </div>
        </div>
      )}
      
      <div className="flex flex-col max-w-md">
        <div
          className={`py-3 px-4 rounded-lg ${
            isCurrentUser
              ? 'bg-blue-600 text-white rounded-br-none shadow-md'
              : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
          } break-words`}
        >
          {content}
        </div>
        <div
          className={`flex items-center mt-1 space-x-1 text-xs text-gray-500 ${
            isCurrentUser ? 'justify-end' : 'justify-start'
          }`}
        >
          <span>{formatDistanceToNow(timestamp, { addSuffix: true, locale: vi })}</span>
          {isCurrentUser && (
            <div className="flex items-center">
              {renderStatusIcon()}
            </div>
          )}
        </div>
      </div>
      
      {isCurrentUser && (
        <div className="flex-shrink-0 ml-3">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center shadow-sm">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}; 
