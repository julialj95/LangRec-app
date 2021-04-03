import React, { Component } from "react";
import { Link } from "react-router-dom";
import ResultItem from "./ResultItem";
import TokenService from "./services/token-service";
import config from "./config";
import { LangrecContext } from "./LangrecContext";

class RecsPage extends Component {
  static contextType = LangrecContext;
  constructor() {
    super();
    this.state = {
      language: "",
      type: "",
      level: "",
      cost: "",
      results: [],
      error: "",
      savedResourceIds: [],
      addedToFavorites: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: "",
    });
  };

  displayResults = () => {
    const results = this.context.recommendedResources.map((result) => {
      const isFavorited =
        this.context.savedResourceIds.filter((resource) => {
          return Number(resource) === result.id;
        }).length > 0;
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
            key={result.title + result.id}
            value={result.id}
            disabled={!this.context.isLoggedIn || isFavorited ? true : false}
            onClick={() => this.saveAResource(result.id)}
          >
            Favorite!
          </button>

          {isFavorited ? (
            <Link to="/saved-resources">View in Saved Resources List</Link>
          ) : null}
        </div>
      );
    });
    return results;
  };

  saveAResource = (resource_id) => {
    fetch(`${config.API_BASE_URL}/resources/recs`, {
      method: "POST",
      body: JSON.stringify({ resource_id }),
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + TokenService.getAuthToken(),
      },
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((e) => Promise.reject(e));
        } else {
          this.context.handleSaveResource(resource_id);

          res.json();
        }
      })
      .catch((error) => console.error({ error }));
  };

  getRecommendations = (e) => {
    e.preventDefault();
    const { language, type, level, cost } = this.state;
    const baseUrl = config.API_BASE_URL;
    const params = `?language=${language}&level=${level}&type=${type}&cost=${cost}`;
    fetch(`${baseUrl}/resources/recs${params}`, {
      headers: {
        "content-type": "application/json",
        // Authorization: "Bearer " + TokenService.getAuthToken(),
      },
    })
      .then((recs) => {
        if (!recs.ok) {
          return recs.json().then((event) => Promise.reject(event));
        }
        return recs.json();
      })
      .then((data) => this.context.handleRecommendedResources(data))
      .catch((error) => {
        this.setState({
          error: "Sorry! No resources match your requirements.",
        });
      });
  };

  render() {
    return (
      <div>
        <h2>Get Reccomendations</h2>
        <h3>
          Enter your information to receive the highest rated resources that fit
          your needs!
        </h3>
        <form onSubmit={(e) => this.getRecommendations(e)}>
          <label htmlFor="language">
            Language
            <select name="language" onChange={(e) => this.handleChange(e)}>
              <option value={null}>Select language...</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Korean">Korean</option>
              <option value="Mandarin">Mandarin</option>
              <option value="Italian">Italian</option>
              <option value="Cantonese">Cantonese</option>
              <option value="Japanese">Japanese</option>
              <option value="Swahili">Swahili</option>
              <option value="Afrikaans">Afrikaans</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />
          <label htmlFor="type">
            Resource Type
            <select name="type" onChange={(e) => this.handleChange(e)}>
              <option value={null}>Select Type...</option>
              <option value="Textbook">Textbook</option>
              <option value="Storybook">Storybook</option>
              <option value="Class">Class</option>
              <option value="Website">Website</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Level
            <br />
            <input
              type="radio"
              id="beginner"
              name="level"
              value="Beginner"
              onChange={(e) => this.handleChange(e)}
            />
            <label htmlFor="beginner">Beginner</label>
            <br />
            <input
              type="radio"
              id="intermediate"
              name="level"
              value="Intermediate"
              onChange={(e) => this.handleChange(e)}
            />
            <label htmlFor="intermediate">Intermediate</label>
            <br />
            <input
              type="radio"
              id="advanced"
              name="level"
              value="Advanced"
              onChange={(e) => this.handleChange(e)}
            />
            <label htmlFor="advanced">Advanced</label>
          </label>
          <br />
          <br />
          <label>
            Cost
            <br />
            <input
              type="radio"
              name="cost"
              value="Free"
              onChange={(e) => this.handleChange(e)}
            />
            <label htmlFor="cost">Free</label>
            <br />
            <input
              type="radio"
              name="cost"
              value="Paid"
              onChange={(e) => this.handleChange(e)}
            />
            <label htmlFor="cost">Paid</label>
            <br />
          </label>

          <button type="submit">Get Recs!</button>
        </form>

        <div>
          {this.state.error ? <h2>{this.state.error}</h2> : null}
          {this.context.recommendedResources.length === 0 ? null : (
            <div>
              <h1>Results</h1>
              {this.displayResults()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RecsPage;
