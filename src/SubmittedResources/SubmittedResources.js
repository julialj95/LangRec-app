import React from "react";
import { Link } from "react-router-dom";

class SubmittedResources extends React.Component {
  constructor(props) {
    super();
    this.state = {
      myResources: [],
    };
  }

  render() {
    return (
      <main>
        {this.state.myResources.length === 0 ? (
          <h2>
            You have not submitted any resources yet.{" "}
            <Link to="/submit">Click here</Link> to share a resource!
          </h2>
        ) : null}
      </main>
    );
  }
}

export default SubmittedResources;
