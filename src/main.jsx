import React from "react";
import { createRoot } from "react-dom/client";
import HeroChat from "./HeroChat.jsx";
import heroChatStyles from "./hero-chat.css?inline"; // force inline CSS

// Inject CSS into <head>
const style = document.createElement("style");
style.textContent = heroChatStyles;
document.head.appendChild(style);

const container = document.getElementById("hero-chat-root");
if (container) {
  createRoot(container).render(<HeroChat />);
}
