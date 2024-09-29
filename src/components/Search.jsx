import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { filterProduct, hideFeaturedProducts } from "../features/productSlice";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

const Search = ({ products }) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //show product detail
  const showProductDetail = (event, id) => {
    let target = event.target;
    event.preventDefault();
    if (target.firstElementChild) {
      setSearchValue(target.firstElementChild.nextSibling.textContent);
    } else {
      setSearchValue(
        target.parentNode.firstElementChild.nextSibling.textContent
      );
    }
    document.querySelector(".app__modal")?.classList.remove("hide");
    return navigate(`/home/product/detail/${id}`, { replace: false });
  };
  //handle search searchListContainer
  const searchProducts = useCallback(() => {
    let searchListContainer = document.querySelector(
      ".app__product-search--container"
    );
    const productItem = document.createElement("div");
    const list = document.createElement("div");
    productItem.classList.add("app__product-search--item");
    let count = document.createElement("span");

    count.classList.add("app__product-search--count");
    list.appendChild(count);
    let image = document.createElement("img");
    let title = document.createElement("h3");
    let category = document.createElement("p");
    let price = document.createElement("p");
    // make price element bold
    price.style.fontWeight = "bold";
    //make price element color red
    price.style.color = "red";
    //clear search list elements before population new search list
    if (searchValue === "") {
      while (searchListContainer.firstChild) {
        searchListContainer.removeChild(searchListContainer.firstChild);
      }
      return dispatch(filterProduct(products));
    }
    //append search list elements

    while (searchListContainer.firstChild) {
      searchListContainer.removeChild(searchListContainer.firstChild);
    }
    //filter product based on search searchListContainer
    const filteredProducts = products.filter(
      (product) =>
        product.title.includes(searchValue) ||
        product.category.includes(searchValue) ||
        product.description.includes(searchValue) ||
        product.tags.includes(searchValue)
    );
    //found product count
    count.textContent +=
      filteredProducts.length +
      " " +
      count.textContent +
      `${filteredProducts.length > 1 ? "products" : "product"} found`;
    filteredProducts.forEach((element) => {
      //use clone node to avoid overwriting the original elements
      let newImage = image.cloneNode(image);
      newImage.src = element.images[0];
      let newTitle = title.cloneNode(title);
      let newCategory = category.cloneNode(category);
      let newPrice = price.cloneNode(price);
      let newProductItem = productItem.cloneNode(productItem);
      newProductItem.appendChild(newImage);
      newProductItem.appendChild(newTitle);
      newProductItem.appendChild(newCategory);
      newProductItem.appendChild(newPrice);

      //show product's detail on click
      newProductItem.addEventListener("click", (event) => {
        showProductDetail(event, element.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      (newTitle.textContent = element.title.slice(0, 20)),
        (newCategory.textContent = element.category),
        (newPrice.textContent = "USD " + element.price.toLocaleString());
      list.appendChild(newProductItem);
      searchListContainer.appendChild(list);
      return list;
    });

    return dispatch(filterProduct(filteredProducts));
  }, [searchValue, products, dispatch]);

  const debouncedSearch = useCallback(
    debounce(searchProducts, 300),
    [searchProducts]
  );

  useEffect(() => {
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div className="app__product-search">
      <label htmlFor="search" className="app__product-search--input">
        <input
          type="search"
          name="search"
          id="search"
          value={searchValue}
          placeholder="Search here..."
          onClick={() => dispatch(hideFeaturedProducts(true))}
          onChange={(e) => { setSearchValue(e.target.value); debouncedSearch(); }}
        />
        <FaMagnifyingGlass className="app__product-search--icon" />
      </label>

      {/* <button>Search</button> */}
      <div className="app__product-search--container">
        <NavLink className="app__product-list"></NavLink>
      </div>
    </div>
  );
};

export default Search;
