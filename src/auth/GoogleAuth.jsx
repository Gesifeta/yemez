import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import "./auth.scss";
import { login, loginFailure } from "../features/userSlice";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="app__auth">
      <h1>Use other login methods</h1>
      <div className="app__auth-google">
        <button className="btn-google">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              return (
                dispatch(
                  login({
                    id: decoded.sub,
                    firstName: decoded.given_name,
                    lastName: decoded.family_name,
                    email: decoded.email,
                    password: "XXXXXX",
                    picture: decoded.picture,
                    role: "user",
                    hint: "google",
                    type: "google",
                  })
                ) && navigate("/", { replace: true })
              );
            }}
            onError={() => {
              return dispatch(loginFailure("Login Failed"));
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default GoogleAuth;
