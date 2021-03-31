import React from "react";
import TokenService from "./services/token-service";

function ResultItem(props) {
  return (
    <div>
      <h3>
        {props.id}. {props.title}
      </h3>
      <img src={props.image_link} alt="resource cover display" />
      <h4>Lanuage: {props.lanugage}</h4>
      <h4>Level: {props.level}</h4>
      <h4>Type: {props.type} </h4>
      <h4>Rating: {props.rating}/5</h4>
      <h4>Free or Paid: {props.cost}</h4>
      <h4>Link: </h4>
      <a href={props.url}>{props.url}</a>
      <h4>About this resource: </h4>
      <p> {props.description} </p>
      {TokenService.hasAuthToken() ? (
        <button>Add to My Favorites</button>
      ) : (
        <p>
          <b>**Sign up or Log In to save this resource to your list!</b>
        </p>
      )}
    </div>
    // onClick={this.handleSaveResource}
  );
}

export default ResultItem;
