import { axiosClient } from "@/api/axiosclient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
const DAY_IN_MS = 86_400_400;
export interface SubscriptionData {
     id: number;
     userID: number;
     stripeSubscriptionId: string;
     stripeCustomerId: string;
     stripePriceId: string;
     stripeCurrentPeriodEnd: Date;
}

interface SubscriptionState {
     isLoadingSubscription: boolean;
     isProUser: boolean
     subscriptionData: SubscriptionData | undefined;
}

const initialState: SubscriptionState = {
     isLoadingSubscription: false,
     isProUser: true,
     subscriptionData: undefined,
};
export const getSubscriptionInfo = createAsyncThunk("mySubscription", async (_, { rejectWithValue }) => {
     try {
          const data = await axiosClient.get(`/mysubscription`);
          return data;
     } catch (error) {
          const err = error as AxiosError;
          return rejectWithValue(err.response?.data)
     }
})
const resultSlice = createSlice({
     name: 'subscription',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder.addCase(getSubscriptionInfo.pending, (state) => {
               state.isLoadingSubscription = true;
          });
          builder.addCase(getSubscriptionInfo.fulfilled, (state, action) => {
               state.isLoadingSubscription = false;
               const response = action.payload.data;
               state.subscriptionData = response.data;
               if (state.subscriptionData?.stripePriceId && state.subscriptionData?.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()) {
                    state.isProUser = true;
               }
          });
          builder.addCase(getSubscriptionInfo.rejected, (state) => {
               state.isLoadingSubscription = false;
               state.isProUser = false;
               state.subscriptionData = undefined
          });
     },
})

export default resultSlice.reducer;
