import React, { Component } from "react";
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

  displayResults = () => {
    console.log(this.context.savedResources);
    const results = this.context.savedResources.map((result) => {
      return (
        <div key={result.image_link}>
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
          />
          <button
            key={result.title}
            value={result.id}
            onClick={this.deleteFromFavorites}
          >
            Remove resource from favorites
          </button>
        </div>
      );
    });

    if (this.context.savedResources.length === 0) {
      return (
        <div>
          <h3>You have no saved resources.</h3>
          <h3>
            Search through resource recommendations and find resources to save!
          </h3>
        </div>
      );
    } else {
      return results;
    }
  };

  deleteFromFavorites = (e) => {
    e.preventDefault();
    const resource_id = e.target.value;
    fetch(`${config.API_BASE_URL}/resources/saved-resources/${resource_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + TokenService.getAuthToken(),
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then(() => {
        this.context.removeSavedResource(resource_id);
      })
      .catch((error) => console.error(error));
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
    return <div>{this.displayResults()}</div>;
  }
}

export default SavedResources;
