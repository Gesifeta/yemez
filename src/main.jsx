
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.scss";
import App from "./App.jsx";
import userReducer from "./features/userSlice.js";
import systemReducer from "./features/systemSlice.js";
import orderReducer from "./features/orderSlice.js";
import productReducer from "./features/productSlice.js";
import customerReducer from "./features/customerSlice.js";
import LoginFailure from "./components/LoginFailure.jsx";
import RegisterUser from "./user/RegisterUser.jsx";
import UserLogin from "./components/UserLogin.jsx";

import FileUpload from "./components/FileUpload.jsx";
import NewProduct from "./product/NewProduct.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Home from "./container/Home.jsx";
import NewCustomer from "./customer/NewCustomer.jsx";
//create routes
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/product/detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/home/product/edit/:id",
        element: <ProductDetail />,
      },
      {
        path: "/home/product/delete/:id",
        element: <ProductDetail />,
      },
      {
        path: "/home/order/new",
        element: <NewProduct />,
      },
      {
        path: "/home/order/detail/:id",
        element: <NewProduct />,
      },
      {
        path: "/home/order/edit/:id",
        element: <NewProduct />,
      },
      {
        path: "/home/order/delete/:id",
        element: <NewProduct />,
      },
      {
        path: "/home/order/complete/:id",
        element: <NewProduct />,
      },
    ],
  },
  {
    path: "/customer/new",
    element: <NewCustomer />,
  },
  {
    path: "/customer/edit/:id",
    element: <NewCustomer />,
  },
  {
    path: "/customer/delete/:id",
    element: <NewCustomer />,
  },
  {
    path: "/user/new",
    element: <RegisterUser />,
  },
  {
    path: "/user/login",
    element: <UserLogin />,
  },
  {
    path: "/user/login/failure",
    element: <LoginFailure />,
  },
  {
    path: "file/upload",
    element: <FileUpload />,
  },
  {
    path: "/home/product/new",
    element: <NewProduct />,
  },
]);
//configure data store

const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
    product: productReducer,
    order: orderReducer,
    system: systemReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
    >
      <RouterProvider router={route}>
        <App />
      </RouterProvider>
    </GoogleOAuthProvider>
  </Provider>
);
