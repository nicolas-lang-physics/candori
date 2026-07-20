import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { watchAuthAndMerge } from "./lib/merge";
import "./styles/index.css";

watchAuthAndMerge();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
