import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { User, Bot } from 'lucide-react';

interface MessageProps {
  content: string;
  isCurrentUser: boolean;
  timestamp: Date;
  isBot?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  content,
  isCurrentUser,
  timestamp,
  isBot = false,
}) => {
  return (
    <div
      className={`flex ${
        isCurrentUser ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      {!isCurrentUser && (
        <div className="flex-shrink-0 mr-3">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
            isBot ? 'bg-blue-100' : 'bg-gray-200'
          }`}>
            {isBot ? (
              <Bot className="h-5 w-5 text-blue-600" />
            ) : (
              <User className="h-5 w-5 text-gray-600" />
            )}
          </div>
        </div>
      )}
      
      <div className="flex flex-col">
        <div
          className={`py-3 px-4 rounded-lg ${
            isCurrentUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          } max-w-md break-words`}
        >
          {content}
        </div>
        <span
          className={`text-xs mt-1 text-gray-500 ${
            isCurrentUser ? 'text-right' : 'text-left'
          }`}
        >
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
      </div>
      
      {isCurrentUser && (
        <div className="flex-shrink-0 ml-3">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}; 