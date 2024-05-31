import { TestModeContext } from "@/context/TypingContext";
import { useContext } from "react";

const useTestMode = () => useContext(TestModeContext);
export default useTestMode;