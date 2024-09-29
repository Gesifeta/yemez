import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaCartShopping } from "react-icons/fa6";

import { addToCart, removeFromCart } from "../features/orderSlice";
import WrapperCard from "./WrapperCard";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(false);
  //to add to cart
  const AddItemToCart = () => {
    setInCart(true);
    dispatch(addToCart(product));
  };
  //remove from cart
  const removeItemFromCart = () => {
    dispatch(removeFromCart(product.id));
    setInCart(false);
  };
  return (
    <div className="app__product-card">
      <div className="app__product-image">
        <img src={product.images[0]} alt="product image"  onClick={() => {
              document.querySelector(".app__modal")?.classList.remove("hide");
              navigate(`/home/product/detail/${product.id}`, { replace: false });
            }}/>
      </div>
      <p className="p-small">{product.brand}</p>
      <div className="app__product-detail">
        <p className="p-title">{product.title}</p>
        <p className="p-sub-title">
          Price: <s className="delete"> ${product.price}</s>$
          {(
            Number(product.price) -
            Number(product.price) * Number(product.discountPercentage / 100)
          ).toFixed(2)}
        </p>
        <p className="p-description">
          {product.description.slice(0, 100)}
          <span
            className="app__product-detail detail"
            onClick={() => {
              document.querySelector(".app__modal")?.classList.remove("hide");
              navigate(`/home/product/detail/${product.id}`, { replace: false });
            }}
          >
            More...
          </span>
        </p>
        <p style={{ color: "green" }}>{product.delivery}</p>
        <div className="app__action-container">
          {!inCart ? (
            <button className="btn-cart" onClick={AddItemToCart}>
              <FaCartPlus />
              Add
            </button>
          ) : (
            <button className="btn-cart added" onClick={removeItemFromCart}>
              <FaCartShopping />
              remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WrapperCard(ProductCard);
