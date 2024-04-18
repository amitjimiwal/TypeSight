import { axiosClient } from "@/api/axiosclient";
import { ErrorResponse } from "@/types/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface ResultData {
     id: number;
     userID: number;
     score: number;
     accuracy: number;
     duration: number;
     createdAt: string;
}

interface ResultState {
     isLoadingResults: boolean;
     results: ResultData[] | undefined;
}

const initialState: ResultState = {
     isLoadingResults: false,
     results: undefined,
};
export const getResultsInfo = createAsyncThunk("results/me", async (id: string, { rejectWithValue }) => {
     try {
          const data = await axiosClient.get(`/result/${id}`);
          return data;
     } catch (error) {
          const err = error as AxiosError;
          return rejectWithValue(err.response?.data)
     }
})
const resultSlice = createSlice({
     name: 'results',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder.addCase(getResultsInfo.pending, (state) => {
               state.isLoadingResults = true;
          });
          builder.addCase(getResultsInfo.fulfilled, (state, action) => {
               state.isLoadingResults = false;
               const response = action.payload.data;
               state.results = response.data;
               toast.success(response.message);
          });
          builder.addCase(getResultsInfo.rejected, (state, action) => {
               state.isLoadingResults = false;
               const response = action.payload as ErrorResponse;
               toast.error(response.message);
          });
     },
})

export default resultSlice.reducer;
