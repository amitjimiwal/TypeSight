import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
     status: boolean;
}
const initialState: AuthState = {
     status: false,
};
const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          //login
          login: (state) => {
               state.status = true;
               // state.userData = action.payload;
          },
          //logout , action is not required in this case 
          logout: (state) => {
               state.status = false;
               // state.userData = undefined;
          },
     },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
