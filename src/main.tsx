import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router-dom";
import router from "./approutes.tsx";
import { Provider } from "react-redux";
import store from "./redux-store/store.ts";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Provider store={store}>
    <Toaster position="bottom-right" />
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);
