
import { useEffect, useRef,useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({ featuredProducts }) => {
  //define callback ref
  const items = useRef(null);
  //set navigation
  const navigate = useNavigate();
  //check if feautered product is set to true
  const { isFeaturedProductHiden } = useSelector((state) => state.product);
  //setting featured product animation
  const intervalID = useRef();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
     items.current = document.querySelectorAll(".app__product-featured--item");
    intervalID.current = setInterval(changeFeaturedProduct, 3000);
    return () => {
      clearInterval(intervalID.current);
    };
  }, [idx,featuredProducts]);

  //select products with rating of 4 or more
  const changeFeaturedProduct = () => {
    clearInterval(intervalID.current);
    items.current.forEach((item) => {
      item.classList.remove("active");
      item.style.transform = `translateX(${-idx * 6}rem)`;
    });
    if (items.current[idx] === undefined) {
      return setIdx(0);
    } else {
      items.current[idx].classList.add("active");
      items.current[
        idx
      ].parentNode.parentNode.style.backgroundImage = `url(${featuredProducts[idx].images[0]})`;
    }

    if (idx === featuredProducts.length - 1) {
      setIdx(0);
    } else {
      setIdx((i) => i + 1);
    }
  };

  //setting time for featured product animation

  //setting time for featured product animation  window.addEventListener("load",changeFeaturedProduct)

  return (
    !isFeaturedProductHiden && (
      <div className="app__product-featured--container">
        <div className="nav">
          <FaAngleLeft
            className="nav"
            onClick={() => {
              setIdx((i) => i - 1);
            }}
          />
        </div>

        {/* Featured Products */}
        <div className="app__product-featured">
          {featuredProducts?.map((product) => (
            <div
              key={product.id}
              className="app__product-featured--item"
              onClick={() => {
                //clear time interval
                clearInterval(intervalID);
                document.querySelector(".app__modal")?.classList.remove("hide");
                navigate(`/home/product/detail/${product.id}`, {
                  replace: true,
                });
            
              }}
            >
              <div className="app__product-image">
                <img src={product.images[0]} alt={product.title} />
              </div>
              <div>
                <p className="p-sub-title">{product.title.slice(0, 15)}</p>
                <p className="p-small">
                  $
                  {product.price.toLocaleString("en-ET", {
                    type: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="nav">
          <FaAngleRight
            className="nav"
            onClick={() => {
              setIdx((i) => i + 1);
            }}
          />
        </div>
      </div>
    )
  );
};

export default FeaturedProducts;
