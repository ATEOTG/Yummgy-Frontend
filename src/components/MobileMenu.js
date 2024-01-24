import React from "react";
import "./MobileMenu.css";
import HamburgerIcon from "../svg/HamburgerIcon";

function MobileMenu(props) {
  return (
    <nav
      className="navbar navbar-dark nav-hamburger-menu"
      onClick={() => props.setIsCollapse(true)}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <HamburgerIcon />
        </button>
      </div>
    </nav>
  );
}

export default MobileMenu;
