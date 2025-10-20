// components/FloatingChatbot.jsx - Updated Version
"use client"
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! 👋 Welcome to QuickDrop! How can I help you today?', isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState({});
  const [currentActions, setCurrentActions] = useState([]);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAction = (action) => {
    if (action.type === 'link' && action.url) {
      // External link or route navigation
      if (action.url.startsWith('http')) {
        window.open(action.url, '_blank');
      } else {
        router.push(action.url);
      }
    } else if (action.type === 'button') {
      // Handle button actions
      setInputMessage(action.text);
    }
  };

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          userId: 'user123',
          userEmail: 'user@example.com',
          conversationContext: conversationContext
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { 
          text: data.reply, 
          isUser: false,
          actions: data.actions 
        }]);
        setConversationContext(data.context);
        setCurrentActions(data.actions || []);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: 'Connection error. Please try again.', 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = [
    'Track Package',
    'Price Quote', 
    'Send Parcel',
    'Contact Support'
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCurrentActions([]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
          
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <div>
              <h3 className="font-semibold">QuickDrop Assistant</h3>
              <p className="text-xs opacity-90">AI Powered • 24/7</p>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message, index) => (
              <div key={index}>
                <div className={`max-w-[85%] mb-3 p-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-500 text-white ml-auto rounded-br-none'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-600'
                }`}>
                  {message.text}
                </div>
                
                {/* Action Buttons */}
                {message.actions && message.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3 justify-start">
                    {message.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => handleAction(action)}
                        className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-full border border-blue-300 transition-colors duration-200"
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="max-w-[85%] mb-3 p-3 bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-600">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies & Input */}
          <div className="px-3 pt-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-1 mb-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(reply)}
                  className="text-xs bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 transition-colors duration-200"
                >
                  {reply}
                </button>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2 pb-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-full transition-colors duration-200 text-sm font-medium"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;