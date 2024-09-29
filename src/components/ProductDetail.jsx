import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";

const ProductDetail = () => {
  const id = useParams().id;
  //get product by id
  const product = useSelector((state) => state.product.products).find(
    (product) => product.id == id
  );
  //to remove model window
  const removeModel = (event) => {
    event.stopPropagation();
    //check if clicked element is close button
    if (event.target.classList.contains("close")) {
      event.target.parentNode.parentNode.classList.add("hide");
    }
    //check of clicked element is model window
    if (event.target.classList.contains("app__modal")) {
      event.target.classList.add("hide");
    }
    //check of key presss is escape.
    window.onkeydown = (event) => {
      if (event.key === "Escape") {
        document.querySelector(".app__modal").classList.add("hide");
      }
    };
  };

  //to display customer ratings
  const rating = () => {
    let rate = [];
    for (let i = 0; i < product?.rate - 1; i++) {
      rate.push(<AiFillStar className="app__product-rate" />);
    }
    return rate.map((item, index) => <span key={index}>{item}</span>);
  };
  return (
    <div className="app__modal" onClick={removeModel} id="app__modal">
      <span>
        <button className="close">x</button>
      </span>
      <div className="app__product-detail view">
        <div className="app__product-detail--image">
          <img src={product?.images[0]} alt={product?.title} />
        </div>
        <div className="app__product-detail--category">
          <p className="p-small">{product?.category}</p>
        </div>
        <div className="app__product-detail--rating">
          <p className="rate">{rating()}</p>
          <div className="reviews">
            {product?.reviews.length}{" "}
            {product?.reviews.length > 1 ? " customers" : " customer"} reviewed
            this product.
          </div>
        </div>

        <div className="app__product-detail--brand">
          <p className="p-title">{product?.brand}</p>
        </div>
        <div className="app__product-detail--description">
          <p className="p-description">{product?.description}</p>
        </div>
        <div className="app__product-detail--price">
          <p className="p-sub-title">Price: ${product?.price}</p>
        </div>
        <div className="app__product-detail--discount">
          <p>Discount percentage: {product?.discountPercentage}%</p>
        </div>
        <div className="app__product-detail--stock">
          <p className="p-sub-title">{product?.stock} in stock</p>
        </div>
        <div className="app__product-detail--condition">
          <p>Return policy: {product?.returnPolicy}</p>
        </div>

        <div className="app__product-detail--weight">
          <p className="p-sub-title">Weight: {product?.weight}kg</p>
        </div>
        <div className="app__product-detail--size">
          <p>Width: {product?.dimensions?.width}</p>
          <p>Height: {product?.dimensions?.height}</p>
          <p>Depth: {product?.dimensions?.depth}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
