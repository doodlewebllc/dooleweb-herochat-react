import { useChat } from "../hooks/useChat.js";
import { useState } from "react";

export default function HeroChat() {
  const { messages, input, setInput, sendMessage, loading } = useChat();
  const [started, setStarted] = useState(false);

  const suggestions = [
    "What solutions do you offer?",
    "What’s your pricing?",
    "Who is this product for?",
    "How long have you been in business?",
  ];

  const handleSubmit = (text) => {
    if (!text.trim()) return;
    setStarted(true);
    sendMessage(text);
  };

  return (
    <section className="hero-root">
      <div className="hero-content">
        <h1 className="hero-title">
          Make better decisions, faster
        </h1>

        <p className="hero-subtitle">
          Discover and act on private market activity with predictive company intelligence
        </p>

        {/* CHAT INPUT */}
        <div className="chat-input-wrapper">
          <span className="chat-icon">🤖</span>

          <input
            value={input}
            placeholder="Ask me about your data"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(input);
            }}
          />

          <button onClick={() => handleSubmit(input)}>
            ↑
          </button>
        </div>

        {/* SUGGESTIONS */}
        {!started && (
          <div className="suggestion-row">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(s);
                  handleSubmit(s);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* OPTIONAL CHAT OUTPUT (hidden by default like reference) */}
        {started && (
          <div className="chat-results">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-msg bot">Thinking…</div>}
          </div>
        )}
      </div>
    </section>
  );
}
