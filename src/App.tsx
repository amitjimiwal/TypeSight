import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ContentWrapper from "./components/ContentWrapper";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./redux-store/slices/authSlice";
import { AppDispatch } from "./redux-store/store";
import { motion, useScroll } from "framer-motion";
import { getSubscriptionInfo } from "./redux-store/slices/subscriptionslice";
function App() {
  const { scrollYProgress } = useScroll();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getSubscriptionInfo());
  }, [dispatch]);
  return (
    <div className="min-h-screen w-full ">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[5px] bg-red-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer />
    </div>
  );
}

export default App;
