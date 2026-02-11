const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export async function sendChatMessage(message) {
  const clientId = window.HERO_CHAT_CLIENT;
  const heroChatToken = window.__HERO_CHAT_CONFIG__?.token;
  
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" , "x-hero-token": heroChatToken},
    body: JSON.stringify({
      clientId,
      message,
      sessionId: "anon"
    })
  });

  return res.json();
}
