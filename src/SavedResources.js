import React, { Component } from "react";
import { LangrecContext } from "./LangrecContext";
import ResultItem from "./ResultItem";
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
    const results = data.map((result) => {
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
        />
      );
    });
    this.setState({ results });
  };

  componentDidMount() {
    const { user_id } = this.context.user;

    fetch(`${config.API_BASE_URL}/users/${user_id}`);
  }

  render() {
    return (
      <div>
        <button>Remove resource from my page</button>
      </div>
    );
  }
}

export default SavedResources;

/* <h2>My Saved Resources (Example)</h2>
      <h3>Title: En Espanol-Level 1</h3>
      <h4>Type: Textbook</h4>
      <h4>Level: Beginner</h4>
      <img
        src="https://img.thriftbooks.com/api/images/m/43b30bce375d76d7244b3605b9d1d59356832a09.jpg"
        alt="book cover"
        width="150px"
      />
      <h4>Average Rating: 4</h4>
      <br /> */
