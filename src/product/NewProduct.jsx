import FileUpload from "../components/FileUpload";

import "./product.scss";
const NewProduct = () => {
  const deleteProductImage = (id, option) => {
    const reqbody = {
      query: `{
        mutation{
           deleteProductImage(id:"${id}",option:"${option}"){
           id
           images
           description
           price
           brand
           }
        }
        }`,
    };
    fetch(import.meta.env.VITE_API_URI, {
      method: "post",
      body: JSON.stringify(reqbody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ data }) => data)
      .catch((error) => error);
  };

  return (
    <form action="" className="app__form">
      <div className="app__form-product">
        <div className="app__form-product-basic">
          <div className="app__input-container">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="app__input-container">
            <label htmlFor="brand">Brand</label>
            <select name="brand" id="brand">
              <option value="samsung">Sumsang</option>
              <option value="apple">Apple</option>
              <option value="dell">Dell</option>
              <option value="acer">Acer</option>
            </select>
          </div>
          <div className="app__input-container">
            <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" />
          </div>

          <div className="app__input-container">
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value="select">select</option>
              <option value="electronics">Electronics</option>
              <option value="beauty">Beauty</option>
              <option value="groceries">Groceries</option>
              <option value="furnitures">Shoes</option>
              <option value="fragrances">Fragrances</option>
              <option value=""></option>
            </select>
          </div>
          <div className="app__input-container">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              rows={5}
            />
          </div>
          <div className="app__input-container">
            <label htmlFor="stock">Stock</label>
            <input type="number" name="stock" id="stock" />
          </div>
          <div className="app__input-container">
            <label htmlFor="rating">Rating</label>
            <input type="number" name="rating" id="rating" />
          </div>
          <div className="app__input-container">
            <label htmlFor="discount">Discount</label>
            <input type="number" name="discount" id="discount" />
          </div>
          <div className="app__input-container">
            <label htmlFor="minimumOrderQuantity">Minimum order quantity</label>
            <input
              type="number"
              name="minimumOrderQuantity"
              id="minimumOrderQuantity"
            />
          </div>
        </div>
        <div className="app__form-product-details">
          <div className="app__input-container">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Use comma(,) to add more"
            />
          </div>
          <div className="app__input-container">
            <label htmlFor="weight">Weight</label>
            <input type="text" name="weight" id="weight" />
          </div>
          <label htmlFor="dimension">Dimensions</label>
          <div className="app__product-dimensions">
            <div className="app__input-container">
              <label htmlFor="length">Length</label>
              <input type="text" name="length" id="length" />
            </div>
            <div className="app__input-container">
              <label htmlFor="breadth">Width</label>
              <input type="text" name="breadth" id="breadth" />
            </div>
            <div className="app__input-container">
              <label htmlFor="height">Height</label>
              <input type="text" name="height" id="height" />
            </div>
          </div>
          <div className="app__input-container">
            <label htmlFor="delivery">Delivery</label>
            <input type="text" name="delivery" id="delivery" />
          </div>
          <div className="app__input-container">
            <label htmlFor="availability">Availability</label>
            <input type="text" name="availability" id="availability" />
          </div>
          <div className="app__input-container">
            <label htmlFor="returnPolicy">Return policy</label>
            <input type="text" name="returnPolicy" id="returnPolicy" />
          </div>
          <div className="app__input-container">
            <label htmlFor="warranty">Warranty</label>
            <input type="text" name="warranty" id="warranty" />
          </div>
          <div className="app_input-container">
            <p>Images:</p>
            <FileUpload />
          </div>
        </div>
      </div>
      <div className="app__action-container">
        <button className="btn-primary">Submit</button>
        <button className="btn-primary">Cancel</button>
      </div>
    </form>
  );
};

export default NewProduct;
