import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getProducts } from "./features/productSlice";
import Header from "./container/Header";
import Offline from "./utils/Offline";
import Home from "./container/Home";
import Footer from "./container/Footer";

function App() {
  const dispatch = useDispatch();
  // dispatching action to get products from server
  // and passing the graphql query asa
  // request body for product query

  const reqBody = {
    query: `
      query{
      showAllProducts{
            id
            title
            brand
            model
            description
            category
            price
            discountPercentage
            rating
            stock
            tags
            status
            weight
            dimensions{
              width
              height
              depth
            }
            warranty
            delivery
            availability
            reviews{
                id
              rating
              comment
              date
              commentedBy
            }
            returnPolicy
            minimumOrderQuantity
            images
        }
  }`,
  };

  useEffect(() => {
    dispatch(getProducts(reqBody));
  }, []);
  return (
    <main className="app">
      <Header />
 
      {/* check of the user is offline*/}
      <Offline/>  
      <Home/> 
      <Footer />
    </main>
  );
}

export default App;
