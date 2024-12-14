"use client"
import { useState } from 'react';

export function Chat() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiMessage = { sender: 'ai', text: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = { sender: 'ai', text: 'Sorry, something went wrong.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[93%] mx-auto md:max-w-[1000px] mt-4 mb-[5rem] flex flex-col h-screen justify-between bg-gray-100 p-6">
      <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-lg p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}
          >
            <p className={`text-sm ${msg.sender === 'user' ? 'text-gray-800' : 'text-gray-900'}`}>
              {msg.text}
            </p>
          </div>
        ))}
        {isLoading && (
          <div className="p-3 rounded-lg max-w-xs bg-gray-200 self-start">
            <p className="text-sm text-gray-900">Thinking...</p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-blue-500 text-white p-3 rounded-lg disabled:bg-gray-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
