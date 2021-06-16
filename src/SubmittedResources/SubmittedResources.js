import React from "react";
import config from "../config";
import { Link } from "react-router-dom";
import { LangrecContext } from "../LangrecContext";
import ResultItem from "../ResultItem/ResultItem";
import TokenService from "../services/token-service";

class SubmittedResources extends React.Component {
  static contextType = LangrecContext;
  constructor(props) {
    super();
    this.state = {
      myResources: [],
      error: "",
    };
  }

  displaySubmittedResources = () => {
    const submittedResources = this.state.myResources.map((result) => {
      return (
        <ResultItem
          key={result.id}
          id={result.id}
          title={result.title}
          image_link={result.image_link}
          language={result.language}
          level={result.level}
          type={result.type}
          rating={result.rating}
          url={result.url}
          description={result.description}
          cost={result.cost}
          // favorited={isFavorited}
        />
      );
    });
    return submittedResources;
  };
  componentDidMount() {
    console.log("submitted resources");
    fetch(`${config.API_BASE_URL}/resources/submitted-resources`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + TokenService.getAuthToken(),
      },
    })
      .then((resources) => {
        if (!resources.ok) {
          return resources.json().then((event) => Promise.reject(event));
        }
        return resources.json();
      })
      .then((data) => this.setState({ myResources: data }))
      .catch((error) => this.setState({ error }));
  }

  render() {
    return (
      <main>
        {this.state.myResources.length === 0 ? (
          <h2>
            You have not submitted any resources yet.{" "}
            <Link to="/submit">Click here</Link> to share a resource!
          </h2>
        ) : (
          this.displaySubmittedResources()
        )}
      </main>
    );
  }
}

export default SubmittedResources;
