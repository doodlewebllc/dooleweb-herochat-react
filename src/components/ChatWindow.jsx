import { useChat } from "../hooks/useChat.js";
import { useState } from "react";
import { Send, Maximize2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function RichMessage({ role, text }) {
  return (
    <div className={`chat-msg ${role}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default function ChatWindow() {
  const { messages, input, setInput, sendMessage, loading } = useChat();
  const [open, setOpen] = useState(false);

  const suggestions = [
    "What solutions do you offer?",
    "What’s your pricing?",
    "Who is this product for?",
    "How long have you been in business?"
  ];

  const handleSubmit = (text) => {
    if (!text.trim()) return;
    sendMessage(text);
    setOpen(true);
  };

  const handleSuggestion = (text) => {
    setInput(text);
    handleSubmit(text);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Make better decisions, faster</h1>

        <p className="hero-subtitle">
          Discover and act on private market activity with predictive company intelligence
        </p>

        {/* INPUT BAR */}
        <div className="chat-box">
          <div className="chat-input-wrapper">
            <div className="chat-icon">
              <img src="https://images.crunchbase.com/image/upload/51d868f4f22a45d4a8854d60d332e4f9" alt="logo" />
            </div>

            <input
              value={input}
              placeholder="Ask me about data"
              className="chat-input"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(input);
              }}
            />

            <button className="send-btn" onClick={() => handleSubmit(input)}>
              <Send size={18} />
            </button>
          </div>

          {/* EXPAND ICON */}
          <button className="expand-indicator" onClick={() => setOpen(true)}>
            <Maximize2 size={18} />
          </button>
        </div>

        {/* HERO SUGGESTIONS */}
        {!open && (
          <div className="suggestion-row">
            {suggestions.map((s, i) => (
              <button key={i} className="suggestion-pill" onClick={() => handleSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {open && (
        <div className="chat-modal-overlay" onClick={() => setOpen(false)}>
          <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
            {/* HEADER */}
            <div className="modal-header">
              <div className="modal-logo">Hero Chat</div>
              <button className="close-btn" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* SIDEBAR */}
              <div className="sidebar">
                <button className="new-chat-btn">Start New Chat</button>

                <div className="sidebar-footer">
                  Hero Chat may make mistakes and is not legal, financial or investment advice.
                </div>
              </div>

              {/* CHAT AREA */}
              <div className="chat-area">
                <div className="chat-messages">
                  {messages.length === 0 && (
                    <>
                      <p className="welcome-text">👋 Hey there! Need help finding private company data?</p>

                      <div className="modal-suggestions">
                        {suggestions.map((s, i) => (
                          <button key={i} className="suggestion-pill" onClick={() => handleSuggestion(s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {messages.map((m, i) => (
                    <RichMessage key={i} role={m.role} text={m.text} />
                  ))}

                  {loading && <div className="chat-msg bot">Hero Chat is Thinking…</div>}
                </div>

                {/* BOTTOM INPUT */}
                <div className="modal-input-wrapper">
                  <input
                    value={input}
                    placeholder="Type @ to quick search"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit(input);
                    }}
                  />

                  <button onClick={() => handleSubmit(input)}>
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}