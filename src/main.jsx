import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./AppWrapper"; // în loc de App
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
