import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <NavBar />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <Router>
        <NavBar />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
