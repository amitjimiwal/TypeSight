import { axiosClient } from "@/api/axiosclient";
import { LoginData, SingupData } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/interfaces";
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

export const getUserInfo = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
     try {
          const data = await axiosClient.get("/auth/me");
          return data;
     } catch (err: unknown) {
          const error = err as AxiosError;
          return rejectWithValue(error.response?.data);
     }
});

export const loginUser = createAsyncThunk("auth/login", async (load: LoginData, { rejectWithValue }) => {
     try {
          const data = await axiosClient.post("/auth/login", load);
          return data;
     } catch (err) {
          const error = err as AxiosError;
          return rejectWithValue(error.response?.data);
     }
});
export const signupuser = createAsyncThunk("auth/register", async (load: SingupData, { rejectWithValue }) => {
     try {
          const data = await axiosClient.post("/auth/register", load);
          return data;
     } catch (err) {
          const error = err as AxiosError;
          return rejectWithValue(error.response?.data);
     }
});
export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
     try {
          const data = await axiosClient.get("/auth/logout");
          return data;
     } catch (err) {
          const error = err as AxiosError;
          return rejectWithValue(error.response?.data);
     }
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
               const response = action.payload.data;
               state.isLoading = false;
               state.status = true;
               state.user = response.data;
          });
          builder.addCase(getUserInfo.rejected, (state) => {
               state.isLoading = false;
               state.status = false;
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {
               const response = action.payload.data;
               toast.success(response.message);
               state.status = true;
               state.user = response.data;
          });
          builder.addCase(loginUser.rejected, (_state, action) => {
               const response = action.payload as ErrorResponse;
               toast.error(response.message);
          });
          builder.addCase(signupuser.fulfilled, (_state, action) => {
               const response = action.payload.data;
               console.log(response);
               toast.success(response.message);
          })
          builder.addCase(signupuser.rejected, (_state, action) => {
               const response = action.payload as ErrorResponse;
               toast.error(response.message);
          });
          builder.addCase(logoutUser.fulfilled, (state, action) => {
               state.user=undefined;
               const response = action.payload.data;
               toast.success(response.message);
          })
          builder.addCase(logoutUser.rejected, (_state, action) => {
               const response = action.payload as ErrorResponse;
               toast.success(response.message);
          })

     }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
