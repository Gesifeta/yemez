import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchGraphQL from "../endpoints/api-endpoint";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (requestBody) => await fetchGraphQL(requestBody)
);
//to login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (requestBody) => await fetchGraphQL(requestBody)
);
//get users
export const getUser = createAsyncThunk(
  "user/getUser",
  async (requestBody) => await fetchGraphQL(requestBody)
);
//to update user;
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (requestBody) => await fetchGraphQL(requestBody)
);
//change password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (requestBody) => await fetchGraphQL(requestBody)
);
//show password hint
export const showPasswordHint = createAsyncThunk(
  "user/showPasswordHint",
  async (requestBody) => await fetchGraphQL(requestBody)
);
//update user role
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async (requestBody) => await fetchGraphQL(requestBody)
);
//upload  image
export const uploadImage = createAsyncThunk(
  "user/uploadImage",
  async (requestBody) => await fetchGraphQL(requestBody)
);
//delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (requestBody) => await fetchGraphQL(requestBody)
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (requestBody) => await fetchGraphQL(requestBody)
);

const initialState = {
  user: {},
  responseStatus: "",
  isLoggedIn: false,
  isAdmin: false,
  isLoading: true,
  isLoggedInFailed: false,
  hint: "",
  userDeleted: false,
  userUpdated: false,
  userCreated: false,
  passwordChanged: false,
  userRoleUpdated: false,
  imageUploaded: false,
  userLoggedOut: true,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loadingTest: (state, action) => {
      state.isLoading = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload?.loginUser || action.payload;
      if (state.user?.type === "google") state.isLoggedIn = true;
      //check if password .match
      if (
        state.user?.password !== "Password does not match." &&
        state.user?.password !== null &&
        state.user?.email !== "Email not found." &&
        state.user?.email !== null
      ) {
        state.isLoading = false;

      } else {
        state.isLoggedIn = false;
      }
    },
    hint: (state, action) => {
      state.hint = action.payload.hintShow;
      state.hint;
    },
    loginFailure: (state) => {
      state.isLoggedInFailed = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userCreated = true;
        state.user = action.payload.createUser;
        state.responseStatus = "New user successfully added.";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload?.loginUser || action.payload;
        //check if password .match
        if (
          state.user?.password !== "Password does not match." &&
          state.user?.password !== null &&
          state.user?.email !== "Email not found." &&
          state.user?.email !== null
        ) {
          state.isLoading = false;
          state.isLoggedIn = true;
        } else {
          state.isLoggedIn = false;
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.getUser;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdated = true;
        state.resoponseStatus = action.payload.updateUser;
        state.isLoading = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.passwordChanged = true;
        state.user = action.payload.changePassword;
        state.resoponseStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.userRoleUpdated = true;
        state.user = action.payload.updateUserRole;
        state.resoponseStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.imageUploaded = true;
        state.user = action.payload.uploadImage;
        state.resoponseStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userDeleted = true;
        state.user = action.payload.deleteUser;
        state.resoponseStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userLoggedOut = true;
        state.user = action.payload.logoutUser;
        state.resoponseStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(showPasswordHint.fulfilled, (state, action) => {
        state.hint = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.userCreated = false;
        state.resoponseStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggedInFailed = true;
        state.user = {};
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = {};
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.userUpdated = false;
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state) => {
        state.passwordChanged = false;
        state.isLoading = false;
      })
      .addCase(updateUserRole.rejected, (state) => {
        state.userRoleUpdated = false;
        state.isLoading = false;
      })
      .addCase(uploadImage.rejected, (state) => {
        state.imageUploaded = false;
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.userDeleted = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.userLoggedOut = false;
        state.isLoading = false;
      })
  },
});
export const { loadingTest, login, hint, loginFailure } = userSlice.actions;
export default userSlice.reducer;
