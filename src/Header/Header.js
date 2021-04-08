import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <Link to="/">LangRec</Link>
    </header>
  );
}

export default Header;
