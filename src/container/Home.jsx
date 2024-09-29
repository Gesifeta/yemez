import { useSelector } from "react-redux";

import Cart from "../components/Cart";
import Loader from "../utils/Loader";
import Products from "./Products";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { isLoading } = useSelector((state) => state.product);
  return (
    <div className="app__product">
      <Cart />
      {isLoading !== "Success" ? <Loader /> : <Products />}
      {isLoading === "Failed" && (
        <h1>Unable to fetch data, may be network problem</h1>
      )}
      <Outlet />
    </div>
  );
};

export default Home;
