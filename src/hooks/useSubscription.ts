import { AuthState } from "@/redux-store/store";
import { useSelector } from "react-redux"

export const useSubscription = () => {
     const { isLoadingSubscription, isProUser, subscriptionData } = useSelector((state: AuthState) => state.subscription);
     return { isLoadingSubscription, isProUser, subscriptionData };
}