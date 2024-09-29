/* eslint-disable react/display-name */
import { FaHeart, FaCircleInfo } from "react-icons/fa6";
const WrapperCard =
  (Component) =>
  ({ product }) => {
    return (
      <div
        className="app__product-wrapper"   
        onMouseEnter={(e) => {
          e.stopPropagation();
          let target = e.target;
          if (target.className === "app__product-wrapper") {
            target.firstElementChild.style.visibility = "visible";
          }
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          let target = e.target;
          if (target.className === "app__product-wrapper") {
            target.firstElementChild.style.visibility = "hidden";
          }
        }}
      >
        <div className="app__product-info">
          <div className="app__produuct-seller--info">
            <FaCircleInfo />
          </div>
          <div className="app__product-viewer--reaction">
            <FaHeart />
          </div>
        </div>
        <Component product={product} />
      </div>
    );
  };

export default WrapperCard;
