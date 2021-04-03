import React from "react";

const LangrecContext = React.createContext({
  user: {},
  isLoggedIn: false,
  changeLoginStatus: () => {},
  handleSaveResource: () => {},
  handleRecommendedResources: () => {},
  savedResourceIds: [],
});

export { LangrecContext };
