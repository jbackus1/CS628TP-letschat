import { useNavigate } from "react-router";

export default function Login({ setUname }) {
  const navigate = useNavigate();

  function handleLogin(formData) {
    setUname(formData.get("username"));
    navigate("/chat");
  }

  return (
    <div className="login-div">
      <form action={handleLogin}>
        <input name="username" type="text" required />
        <input name="password" type="text" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
