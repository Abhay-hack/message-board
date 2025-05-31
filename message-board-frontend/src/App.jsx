import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  const sendMessage = async () => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    setMessages(prev => [...prev, input]);
    setInput('');
  };

  return (
    <div className="p-4">
      <h1>📬 Message Board</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type a message"
        className="border p-1"
      />
      <button onClick={sendMessage} className="ml-2 p-1 bg-blue-500 text-white">
        Send
      </button>
      <ul className="mt-4">
        {messages.map((msg, i) => (
          <li key={i}>• {msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
