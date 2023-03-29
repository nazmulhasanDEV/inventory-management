import React, { useContext, useState } from "react";
import { AlignJustify } from "react-feather";
import NavbarContext from "./context/NavbarContext";

const Topbar = ({ children }) => {
  const navbarContext = useContext(NavbarContext);

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken } =
    navbarContext;

  return (
    <>
      <div className="top-navbar">
        <nav class="navbar bg-light">
          <div class="container">
            {broken ? (
              <button
                className="toggle-collapse-btn"
                onClick={() => toggleSidebar()}
              >
                <AlignJustify />
              </button>
            ) : (
              <button
                className="toggle-collapse-btn"
                onClick={() => collapseSidebar()}
              >
                <AlignJustify />
              </button>
            )}

            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>

      <div style={{ position: "absolute" }}>{children}</div>
    </>
  );
};

export default Topbar;
