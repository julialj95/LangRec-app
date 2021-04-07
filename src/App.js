import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import RecsPage from "./RecsPage";
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";
import NavBar from "./NavBar";
import SavedResources from "./SavedResources";
// import config from "./config";
import { LangrecContext } from "./LangrecContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: false,
      savedResourceIds: [],
      recommendedResources: [],
      savedResources: [],
    };
  }

  changeLoginStatus = (param) => {
    this.setState({ isLoggedIn: param });
  };

  addSavedResource = (resource_id) => {
    this.setState((prevState) => {
      return {
        savedResourceIds: [...prevState.savedResourceIds, resource_id],
      };
    });
  };

  getSavedResources = (resources) => {
    this.setState({ savedResources: resources });
  };

  removeSavedResource = (resource_id) => {
    const updatedSavedResourceIds = this.state.savedResourceIds.filter(
      (id) => id !== Number(resource_id)
    );

    const updatedSavedResources = this.state.savedResources.filter(
      (resource) => resource.id !== Number(resource_id)
    );
    this.setState({
      savedResourceIds: updatedSavedResourceIds,
      savedResources: updatedSavedResources,
    });
  };

  handleRecommendedResources = (recs) => {
    if (recs.length === 0) {
      this.setState({ recommendedResources: [] });
    }
    this.setState({ recommendedResources: recs });
  };

  render() {
    const { user, isLoggedIn } = this.state;
    return (
      <LangrecContext.Provider
        value={{
          user: user,
          isLoggedIn: isLoggedIn,
          handleLoginChange: this.changeLoginStatus,
          addSavedResource: this.addSavedResource,
          savedResourceIds: this.state.savedResourceIds,
          getSavedResources: this.getSavedResources,
          savedResources: this.state.savedResources,
          removeSavedResource: this.removeSavedResource,
          handleRecommendedResources: this.handleRecommendedResources,
          recommendedResources: this.state.recommendedResources,
        }}
      >
        <Header />
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/recs" component={RecsPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/saved-resources" component={SavedResources} />
        </Switch>
      </LangrecContext.Provider>
    );
  }
}
export default App;
