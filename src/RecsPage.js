import React, { Component } from "react";
import config from "./config";

class RecsPage extends Component {
  constructor() {
    super();
    this.state = {
      language: "",
      type: "",
      level: "",
      cost: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  getRecommendations = (e) => {
    e.preventDefault();
    const { language, type, level, cost } = this.state;
    const baseUrl = config.API_BASE_URL;
    const params = `?language=${language}&level=${level}&type=${type}&cost=${cost}`;
    fetch(`${baseUrl}/resources/recs${params}`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + config.API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        }
        return response.json();
      })
      .catch((error) => console.error({ error }));
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
              <option value="textbook">Textbook</option>
              <option value="storybook">Storybook</option>
              <option value="class">Class</option>
              <option value="website">Website</option>
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
              value="beginner"
              onChange={(e) => this.handleChange(e)}
            />
            <label htmlFor="beginner">Beginner</label>
            <br />
            <input
              type="radio"
              id="intermediate"
              name="level"
              value="intermediate"
              onChange={(e) => this.handleChange(e)}
            />
            <label htmlFor="intermediate">Intermediate</label>
            <br />
            <input
              type="radio"
              id="advanced"
              name="level"
              value="advanced"
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
      </div>
    );
  }
}

export default RecsPage;
