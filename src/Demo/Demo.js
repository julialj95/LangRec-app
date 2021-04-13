import React from "react";
import ResultItem from "../ResultItem/ResultItem";
import config from "../config";

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }
  componentDidMount() {
    const baseUrl = config.API_BASE_URL;
    const params = `?language=Spanish&level=Beginner&type=Textbook&cost=Paid`;
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
      .then((data) => this.setState({ results: data }))
      .catch((error) => console.error(error));
  }

  displayResults = () => {
    const demoResults = this.state.results.map((result) => {
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
          favorited={true}
        />
      );
    });
    return demoResults;
  };

  render() {
    return (
      <main className="demo_results">
        <h1>DEMO ACCOUNT</h1>
        <h2>MY SAVED RESOURCES</h2>
        <div>{this.displayResults()}</div>
      </main>
    );
  }
}
export default Demo;
