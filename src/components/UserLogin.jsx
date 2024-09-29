import { googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

import { loginUser, hint, loadingTest } from "../features/userSlice.js";
import GoogleAuth from "../auth/GoogleAuth.jsx";


const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access = useSelector((state) => state.user);
  const [user, setUser] = useState({
    id: "",
    type: "",
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
    hint: "",
  });
  //to handle user input
  useEffect(() => {
    access.isLoggedIn && navigate("/", { replace: true });
  }, [access.isLoggedIn]);
  const changeHandle = (event) => {
    let target = event.target;
    return setUser((u) => {
      return { ...u, [target.name]: target.value };
    });
  };

  //set up for user login
  const userAccess = (event) => {
    event.preventDefault();
    //set body of the request
    const reqbody = {
      query: `
  query{
           loginUser(email:"${user.email}",password:"${user.password}"){
                    id
                    email
                    password
                    hint
                    type
                    role
                    images
                  }
    }
    `,
    };
    return dispatch(loginUser(reqbody));
  };
  const showHint = async () => {
    const reqestBody = {
      query: `
      query{
      hintShow(email:"${user.email}"){
      hint
      }
      }
      `,
    };
    return fetch(import.meta.env.VITE_API_URI, {
      method: "POST",
      body: JSON.stringify(reqestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        dispatch(loadingTest(false));
        dispatch(hint(data));
      })
      .catch((error) => error);
  };

  return !access.isLoggedIn ? (
    <div className="app__login">
      <form action="" className="app__form user-login" autoComplete="true">
        <div className="app__input-container">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={changeHandle}
          />
        </div>
        <div className="app__input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={changeHandle}
          />
          <span style={{ color: "red" }}>
            {access.user.password || access.user.email}
          </span>
        </div>
        <div className="app__password-reset">
          <a href="">Forgot your password?</a>
          <details>
            <summary onClick={showHint}>Show hint?</summary>
            <p>
              <label htmlFor="hint" className="app__password-hint">
                {access.hint.hint}
              </label>
            </p>
          </details>
        </div>
        <div className="app__action-container">
          <button onClick={(event) => userAccess(event)}>Login</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/", { replace: true });
              googleLogout();
            }}
          >
            Cancel
          </button>
        </div>
        <GoogleAuth />
      </form>
    </div>
  ) : (
    <ThreeCircles //loading spinner
      className="app__spinner"
      visible={true}
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default UserLogin;
