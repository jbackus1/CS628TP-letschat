import { useContext, useRef } from "react";
import { UnameContext } from "./unameContext";

export default function Chat({ preview = true }) {
  const uname = useContext(UnameContext);

  const messageTextArea = useRef(null);
  const historyTextArea = useRef(null);

  function sendMessage() {}
  return (
    <div className="chat-container">
      <textarea
        className="chat-history"
        readOnly={true}
        ref={historyTextArea}
      />
      {!preview && (
        <div className="chat-entry">
          <textarea disabled={uname === null} ref={messageTextArea} />
          <button onClick={sendMessage} disabled={uname === null}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}
