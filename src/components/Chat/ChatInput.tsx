import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = 'Type your message...',
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !disabled) {
        onSendMessage(message.trim());
        setMessage('');
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-end">
      <div className="relative flex-1">
        <textarea
          className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[60px]"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          style={{ 
            maxHeight: '150px',
            minHeight: '60px',
            height: 'auto'
          }}
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-600 text-white p-3 rounded-r-md h-[60px] flex items-center justify-center ${
          !message.trim() || disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-blue-700'
        }`}
        disabled={!message.trim() || disabled}
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}; 