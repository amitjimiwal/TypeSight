import { axiosClient } from "@/api/axiosclient";
import { LoginData, SingupData } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
     isLoading: boolean;
     status: boolean;
     user: User | undefined;
}

const initialState: AuthState = {
     isLoading: false,
     status: false,
     user: undefined
};

export const getUserInfo = createAsyncThunk("auth/me", async () => {
     const data = await axiosClient.get("/auth/me");
     return data;
})

export const loginUser = createAsyncThunk("auth/login", async (load: LoginData) => {
     const data = await axiosClient.post("/auth/login", load);
     return data;
});
export const signupuser = createAsyncThunk("auth/register", async (load: SingupData) => {
     const response = await axiosClient.post("/auth/register", load);
     return response;
});
export const logoutUser = createAsyncThunk("auth/logout", async () => {
     const response = await axiosClient.get("/auth/logout");
     return response;
})
const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          //login
          login: (state, action) => {
               state.status = true;
               state.user = action.payload;
          },
          //logout , action is not required in this case 
          logout: (state) => {
               state.status = false;
               state.user = undefined;
          },
     },
     extraReducers: (builder) => {
          builder.addCase(getUserInfo.pending, (state) => {
               state.isLoading = true;
          });
          builder.addCase(getUserInfo.fulfilled, (state, action) => {
               state.isLoading = false;
               if (action.payload.success) {
                    state.status = true;
                    state.user = action.payload.data;
               }
          });
          builder.addCase(getUserInfo.rejected, (state) => {
               state.isLoading = false;
               state.status = false;
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {
               if (action.payload.success) {
                    state.status = true;
                    state.user = action.payload.data;
               }
          });
          builder.addCase(signupuser.fulfilled, (state, action) => {
               if (action.payload.success) {
                    state.status = true;
                    state.user = action.payload.data;
               }
          })
          builder.addCase(logoutUser.fulfilled, (state, action) => {
               if (action.payload.success) {
                    state.status = false;
                    state.user = undefined;
               }
          })

     }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
