import React, { Component } from "react";
import { LangrecContext } from "./LangrecContext";
import ResultItem from "./ResultItem";
import TokenService from "./services/token-service";
import config from "./config";

class SavedResources extends Component {
  static contextType = LangrecContext;
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  displayResults = (data) => {
    console.log(data);
    const results = data.map((result) => {
      return (
        <div>
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
            value={result.id}
            key={result.url}
            onClick={this.removeFromFavorites}
          >
            Remove resource from favorites
          </button>
        </div>
      );
    });
    this.setState({ results });
    return results;
  };

  removeFromFavorites = (e) => {
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
        const newResults = this.state.results.filter(
          (resource) => resource.id !== resource_id
        );
        this.setState({ results: newResults });
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
        this.displayResults(data);
      })
      .catch((error) => console.error({ error }));
  }

  render() {
    return (
      <div>
        <div>
          {this.state.results.length === 0 ? (
            <div>
              <h3>You have no saved resources.</h3>
              <h3>
                Search through resource recommendations and find resources to
                save!
              </h3>
            </div>
          ) : (
            this.state.results
          )}
        </div>
      </div>
    );
  }
}

export default SavedResources;
