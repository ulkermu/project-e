import "./style/global/Global.css";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
