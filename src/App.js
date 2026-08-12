import { BrowserRouter, Routes, Route } from "react-router";
import { UnameContext } from "./unameContext";
import NavBar from "./Navbar";
import Chat from "./Chat";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import "./App.css";
import { useState } from "react";

function App() {
  const [uname, setUname] = useState(null);
  return (
    <div className="app">
      <UnameContext value={uname}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/chat" element={<Chat preview={false} />} />
            <Route
              exact
              path="/login"
              element={<Login setUname={setUname} />}
            />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </UnameContext>
    </div>
  );
}

export default App;
