import { useChat } from "../hooks/useChat.js";
import { useState } from "react";

export default function ChatWindow() {
  const { messages, input, setInput, sendMessage, loading } = useChat();
  const [started, setStarted] = useState(false);

  const quickPrompts = [
    "What solutions do you offer?",
    "What’s your pricing?",
    "Who is this product for?",
    "How long have you been in business?",
  ];

  const handlePromptClick = (text) => {
    setStarted(true);
    setInput(text);
    sendMessage(text);
  };

  return (
    <section className="hero-wrapper">
  <div className="hero-container">

    {/* LEFT CONTENT */}
    <div className="hero-left">
      <h1>
        AI-powered growth for <span>modern teams</span>
      </h1>

      <p className="subtitle">
        Replace static hero sections with an intelligent assistant that
        answers questions, qualifies visitors, and drives conversions.
      </p>

      <ul className="hero-points">
        <li>✓ Train on your website content</li>
        <li>✓ Works on any website</li>
        <li>✓ No-code installation</li>
      </ul>

      <div className="hero-cta">
        <button className="primary-btn">Get Started</button>
        <button className="secondary-btn">View Demo</button>
      </div>
    </div>

    {/* RIGHT CHAT */}
    <div className="hero-right">

      <div className="chat-card">
        {!started && messages.length === 0 && (
          <div className="quick-prompts">
            {quickPrompts.map((p, i) => (
              <button key={i} onClick={() => handlePromptClick(p)}>
                {p}
              </button>
            ))}
          </div>
        )}

        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              {m.text}
            </div>
          ))}
          {loading && <div className="typing">Thinking…</div>}
        </div>

        <div className="input-row">
          <input
            value={input}
            placeholder="Ask anything…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button onClick={() => sendMessage()}>➤</button>
        </div>
      </div>

    </div>
  </div>
</section>
  );
}
