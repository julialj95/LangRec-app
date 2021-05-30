import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import RecsPage from "../RecsPage/RecsPage";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import SavedResources from "../SavedResources/SavedResources";
import SubmitResource from "../SubmitResource/SubmitResource";
import SubmittedResources from "../SubmittedResources/SubmittedResources";
import { LangrecContext } from "../LangrecContext";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoggedIn: false,
      savedResourceIds: [],
      recommendedResources: [],
      savedResources: [],
      submittedResources: [],
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

  addSubmittedResource = (newResource) => {
    this.setState((prevState) => {
      return {
        submittedResources: [...prevState.submittedResources, newResource],
      };
    });
  };

  getSavedResources = (resources) => {
    const resourceIds = resources.map((resource) => resource.id);
    this.setState({ savedResources: resources, savedResourceIds: resourceIds });
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

  handleSavedResourcesOnLogout = () => {
    this.setState({ savedResources: [], savedResourceIds: [] });
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
      <div className="wrapper">
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
            handleSavedResourcesOnLogout: this.handleSavedResourcesOnLogout,
            addSubmittedResource: this.addSubmittedResource,
          }}
        >
          <div className="header">
            <div className="title">
              <Header />
            </div>
            <div className="nav">
              <NavBar />
            </div>
          </div>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/recs" component={RecsPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/saved-resources" component={SavedResources} />
            <Route path="/submit" component={SubmitResource} />
            <Route path="/my-resources" component={SubmittedResources} />
          </Switch>
        </LangrecContext.Provider>
      </div>
    );
  }
}
export default App;
