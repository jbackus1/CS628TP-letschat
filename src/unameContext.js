import { createContext } from "react";

// Holds the logged-in user's username and current access token, plus a
// setter so Login (and session restore on load) can update both at once.
export const UnameContext = createContext({
  uname: null,
  accessToken: null,
  setAuth: () => {},
});
