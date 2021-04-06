import React from "react";

const LangrecContext = React.createContext({
  user: {},
  isLoggedIn: false,
  changeLoginStatus: () => {},
  addSavedResource: () => {},
  removeSavedResourceId: () => {},
  getSavedResources: () => {},
  handleRecommendedResources: () => {},
  savedResourceIds: [],
});

export { LangrecContext };
