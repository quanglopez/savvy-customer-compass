import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { format } from 'date-fns';
import { User, ArrowLeft, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';
import { Message } from './Message';
import { ChatInput } from './ChatInput';

interface ChatMessage {
  _id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isBot: boolean;
}

interface ChatSession {
  _id: string;
  businessId: {
    _id: string;
    businessName: string;
  };
  userId: {
    _id: string;
    email: string;
  };
  messages: ChatMessage[];
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const BusinessChat: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chat, setChat] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChatClosed, setIsChatClosed] = useState(false);
  const socketRef = useRef<Socket>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to Socket.IO server
    socketRef.current = io(API_URL);

    // Join chat room
    if (chatId) {
      socketRef.current.emit('join_room', chatId);
    }

    // Listen for new messages
    socketRef.current.on('receive_message', (message: ChatMessage) => {
      setChat(prevChat => {
        if (!prevChat) return null;
        
        return {
          ...prevChat,
          messages: [...prevChat.messages, message]
        };
      });
    });

    // Fetch chat details
    const fetchChat = async () => {
      try {
        const response = await fetch(`${API_URL}/api/chat/${chatId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chat');
        }

        const data = await response.json();
        setChat(data);
        setIsChatClosed(data.status === 'closed');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChat();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  const handleSendMessage = async (content: string) => {
    if (!socketRef.current || !user || !chat || isChatClosed) return;

    const newMessage = {
      sender: user.id,
      content,
      timestamp: new Date(),
      isBot: false,
    };

    try {
      // Emit message through socket
      socketRef.current.emit('send_message', {
        roomId: chatId,
        ...newMessage,
      });

      // Save message to database
      await fetch(`${API_URL}/api/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newMessage),
      });
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  const handleCloseChat = async () => {
    try {
      const response = await fetch(`${API_URL}/api/chat/${chatId}/close`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to close chat');
      }

      setIsChatClosed(true);
      toast.success('Chat has been closed');
    } catch (err) {
      toast.error('Failed to close chat');
    }
  };

  const handleBack = () => {
    navigate('/dashboard/chats');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !chat) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        <p className="font-semibold">Error loading chat</p>
        <p>{error || 'Chat not found'}</p>
        <button
          onClick={handleBack}
          className="mt-4 bg-white text-red-700 px-4 py-2 rounded border border-red-300 hover:bg-red-50"
        >
          Back to Chat List
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat header */}
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-1 rounded-full hover:bg-gray-100"
            title="Back to chats"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <div className="font-medium">{chat.userId?.email || 'Unknown User'}</div>
              <div className="text-xs text-gray-500">
                Started {format(new Date(chat.createdAt), 'MMM d, yyyy')}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              chat.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {chat.status === 'active' ? 'Active' : 'Closed'}
          </span>
          {chat.status === 'active' && (
            <button
              onClick={handleCloseChat}
              className="p-1 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
              title="Close chat"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-gray-400 mb-2">No messages yet</div>
            <p className="text-sm text-gray-500">Send a message to start the conversation.</p>
          </div>
        ) : (
          chat.messages.map((message) => (
            <Message
              key={message._id}
              content={message.content}
              isCurrentUser={message.sender === user?.id}
              timestamp={new Date(message.timestamp)}
              isBot={message.isBot}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <div className="p-4 bg-white border-t">
        {isChatClosed ? (
          <div className="text-center py-3 bg-gray-100 rounded-md text-gray-600">
            This chat is closed. You cannot send new messages.
          </div>
        ) : (
          <ChatInput onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
}; 