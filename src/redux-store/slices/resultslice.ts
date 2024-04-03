import { axiosClient } from "@/api/axiosclient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ResultData {
     id: number;
     userID: number;
     score: number;
     accuracy: number;
     duration: number;
     createdAt: string;
}

interface ResultState {
     isLoading: boolean;
     results: ResultData[] | undefined;
}

const initialState: ResultState = {
     isLoading: false,
     results: undefined,
};
export const getResultsInfo = createAsyncThunk("results/me", async (id: string) => {
     const data = await axiosClient.get(`result/${id}`);
     return data;
})
const resultSlice = createSlice({
     name: 'results',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder.addCase(getResultsInfo.pending, (state) => {
               state.isLoading = true;
          });
          builder.addCase(getResultsInfo.fulfilled, (state, action) => {
               state.isLoading = false;
               if (action.payload.success) {
                    state.results = action.payload.data;
               }
          });
          builder.addCase(getResultsInfo.rejected, (state) => {
               state.isLoading = false;
          });
     },
})

export default resultSlice.reducer;
