import React from "react";
import config from "../config";
import TokenService from "../services/token-service";
import "./SubmitResource.css";

class SubmitResource extends React.Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      title: "",
      image_link: "",
      language: "",
      level: "",
      type: "",
      rating: "",
      url: "",
      cost: "",
      description: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };
  submitResourceRequest = () => {
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

    fetch(config.API_BASE_URL + `/submit`, {
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
      .catch((error) => console.error({ error }));
  };
  render() {
    return (
      <div>
        <form>
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
          <select
            className="form_field"
            name="cost"
            onChange={(e) => this.handleChange(e)}
          >
            <option value={null}>Select Cost...</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </form>
      </div>
    );
  }
}

export default SubmitResource;
