import { AuthState } from "@/redux-store/store"
import { useSelector } from "react-redux"

const useAuthStatus = () => {
     const { status, user, isLoading } = useSelector((state: AuthState) => state.auth);
     return { status, user, isLoading };
}
const useResultStatus = () => {
     const { results } = useSelector((state: AuthState) => state.result);
     return { results };
}
export { useAuthStatus, useResultStatus };