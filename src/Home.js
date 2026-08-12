import Chat from "./Chat";

export default function Home() {
  return (
    <>
      <div className="welcome">
        <h1>Let's Chat!</h1>
        <p>
          Preview the chat below. <a href="/login">Login</a> to chat.
        </p>
      </div>
      <Chat />
    </>
  );
}
