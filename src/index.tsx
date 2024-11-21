import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../src/App";
import { store } from "features/app/store";
import { Provider } from "react-redux";
import { GlobalStyles } from "./styles/GlobalStyles";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
);
