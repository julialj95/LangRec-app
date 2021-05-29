import React from "react";
import config from "../config";
import TokenService from "../services/token-service";
import { LangrecContext } from "../LangrecContext";
import "./SubmitResource.css";

class SubmitResource extends React.Component {
  static contextType = LangrecContext;
  constructor() {
    super();
    this.state = {
      title: "",
      image_link: "",
      language: "",
      level: "",
      type: "",
      rating: "",
      url: "",
      cost: "",
      description: "",
      error: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: "",
    });
  };

  submitResourceRequest = (e) => {
    console.log("this.state", this.state);
    e.preventDefault();
    const {
      title,
      image_link,
      language,
      level,
      type,
      rating,
      url,
      cost,
      description,
    } = this.state;
    const newResource = {
      title,
      image_link,
      language,
      level,
      type,
      rating,
      url,
      cost,
      description,
    };

    fetch(`${config.API_BASE_URL}/resources`, {
      method: "POST",
      body: JSON.stringify(newResource),
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + TokenService.getAuthToken(),
      },
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((e) => Promise.reject(e));
        } else {
          this.context.addSubmittedResource(newResource);
          res.json();
        }
      })
      .catch((error) => this.setState({ error }));
  };
  render() {
    return (
      <main>
        <h2>Share a resource that you have found helpful!</h2>
        <form onSubmit={(e) => this.submitResourceRequest(e)}>
          <label htmlFor="title" />
          <input
            className="form_field block"
            type="text"
            name="title"
            placeholder="Enter resource title"
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <label htmlFor="image_link" />
          <input
            className="form_field block"
            type="text"
            name="image_link"
            placeholder="Enter image link"
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <label htmlFor="language" />
          <select
            className="form_field block"
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
            className="form_field block"
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
            className="form_field block"
            name="level"
            onChange={(e) => this.handleChange(e)}
          >
            <option value={null}>Select Level...</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <br />
          <label htmlFor="rating" />
          <select
            className="form_field block"
            name="rating"
            onChange={(e) => this.handleChange(e)}
          >
            <option value={null}>Select rating...</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <br />
          <label htmlFor="url" />
          <input
            className="form_field block"
            type="text"
            name="url"
            placeholder="Enter resource URL"
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <select
            className="form_field block"
            name="cost"
            onChange={(e) => this.handleChange(e)}
          >
            <option value={null}>Select Cost...</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
          <br />
          <label htmlFor="description">
            <textarea
              className="form_textarea"
              name="description"
              placeholder="What should other users know about this resource?"
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        {this.state.error === "" ? null : <p>{this.state.error.message}</p>}
      </main>
    );
  }
}

export default SubmitResource;
