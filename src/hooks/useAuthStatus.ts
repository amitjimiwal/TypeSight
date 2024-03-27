import { AuthState } from "@/redux-store/store"
import { useSelector } from "react-redux"

const useAuthStatus = () => {
     const authStatus=useSelector((state: AuthState) => state.auth.status);
     return [authStatus];
}
export {  useAuthStatus};