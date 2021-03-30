import React from "react";

function ResultItem(props) {
  return (
    <div>
      <h3>
        {props.id}. {props.title}
      </h3>
      <img src={props.image_link} alt="resource image" />
      <h4>Lanuage: {props.lanugage}</h4>
      <h4>Level: {props.level}</h4>
      <h4>Type: {props.type} </h4>
      <h4>Rating: {props.rating}/5</h4>
      <h4>Link: {props.url}</h4>
      <h4>Free or Paid: {props.cost}</h4>
      <p>About this resource: {props.description} </p>
    </div>
  );
}

export default ResultItem;
