import { AuthState } from "@/redux-store/store"
import { useSelector } from "react-redux"

const useAuthStatus = () => {
     const { status, user } = useSelector((state: AuthState) => state.auth);
     return { status, user };
}
const useResultStatus=()=>{
     const {results}=useSelector((state:AuthState)=>state.result);
     return  {results};
}
export { useAuthStatus,useResultStatus };