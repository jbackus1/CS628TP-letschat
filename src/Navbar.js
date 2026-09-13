import { useContext } from "react";
import { NavLink } from "react-router";
import { UnameContext } from "./unameContext";

export default function NavBar() {
  const { uname } = useContext(UnameContext);

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat" activeClassName="active">
              Chat
            </NavLink>
          </li>
          {uname !== null ? (
            <>
              <li>
                <NavLink to="/profile" activeClassName="active">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" activeClassName="active">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
