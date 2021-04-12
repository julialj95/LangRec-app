import React from "react";
import ReactDOM from "react-dom";
import ResultItem from "../ResultItem/ResultItem";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <ResultItem
        key={1}
        id={1}
        title={"Title"}
        image_link={"image_link"}
        language={"Spanish"}
        level={"Beginner"}
        type={"Textbook"}
        rating={4}
        url={"www.url.com"}
        description={"Test description"}
        cost={"Paid"}
        favorited={true}
      />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <Router>
        <ResultItem
          key={1}
          id={1}
          title={"Title"}
          image_link={"image_link"}
          language={"Spanish"}
          level={"Beginner"}
          type={"Textbook"}
          rating={4}
          url={"www.url.com"}
          description={"Test description"}
          cost={"Paid"}
          favorited={true}
        />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
