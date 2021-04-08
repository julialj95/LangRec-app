import React from "react";
// import { withRouter } from "react-router-dom";
import TokenService from "../services/token-service";
import "./ResultItem.css";

function ResultItem(props) {
  return (
    <div className="result-item">
      <div className="result-section top">
        <h5>{props.language}</h5>
        <h5>{props.level}</h5>
        <h5>{props.type} </h5>
      </div>
      <div className="result-section">
        <h3 className="centertext">{props.title}</h3>
      </div>
      <div className="results-section middle">
        <img
          src={props.image_link}
          alt="resource cover display"
          width="150px"
        />

        <h4>Rating: {props.rating}/5</h4>
        <h4>Cost: {props.cost}</h4>
        {"❤️"}
        <a href={props.url} target="_blank" rel="noreferrer">
          Link
        </a>
      </div>
      <div className="result-section bottom">
        <h4>About this resource: </h4>
        <p> {props.description} </p>
        {TokenService.hasAuthToken() ? null : (
          <p>
            <b>**Sign up or Log In to save this resource to your list!</b>
          </p>
        )}
      </div>
    </div>
  );
}

export default ResultItem;
