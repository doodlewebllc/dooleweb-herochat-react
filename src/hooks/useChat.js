import { useState } from "react";
import { sendChatMessage } from "../services/chatApi.js";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(textOverride) {
    const question = textOverride || input;
    if (!question || !question.trim()) return;

    setInput("");
    setMessages(m => [...m, { role: "user", text: question }]);
    setLoading(true);

    try {
      const response = await sendChatMessage(question);

      if (!response) {
        setMessages(m => [
          ...m,
          { role: "system", text: "Empty server response." }
        ]);
        return;
      }

      if (response.success === false) {
        setMessages(m => [
          ...m,
          { role: "system", text: response.error || "Server error." }
        ]);
        return;
      }
      const answerText = response.answer || response.data?.answer || "No answer returned.";
      setMessages(m => [
        ...m,
        { role: "assistant", text: answerText }
      ]);

    } catch (err) {
      setMessages(m => [
        ...m,
        { role: "system", text: "Network error. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    input,
    setInput,
    sendMessage,
    loading
  };
}
