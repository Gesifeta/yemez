import { useSelector } from "react-redux";
const LoginFailure = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="app__login-failure">
      <h1>{user.user.isLoggedIn}</h1>
    </div>
  );
};

export default LoginFailure;
