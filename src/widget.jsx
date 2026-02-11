import { createRoot } from "react-dom/client";
import HeroChat from "./HeroChat";
import "./widget.css";

function mount() {
  let el = document.getElementById("hero-chat-root");

  if (!el) {
    el = document.createElement("div");
    el.id = "hero-chat-root";
    document.body.appendChild(el);
  }

  createRoot(el).render(<HeroChat />);
}

mount();
