import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import resultSlice from "./slices/resultslice";
const store=configureStore({
     reducer:{
          auth:authSlice,
          result: resultSlice,
     },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/me/fulfilled', 'auth/me/pending', 'auth/me/rejected',"results/me/fulfilled","results/me/pending","results/me/rejected","auth/login/fulfilled","auth/register/fulfilled","auth/logout/fulfilled"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }), 
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AuthState = ReturnType<typeof store.getState>;