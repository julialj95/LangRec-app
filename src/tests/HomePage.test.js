import React from "react";
import ReactDOM from "react-dom";
import HomePage from "../HomePage/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <HomePage />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <Router>
        <HomePage />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
