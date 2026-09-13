import { BrowserRouter, Routes, Route } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { UnameContext } from "./unameContext";
import { refreshSession } from "./api";
import Chat from "./Chat";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import NavBar from "./Navbar";
import Profile from "./Profile";
import Register from "./Register";
import "./App.css";

function App() {
  const [uname, setUname] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const setAuth = useCallback((newUname, newAccessToken) => {
    setUname(newUname);
    setAccessToken(newAccessToken);
  }, []);

  // Try to restore a session on load using the httpOnly refresh cookie, so
  // a returning user's profile/chat keep working without logging in again.
  useEffect(() => {
    let cancelled = false;
    refreshSession().then((session) => {
      if (!cancelled && session) {
        setAuth(session.uname, session.accessToken);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [setAuth]);

  return (
    <div className="app">
      <UnameContext value={{ uname, accessToken, setAuth }}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/chat" element={<Chat preview={false} />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/logout" element={<Logout {...{ setAuth }} />} />
          </Routes>
        </BrowserRouter>
      </UnameContext>
    </div>
  );
}

export default App;
