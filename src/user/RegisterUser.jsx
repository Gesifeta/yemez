import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {
  FaQuestion,
  FaCheck,
  FaCircleCheck,
  FaCircleQuestion,
} from "react-icons/fa6";
import { v4 as uuid } from "uuid";
import { createUser } from "../features/userSlice";
import { LoginFailure } from "../components";
import Toaster from "../utils/Toaster";

const RegisterNewUser = () => {
  //set time interval
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newuser, setNewUser] = useState({
    id: uuid(),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    hint: "",
    role: "newuser",
    type: "external",
  });
  const [validate, setValidate] = useState({
    email: false,
    password: false,
    containsLowerCase: false,
    containsNumber: false,
    containsUpperCase: false,
    containsSpecialCharacter: false,
  });

  //set the value of the input

  //check if the email is valid
  // Regular expression pattern for email validation
  // Test the password against the pattern
  //   ^ and $
  //  are anchors that match the start and end of the string, respectively.
  // (?=.*[!@#$%^&*(),.?":{}|<>])
  //  is a positive lookahead that checks if the string contains at least one special character from the specified set.
  // (?=.*\d)
  //  is a positive lookahead that checks if the string contains at least one digit.
  // (?=.*[a-z])
  //  is a positive lookahead that checks if the string contains at least one lowercase letter.
  // (?=.*[A-Z])
  //  is a positive lookahead that checks if the string contains at least one uppercase letter.
  // .{8,}
  //  matches any character (except newline) at least 8 times.

  const emailPattern = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);
  const passwordPattern = useMemo(
    () => /^(?=.*[!@#$%^&*(),.?"{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    []
  );
  const containsNumber = useMemo(() => /[0-9]/, []);
  const containsSpecialCharacter = useMemo(
    () => /[!@#$%^&*()_+\-=\][{};:",.<?>/]/,
    []
  );
  const containsUpperCase = useMemo(() => /[A-Z]/, []);
  const containsLowerCase = useMemo(() => /[a-z]/, []);
  //show toaster progress

  //register new user
  const registerUser = (event) => {
    event?.preventDefault();
    if (
      !newuser.firstName ||
      !newuser.lastName ||
      !newuser.email ||
      !newuser.password ||
      !newuser.confirmPassword ||
      newuser.password !== newuser.confirmPassword ||
      !emailPattern.test(newuser.email) ||
      !passwordPattern.test(newuser.password) ||
      !containsNumber.test(newuser.password) ||
      !containsSpecialCharacter.test(newuser.password) ||
      !containsUpperCase.test(newuser.password) ||
      !containsLowerCase.test(newuser.password)
    )
      return;
    const requestBody = {
      query: `
      mutation {
        createUser(newUser: {
          id: "${newuser.id}",
          firstName: "${newuser.firstName}",
          lastName: "${newuser.lastName}",
          email: "${newuser.email}",
          password: "${newuser.password}",
          hint: "${newuser.hint}",
          role: "${newuser.role}",
          type: "${newuser.type}"
        }) {
          id
          firstName
          lastName
          email
          password
          hint
          role
          type
        }
      }
    `,
    };
    dispatch(createUser(requestBody));
    return (
      setNewUser({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        hint: "",
        role: "newuser",
        type: "external",
      }) && navigate("/", { replace: true })
    );
  };
  //sign in with google
  const googleSuccess = (res) => {
    const decoded = jwtDecode(res.credential);

    const googleRequestBody = {
      query: `
      mutation {
        createUser(newUser: {
          id: "${decoded.sub}",
          firstName: "${decoded.given_name}",
          lastName: "${decoded.family_name}",
          email: "${decoded.email}",
          hint: "google",
          role: "google",
          type: "google"
          images: "${decoded.picture}"
        }) {
          id
          firstName
          lastName
          email
          password
          hint
          role
          type
        }
      }
    `,
    };
    return (
      dispatch(createUser(googleRequestBody)) &&
      navigate("/", { replace: true })
    );
  };
  //set time interval
  const googleFailure = () => {
    return <LoginFailure />;
  };
  return (
    <form className="app__form user-register">
      {user.userCreated ? (
        <Toaster
          message="User created successfully"
          type="success"
          trigger={user.userCreated}
        />
      ) : (
        <></>
      )}
      <div className="app__input-container">
        <label htmlFor="firstName">First Name</label>
        <input
          required
          type="text"
          id="firstName"
          name="firstName"
          value={newuser.firstName}
          onChange={(event) =>
            setNewUser((p) => {
              return { ...p, [event.target.name]: event.target.value };
            })
          }
        />
      </div>
      <div className="app__input-container">
        <label htmlFor="lastName">Last Name</label>
        <input
          required
          type="text"
          id="lastName"
          name="lastName"
          value={newuser.lastName}
          onChange={(event) =>
            setNewUser((p) => {
              return { ...p, [event.target.name]: event.target.value };
            })
          }
        />
      </div>
      <div className="app__input-container email">
        <label htmlFor="email">Email</label>
        <div className="app__email">
          <input
            required
            type="email"
            id="email"
            name="email"
            value={newuser.email}
            onChange={(event) => {
              setNewUser((p) => {
                return { ...p, [event.target.name]: event.target.value };
              });

              setValidate({
                ...validate,
                email: emailPattern.test(event.target.value),
              });
            }}
          />
          {validate.email ? (
            <FaCheck color="green" />
          ) : (
            <FaQuestion color="red" />
          )}
        </div>
      </div>
      <div className="app__input-container password">
        <label htmlFor="password">Password</label>
        <div>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={newuser.password}
            onChange={(event) => {
              setNewUser((p) => {
                return { ...p, [event.target.name]: event.target.value };
              });

              setValidate({
                ...validate,
                password: passwordPattern.test(event.target.value),
                containsLowerCase: containsLowerCase.test(event.target.value),
                containsNumber: containsNumber.test(event.target.value),
                containsUpperCase: containsUpperCase.test(event.target.value),
                containsSpecialCharacter: containsSpecialCharacter.test(
                  event.target.value
                ),
              });
            }}
          />
          {validate.password ? (
            <FaCheck color="green" />
          ) : (
            <FaQuestion color="red" />
          )}
        </div>
      </div>
      <div className="app__input-container password">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div>
          <input
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={newuser.confirmPassword}
            onChange={(event) =>
              setNewUser((p) => {
                return { ...p, [event.target.name]: event.target.value };
              })
            }
          />
          {newuser.confirmPassword === newuser.password ? (
            newuser.confirmPassword && <FaCheck color="green" />
          ) : (
            <FaQuestion color="red" />
          )}
        </div>
      </div>
      {newuser.password !== newuser.confirmPassword ? (
        <p className="app__error-message">Passwords do not match</p>
      ) : (
        <></>
      )}
      {/* check if password is valid*/}
      <div className="app__error-message">
        <ul className="app__error-message--password">
          <li>
            {newuser.password.length >= 6 ? (
              <FaCircleCheck color="green" />
            ) : (
              <FaCircleQuestion color="coral" />
            )}
            <span
              style={{
                color: `${newuser.password.length >= 6 ? "green" : "inherit"}`,
              }}
            >
              Password should be 6 characters long
            </span>
          </li>
          <li>
            {validate.containsNumber ? (
              <FaCircleCheck color="green" />
            ) : (
              <FaCircleQuestion color="coral" />
            )}
            <span
              style={{
                color: `${validate.containsNumber ? "green" : "inherit"}`,
              }}
            >
              Password should contain at least a number
            </span>
          </li>
          <li>
            {validate.containsSpecialCharacter ? (
              <FaCircleCheck color="green" />
            ) : (
              <FaCircleQuestion color="coral" />
            )}
            <span
              style={{
                color: `${
                  validate.containsSpecialCharacter ? "green" : "inherit"
                }`,
              }}
            >
              Password should contain at least a special character{" "}
            </span>
          </li>
          <li>
            {validate.containsUpperCase ? (
              <FaCircleCheck color="green" />
            ) : (
              <FaCircleQuestion color="coral" />
            )}
            <span
              style={{
                color: `${validate.containsUpperCase ? "green" : "inherit"}`,
              }}
            >
              Password should contain at least an uppercase letter{" "}
            </span>
          </li>
          <li>
            {validate.containsLowerCase ? (
              <FaCircleCheck color="green" />
            ) : (
              <FaCircleQuestion color="coral" />
            )}
            <span
              style={{
                color: `${validate.containsLowerCase ? "green" : "inherit"}`,
              }}
            >
              Password should contain at least an uppercase letter{" "}
            </span>
          </li>
        </ul>
      </div>

      <div>
        <details>
          <summary>Want to add password hint?</summary>
          <p className="p-small">
            Adding a password hint can help you remember your password more
          </p>
          <input
            required
            type="text"
            id="hint"
            name="hint"
            value={newuser.hint}
            placeholder="your hint ..."
            onChange={(event) =>
              setNewUser((p) => {
                return { ...p, [event.target.name]: event.target.value };
              })
            }
          />
        </details>
      </div>
      <div className="app__action-container">
        <button type="submit" onClick={registerUser}>
          Register
        </button>
        <button type="submit" onClick={() => navigate("/user/login")}>
          Cancel
        </button>
      </div>
      <div className="app__auth">
        <h1>Use other login methods</h1>
        <div className="app__auth-google">
          <button className="btn-google">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                return googleSuccess(credentialResponse);
              }}
              onError={() => {
                return googleFailure();
              }}
              useOneTap={true}
            />
          </button>
        </div>
      </div>
      <div className="app__form-Newuser">
        <p>
          Already have an account? <a href="/user/login">Login</a>
        </p>
      </div>
    </form>
  );
};

export default RegisterNewUser;
