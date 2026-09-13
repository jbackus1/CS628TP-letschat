import { register } from "./api";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();

  function handleRegister(formdata) {
    register(formdata.username, formdata.password)
      .then(() => navigate("/login"))
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="flex-v gap5 maxw400 a-center">
      <form action={handleRegister} className="maxw400 a-center">
        <div className="formline">
          <label for="username">username</label>
          <input name="username" type="text" placeholder="username" required />
        </div>
        <div className="formline">
          <label for="password">password</label>
          <input type="password" placeholder="password" required />
        </div>
        <div className="formline">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
