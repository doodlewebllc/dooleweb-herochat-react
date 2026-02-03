(function () {
  const script = document.currentScript;
  const clientId = script?.dataset?.client || "demo";
  const token = script?.dataset?.token;

  if (!token) {
    console.error("HeroChat: token missing");
    return;
  }

  window.HERO_CHAT_CLIENT = clientId;
  window.HERO_CHAT_TOKEN = token;

  const root = document.createElement("div");
  root.id = "hero-chat-root";
  document.body.prepend(root);

  const appScript = document.createElement("script");
  appScript.src = "https://dooleweb-herochat-react.vercel.app/hero-chat.bundle.js";
  appScript.defer = true;

  document.body.appendChild(appScript);
})();
