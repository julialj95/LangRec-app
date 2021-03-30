import React from "react";

function ResultItem(props) {
  return (
    <div>
      <h3>
        {props.id}. {props.title}
      </h3>
      <img src={props.image_link} alt="resource cover" />
      <h4>Lanuage: {props.lanugage}</h4>
      <h4>Level: {props.level}</h4>
      <h4>Type: {props.type} </h4>
      <h4>Rating: {props.rating}/5</h4>
      <h4>Free or Paid: {props.cost}</h4>
      <h4>Link: </h4>
      <a href={props.url}>{props.url}</a>
      <h4>About this resource: </h4>
      <p> {props.description} </p>
    </div>
  );
}

export default ResultItem;
