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
      loggedIn: false,
    };
  }

  changeLoginStatus = () => {
    this.setState((prevState) => {
      return { loggedIn: !prevState };
    });
  };

  // componentDidMount() {
  //   const { username } = fetch(`${config.API_BASE_URL}/users/${username}`, {
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: "Bearer " + config.API_KEY,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         return response.json().then((event) => Promise.reject(event));
  //       }
  //       return response.json();
  //     })
  //     .then((user) => this.setState({ user }))
  //     .catch((error) => console.error({ error }));
  // }
  render() {
    const { user, loggedIn } = this.state;
    return (
      <LangrecContext.Provider
        value={{
          user: user,
          loggedIn: loggedIn,
          handleLoginChange: this.changeLoginStatus,
        }}
      >
        <Header />
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/recs" component={RecsPage} />
          <Route path="/share" component={SubmitResource} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/saved-resources" component={SavedResources} />
        </Switch>
      </LangrecContext.Provider>
    );
  }
}
export default App;
