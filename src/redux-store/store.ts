import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

const store=configureStore({
     reducer:{
          auth:authSlice,
     } //all the reducers
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AuthState = ReturnType<typeof store.getState>;