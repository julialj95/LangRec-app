import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../config";
import { LangrecContext } from "../LangrecContext";
// import Tooltip from "../Tooltip/Tooltip";
import ReactTooltip from "react-tooltip";
import "./ResultItem.css";

class ResultItem extends React.Component {
  static contextType = LangrecContext;
  constructor() {
    super();
    this.state = {
      displayFull: false,
    };
  }

  displayFull = () => {
    this.setState((prevState) => {
      return {
        displayFull: !prevState.displayFull,
      };
    });
  };

  displayStars = (rating) => {
    let starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starsArray.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarSolid}
            style={{ color: "yellow" }}
          />
        );
      } else starsArray.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
    return starsArray;
  };

  saveAResource = (resource_id) => {
    console.log("save a resource called");
    console.log(resource_id);
    fetch(`${config.API_BASE_URL}/resources/recs`, {
      method: "POST",
      body: JSON.stringify({ resource_id }),
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + TokenService.getAuthToken(),
      },
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((e) => Promise.reject(e));
        } else {
          this.context.addSavedResource(resource_id);

          res.json();
        }
      })
      .catch((error) => console.error({ error }));
  };
  render() {
    const { language, level, type } = this.props;
    const lang = language.toUpperCase();
    const lev = level.toUpperCase();
    const t = type.toUpperCase();
    return (
      <div className="result">
        <div className="top_block" onClick={this.displayFull}>
          <div className="result_section labels_row_top">
            <h5 className="result_label">{lang}</h5>
            <h5 className="result_label">{lev}</h5>
            <h5 className="result_label">{t} </h5>
          </div>
          <div className="result_section labels_row_bottom">
            <h5 className="result_label">COST: {this.props.cost}</h5>
            <h5 className="result_label">
              RATING: {this.displayStars(this.props.rating)}
            </h5>
          </div>
          <h3 className="title_row">{this.props.title}</h3>
          {!this.state.displayFull ? (
            <p className="view_more">View full resource...</p>
          ) : null}
        </div>
        {this.state.displayFull ? (
          <>
            <div className="result_section">
              <img
                className="result_image"
                src={this.props.image_link}
                alt="resource cover display"
                width="150px"
              />

              <p className="description"> {this.props.description} </p>
            </div>

            <div>
              <div className="result_section link_row">
                <a href={this.props.url} target="_blank" rel="noreferrer">
                  Link
                </a>
              </div>
              <div className="results_section favorites_row">
                {/* {!this.context.isLoggedIn ? ( */}
                <ReactTooltip
                  data-tip="fav_btn"
                  data-for="fav_btn"
                  id="fav_btn"
                >
                  Log in or sign up to add this resource to your favorites!
                </ReactTooltip>
                {/* ) : null */}
                <span
                  id="fav_btn"
                  data-for="fav_btn"
                  onClick={() => this.saveAResource(this.props.id)}
                >
                  <button
                    className="fav_btn"
                    key={this.props.title}
                    value={this.props.id}
                    disabled={
                      !this.context.isLoggedIn || this.props.favorited
                        ? true
                        : false
                    }
                    // onClick={() => this.saveAResource(this.props.id)}
                  >
                    {this.props.favorited ? (
                      <FontAwesomeIcon icon={faHeartSolid} size="2x" />
                    ) : (
                      <FontAwesomeIcon icon={faHeart} size="2x" />
                    )}
                  </button>
                </span>

                {this.props.favorited ? (
                  <Link to="/saved-resources" key={this.props.image_link}>
                    View in Saved Resources List
                  </Link>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default ResultItem;

/* {this.context.isLoggedIn ? null : (
            <p>
              <b>**Sign up or Log In to save this resource to your list!</b>
            </p>
          )} */
