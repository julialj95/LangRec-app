import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import RecsPage from "./RecsPage";
import SubmitResource from "./SubmitResource";
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
    };
  }

  changeLoginStatus = (param) => {
    this.setState({ isLoggedIn: param });
  };

  handleSaveResource = (resource_id) => {
    this.setState((prevState) => {
      return {
        savedResourceIds: [...prevState.savedResourceIds, resource_id],
      };
    });
  };

  handleRecommendedResources = (recs) => {
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
          handleSaveResource: this.handleSaveResource,
          savedResourceIds: this.state.savedResourceIds,
          handleRecommendedResources: this.handleRecommendedResources,
          recommendedResources: this.state.recommendedResources,
        }}
      >
        <Header />
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/recs"
            component={() => {
              return (
                <RecsPage
                // handleSaveResource={this.addSavedResourceId}
                // savedResourceIds={this.state.savedResourceIds}
                />
              );
            }}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/saved-resources" component={SavedResources} />
        </Switch>
      </LangrecContext.Provider>
    );
  }
}
export default App;
