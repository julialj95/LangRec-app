import React from "react";
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

  render() {
    return (
      <div>
        <form>
          <label htmlFor="title" />
          <input type="text" name="title" placeholder="Enter resource title" />
        </form>
      </div>
    );
  }
}

export default SubmitResource;
