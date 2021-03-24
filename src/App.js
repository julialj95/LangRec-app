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
import MyPage from "./MyPage";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/recs" component={RecsPage} />
        <Route path="/share" component={SubmitResource} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/mypage" component={MyPage} />
      </Switch>
    </>
  );
}

export default App;
