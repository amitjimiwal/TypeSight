import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ContentWrapper from "./components/ContentWrapper";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./redux-store/slices/authSlice";
import { AppDispatch } from "./redux-store/store";
function App() {
  const dispatch:AppDispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUserInfo())
  },[dispatch])
  return (
    <div className="min-h-screen w-full ">
      <Navbar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer />
    </div>
  );
}

export default App;
