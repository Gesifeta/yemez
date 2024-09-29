import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchGraphQL from "../endpoints/api-endpoint";


export const getProducts = createAsyncThunk(
  "getProducts/products",
  async (reqbody) => fetchGraphQL(reqbody)
);
const initialState = {
  products: [],
  filteredProducts: [],
  featuredProducts: [],
  isFeaturedProductHiden: false,
  isLoading: false,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, actions) => {
      state.products.push(actions.payload);
    },
    updateProduct: (state, actions) => {
      state.products = state.products.map((product) => {
        if (product.id === actions.payload.id) {
          return actions.payload;
        }
        return product;
      });
    },
    deleteProduct: (state, actions) => {
      state.products = state.products.filter(
        (product) => product.id !== actions.payload
      );
    },
    filterProduct: (state, actions) => {
      state.filteredProducts = actions.payload;
      state.isFiltered = true;
    },
    hideFeaturedProducts: (state) => {
      state.isFeaturedProductHiden = !state.isFeaturedProductHiden;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = "Loading...";
      console.log(state.isLoading);
    }),
      builder.addCase(getProducts.fulfilled, (state, actions) => {
        state.products = actions.payload.showAllProducts;
        state.isLoading = "Success";
        console.log(state.isLoading);
      }),
      builder.addCase(getProducts.rejected, (state) => {
        state.isLoading = "Failed";
        console.log(state.isLoading);
      });
  },
});
export const {
  addProduct,
  updateProduct,
  deleteProduct,
  filterProduct,
  hideFeaturedProducts,
} = productSlice.actions;
export default productSlice.reducer;
