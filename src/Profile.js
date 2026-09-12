import { useContext, useEffect, useState } from "react";
import { UnameContext } from "./unameContext";
import { fetchMyMessages } from "./api";

export default function Profile() {
  const { uname, accessToken } = useContext(UnameContext);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return undefined;
    let cancelled = false;

    fetchMyMessages(accessToken)
      .then((history) => {
        if (!cancelled) setMessages(history);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load your saved chat history.");
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  if (!uname) {
    return (
      <div className="profile-div">
        <p>
          Please <a href="/login">log in</a> to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="profile-div">
      <h2>{uname}</h2>
      <h3>Your saved chat history</h3>
      {error && <p className="profile-error">{error}</p>}
      <ul className="profile-history">
        {messages.map((m) => (
          <li key={m._id}>
            <span className="profile-history-text">{m.message}</span>
            <span className="profile-history-time">
              {new Date(m.date).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
      {messages.length === 0 && !error && <p>No saved messages yet.</p>}
    </div>
  );
}
