import { useContext, useEffect, useRef, useState } from "react";
import { UnameContext } from "./unameContext";
import { fetchChatHistory, getWebSocketUrl } from "./api";

export default function Chat({ preview = true }) {
  const { uname, accessToken } = useContext(UnameContext);

  const messageTextArea = useRef(null);
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Initial snapshot of the shared room. While logged out (no websocket)
  // keep it lightly polled so the preview stays roughly current.
  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      try {
        const history = await fetchChatHistory();
        if (!cancelled) setMessages(history);
      } catch {
        if (!cancelled) setError("Couldn't load chat history.");
      }
    }

    loadHistory();
    if (accessToken) return undefined;

    const intervalId = setInterval(loadHistory, 8000);
    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [accessToken]);

  // Live connection once logged in: the server also echoes our own
  // messages back, so we only ever append from here, never optimistically.
  useEffect(() => {
    if (!accessToken) return undefined;

    const socket = new WebSocket(getWebSocketUrl(accessToken));
    socketRef.current = socket;

    socket.onmessage = (event) => {
      try {
        const incoming = JSON.parse(event.data);
        setMessages((prev) => [...prev, incoming]);
      } catch {
        // ignore malformed frames
      }
    };
    socket.onerror = () => setError("Chat connection error.");

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [accessToken]);

  function sendMessage() {
    const text = messageTextArea.current?.value.trim();
    const socket = socketRef.current;
    if (!text || !socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(text);
    messageTextArea.current.value = "";
  }

  const historyText = messages.map((m) => `${m.user}: ${m.message}`).join("\n");

  return (
    <div className="chat-container">
      <textarea
        className="chat-history"
        readOnly={true}
        value={historyText}
      />
      {!preview && (
        <div className="chat-entry">
          <textarea disabled={uname === null} ref={messageTextArea} />
          <button onClick={sendMessage} disabled={uname === null}>
            Send
          </button>
        </div>
      )}
      {error && <p className="chat-error">{error}</p>}
    </div>
  );
}
