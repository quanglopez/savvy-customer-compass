import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { useAuth } from '../../hooks/useAuth';

interface ChatMessage {
  _id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isBot: boolean;
}

interface ChatSession {
  _id: string;
  businessId: string;
  userId: string;
  messages: ChatMessage[];
  status: 'active' | 'closed';
}

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ChatInterface: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to Socket.IO server
    socketRef.current = io(SOCKET_URL);

    // Join chat room
    if (chatId) {
      socketRef.current.emit('join_room', chatId);
    }

    // Listen for new messages
    socketRef.current.on('receive_message', (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
    });

    // Fetch chat history
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`${SOCKET_URL}/api/chat/${chatId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chat history');
        }

        const data: ChatSession = await response.json();
        setMessages(data.messages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!socketRef.current || !user) return;

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
      await fetch(`${SOCKET_URL}/api/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newMessage),
      });
    } catch (err) {
      setError('Failed to send message');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message
            key={message._id}
            content={message.content}
            isCurrentUser={message.sender === user?.id}
            timestamp={new Date(message.timestamp)}
            isBot={message.isBot}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}; 