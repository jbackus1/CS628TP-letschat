import { useEffect } from "react";
import { useNavigate } from "react-router";
import { logout } from "./api";

export default function Logout({ setAuth }) {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      logout();
    } catch (err) {
      console.log(err);
    }
    setAuth(null, null);

    navigate("/");
  });

  return <></>;
}
