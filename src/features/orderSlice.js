import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const postOrder = createAsyncThunk("postOrder/orders", async (order) => {
  return fetch(import.meta.env.VITE_API_URI, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => error);
});
// initial state of orders
const initialState = {
  orders: [],
  activeOrders: [],
  cart: {
    lineItems: [],
    numberOfItems: 0,
  },
  status: "",
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //to organize new poduct to be added to cart
      const lineItem = action.payload;
      let newProduct = {
        lineItem,
        numberOfItems: 1,
        subTotal: lineItem.price,
      };
      //insert new product to cart
      state.cart.lineItems.unshift(newProduct);
      //update the grand total
      if (state.cart.lineItems.length > 1) {
        const subTotal = state.cart.lineItems.reduce((sum, item) => {
          sum += Number(item.subTotal);
          return sum;
        }, 0);
        state.cart.totalPrice = subTotal.toFixed(2) * 1;
      } else {
        state.cart.totalPrice = action.payload.price;
      }
      state.cart.numberOfItems = state.cart.lineItems.length;
    },
    incrementItems: (state, action) => {
      state.cart.lineItems.map((data, index) => {
        //check the product to be inceased and check if current numberOfItems is greater than one
        if (data.lineItem.id === action.payload) {
          //if true increament the numberOfItems
          state.cart.lineItems[index].numberOfItems += 1;
          //update cart quantiy
          state.cart.numberOfItems = state.cart.lineItems.reduce(
            (sum, item) => {
              sum += item.numberOfItems;
              return sum;
            },
            0
          );
          //update subtotal
          state.cart.lineItems[index].subTotal =
            (
              state.cart.lineItems[index].lineItem.price *
              state.cart.lineItems[index].numberOfItems
            ).toFixed(2) * 1;
        }
      });
      //update quantiy
      state.cart.numberOfItems = state.cart.lineItems.reduce((sum, item) => {
        sum += item.numberOfItems;
        return sum;
      }, 0);
      //update the grand total
      const totalPrice = state.cart.lineItems.reduce((sum, item) => {
        sum += Number(item.subTotal);
        return sum;
      }, 0);
      state.cart.totalPrice = totalPrice.toFixed(2) * 1;
    },
    decrementItems: (state, action) => {
      //check the product to be decreased
      state.cart.lineItems.map((item, index) => {
        if (
          item.lineItem.id === action.payload &&
          state.cart.lineItems[index].numberOfItems > 1
        ) {
          //decrement the numberOfItems
          state.cart.lineItems[index].numberOfItems -= 1;
          state.cart.numberOfItems = state.cart.lineItems[index].numberOfItems;
          //update the sub total price
          state.cart.lineItems[index].subTotal =
            (
              state.cart.lineItems[index].lineItem.price *
              state.cart.lineItems[index].numberOfItems
            ).toFixed(2) * 1;
        }
        //update quantiy
        state.cart.numberOfItems = state.cart.lineItems.reduce((sum, item) => {
          sum += item.numberOfItems;
          return sum;
        }, 0);
        //update the grand total
        const totalPrice = state.cart.lineItems.reduce((sum, item) => {
          sum += item.subTotal;
          return sum * 1;
        }, 0);
        state.cart.totalPrice = totalPrice.toFixed(2) * 1;
      });
    },
    removeFromCart: (state, action) => {
      //check the product to be removed
      state.cart.lineItems.map((cart, index) => {
        if (cart.lineItem.id === action.payload) {
          //remove the product fromm the cart
          state.cart.lineItems.splice(index, 1);

          //update the grand total
          const totalPrice = state.cart.lineItems.reduce((sum, item) => {
            sum += item.subTotal;
            return sum;
          }, 0);
          //update quantiy
          state.cart.numberOfItems = state.cart.lineItems.reduce(
            (sum, item) => {
              sum += item.numberOfItems;
              return sum;
            },
            0
          );
          state.cart.totalPrice = totalPrice.toFixed(2 * 1);
          return "Cart successfully removed";
        } else {
          return "Cart already removed";
        }
      });
    },
    addToOrder: function (state, action) {
      //update the orders array
      state.activeOrders.unshift(action.payload);
    },
    removeOrder: (state, action) => {
      //find order to to remove
      state.orders.map((order, index) => {
        if (order.reference === action.payload) {
          state.orders.splice(index, 1);
          console.log("deleted order");
          return "Order successfully deleted";
        } else {
          return "Order not Found";
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state) => {
      state.status = "Loading";
      console.log(state.status);
    }),
      builder.addCase(postOrder.fulfilled, (state, action) => {
        state.status = "Successful";
        console.log(state.status);
        state.activeOrders.push(action.payload);
      }),
      builder.addCase(postOrder.rejected, (state) => {
        state.status = "Failed";
        console.log(state.status);
      });
  },
});
export const {
  addToCart,
  incrementItems,
  decrementItems,
  removeFromCart,
  addToOrder,
  removeOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
