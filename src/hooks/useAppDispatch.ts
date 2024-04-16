import { AppDispatch } from "@/redux-store/store"
import { useDispatch } from "react-redux"

const useAppDispatch = () => {
     const dispatch = useDispatch<AppDispatch>();
     return dispatch;
}
export default useAppDispatch;