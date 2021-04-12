import React from "react";
import ReactDOM from "react-dom";
import RecsPage from "../RecsPage/RecsPage";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <RecsPage />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <Router>
        <RecsPage />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
