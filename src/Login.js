import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UnameContext } from "./unameContext";
import { login } from "./api";

export default function Login() {
  const { setAuth } = useContext(UnameContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(formData) {
    setError(null);
    try {
      const { uname, accessToken } = await login(
        formData.get("username"),
        formData.get("password"),
      );
      setAuth(uname, accessToken);
      navigate("/chat");
    } catch {
      setError("Login failed. Check your username and password.");
    }
  }

  return (
    <div className="login-div">
      <form action={handleLogin}>
        <input name="username" type="text" required />
        <input name="password" type="password" required />
        <button type="submit">Login</button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
}
