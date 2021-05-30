import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LangrecContext } from "../LangrecContext";
import ResultItem from "../ResultItem/ResultItem";
import TokenService from "../services/token-service";
import config from "../config";

class SavedResources extends Component {
  static contextType = LangrecContext;
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  displayResources = () => {
    const results = this.context.savedResources.map((result) => {
      const isFavorited =
        this.context.savedResourceIds.filter((resource) => {
          return Number(resource) === result.id;
        }).length > 0;

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
          favorited={isFavorited}
        />
      );
    });

    if (this.context.savedResources.length === 0) {
      return (
        <div>
          <h2>You have no saved resources.</h2>
          <h3>
            Search through <Link to="/recs">resource recommendations</Link> and
            find resources to save!
          </h3>
        </div>
      );
    } else {
      return results;
    }
  };

  componentDidMount() {
    fetch(`${config.API_BASE_URL}/resources/saved-resources`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + TokenService.getAuthToken(),
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        }
        return response.json();
      })
      .then((data) => {
        this.context.getSavedResources(data);
      })
      .catch((error) => console.error({ error }));
  }

  render() {
    return (
      <>
        <h1>SAVED RESOURCES</h1>
        <div>{this.displayResources()}</div>
      </>
    );
  }
}

export default SavedResources;
