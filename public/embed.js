(function () {
  if (window.HeroChatLoaded) return;
  window.HeroChatLoaded = true;

  const currentScript = document.currentScript;
  if (!currentScript) {
    console.error("HeroChat: unable to detect script");
    return;
  }

  const token = currentScript.getAttribute("data-token");
  const clientId = currentScript.getAttribute("data-client") || "demo";

  if (!token) {
    console.error("HeroChat: token missing");
    return;
  }

  window.__HERO_CHAT_CONFIG__ = {token, clientId};

  function init() {
    if (!document.getElementById("hero-chat-root")) {
      const root = document.createElement("div");
      root.id = "hero-chat-root";
      document.body.appendChild(root);
    }

    const baseUrl = new URL(currentScript.src).origin;

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = baseUrl + "/hero-chat.css";
    document.head.appendChild(css);

    const appScript = document.createElement("script");
    appScript.src = baseUrl + "/widget.js";
    appScript.defer = true;
    document.body.appendChild(appScript);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
