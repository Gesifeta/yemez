import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchGraphQL from "../endpoints/api-endpoint";

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (requestBody) => {
    return await fetchGraphQL(requestBody);
  }
);
export const createMyCustomer = createAsyncThunk(
  "customer/createMyCustomer",
  async (reqbody) => await fetchGraphQL(reqbody)
);
const initialState = {
  customers: [],
  isLoading: false,
  customerStatus:false,
};
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, actions) => {
      state.customers.push(actions.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMyCustomer.pending, (state) => {
        state.isLoading = true;
        state.customerStatus=false;
      })
      .addCase(createMyCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload;
        state.customerStatus=true;
      })
      .addCase(createMyCustomer.rejected, (state) => {
        state.isLoading = false;
        state.customerStatus=false;
      });
  },
});
export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
