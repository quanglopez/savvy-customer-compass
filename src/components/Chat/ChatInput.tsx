
import React, { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { toast } from 'sonner';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isUploading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = 'Nhập tin nhắn...',
  disabled = false,
  isUploading = false,
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [message]);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isUploading) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !disabled && !isUploading) {
        onSendMessage(message.trim());
        setMessage('');
        
        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    }
  };

  const isButtonDisabled = !message.trim() || disabled || isUploading;
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex items-end bg-gray-50 rounded-lg p-1">
        <button 
          type="button" 
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full transition-colors"
          onClick={() => toast.info("Tính năng đính kèm file sẽ sớm được phát triển")}
        >
          <Paperclip className="h-5 w-5" />
        </button>
        
        <div className="relative flex-1 mx-1">
          <textarea
            ref={textareaRef}
            className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[60px] bg-white transition-all duration-200"
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isUploading}
            style={{ 
              maxHeight: '150px',
              minHeight: '60px',
              height: 'auto'
            }}
          />
        </div>

        <button 
          type="button" 
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full transition-colors mr-1"
          onClick={() => toast.info("Tính năng emoji sẽ sớm được phát triển")}
        >
          <Smile className="h-5 w-5" />
        </button>
        
        <button
          type="submit"
          className={`p-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isButtonDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:scale-105'
          }`}
          disabled={isButtonDisabled}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      
      {isUploading && (
        <div className="mt-2 text-center text-sm text-gray-500">
          <span className="inline-block animate-pulse">Đang tải tệp đính kèm...</span>
        </div>
      )}
    </form>
  );
}; 
