import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";

import "./Header.css";

function Header() {
  return (
    <header className="header_box">
      <Link to="/">
        <FontAwesomeIcon
          icon={faComments}
          size="1x"
          style={{ color: "white", padding: "10px" }}
        />
        LangRec
      </Link>
    </header>
  );
}

export default Header;
