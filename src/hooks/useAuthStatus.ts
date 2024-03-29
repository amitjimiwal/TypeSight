import { AuthState } from "@/redux-store/store"
import { useSelector } from "react-redux"

const useAuthStatus = () => {
     const { status, user } = useSelector((state: AuthState) => state.auth);
     return { status, user };
}
export { useAuthStatus };