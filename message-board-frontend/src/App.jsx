import React, { useEffect, useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        console.error("Fetch failed:", res.status, res.statusText);
        return;
      }
      const data = await res.json();
      console.log("Fetched messages data:", data);
      // Adjust here depending on your backend response structure:
      if (Array.isArray(data)) {
        setMessages(data);
      } else if (data.messages && Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        setMessages([]);
        console.warn("Unexpected data format from API");
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });
      if (!res.ok) {
        console.error("Failed to send message:", res.statusText);
        return;
      }
      setInput("");
      fetchMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          💬 Message Board
        </h1>

        <form onSubmit={handleSubmit} className="flex mb-6">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border-2 border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-r-md font-semibold transition"
          >
            Send
          </button>
        </form>

        <div className="max-h-96 overflow-y-auto space-y-3">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className="bg-indigo-50 text-indigo-900 rounded-lg p-3 shadow-sm break-words"
              >
                {msg.message || JSON.stringify(msg)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
