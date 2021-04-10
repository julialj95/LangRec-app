import React, { Component } from "react";
// import { Link } from "react-router-dom";
import ResultItem from "../ResultItem/ResultItem";
// import TokenService from "../services/token-service";
import config from "../config";
import { LangrecContext } from "../LangrecContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { faHeart } from "@fortawesome/free-solid-svg-icons"
import "./RecsPage.css";

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
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  displayResults = () => {
    const results = this.context.recommendedResources.map((result) => {
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
    return results;
  };

  // saveAResource = (resource_id) => {
  //   fetch(`${config.API_BASE_URL}/resources/recs`, {
  //     method: "POST",
  //     body: JSON.stringify({ resource_id }),
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: "Bearer " + TokenService.getAuthToken(),
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         res.json().then((e) => Promise.reject(e));
  //       } else {
  //         this.context.addSavedResource(resource_id);

  //         res.json();
  //       }
  //     })
  //     .catch((error) => console.error({ error }));
  // };

  getRecommendations = (e) => {
    e.preventDefault();
    const { language, type, level, cost } = this.state;
    const baseUrl = config.API_BASE_URL;
    const params = `?language=${language}&level=${level}&type=${type}&cost=${cost}`;

    fetch(`${baseUrl}/resources/recs${params}`, {
      headers: {
        "content-type": "application/json",
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
    const length = this.context.recommendedResources.length;
    return (
      <div className="recs_block">
        <h2>Get Recommendations</h2>
        <h3>
          Enter your requirements to view the resources that best fit your
          needs!
        </h3>

        <form onSubmit={(e) => this.getRecommendations(e)}>
          <div className="recs_form">
            <select
              className="form_field"
              name="language"
              onChange={(e) => this.handleChange(e)}
            >
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
              <option value="Portuguese">Portuguese</option>
            </select>

            <br />

            <select
              className="form_field"
              name="type"
              onChange={(e) => this.handleChange(e)}
            >
              <option value={null}>Select Resource Type...</option>
              <option value="Textbook">Textbook</option>
              <option value="Storybook">Storybook</option>
              <option value="Class">Class</option>
              <option value="Website">Website</option>
              <option value="other">Other</option>
            </select>

            <br />
            <select
              className="form_field"
              name="level"
              onChange={(e) => this.handleChange(e)}
            >
              <option value={null}>Select Level...</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <br />
            <select
              className="form_field"
              name="cost"
              onChange={(e) => this.handleChange(e)}
            >
              <option value={null}>Select Cost...</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <br />
          <div className="button_row">
            <button type="submit">GET RECS</button>
          </div>
        </form>

        <div>
          {this.state.error ? (
            <h2>{this.state.error}</h2>
          ) : length > 0 ? (
            <div>
              <h1 className="results_header">Results</h1>
              {this.displayResults()}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default RecsPage;
