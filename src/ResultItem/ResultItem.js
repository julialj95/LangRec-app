import React from "react";
import { Link, withRouter } from "react-router-dom";
import TokenService from "../services/token-service";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../config";
import { LangrecContext } from "../LangrecContext";
// import Tooltip from "../Tooltip/Tooltip";
// import ReactTooltip from "react-tooltip";
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

  deleteFromFavorites = (resource_id) => {
    fetch(`${config.API_BASE_URL}/resources/saved-resources/${resource_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + TokenService.getAuthToken(),
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then(() => {
        this.context.removeSavedResource(resource_id);
      })
      .catch((error) => console.error(error));
  };

  handleFavoriteClick = (id) => {
    if (
      this.context.savedResourceIds.filter(
        (resource) => Number(resource) === id
      ).length > 0
    ) {
      this.deleteFromFavorites(id);
    } else {
      this.saveAResource(id);
    }
  };

  render() {
    const { language, level, type } = this.props;
    const lang = language.toUpperCase();
    const lev = level.toUpperCase();
    const t = type.toUpperCase();
    const path = this.props.match.path;

    return (
      <div className="result">
        <div className="top_block" onClick={this.displayFull}>
          <div className="labels_block">
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
          </div>
          <h3 className="title_row">{this.props.title}</h3>
          {!this.state.displayFull ? <p>View full resource...</p> : null}
        </div>
        {this.state.displayFull ? (
          <>
            <div className="result_section desc_row">
              <img
                className="result_image"
                src={this.props.image_link}
                alt="resource cover display"
              />

              <p className="description">"{this.props.description}" </p>
            </div>

            <div>
              <div className="result_section link_row">
                <a href={this.props.url} target="_blank" rel="noreferrer">
                  Link
                </a>
              </div>
              <div className="results_section">
                <div className="favorite_row">
                  <button
                    className={
                      this.context.isLoggedIn ? "fav_btn_logged_in" : "fav_btn"
                    }
                    key={this.props.title}
                    value={this.props.id}
                    disabled={!this.context.isLoggedIn ? true : false}
                    onClick={() => this.handleFavoriteClick(this.props.id)}
                  >
                    {this.props.favorited ? (
                      <FontAwesomeIcon
                        icon={faHeartSolid}
                        size="2x"
                        style={{ color: "red" }}
                      />
                    ) : (
                      <FontAwesomeIcon icon={faHeart} size="2x" />
                    )}
                  </button>
                </div>

                {this.props.favorited && path === "/recs" ? (
                  <div className="favorites_link_row">
                    <p>
                      <Link
                        to="/saved-resources"
                        key={this.props.image_link}
                        className="view_link"
                      >
                        View in Saved Resources List
                      </Link>
                    </p>
                  </div>
                ) : null}
                {!this.context.isLoggedIn ? (
                  <div className="favorites_link_row">
                    <p>
                      <Link to="/signup" className="view_link">
                        Sign up{" "}
                      </Link>{" "}
                      or{" "}
                      <Link to="/login" className="view_link">
                        log in
                      </Link>{" "}
                      to add this resource to your favorites!
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default withRouter(ResultItem);
