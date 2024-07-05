import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <div className="custom_navbar">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <a className="navbar-brand text-white" href="#">
                PWA
              </a>
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleMenu}
                aria-expanded={isOpen}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active text-white"
                      aria-current="page"
                      to="/"
                      onClick={toggleMenu}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/scanner" onClick={toggleMenu}>
                      QR Scan
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-white"
                      to="/document-scan"
                    >
                      Doc Scan
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/geo-location" onClick={toggleMenu}>
                      GeoLocation
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/image-picker" onClick={toggleMenu}>
                      ImagePicker
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/signature" onClick={toggleMenu}>
                      Signature
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
