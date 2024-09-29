import { useSelector } from "react-redux";
import { useMemo } from "react";

import FeaturedProducts from "../components/FeaturedProducts";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";


const Products = () => {
  const product = useSelector((state) => state.product);
  let featured = useMemo(
    () => product.products?.filter((product) => product.rating >= 4.5),
    [product.products]
  );
  //setProductRating()
  //get internet protocol address of  user
  return (
    <div>
      {!product.showFeaturedProduct && product.isFiltered ? (
        <FeaturedProducts featuredProducts={featured} />
      ) : (
        <></>
      )}
      <Search products={product?.products} />
      <div className="app__product-cards">
        {product?.filteredProducts?.length > 0
          ? product?.filteredProducts?.map((product, index) => (
              <ProductCard key={`${product}-${index}`} product={product} />
            ))
          : product?.products?.map((product, index) => (
              <ProductCard key={`${product}-${index}`} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Products;
