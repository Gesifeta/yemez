import { FaBars, FaX } from "react-icons/fa6";
import { useState } from "react";

import { logo } from "../assets";
import { Search, Navbar } from "../components/";

const Header = () => {
  //To set whether to show navigation bar or not
  let triggerPoint = window.innerWidth;
  triggerPoint=601;
  //if agent runs on mobile device change how navigation bar is displayed
  window.addEventListener("resize", () => {
    triggerPoint = window.innerWidth;
    triggerPoint >= 600 ? setNavbarShow(true) : setNavbarShow(false);
  });
  //to set responsive display for smaller screens
  const [menuShow, setMenuShow] = useState(true);
  const [navbarShow, setNavbarShow] = useState(true);
  const [closeNavbar, setCloseNavbar] = useState(false);

  //check if navigation bar is showing,
  return (
    <div className="app__header">
      <div className="app__header-logo">
        <img src={logo} alt="logo" />
      </div>
      <div>
        {menuShow ? (
          <FaBars
            className="app__header-menu"
            onClick={() => {
              setNavbarShow(true);
              setMenuShow(false);
              setCloseNavbar(true);
            }}
          />
        ) : closeNavbar ? (
          <FaX
            className="app__header-close"
            onClick={() => {
              setMenuShow(true);
              setNavbarShow(false);
              setCloseNavbar(false);
            }}
          />
        ) : null}
        {navbarShow ? <Navbar triggerPoint={triggerPoint} setCloseNavbar={setCloseNavbar} /> : null}
      </div>
    </div>
  );
};

export default Header;
