import React from "react";
import config from "../config";
import TokenService from "../services/token-service";
import "./SubmitResource.css";

class SubmitResource extends React.Component {
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

    fetch(config.API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(newResource),
      headers: {
        "content-type": "application/json",
        authorization: TokenService.getAuthToken(),
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
      <div>
        <form onSubmit={(e) => this.submitResourceRequest(e)}>
          <label htmlFor="title" />
          <input type="text" name="title" placeholder="Enter resource title" />
          <label htmlFor="image_link" />
          <input type="text" name="image_link" placeholder="Add image link" />
          <label htmlFor="language" />
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
          <label htmlFor="rating" />
          <select
            className="form_field"
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
          <input type="text" name="url" placeholder="Resource URL" />
          <select
            className="form_field"
            name="cost"
            onChange={(e) => this.handleChange(e)}
          >
            <option value={null}>Select Cost...</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
          <br />
          <label htmlFor="description">
            <input
              type="text"
              name="description"
              placeholder="What should other users know about this resource?"
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        {this.state.error === "" ? null : <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default SubmitResource;
