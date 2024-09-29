import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ViewGrid from "./ViewGrid";
import { googleLogout } from "@react-oauth/google";

const Navbar = ({ triggerPoint, setCloseNavBar }) => {
  const navigate = useNavigate();

  let user = useSelector((state) => state.user);
  //To toggle user setting view
  const [viewSetting, setViewSetting] = useState(false);
  const toggleSetting = () => {
    setViewSetting(!viewSetting);
  };

  return (
    <nav
      className="app__navbar"
      onMouseLeave={(event) => {
        //remove the navbar
        triggerPoint > 600
          ? event.target.parentNode.classList.remove("hide") &&
            setCloseNavBar(true)
          : event.target.parentNode.classList.add("hide");
      }}
    >
      <ul>
        {["Home", "Products", "Services", "Contacts", "About"].map(
          (menu, index) => (
            <li key={`${menu}-${index}`}>{menu}</li>
          )
        )}
        <li>
          <div className="app__user">
            {!user.isLoggedIn ? (
              <div className="app__action-container">
                <button
                  className="btn-cta"
                  onClick={() => navigate("/user/new", { replace: true })}
                >
                  Sign Up
                </button>
                <button
                  className="btn-cta"
                  onClick={() => navigate("/user/login", { replace: true })}
                >
                  Log In
                </button>
              </div>
            ) : (
              <div className="app__user-access">
                <div className="app__user-access--image">
                  <img
                    src={
                      user.user.type === "google"
                        ? `${user.user?.picture}`
                        : user.user?.images && user.user?.images[0]
                    }
                    alt="user profile image"
                  />
                  <ViewGrid toggleSetting={toggleSetting} />
                </div>
                {viewSetting ? (
                  <div className="app__user-access--setting">
                    <ul>
                      {[
                        "Sign out",
                        "View profile",
                        "Update profile",
                        "Change password",
                        "Close account",
                      ].map((setting, index) => (
                        <li
                          key={`${setting}-${index}`}
                          onClick={(event) => {
                            if (event.target.textContent === "Sign out") {
                              googleLogout();
                              user = null;
                              localStorage.clear();
                              location.reload();
                              navigate("/home", { replace: true });
                            }
                          }}
                        >
                          {setting}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
