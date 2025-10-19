"use client"
import { useState, useRef, useEffect } from 'react';

const BACKEND_URL = 'http://localhost:5000';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! Welcome to your courier service! How can I help you? 😊', isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          userId: 'user123'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
      } else {
        setMessages(prev => [...prev, { 
          text: 'Sorry, there was an error. Please try again.', 
          isUser: false 
        }]);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setMessages(prev => [...prev, { 
        text: 'Cannot connect to server. Please check if backend is running.', 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = [
    'Track my package',
    'Get price quote',
    'Schedule pickup',
    'Customer support'
  ];

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-center">
        <h3 className="text-lg font-semibold">Courier Support Bot 🤖</h3>
        <p className="text-sm opacity-90">Online • 24/7 Support</p>
      </div>

      {/* Messages Area */}
      <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 flex flex-col gap-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-2xl ${
              message.isUser
                ? 'bg-blue-500 text-white ml-auto rounded-br-none'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-600'
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="max-w-[80%] p-3 bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-600">
            Typing... 💭
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="p-3 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              disabled={isLoading}
              className="text-xs bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 transition-colors duration-200"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full transition-colors duration-200 text-sm font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;