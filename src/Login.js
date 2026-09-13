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
    <div className="a-center">
      <form action={handleLogin} className="maxw400 a-center">
        <div className="formline">
          <label for="username">username</label>
          <input name="username" type="text" placeholder="username" required />
        </div>
        <div className="formline">
          <label for="password">password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <div className="formline">
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
}
