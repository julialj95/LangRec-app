import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <Header />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <Router>
        <Header />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
