import React from "react";

const LangrecContext = React.createContext({
  user: {},
  loggedIn: "",
  changeLoginStatus: () => {},
});

export { LangrecContext };
