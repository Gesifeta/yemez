import { createSlice } from "@reduxjs/toolkit";

export const stystemSlice = createSlice({
  name: "system",
  initialState: {
    online: true,
  },
  reducers: {
    setOnline: (state, action) => {
      state.mode = action.payload;
    },
  },
});
export const { setOnline } = stystemSlice.actions;
export default stystemSlice.reducer;
