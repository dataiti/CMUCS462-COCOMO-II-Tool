import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  logoutAPI,
  registerAPI,
  socialLoginAPI,
} from "../../apis/auth";

const registerThunkAction = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await registerAPI(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const loginThunkAction = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginAPI(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const socialLoginThunkAction = createAsyncThunk(
  "auth/socialLogin",
  async (data, thunkAPI) => {
    try {
      const res = await socialLoginAPI(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const logoutThunkAction = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    try {
      const res = await logoutAPI(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunkAction.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(loginThunkAction.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.userInfo = action.payload.data;
          state.isLoggedIn = true;
          state.token = action.payload.accessToken;
        } else {
          state.isLoggedIn = false;
          state.userInfo = null;
          state.token = null;
        }
      })
      .addCase(socialLoginThunkAction.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.success) {
          state.userInfo = action.payload.data;
          state.isLoggedIn = true;
          state.token = action.payload.accessToken;
        } else {
          state.isLoggedIn = false;
          state.userInfo = null;
          state.token = null;
        }
      })
      .addCase(logoutThunkAction.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userInfo = null;
        state.token = null;
      });
  },
});

export {
  registerThunkAction,
  loginThunkAction,
  logoutThunkAction,
  socialLoginThunkAction,
};
export const authSelect = (state) => state.auth;
export const {} = authSlice.actions;
export default authSlice.reducer;
