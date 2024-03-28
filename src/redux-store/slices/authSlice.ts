import { createSlice } from "@reduxjs/toolkit";
export interface User {
     id: number;
     createdAt: string;
     email: string;
     name: string;
     password: string;
     isEmailVerified: boolean;
     isProUser: boolean;
 }
interface AuthState {
     status: boolean;
     user:User | undefined;
}
const initialState: AuthState = {
     status: false,
     user:undefined
};
const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          //login
          login: (state,action) => {
               state.status = true;
               state.user = action.payload;
          },
          //logout , action is not required in this case 
          logout: (state) => {
               state.status = false;
               state.user = undefined;
          },
     },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
