import React from "react";

const LangrecContext = React.createContext({
  user: {},
  isLoggedIn: false,
  changeLoginStatus: () => {},
  addSavedResource: () => {},
  removeSavedResource: () => {},
  getSavedResources: () => {},
  handleRecommendedResources: () => {},
  savedResourceIds: [],
  savedResources: [],
  recommendedResources: [],
});

export { LangrecContext };
