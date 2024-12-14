"use client";
import { CircleAlert, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { marked } from "marked"; // Import marked

export function Chat() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiMessage = { sender: "ai", text: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMessage = {
        sender: "ai",
        text: "Sorry, something went wrong.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setMessages([
        {
          sender: "ai",
          text: "Hello, I'm the AI assistant for Anas. What can I help you with today?",
        },
      ]);
    }
  }, [chatOpen]);

  return (
    <div className="fixed z-50 top-3 left-1/2 transform -translate-x-1/2 sm:bottom-8 sm:top-auto sm:right-8 sm:translate-x-0 flex flex-col-reverse sm:flex-col items-center sm:items-end">
      {chatOpen && (
        <div className="flex flex-col h-[500px] w-[90vw] sm:w-[400px] justify-between bg-gray-100 shadow-md border p-4 rounded-lg">
          <p className="flex items-start gap-1 mb-2 text-gray-700 text-[13px]">
            <CircleAlert className="size-4 relative top-[2px] text-gray-600" />
            Please do not share any sensitive information with my assistant.
          </p>
          <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-lg p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === "user"
                      ? "bg-blue-100 text-gray-800"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {/* Parse markdown and render HTML */}
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: marked(msg.text),
                    }}
                  />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg max-w-xs bg-gray-200">
                  <p className="text-sm text-gray-900">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-black text-white p-3 rounded-lg disabled:bg-gray-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setChatOpen((value) => !value)}
        className="cursor-pointer shadow-md bg-black text-white sm:mt-4 rounded-full font-medium items-center mb-4 sm:mb-0"
      >
        {!chatOpen ? (
          <div className="min-w-[235px] flex gap-1 p-5 py-3 ">
            <MessageCircle strokeWidth={2.5} className="size-5 relative bottom-[1px]" />{" "}
            Chat With My Assistant
          </div>
        ) : (
          <div className="p-3">
            <X strokeWidth={2.5} />
          </div>
        )}
      </button>
    </div>
  );
}
