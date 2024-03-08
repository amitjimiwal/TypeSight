import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ContentWrapper from "./components/ContentWrapper";
function App() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </div>
  );
}

export default App;
